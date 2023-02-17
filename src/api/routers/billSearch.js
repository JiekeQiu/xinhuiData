/**
 * 客户名称查询
 */
const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let {info} = ctx.query
    if(info=="1"){
        let res = await db.find("khMassge",{})
        let arr=[]
        for(let i=0;i<res.length;i++){
            let obj = {}
            obj.value = res[i].name
            arr.push(obj)
        }
        // console.log(arr)   
        ctx.body = {
            state:200,
            arr
        }  
        next()   
    }else if(info=="2"){
        let res = await db.find("goods",{})
        let arr =[]
        for(let i=0;i<res.length;i++){
            let obj ={}
            obj.name = res[i].name
            obj.typename = res[i].typename
            arr.push(obj)
        }
        ctx.body = {
            state:200,
            arr
        }  
        next()  
    }

    
   
})


module.exports = router;