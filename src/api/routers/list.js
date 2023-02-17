const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let {pageIndex,pageSize,total} = ctx.query
    if (ctx.query.k) {
        let res = await db.find('basics', {})
        ctx.body = res
        next()
    }else if(ctx.query.khMessage) {
        let res = await db.find('khMassge',{})
        ctx.body = res
        next()
    }else if(pageIndex){

        // let res = await db.find('goods', {});
        let res = await db.findPage('goods',{pageSize,pageIndex});
        let count = await db.count("goods",{})
        ctx.body = {
            res,
            count
        }
        next()
    }
})


module.exports = router;