
// 基础信息维护添加
const Router = require("koa-router");
const db = require("../../db/database")
const router = new Router();

router.get('/', async (ctx, next) => {
    let { name, typename, xxnum ,pageSize,pageIndex} = ctx.query
    
    if (name && typename) {
        let data = await db.find('basics', { name, typename })
        console.log(data.length)
        if (data.length>0) {
            console.log(222)
            let res = await db.update('basics', { name, typename }, { $set: { xxnum } })
            ctx.body = {
                status: 200,
                res: res
            }
            next()
        } else if (data.length==0) {
            console.log(333)

            let res = await db.insert('basics', { name, typename, xxnum })
            ctx.body = {
                atatus: 200
            }
            next()
        }
    }else if(ctx.query.k){
        // 入库明细里新增的，插入到基础信息表里
        let res = await db.insert('basics', { name, typename, xxnum:'0' })
        ctx.body = {
            status:200
        }
        next()
    } else {
        console.log(444)
        
        let res = await db.findPage('basics', {pageSize,pageIndex});
        let count = await db.count("basics",{})

        ctx.body ={
            res,
            count
        }
        next()
    }
    // if (name && typename && xxnum==0) {
    // let res = await db.insert('basics', { name, typename, xxnum })
    // ctx.body = {
    //     atatus: 200
    // }
    // next()
    // }else if(xxnum>0){
    // let res = await db.update('basics',{ name, typename},{$set:{xxnum}})
    // ctx.body={
    //     status:200,
    //     res:res
    // }
    // }else {
    //     let res = await db.find('basics', {});
    //     ctx.body = res
    //     next()
    // }
})



module.exports = router

