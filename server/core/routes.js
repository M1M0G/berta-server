var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
 var {
   UserCtrl,
//   DialogCtrl,
//   MessageCtrl
 } = require('../controllers');
var checkAuth = require('../middlewares/CheckAuth');
//import { loginValidation, registerValidation } from "../utils/validations";
//var loginValidation = require('../utils/validators')
//var registerValidation = require('../utils/validators')
//var updateLastSeen = require('../middlewares/UpdateLastSeen')
//var staticPath = path.join(__dirname, '../../client/build');
//var indexHTML = path.join(__dirname,'../../client/build/index.html');

const createRoutes = (app) => {
  const UserController = new UserCtrl();
  //const DialogController = new DialogCtrl(io);
  //const MessageController = new MessageCtrl(io);
  
  //app.use(express.static(staticPath));
  // app.get('/*', (req, res) => res.sendFile(indexHTML));
  app.use(bodyParser.json());
  app.use(checkAuth);
  //app.use(updateLastSeen);

  app.get("/api", (_, res) => {
    res.send("Hello, World!");
  });
  
  console.log("1");
   app.get("/api/user/me", UserController.getMe);
   app.get("/api/user/verify", UserController.verify);
   app.post('/api/user/signup', UserController.create);
   app.post("/api/user/signin", UserController.login);
//   //app.post('/api/user/signup', registerValidation, UserController.create);
//   //app.post("/api/user/signin", loginValidation, UserController.login);
//   app.get("/api/user/find", UserController.findUsers);
//   app.get("/api/user/:id", UserController.show);
//   app.delete("/api/user/:id", UserController.delete);

//   app.get("/api/dialogs/", DialogController.index);
//   app.delete("/api/dialogs/:id", DialogController.delete);
//   app.post("/api/dialogs", DialogController.create);

//   app.get("/api/messages", MessageController.index);
//   app.post("/api/messages", MessageController.create);
//   app.delete("/api/messages", MessageController.delete);
//   app.get('/*', (req, res) => res.sendFile(indexHTML));
//   console.log("2");
  
};


module.exports = createRoutes;