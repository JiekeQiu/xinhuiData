/**
 * 原料出库
 * @prams type==1 表示原料补货查询
 * @prams type==2 表示补货查询
 */
const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId
router.get('/',async(ctx,next)=>{
  let {type} = ctx.query
  let AllRes
  if(type==1){
    AllRes = await db.find("materialGoods",{}) 
  }else if(type==2){
    AllRes = await db.find("hardwareGoods",{}) 
  }
  if(AllRes.length>0){
    let res = []
    AllRes.forEach(item => {
        if(item.num*1<=item.compare*1){
            res.push(item)
        }
    });
    ctx.body = {
        res,
        state:200
    }
  }else{
    ctx.body={
        res,
        msg:"没有库存，请联系管理员"
    }
  }

})



module.exports = router

