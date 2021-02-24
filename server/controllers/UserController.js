const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs')
var {UserModel} = require('../models/user');
var {validationResult} = require('express-validator');
//var {validatorSignIn, registerValidation} = require('../utils/validations/index');
var {createJWToken} = require('../utils/createJWT');

class UserController {
    constructor(io) {
      this.io = io;
    }
  
    show = (req, res) => {
      const id = req.params.id;
      UserModel.findById(id, (err, user) => {
        if (err) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        res.json(user);
      });
    };
  
    getMe = (req, res) => {                               ///НУЖНО ОПР ДЛЯ ЧЕГО БУДЕТ ИСПОЛЬЗОВАТЬСЯ
      const id = req.user && req.user._id;
      UserModel.findById(id, (err, user) => {
        if (err || !user) {
          return res.status(404).json({
            message: 'User not found'
          });
        }
        res.json(user);
      });
    };
  
    findUsers = (req, res) => {
      const query = req.query.query;
      UserModel.find()
      .or([
        { fullname: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ])
        .then((users) => res.json(users))
        .catch((err => {
          return res.status(404).json({
            status: "error",
            message: err,
          });
        }));
    };
  
    delete = (req, res) => {
      const id = req.params.id;
      UserModel.findOneAndRemove({
          _id: id
        })
        .then(user => {
          if (user) {
            res.json({
              message: `User ${user.fullname} deleted`
            });
          }
        })
        .catch(() => {
          res.json({
            message: `User not found`
          });
        });
    };
  
    create = (req, res) => {
      const salt = bcrypt.genSaltSync(10);
      const confirmed_hash = bcrypt.hashSync(req.body.password, salt);
      const postData = {
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
        passwordConfirmation: req.body.confirm
      };
  
      const errors = validationResult(postData);
  
      UserModel.findOne({email: postData.email}).then(function (result) {                     //Для меня некоторая загадка, почему нельзя после первого
        if (result) {return res.json({
          status: 'error',
          message: "Пользователь с такой почтой существует"
          });
        } else {
          if (!errors.isEmpty()) {
            return res.status(422).json({
              errors: errors.array()
            });
          } else {
            const user = new UserModel(postData);
            user.confirmed_hash = confirmed_hash;
            user
              .save()
            const URL = `${process.env.DOMAIN}/api/user/verify?hash=` + user.confirmed_hash;
            const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            auth: {
              user: process.env.MAIL_LOG,
              pass: process.env.MAIL_PASS
            }
        });
      
          transporter.sendMail({
            from: `BERTA-RPG<${process.env.MAIL_LOG}>`,
            to: postData.email,
            subject: "Подтверждение регистрации",
            html: `Для того, чтобы подтвердить почту, перейдите <a href="http://${process.env.DOMAIN}/signup/verify?hash=${user.confirmed_hash}">по этой ссылке</a>`,
            text: `Для того, чтобы подтвердить почту, перейдите: ${URL}` 
            }).then(function () {
              console.log("Message sent: %s", postData.email);
              res.json({
                status: 'success',
                message: 'Вам отправлено письмо для подтверждения аккаунта!'
              });
            }, function (error) {
              res.json({
                status: 'failed',
                message: error
              })
            })
            .catch((reason) => {
              res.status(500).json({
                status: "error",
                message: reason,
              });
            });
          }
        }
      });   
    }
  
  
    verify = (req, res) => {
      const hash = req.query.hash;
      if (!hash) {
        return res.status(420).json({
          status: 'error',
          message: 'Данная ссылка недействительна'
        });
      }
      UserModel.findOneAndUpdate({
        confirmed_hash: hash
      }, {
        $set: {
          confirmed: true
        }
      }).then(function () {
        UserModel.findOne({
          confirmed_hash: hash
        }).then(function (result) {                     //Для меня некоторая загадка, почему нельзя после первого
          if (!result || result.confirmed === false) {  // .then получать result для подтверждения значения
            return res.status(404).json({               // confirmed. Но в таком виде оно работает
              hash: hash,
              status: 'error',
              message: 'Не удалось подтвердить аккаунт'
            })
          } else {
            res.json({
              status: 'success',
              message: 'Аккаунт успешно подтвержден!'
            });
          }
        });
      });
    };
  
    login = (req, res) => {
      const postData = {
        email: req.body.fullname,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      };
  
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: 'error',
          errors: errors.array()
        });
      }
  
      UserModel.findOne({
        $or: [{
          fullname: postData.email
            },
              {
          email: postData.email
            }
      ]
      }, (err, user) => {
        if (err || !user) {
          return res.json({
            status: 'error',
            message: 'User not found'
          });
        }
        
        if (bcrypt.compareSync(postData.password, user.password)) {
          
          if (!user.confirmed) {
            return res.json({
              status: 'error',
              message: 'User not activated'
            });
          }
  
          const token = createJWToken(user);
          res.json({  
            status: 'success',
            token
          });
        } else {
          res.json({
            status: 'error',
            message: 'Incorrect password or email'
          });
        }
      });
    };
  }
  module.exports = UserController;