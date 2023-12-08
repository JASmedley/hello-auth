let database = require("./database")
let argon2 = require("argon2");
let JsonWebToken = require("jsonwebtoken")

//PART 1: REGISTRATION
// 1. User registers with name, email & password 
// 2. We store the name, email, and hash in DataBase
let newRegistration = async function (req,res){
  //Get the email, name, and password from the request body
  //We want to generate the password hash for the password that is passed in 
  //We want to store the user's email and password hash in the database 

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;
  let hash = await argon2.hash(password);
  let sql = "insert into users(email,password_hash,name) values (?,?,?)";
  let params = [email,hash,name];
  // try {
  //   let hash = await argon2.hash(password);
  // } catch(error);

  database.query(sql,params, function(error,results){
    if(error){
      console.error("Couldn't add entry to the database",error);
      console.log("results are",results);
      res.sendStatus(500);
    }
    else {
      res.json("User registered successfully.");
    }
  });


}

//PART 2: LOGIN
// 1. User will then provide an email & password 
// 2. We will verify the email and password. 
// 3. If good, we will return a token that includes email and user ID 
let startLogin = function(req,res){

  let email = req.body.email;
  let password = req.body.password;
  let sql = "select id, password_hash from users where email = ?";
  let params = [email];
  // if (sql == password) {

  database.query(sql,params, async function(error,results){
    if(error){
      console.error("Couldn't find password in database.",error);
      res.sendStatus(500);
    }
    else {
      if(results.length == 0){
        console.error("User not found",error)
        res.sendStatus(404);
      }
      else if (results.length > 1) {
        console.error("Found more than one user with this email")
        res.sendStatus(500);
      }
      else {
        let hash = results[0].password_hash;
        let userID = results[0].id;
        let verifiedPassword = await argon2.verify(hash, password);
        if(verifiedPassword){
          let token ={
            "email": email,
            "user_id": userID
          }
          let signedToken = JsonWebToken.sign(token, process.env.JWT_SECRET,{expiresIn: "1h"})
          res.json(signedToken)
         }
         else {
          console.error("Incorrect Password");
          res.sendStatus(404);
         }
    }
  }
  }) ;


}



module.exports = {
  newRegistration,
  startLogin
}
