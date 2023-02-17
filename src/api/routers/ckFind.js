const Router = require("koa-router");
const db = require("../../db/database")
const router = new Router();

router.get('/', async (ctx, next) => {
    let { No ,date} = ctx.query
    if (No) {
        let res = await db.find('delivery',{No})
        ctx.body={
            stauts:200,
            res
        }
        next()
    }else if(date){
        let res = await db.find("delivery",{date})
        ctx.body={
            stauts:200,
            res
        }
        next()
    } else {
        let res = await db.find('delivery', {})
        // let data = JSON.parse(res)
        let data = res.slice(-30)

        ctx.body = {
            stauts: 200,
            data
        }
    }
})



module.exports = router

