import sequelize from "./config/database";
import express from "express";
import { json, urlencoded } from 'body-parser';
import routes from './routes/allRoutes';
import cors from 'cors';

const app = express();
//Port to listen on
// const PORT = process.env.PORT || 3020;
const PORT = 3020;
// sync the database before start server
// we make it true if we change something in database to refresh all database, make it false for normal refresh
// NOTE: if it true will delete all data and install database again
sequelize.sync({force: false})
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }))
// parse application/json
app.use(json())
// use routes
app.use(routes);
// use it before all route definitions
app.use(cors());
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});
 

app.listen(PORT);