const Router = require("koa-router");
const router = new Router();
const db = require('../../db/database');

router.get('/',async(ctx,next)=>{
    //判断传过来的时numL还是numR
if(ctx.query.numL == 0){
    let {name,typename,num,numL,numR,operating,time,kind,address} = ctx.query
    let res = await db.update('goods',{name,typename},{$set:{time,kind,address,num,numL,numR,operating}})
    ctx.body = {
        status: 200,
    }
    next()
}else{
    let {name,typename,num,numR,numL,operating,address} = ctx.query
    let res = await db.update('goods',{name,typename},{$set:{num,numR,numL,operating,address}})
    ctx.body = {
        status: 200,
    }
    next()
}
})


module.exports = router