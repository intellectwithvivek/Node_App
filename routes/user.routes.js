module.exports = app => {
    const users = require("../controller/users.controllers.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/signup", users.create);
  
    // Login to your account
    router.get("/signin", users.find);
    
  
    app.use('/api/users', router);
  };
  