// 更新修改出库记录
const Router = require("koa-router");
const router = new Router();
const db = require('../../db/database');
 
router.get('/',async(ctx,next)=>{
    let {No,address,bianhao,contact,lister,name,phone,status} = ctx.query;
    
    let res = await db.update('delivery',{No},{$set:{address,bianhao,contact,lister,name,phone,status}})
    console.log(res)
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