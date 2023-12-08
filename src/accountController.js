let database = require("./database")

//PART 3: VERIFICATION
// 1. User will login and include the token
// 2. If we trust the token, we will look and retrieve the id from the token 
// 3. Look into the dtabse for the name matching the ID and say hellow with that name 
let sayHello = function(req,res){

  let UserID = req.userID;
  let sql = 'select name from users where id = ?';
  let params = [UserID]
  database.query(sql,params, function(error,results){
      if (error){
        console.error("Couldn't get name");
        res.sendStatus(500)
      }

      else if (results.length != 1){
        console.error("Found another error", error)
        res.sendStatus(500);
      }
      
      else{
        res.json("Hello "+results[0].name)
      }
  })
}


module.exports = {
  sayHello
}
