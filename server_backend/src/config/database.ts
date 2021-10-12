import { Sequelize } from 'Sequelize';

// init local database SQLite to store our small data
const sequelize = new Sequelize('database', 'username', 'password', {
  logging: false,
  dialect: 'sqlite',
  storage: 'databases/main.sqlite', // the path of database, you can use program like [DB Browser for SQLite] to see what it contains
});

// here we try to connect to database
try {
  sequelize.authenticate();
  // console.log('Connection has been established successfully.'); active this if you want to check and troubleshooting
} catch (error) {
  // console.error('Unable to connect to the database:', error); active this if you want to check and troubleshooting
}

export default sequelize;
