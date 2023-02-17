const Router = require('koa-router');
const {verify} = require('../../utils/token');

//创建路由
let router = new Router();


router.post('/',(ctx,next)=>{

    let {token} = ctx.request.body;
    //对token解密
    let _token = verify(token);

    if(_token){
        ctx.body = {
            stauts:200,
            msg:"succsse"
        }
    }else{
        ctx.body = {
            stauts:404,
            msg:'fail'
        }  
    }



})
module.exports = router;
