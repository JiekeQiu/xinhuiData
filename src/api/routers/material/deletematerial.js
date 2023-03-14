/**
 * 原料仓库历史记录删除
 */
const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId
router.get('/',async(ctx,next)=>{
    let {_id,name,typeName,num} = ctx.query
    _id = new ObjectID(_id)
    // 查找原料仓库的库存
    let ylRes = await db.find("materialGoods",{name,typeName})
    
    // 删除后的库存
    // let nums = ylRes[0].num-num
    let nums
    console.log("前端传",)
    if(ctx.query.type==2){
        nums = ylRes[0].num*1+num*1
        console.log("走哪里",nums)
    }else{
        nums = ylRes[0].num-num
        console.log("走着路",nums)
    }
    //更新库存
    let updateGoods = await db.update('materialGoods',{_id:ylRes[0]._id},{$set:{num:nums}})
    // console.log(updateGoods)
    if(updateGoods.modifiedCount>0){
        // 如果更新成功了就直接删除历史记录对应的内容
        // let res = await db.delete("materialHistory",{_id})
        let res
        if(ctx.query.type==2){
            res = await db.delete("deliveryHistory",{_id})
        }else{
            res = await db.delete("materialHistory",{_id})
        }
        if(res.deletedCount==1){
            ctx.body = {
                state:200,
                msg:"删除成功"
            }
        }else{
            ctx.body = {
                msg:"库存数据已更新，但历史记录删除出错"
            }
        }
    }else{
        ctx.body={
            msg:"仓库数据没有更新，删除失败"
        }
    }
})



module.exports = router

