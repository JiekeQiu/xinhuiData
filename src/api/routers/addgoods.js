 const Router = require("koa-router");
const db = require("../../db/database")
const router = new Router();

router.get('/',async(ctx,next)=>{
    let {name,kind,typename,num,numR,numL,address,operating,all,time} = ctx.query;
    let res = await db.insert('goods',{name,kind,typename,num,numR,time,numL,address,operating,all})
    ctx.body = {
        status:200
    }
    next()
})



module.exports = router

