/**
 * 原料出库
 * @prams type==1 表示原料出库
 */
const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId
router.get('/',async(ctx,next)=>{
    let { tableData, username, time ,operation} = ctx.query
    let data = JSON.parse(tableData)
    if(ctx.query.type==1){
        // 这里是原料出库相关逻辑
        console.log("前端传",data)
        for(let i=0;i<data.length;i++){
            let res = await db.find("materialGoods",{name:data[i].name,typeName:data[i].typeName})
            if(res.length>0){
                let nums = res[0].num-data[i].num
                nums.toFixed(2)
                _id = new ObjectID(res[0]._id)
                let arr = await db.update("materialGoods", { _id }, { $set: { num: nums } })
                if (arr.modifiedCount > 0) {
                     // 直接把数据传到历史记录表里
                     let res = await db.insert('deliveryHistory', { name: data[i].name, typeName: data[i].typeName, num: data[i].num, unit: data[i].unit,address:data[i].address, price: data[i].price, money: data[i].money, remark: data[i].remark, username, time ,operation})
                     if (res.acknowledged) {
                         ctx.body = {
                             state: 200,
                             msg: "出库成功"
                         }
                     } else {
                         ctx.body = {
                             msg: "出库失败，没有更新到历史记录，请联系管理员！"
                         }
                     }
                }else{
                    ctx.body = {
                        msg:"出库失败，没有更新仓库，请联系管理员！"
                    }
                }
            }
        }

    }


})



module.exports = router

