const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    
    let {name,typename} = ctx.query
    let seachtype = typename.replaceAll('.',"\\.")
    let seach = seachtype.replaceAll('*',"\\*(.+\\*)?")
    let seacName = name.replaceAll('/',"\\/")
    //如果不行就删掉
    // let seachTypeName = '\/(.+\\*)?'+seach+'(.+\\*)?\/'
    let seachTypeName = new RegExp('(.+\\*)?'+seach+'(.+\\*)?')
    if (name) {
        if (typename) {
            // 这里为精确查找
            let res = await db.find('goods',{name:{$regex:seacName},typename:{$regex:seachTypeName}})
            let arr = await db.find('basics',{name:{$regex:seacName},typename:{$regex:seachTypeName}})
            if(res.length>0||arr.length!=0){
                ctx.body={
                    status:200,
                    res,
                    arr
                }
                next()

            }else{
                ctx.body={
                    status:404,
                    msg:"没有找到该产品"
                }
            }
        } else {
            // 这里为型号查找 
            let arr = await db.find('basics',{name:{$regex:seacName}})
            let res = await db.find('goods',{name:{$regex:seacName}})
            if(res.length>0||arr.length!=0){
                ctx.body={
                    status:200,
                    res,
                    arr
                }
                next()

            }else{
                ctx.body={
                    status:404,
                    msg:"没有找到该产品"
                }
            }
           
        }
    } else {
        if (typename) {
            // 这里为规格查找
            let res = await db.find('goods',{typename:{$regex:seachTypeName}})
            let arr = await db.find('basics',{typename:{$regex:seachTypeName}})
            if(res.length>0||arr.length!=0){
                ctx.body={
                    status:200,
                    res,
                    arr
                }
                next()

            }else{
                ctx.body={
                    status:404,
                    msg:"没有找到该产品"
                }
            }
            
        }
    }
})

module.exports = router;