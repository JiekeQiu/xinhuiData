const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();

router.get('/',async(ctx,next)=>{
    // console.log("查看有没有同",ctx.query)
    if(ctx.query.type==1){
        let {name,typeName} = ctx.query
        let res = await db.find("materialGoods",{name,typeName})
        if(res.length>0){
            ctx.body={
                res,
                state:200,
            }
            next()
        }else{
            ctx.body={
                res,
                msg:"没有找到该原料"
            }
            next()
        }
    }else if(ctx.query.type==2){
        let res = await db.find("materialHistory",{})
        if(res.length>0){
            ctx.body={
                res,
                state:200,
            }
            next()
        }else{
            ctx.body={
                res,
                msg:"没有找到该原料"
            }
            next()
        }
    }else if(ctx.query.type==3){
        let res = await db.find("materialGoods",{})
        if(res.length>0){
            ctx.body={
                res,
                state:200,
            }
            next()
        }else{
            ctx.body={
                res,
                msg:"没有找到该原料"
            }
            next()
        }
    }else if(ctx.query.type==4){
        let res = await db.find("deliveryHistory",{})
        if(res.length>0){
            ctx.body={
                res,
                state:200,
            }
            next()
        }else{
            ctx.body={
                res,
                msg:"没有找到该原料"
            }
            next()
        }
    }
})



module.exports = router

