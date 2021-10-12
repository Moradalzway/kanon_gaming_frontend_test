import express = require("express");
import countryController = require("../controllers/countryController");
const router = express.Router();

// we need to define route name to shows in url  
const routeName = "/countries";


router.post(routeName + "/search" ,countryController.seachCountry);
router.get(routeName + "/all" ,countryController.getAllCountries);


// module.exports = router;
export default router;