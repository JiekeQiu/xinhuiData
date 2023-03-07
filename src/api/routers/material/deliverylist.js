const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId
router.get('/',async(ctx,next)=>{
    let {name,typeName,num,address,unit,remark,username,operation,time,price,money,brand}=ctx.query
   if(ctx.query.type==1){
    let arr = await db.find("materialGoods",{name,typeName})
    if(arr.length>0){
        let nums = arr[0].num -num
        console.log(arr[0]._id)
        if(nums>0){
            _id = new ObjectID(arr[0]._id)
            let res = await db.update("materialGoods",{_id},{$set:{num:nums}})
            if(res.modifiedCount>0){
                ctx.body={
                    state:200,
                    msg:"出库成功"
                }
                next()
            }else{
                ctx.body={
                    msg:"出库失败"
                }
                next()
            }
        }
    }else{
        ctx.body = {
            res:[],
            msg:"没有找到"+name+typeName
        }
    }
   }else if(ctx.query.type==2){
    let res = await db.insert('deliveryHistory',{name,typeName,num,address,unit,remark,username,operation,time,price,money,brand})
        if(res.acknowledged){
            ctx.body = {
                state:200,
                msg:"出库成功"
            }
            next()
        }else{
            ctx.body = {
                msg:"出库失败"
            }
            next()
        }
   }
})



module.exports = router

