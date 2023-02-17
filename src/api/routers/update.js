const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    if (ctx.query.time) {
        let { name, typename, time, num, numL, numR, address } = ctx.query
        let res = await db.update('historyList', { time }, { $set: { name, typename, time, num, numL, numR, address } });
        console.log('看看res', time)
        console.log('看看ctx.query', ctx.query)
        if (res.modifiedCount > 0) {
            ctx.body = {
                status: 200,
            }
            next()
        } else {
            ctx.body = {
                status: 404,
            }
            next()
        }

    } else if (ctx.query.No) {
        let { No, status } = ctx.query
        let res = await db.update('delivery', { No }, { $set: { status } })
        console.log(res)
        if (res.modifiedCount == "1") {
            ctx.body = {
                status: 202
            }
            next()
        } else {
            ctx.body = {
                status: 203,
                msg: "没有修改内容或者没有找到该订单号"
            }
            next()
        }
    } else {
        let { name, typename, num, numL, numR, address } = ctx.query
        let res = await db.update('goods', { name, typename }, { $set: { name, typename, num, numL, numR, address } })
        res = res[0]
        ctx.body = {
            status: 200,

        },
            next()
    }
    // if(ctx.query.time){
    //     let {name,typename,time,num,numL,numR,address,id} = ctx.query
    // let res = await db.update('historyList', { time },{$set:{name,typename,time,num,numL,numR,address}});
    // console.log('看看res',res)
    // if(res.modifiedCount>0){
    //     let {name,typename,time,num,numL,numR,address} = ctx.query

    //     ctx.body = {
    //         status: 200,
    //     }
    //     next()
    // }else{
    //     ctx.body = {
    //         status: 404,
    //     }
    //     next()
    // }

    // }else{
    //     let {name,typename,num,numL,numR,address} = ctx.query
    //     let res = await db.update('goods',{name,typename},{$set:{name,typename,num,numL,numR,address}})
    //     res=res[0]
    //     ctx.body={
    //         status:200,

    //     },
    //     next()
    // }
})


module.exports = router;