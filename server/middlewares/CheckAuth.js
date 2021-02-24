var verifyJWToken = require('../utils/verifyJWT');

module.exports = (req, res, next) => {
    let path = req.path.split('/');

    if(path[1] === "api"){
        if(
            req.path === "/api/user/signin" ||
            req.path === "/api/user/signup" ||
            req.path === "/api/user/verify"
        ) {
            return next();
        }
        const token = "token" in req.headers ? (req.headers.token) : null;
        if(token){
            verifyJWToken(token).then((user)=>{             //Декодируем вытянутый из хэдера токен и обрабатываем
            req.user = user.data._doc;                  //Возвращаем информацию
            next();
            }).catch(()=>{
                res.status(403).json({
                message:"Получен не действительный аутентификационный токен."
                })
            });
        }
    }else {
        return next();
    }
}