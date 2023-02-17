const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
   let {No} = ctx.query
   let res = await db.delete("khMassge",{No})
   if(res.deletedCount==1){
    ctx.body = {
        state:200,
        msg:"删除成功"
    }
    next()

}else{
    ctx.body = {
        state:404,
        msg:"删除操作失败"
    }
    next()
}
})


module.exports = router;