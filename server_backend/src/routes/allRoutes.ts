// in this file will collect all routes in one file to import it into index.ts (server file);
import express = require("express");
import userRoute from './userRoute';
import slotMachineRoute from './slotMachineRoute';
import countryRoute from './countryRoute';

const app = express();


app.use(userRoute);
app.use(slotMachineRoute);
app.use(countryRoute);

export default app;