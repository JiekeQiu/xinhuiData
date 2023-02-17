const jwt = require('jsonwebtoken');

//设置加密的私钥
const siyao = "xinhui88"; // 以xinhui88的加密方式加密

//加密
exports.create = (usename, expiresIn = '1h') => {
    //拿到前端发过来的用户名，并进行加密
     // expiresIn: token有效期(单位: s)，默认2小时
    let token = jwt.sign({ usename }, siyao, {
        expiresIn
    });
    return token;
}
//解密
exports.verify = (token) => {
    let res = false;
    try {
        //用私钥对token进行解密
        res = jwt.verify(token, siyao);
    } catch{
        res = false
    }

    return res;
}