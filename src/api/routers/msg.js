const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let {No,name,address,Contact,phone,invoke} = ctx.query
    let findNo = await db.find('khMassge',{No})
    if(findNo.length<=0){
        let res = await db.insert("khMassge",{No,name,address,Contact,phone,invoke})
        if(res.acknowledged){
            ctx.body={
                state:200,
                msg:"添加成功"
            }
            next()
        }else{
            ctx.body={
                state:404,
                msg:"出错了"
            }
            next()
        }
    }else{
        ctx.body={
            state:203,
            msg:"编号已存在"
        }
        next()
    }
   
})


module.exports = router;