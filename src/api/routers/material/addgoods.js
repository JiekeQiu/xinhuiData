const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId
router.get('/',async(ctx,next)=>{
   let {name,typeName,num,address,unit,remark,username,operation,time,price,money,brand} = ctx.query
    if(ctx.query.type==1){
        // 这里是单款产品入库
        let res = await db.find("materialGoods",{name,typeName})
        if(res.length>0){
            // 如果有这款产品则在这里叠加
            let nums = res[0].num*1 + num*1
             nums.toFixed(2)
            _id = new ObjectID(res[0]._id)
            let arr = await db.update("materialGoods",{_id},{$set:{num:nums}})
            if(arr.modifiedCount>0){
                ctx.body={
                    state:200,
                    msg:"入库成功"
                }
                next()
            }else{
                ctx.body = {
                    msg:"入库失败"
                }
            }

        }else{
            // 这里是新材料
            let res = await db.insert('materialGoods',{name,typeName,num,unit,address,remark})
            if(res.acknowledged){
                ctx.body = {
                    state:200,
                    msg:"入库成功"
                }
                next()
            }else{
                ctx.body = {
                    msg:"入库失败"
                }
                next()
            }
        }
    }else if(ctx.query.type==2){
        let res = await db.insert('materialHistory',{name,typeName,num,address,unit,remark,username,operation,time,price,money,brand})
        console.log('看看',res)
        if(res.acknowledged){
            ctx.body = {
                state:200,
                msg:"入库成功"
            }
            next()
        }else{
            ctx.body = {
                msg:"入库失败"
            }
            next()
        }
    }
})



module.exports = router

