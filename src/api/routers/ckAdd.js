const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let {bianhao,k} = ctx.query
    if(k){
        let res = await db.find('khMassge',{})
        ctx.body = {
            res
        }
        next()
    }else if(bianhao){
        let res = await db.find('khMassge',{No: {$regex:bianhao,$options:"$i"} })
        if(res.length>0){
            ctx.body = {
                status:200,
                res
            }
            next()
        }else{
            ctx.body = {
                status:404,
            }
            next()
        }
        
    }else{
       ctx.body = {
        status:404,
    }
    next()

    }
    //不区分大小写查询
})


module.exports = router;