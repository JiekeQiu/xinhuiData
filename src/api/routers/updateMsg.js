// 更新修改出库记录
const Router = require("koa-router");
const router = new Router();
const db = require('../../db/database');
 const ObjectID = require("mongodb").ObjectId
router.get('/',async(ctx,next)=>{
    let {No,address,bianhao,contact,lister,name,phone,status,_id} = ctx.query;
    _id = new ObjectID(_id)
    let res = await db.update('delivery',{_id},{$set:{address,bianhao,contact,lister,name,phone,status,No}})
    if(res.modifiedCount>0){
        ctx.body = {
            state: 200,
            msg:"用户信息修改成功"
        }
        next()
    }else{
        ctx.body = {
            state: 204,
            msg:"用户信息修改失败"
        }
        next()
    }
    
})


module.exports = router;