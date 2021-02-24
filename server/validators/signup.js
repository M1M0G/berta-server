var { check } = require("express-validator") ;
module.exports = [
  check("email").isEmail(),
  check("nickname").isLength({ min: 3 }),
  check("password")
    .isLength({ min: 6 })
    .withMessage('Пароль должен содержать минимум 6 символов.'),
  check('passwordConfirmation').custom((passwordConfirmation, { req }) => {
    if (passwordConfirmation !== req.body.password) {
      throw new Error('Поле подтверждения должно совпадать с паролем.');
    }
  })
];