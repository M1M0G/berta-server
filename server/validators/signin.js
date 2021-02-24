var { check, oneOf } = require("express-validator") ;

module.exports = [
    check('email').isEmail(), 
    check('password')
        .exists()
        .isLength({ min: 3 }),
    oneOf([
      check('nickname')
          .exists()
          .withMessage('Заполните поле логина')
          .isEmail()
          .withMessage('Неправильно набрал логин.'),
        check('nickname')
          .exists()
          .withMessage('Заполните поле логина.')
          .isLength({ min: 6 })
          .withMessage('Поле логина не может быть меньше 6 символов.')
    ])
];