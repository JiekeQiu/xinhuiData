const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');
const ObjectID = require('mongodb').ObjectId;
router.get('/', async (ctx, next) => {
    let {name,No,address,Contact,phone,invoke,_id} = ctx.query
    let res = await db.find('khMassge',{name})
   _id = new ObjectID(_id)
    console.log("修改",res)

    if(res.length<=0){
        ctx.body={
            state:404,
            msg:"没有该客户，请核对后再查询"
        }
    }else if(No){
        let res = await db.update("khMassge",{_id},{$set:{name,address,Contact,phone,invoke,No}})
        console.log('不知道',res)
        if(res.modifiedCount==1){
            ctx.body = {
                state:200,
                msg:"修改成功"
            }
            next()
        }else{
            ctx.body = {
                state:404,
                msg:"修改失败"
            }
            next()
        }
        
    }
    else {
        ctx.body ={
            state:200,
            res:res[0],
            msg:"查询成功"
        }
        next()
    }
    
   
})


module.exports = router;