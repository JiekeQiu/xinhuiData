const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {

    let { No,
        name,
        bianhao,
        address,
        lister,
        phone,
        date,
        status,
        contact,
        AllMoney,
        states,
        tableData, } = ctx.query
        let data = JSON.parse(tableData)
        // console.log('这是什么',data)
        if(states){
            // 修改
                let res = await db.update("delivery",{No},{ $set: {name, address, phone, lister, tableData, date, status, AllMoney,bianhao,contact}})
                if(res.modifiedCount=="1"){
                    ctx.body = {
                        state: 202
                    }
                    next()
                }else{
                    ctx.body = {
                        state: 404,
                        msg:"没有修改内容或者没有找到该订单号"
                    }
                }
        }else{
            // 保存
            let res = await db.insert('delivery', { No, name, address, phone, lister, tableData, date, status, AllMoney,bianhao,contact})
           if(res.acknowledged){
               ctx.body = {
                   state: 200,
                   msg:"200,出库成功"
               }
               next()
           }else{
            ctx.body = {
                state: 404,
                msg:"404，出库失败"
            }
            next()
           }
            
        }
        

})


module.exports = router;