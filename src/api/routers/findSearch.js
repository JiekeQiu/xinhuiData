const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let { name, typename, time, time1, operating } = ctx.query
    console.log(ctx.query)
    let seach = typename.replaceAll('*',"\\*")
    let seacName = name.replaceAll('/',"\\/")
    //如果不行就删掉
    let seachTypeName = seach.replaceAll('+',"\\d+\\.?(\\d+)")
    //判断传过来的是什么
    if (name) {
        // console.log("输入了", name)
        if (typename) {
            // console.log("输入了name和typename")
            if (time) {
                // console.log("输入了name和typename和time")
                if (operating) {
                    // console.log("输入了name和typename和time和operating")
                    let res = await db.find('historyList',{name:{$regex:seacName},typename:{$regex:seachTypeName},operating,time:{'$gte':time,'$lte':time1}})
                    console.log('看看',res)
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }else{
                    // console.log("输入了name和typename和time没operating")
                    let res = await db.find('historyList',{name:{$regex:seacName},typename:{$regex:seachTypeName},time:{'$gte':time,'$lte':time1}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }
            } else {
                // console.log("输入了name和typename没time")
                if (operating) {
                    // console.log("输入了name和typename和operating没time")
                    let res = await db.find('historyList',{name:{$regex:seacName},typename:{$regex:seachTypeName},operating})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }else{
                    // console.log("输入了name和typename没time没operating")
                    let res = await db.find('historyList',{name:{$regex:seacName},typename:{$regex:seachTypeName}}) 
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }
            }

        } else {
            // console.log("输入了name没typename")
            if (time) {
                // console.log("输入了name和time没typename")
                if (operating) {
                    // console.log("输入了name和time和operating没typename")
                    let res = await db.find('historyList',{name:{$regex:seacName},operating,time:{'$gte':time,'$lte':time1}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                    
                }else{
                    // console.log("输入了name和time没operating没typename")
                    let res = await db.find('historyList',{name:{$regex:seacName},time:{'$gte':time,'$lte':time1}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }
            } else {
                // console.log("输入了name没typename没time")
                if(operating){
                    // console.log("输入了name和operating没typename没time")
                    let res = await db.find('historyList',{name:{$regex:seacName},operating})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }else{
                    // console.log("输入了name没typename没time没operating")
                    let res = await db.find('historyList',{name:{$regex:seacName}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }
            }
        }


    } else {
        // console.log("没输入型号")
        if (typename) {
            // console.log("没输入name输入了typename")
            if (time) {
                // console.log("没输入name输入了typename和time")
                if(operating){
                    // console.log("没输入name输入了typename和time和operating")
                    let res = await db.find('historyList',{typename:{$regex:seachTypeName},operating,time:{'$gte':time,'$lte':time1}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }else{
                    // console.log("没输入name和operating输入了typename和time")
                    let res = await db.find('historyList',{typename:{$regex:seachTypeName},time:{'$gte':time,'$lte':time1}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }
            } else {
                // console.log("输入了typename没time没name")
                if(operating){
                    // console.log("输入了typename和operating没time没name")
                    let res = await db.find('historyList',{typename:{$regex:seachTypeName},operating})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }else{
                    // console.log("输入了typename没time没name没operating")
                    let res = await db.find('historyList',{typename:{$regex:seachTypeName}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }
            }

        } else {
            // console.log("没输入name和typename")
            if (time) {
                // console.log("没输入name和typename输入了time")
                if(operating){
                    // console.log("没输入name和typename输入了time和operating")
                    let res = await db.find('historyList',{operating,time:{'$gte':time,'$lte':time1}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }else{
                    // console.log("没输入name和typename和operating输入了time")
                    let res = await db.find('historyList',{time:{'$gte':time,'$lte':time1}})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }
            } else {
                // console.log("没typename没time没name")
                if(operating){
                    // console.log("没typename没time没name输入了operating")
                    let res = await db.find('historyList',{operating})
                    ctx.body={
                        status:200,
                        res:res
                    }
                    next()
                }
            }
        }

    }

    // if(name||typename||time||operating){
    //     console.log('有名字')
    //     let res = await db.find('historyList',{operating,name,typename})
    //     // 查找某个时间段的所产品
    //     let date = await db.find('historyList',{ "time" : { "$gte" :time, "$lt" : time1 } })

    //     console.log(date)
    //     ctx.body = {
    //         status:200
    //     }
    //     next()
    // }else{
    //     console.log(888)
    // }

})


module.exports = router;