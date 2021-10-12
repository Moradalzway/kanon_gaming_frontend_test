import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

// this model for coin_transactions table
// we use model from sequelize orm to make CRUD operations easy
class CoinModel extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public amount!: string; // this for amount of coin
  public type!: string; // this for check type [COST] and [INCOME]
  public user_id!: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CoinModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    type: {
      type: new DataTypes.STRING(10),
      allowNull: false,
    },
    user_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    tableName: 'coin_transactions',
    sequelize: sequelize, // this bit is important
  },
);

export { CoinModel };
