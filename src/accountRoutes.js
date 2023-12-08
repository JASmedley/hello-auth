let express = require ("express");

let router = express.Router();

let authController = require("./accountController")
let authorization = require("./authorization")

// GET / hello - This route will: 
//   1. Require that a user be signed in 
//   2. Return a "hello" message 
//   3. "Hello" message will include user's name 
router.get("/hello", authorization.checkJSONWebToken, authController.sayHello);


module.exports = router;