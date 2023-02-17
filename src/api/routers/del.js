const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');
 
router.get('/',async(ctx,next)=>{
    console.log('赚外快',ctx.query)
    let {No,time} = ctx.query;
    if(No){
        console.log("这是",No)
        let res = await db.delete("delivery",{No})
        console.log("这是No",res.deletedCount)
        if(res.deletedCount==1){
            ctx.body = {
                status:200,
            }
            next()

        }else{
            ctx.body = {
                status:404,
                msg:"删除操作失败"
            }
            next()
        }
    }else if(time){
        console.log("这是",No)
        let res = await db.delete("historyList",{time})
        console.log("这是No",res.deletedCount)
        if(res.deletedCount==1){
            /**拿到原始数据进行删除,
             * 有
            */

            ctx.query.name
            // ctx.body = {
            //     status:200,
            // }
            // next()

        }else{
            ctx.body = {
                status:404,
                msg:"删除操作失败"
            }
            next()
        }
    }
})


module.exports = router;