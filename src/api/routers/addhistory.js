const Router = require("koa-router");
const db = require("../../db/database")
const router = new Router();

router.get('/',async(ctx,next)=>{
    console.log(ctx.query)
    let {name,kind,typename,num,numR,numL,address,operating,time} = ctx.query;
    let res = await db.insert('historyList',{name,kind,typename,num,numR,time,numL,address,operating})
    ctx.body = {
        atatus:200
    }
    next()
})



module.exports = router

