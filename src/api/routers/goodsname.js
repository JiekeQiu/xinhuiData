const Router = require('koa-router')


const router = new Router();
const db = require('../../db/database');
router.get('/', async (ctx, next) => {
    let { name, typename } = ctx.query;
    let res = await db.find('goods', { name, typename });
    res = res[0]
    if (res) {
        ctx.body = {
            status: 200,
            name:res.name,
            typename:res.typename,
            address: res.address,
            kind: res.kind,
            num:res.num,
            numR:res.numR,
            numL:res.numL,
            id:res._id,
            time: res.time
        }
    } else {
        ctx.body = {
            status: 404,
            msg: "fail"
        }
    }
    next()

})





module.exports = router