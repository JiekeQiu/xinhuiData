const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
   let {status,timeStart,timeEnd,name,No} =ctx.query
   if(status){
        if(timeStart&&timeEnd){
            if(name){
                if(No){
                    // console.log("传入状态和时间、名字、单号")
                    console.log("精确查找")
                    let res = await db.find("delivery",{status,name,No,date:{'$gte':timeStart,'$lte':timeEnd}})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }else{
                    // console.log("传入状态和时间、名字、没单号")
                    console.log("根据状态、时间、名字查找")
                    let res = await db.find("delivery",{status,name,date:{'$gte':timeStart,'$lte':timeEnd}})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }

            }else{
                if(No){
                    // console.log("传入状态和时间没有名字、有单号")
                    console.log("根据状态、时间、有单号查找")
                    let res = await db.find("delivery",{status,No,date:{'$gte':timeStart,'$lte':timeEnd}})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }else{
                    // console.log("传入状态和时间没有名字、没有单号")
                    console.log("根据状态、时间查找")
                    let res = await db.find("delivery",{status,date:{'$gte':timeStart,'$lte':timeEnd}})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }
            }
        }else{
            if(name){
                if(No){
                    // console.log("传入状态没有时间有名字、有单号")
                    console.log("根据状态、名字、有单号查找")
                    let res = await db.find("delivery",{status,name,No})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }

                }else{
                    // console.log("传入状态没有时间有名字、没单号")
                    console.log("根据状态、名字查找")
                    let res = await db.find("delivery",{status,name})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }
            }else{
                if(No){
                    // console.log("传入状态没有时间没有名字、有单号")
                    console.log("根据状态、单号查找")
                    let res = await db.find("delivery",{status,No})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }else{
                    // console.log("传入状态没有时间没有名字、没有单号")
                    console.log("根据状态查找")
                    let res = await db.find("delivery",{status})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }
            }

        }
   }else{
        if(timeStart&&timeEnd){
            if(name){
                if(No){
                    // console.log("没状态有时间、有名字、有单号")
                    console.log("根据时间、名字、有单号查找")
                    let res = await db.find("delivery",{name,No,date:{'$gte':timeStart,'$lte':timeEnd}})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }else{
                    // console.log("没状态有时间、有名字、没单号")
                    console.log("根据时间、名字查找")
                    let res = await db.find("delivery",{name,date:{'$gte':timeStart,'$lte':timeEnd}})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }
            }else{
                
                if(No){
                    // console.log("没状态有时间、没名字、有单号")
                    console.log("根据时间、单号查找")
                    let res = await db.find("delivery",{No,date:{'$gte':timeStart,'$lte':timeEnd}})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }else{
                    // console.log("没状态有时间、没名字、没单号")
                    console.log("根据时间查找")
                    let res = await db.find("delivery",{date:{'$gte':timeStart,'$lte':timeEnd}})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }
            }

        }else{
            if(name){
                
                if(No){
                    // console.log("没状态没有时间、有名字、有单号")
                    console.log("根据名字、单号查找")
                    let res = await db.find("delivery",{No,name})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }else{
                    console.log("根据名字查找")
                    let res = await db.find("delivery",{name})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                }
            }else{
                if(No){
                    // console.log("没状态没有时间、有名字、有单号")
                    console.log("根据单号查找")
                    let res = await db.find("delivery",{No})
                    if(res.length!=0){
                        ctx.body={
                            status:200,
                            res
                        }
                        next()
                    }else{
                        ctx.body={
                            status:203,
                            msg:"没有查询到该订单"
                        }
                        next()
                        
                    }
                   
                }
            }
        }

   }
   
})


module.exports = router;