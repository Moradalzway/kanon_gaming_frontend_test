import express = require("express");
import soltController = require("../controllers/slotController");
import auth from "../middlewares/auth";
const router = express.Router();

// we need to define route name to shows in url  
const routeName = "/slot-machine";



router.post(routeName + "/check", auth ,soltController.checkAndSave);
router.post(routeName + "/coin-balance", auth ,soltController.userCoinsBalance);


// module.exports = router;
export default router;