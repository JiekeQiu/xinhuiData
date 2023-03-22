/**
 * 设置原料基础信息
 */

const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId

router.get('/', async (ctx, next) => {
    console.log(ctx.query)
    let { _id, compare, address } = ctx.query
    _id = ObjectID(_id)
    if (ctx.query.type == 1) {
        let res = await db.update("hardwareGoods", { _id }, { $set: { compare, address } })
        if (res.modifiedCount > 0) {
            ctx.body = {
                state: 200,
                msg: "修改成功"
            }
        } else {
            ctx.body = {
                msg: "修改失败，请联系管理员！"
            }
        }
    } else {
        let res = await db.update("materialGoods", { _id }, { $set: { compare, address } })
        if (res.modifiedCount > 0) {
            ctx.body = {
                state: 200,
                msg: "修改成功"
            }
        } else {
            ctx.body = {
                msg: "修改失败，请联系管理员！"
            }
        }
    }
    //    let res = await db.update("materialGoods",{_id},{$set:{compare,address}})
    //    if(res.modifiedCount>0){
    //       ctx.body={
    //           state:200,
    //           msg:"修改成功"
    //       }
    //   }else{
    //       ctx.body={
    //           msg:"修改失败，请联系管理员！"
    //       }
    //   }

})



module.exports = router

