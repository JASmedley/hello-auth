require("dotenv").config();
let express = require("express");
let routes = require("./routes");
let accountRoutes = require("./accountRoutes")
let PORT = process.env.PORT || 8003;
let app = express();

app.use(express.json());
app.use(routes);
app.use(accountRoutes);
app.listen(PORT, function(){
  console.log("Application started on port",PORT)
});
