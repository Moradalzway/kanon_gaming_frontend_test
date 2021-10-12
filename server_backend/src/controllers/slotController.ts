import { Response } from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { CoinModel } from "../models/CoinModel";

// here we will receive the slot machine result and check if user win or lose
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const checkAndSave = async (req: any, res: Response) => {
  const { reelOneResult, reelTwoResult, reelThreeResult } = req.body;

  // take one coin from user for trying
  await CoinModel.create({
    amount: 1,
    type: "COST",
    user_id: req.user.user_id,
  });

  // score data
  const scoreData: any = {
    apple: 5,
    cherry: 20,
    banana: 2.5,
    lemon: 1,
  };

  let totalScore = 0;
  // check if win
  if (reelOneResult === reelTwoResult) {
    // get score
    // eslint-disable-next-line no-prototype-builtins
    const score = scoreData[reelOneResult];
    totalScore = score * 2;

    // check lemons
    if (
      reelOneResult === "lemon" &&
      reelTwoResult === "lemon" &&
      reelThreeResult === "lemon"
    ) {
      totalScore += 1;
    } else if (reelOneResult === "lemon" && reelTwoResult === "lemon") {
      totalScore = 0;
    } else if (
      reelOneResult === reelThreeResult &&
      reelTwoResult === reelThreeResult
    ) {
      totalScore += 10;
    }
  }

  // add coin for user if win
  if (totalScore > 0) {
    await CoinModel.create({
      amount: totalScore,
      type: "INCOME",
      user_id: req.user.user_id,
    });
  }

  // get user coin balance
  const coinBalance = await getUserCoinsBalance(req);
  const responseCode = 200;
  const response = {
    code: responseCode,
    result: {
      coin_result: totalScore,
      total_coins: coinBalance,
    },
    message:
      totalScore > 0
        ? "YOU WIN " + totalScore + " COINS ! "
        : "You Lose, try your luck again",
  };

  return res.status(responseCode).json(response);
};

// this function for internal use to get user current balance of coins
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getUserCoinsBalance = async (req: any) => {
  const sql = `
  select  (
  (SELECT COALESCE(SUM(amount),0) as 'totalIncome' from coin_transactions WHERE user_id = ${req.user.user_id} AND type = "INCOME") 
  - 
  (SELECT COALESCE(SUM(amount),0) as 'totalCost' from coin_transactions WHERE user_id = ${req.user.user_id} AND type = "COST") 
  ) as 'balance'  
  from coin_transactions limit 0,1`;

  const totalCoins: any = await sequelize.query(sql, {
    type: QueryTypes.SELECT,
  });

  return totalCoins[0].balance || 0;
};

// this function for route user to get user current balance of coins
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const userCoinsBalance = async (req: any, res: Response) => {
  return res.status(200).json(await getUserCoinsBalance(req));
};

export { checkAndSave, getUserCoinsBalance, userCoinsBalance };
