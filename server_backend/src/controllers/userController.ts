import { UserModel } from "../models/UserModel";
import express from "express";
import bcrypt from "bcrypt";

import validator from "validator";
import jwt from "jsonwebtoken";
import { isEmpty } from "../utils/custom_validtor";
import "dotenv/config";
import { CoinModel } from "../models/CoinModel";
import soltController = require("../controllers/slotController");

// this function for Register
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const create = async (req: any, res: express.Response) => {
  // some cool validation
  if (
    !isEmpty(req.body.email) &&
    !isEmpty(req.body.name) &&
    !isEmpty(req.body.password)
  ) {
    // check email
    if (!validator.isEmail(req.body.email)) {
      const responseCode = 400;
      const response = {
        code: responseCode,
        message: "Please enter a correct email ",
      };
      return res.status(responseCode).json(response);
    }
  } else {
    const responseCode = 400;
    const response = {
      code: responseCode,
      message: "Please enter the required fields (*)",
    };
    return res.status(responseCode).json(response);
  }

  //Encrypt user password
  req.body.password = await bcrypt.hash(req.body.password, 10);

  // create into database
  await UserModel.create(req.body)
    .then(async (result: any) => {
      // Create token
      const token = jwt.sign(
        { user_id: result.id, email: result.email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "24h",
        }
      );
      // here we will add 20 for each user
      try {
        await CoinModel.create({
          amount: 20,
          type: "INCOME",
          user_id: result.dataValues.id,
        });
      } catch (error) {
        // console.log("error in catch CoinModel create", error);
      }
      req.user = { user_id: result.id, email: result.email };

      // get user coin balance
      const coinBalance = await soltController.getUserCoinsBalance(req);

      const responseCode = 201;
      const response = {
        code: responseCode,
        message: "The User added successfully",
        result: {
          ...result.dataValues,
          token: token,
          coin_balance: coinBalance,
        },
      };

      return res.status(responseCode).json(response);
    })
    .catch((error) => {
      let message = "undefined error";
      if (error.message === "Validation error") {
        message = "email must be unique";
      }

      const responseCode = 400;
      const response = {
        code: responseCode,
        message: message,
      };
      return res.status(responseCode).json(response);
    });
};

// this function for check login
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const login = async (req: any, res: express.Response) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      const responseCode = 500;
      const response = {
        code: responseCode,
        message: "Please enter the required fields (*)",
      };

      return res.status(responseCode).json(response);
    }
    // Validate if user exist in our database
    const user: any = await UserModel.findOne({ where: { email: email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email: user.email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "24h",
        }
      );

      req.user = { user_id: user.id, email: user.email };

      // get user coin balance
      const coinBalance = await soltController.getUserCoinsBalance(req);
      const responseCode = 200;
      const response = {
        code: responseCode,
        message: "Login successfully",
        result: { ...user.dataValues, token: token, coin_balance: coinBalance },
      };

      return res.status(responseCode).json(response);
    }
    const responseCode = 401;
    const response = {
      code: responseCode,
      message: "Invalid Credentials",
    };

    return res.status(responseCode).json(response);
  } catch (error) {
    const responseCode = 500;
    const response = {
      code: responseCode,
      message: error || "undefined error",
    };
    return res.status(responseCode).json(response);
  }
  // Our register logic ends here
};

export { create, login };
