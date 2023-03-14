/**
 * 原料分页查询
 */

const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();

router.get('/',async(ctx,next)=>{
    // console.log("查看有没有同",ctx.query)
    let {name,typeName,pageIndex,pageSize} = ctx.query
    if(ctx.query.type==1){
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

        // let res = await db.find("materialHistory",{})
        let res = await db.findPage('materialHistory',{pageSize,pageIndex});
        let count = await db.count("materialHistory",{})
        if(res.length>0){
            console.log("查看历史记录",res,count) 
            ctx.body={
                res,
                count,
                state:200,
            }
            next()
        }else{
            ctx.body={
                state:200,
                res,
                count,
                msg:"没有找到该原料"
            }
            next()
        }
    }else if(ctx.query.type==3){
        let res = await db.findPage("materialGoods",{pageSize,pageIndex})
        let count = await db.count("materialGoods",{})
        if(res.length>0){
            ctx.body={
                res,
                count,
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
        let res = await db.findPage("deliveryHistory",{pageSize,pageIndex})
        let count = await db.count("deliveryHistory",{})

        if(res.length>0){
            ctx.body={
                res,
                count,
                state:200,
            }
            next()
        }else{
            ctx.body={
                state:200,
                res,
                count,
                msg:"没有找到该原料"
            }
            next()
        }
    }
})



module.exports = router

