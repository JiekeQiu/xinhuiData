const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let { time, num, numL, numR, name, typename, address, operating } = ctx.query;
    console.log(time)
    let res = await db.update("historyList", { time }, { $set: { num, numL, numR, name, typename, address, operating } })
    ctx.body = {
        status: 200
    }
    next()
})


module.exports = router;