import express = require("express");
import userController = require("../controllers/userController");
import soltController = require("../controllers/slotController");
import auth from "../middlewares/auth";
const router = express.Router();

// we need to define route name to shows in url  
const routeName = "/users";
router.get(routeName, (req,res) => {
     return res.json("herlrp");
});


router.post(routeName + "/create", userController.create);
router.post(routeName + "/login", userController.login);
router.get(routeName + "/test", auth ,soltController.checkAndSave);


// module.exports = router;
export default router;