let express = require ("express");

let router = express.Router();

let authController = require("./controller")

// POST / register - This route will:
   //  1. Accept user info and password.
   //  2. Store the info along with the password hash in the database. 
   //  3. We will NOT store the password. 
router.post("/register",authController.newRegistration);

// POST / login - This route will: 
//   1. Accept a user's email, name, and password.
//   2. Check the password against the hash in the database that was stored on registration.
//   3. If the password is good, it will return the token. 
//   4. If the password is bad, it will respond with an error. 
router.post("/login",authController.startLogin);


module.exports = router;