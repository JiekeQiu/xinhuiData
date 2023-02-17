const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let {pageIndex,pageSize,total} = ctx.query

    //判断前端有没有传值过来，有传这拿到数据，否则就直接查询整个表
    if (ctx.query.typename && ctx.query.name) {
        let { name, typename } = ctx.query
        console.log({ name })

        let res = await db.find('historyList', { name, typename });
        console.log(res)
        if (res != "") {
            res = res[0]
            ctx.body = {
                status: 200,
                name: res.name,
                kind: res.kind,
                typename: res.typename,
                num: res.num,
                numR: res.numR,
                time: res.time,
                numL: res.numL,
                address: res.address,
                operating: res.operating,
                all: res.all
            };
            next()
        } else {
            ctx.body = {
                status: '404',
            }
            next()
        }


    } else if (ctx.query.typename) {
        let { typename } = ctx.query
        let res = await db.find('historyList', { typename });
        if (res != '') {

            ctx.body = {
                res,
                status: 't200',
            }
        
            next()
        } else {
            ctx.body = {
                status: '404',
            }
            next()
        }
    } else if (ctx.query.name) {
        let { name } = ctx.query
        let res = await db.find('historyList', { name });
        
        // res = res[0]
        if (res != '') {

            ctx.body = {
                res,
                status: 'n200',
            }

            next()
        } else {
            ctx.body = {
                status: '404',
            }
            next()
        }
    } else {
        // let res = await db.find('historyList', {});
        let res = await db.findPage('historyList',{pageSize,pageIndex});
        let count = await db.count("historyList",{})
        ctx.body = {
            res,
            count
        }
        next()
        // ctx.body = res;
        // next();
    }

})


module.exports = router;