/**
 * 原料分页查询
 * @params type==1 根据原料型号和规格查询
 * @params type==2 原料历史记录分页查询
 * @params type==3 原料库存分页查询
 * @params type==4 原料出库历史记录分页查询
 * @params type==5 所有原料库存查询
 * @params type==6  根据五金型号和规格查询
 * @params type==7 五金库存分页查询
 * @params type==8 五金历史记录分页查询
 * @params type==9 五金出库历史记录分页查询
 * 
 * 
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
    }else if(ctx.query.type==5){
        let res = await db.find("materialGoods",{})
        if(res.length>0){
            ctx.body={
                res,
                state:200,
            }
            next()
        }else{
            ctx.body={
                state:200,
                res,
                msg:"没有找到该原料"
            }
            next()
        }
    }else if(ctx.query.type==6){
        let res = await db.find("hardwareGoods",{name,typeName})
        if(res.length>0){
            ctx.body={
                res,
                state:200,
            }
            next()
        }else{
            ctx.body={
                res,
                msg:"没有找到该五金"
            }
            next()
        }
    }else if(ctx.query.type==7){
        let res = await db.findPage("hardwareGoods",{pageSize,pageIndex})
        let count = await db.count("hardwareGoods",{})
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
                msg:"没有找到该五金"
            }
            next()
        }
    }else if(ctx.query.type==8){

        // let res = await db.find("materialHistory",{})
        let res = await db.findPage('hardwareHistory',{pageSize,pageIndex});
        let count = await db.count("hardwareHistory",{})
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
    }else if(ctx.query.type==9){
        let res = await db.findPage("hardwaredelivery",{pageSize,pageIndex})
        let count = await db.count("hardwaredelivery",{})

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

