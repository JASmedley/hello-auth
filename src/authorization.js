let JSONWebToken = require("jsonwebtoken")

let checkJSONWebToken = function (req,res, next) {
  let header = req.get("Authorization")
  let signedToken;
  
  //Pull a token from the header  
  if(header){
    let separateHeader = header.split(" ");
    signedToken = separateHeader[1];
  }
  //Attempt verifying the token
  try {
    let token = JSONWebToken.verify(signedToken, process.env.JWT_SECRET)
    req.userID = token.user_id;
    console.log("token:",token)
    next ();
  }
  // If there's a bad token, return a 401 error. 
  catch(err) {
    res.sendStatus(401);
  }
}



module.exports = {
  checkJSONWebToken
}