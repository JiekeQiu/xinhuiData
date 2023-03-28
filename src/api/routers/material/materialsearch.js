/**
 * 原料历史记录搜索
 * @params type=2 原料库存查询
 * @params type=3 原料出库历史记录查询
 * @params type=4 五金库存查询
 * @params type=5 五金入库历史记录查询
 * @params type=6 五金出库历史记录查询
 * 
 * 
 */
const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId
router.get('/', async (ctx, next) => {
    let { name, typeName, username, start, end } = ctx.query
    // console.log("前端传过来",ctx.query)
    let params = {
        name,
        typeName,
        username,
        start,
        end
    }
    let obj = {}
    // 过滤前端传来的空字符
    for (let key in params) {
        if (params[key] == '') {
            delete params[key]

        } else if (params[key] == undefined) {
            delete params[key]
        }
    }
    console.log("过滤空", params)
    for (let o in params) {
        if (o == "start") {
            obj.time = { '$gte': start, '$lte': end }

        } else {
            // obj = params
            let seach = params[o].replaceAll('*',"\\*")
            let search = seach.replaceAll('/','\\/') 
            console.log("看看2o", search)
            obj[o] = { $regex: search }
        }
    }
    if (end) {
        delete obj.end
    }
    if (ctx.query.type == 2) {
        let res = await db.find("materialGoods", obj)
        console.log("查询结果2", obj)
        if (res.length > 0) {
            ctx.body = {
                state: 200,
                res,
                msg: "查询成功"
            }
        } else {
            ctx.body = {
                msg: "没有查到" + name + typeName
            }
        }
    } else if (ctx.query.type == 3) {
        let res = await db.find("deliveryHistory", obj)

        if (res.length > 0) {
            ctx.body = {
                state: 200,
                res,
                msg: "查询成功"
            }
        } else {
            ctx.body = {
                msg: "没有查到内容"
            }
        }
    } else if (ctx.query.type == 4) {
        console.log(obj)
        let res = await db.find("hardwareGoods", obj)
        console.log("查询结果1", res)
        if (res.length > 0) {
            ctx.body = {
                state: 200,
                res,
                msg: "查询成功"
            }
        } else {
            ctx.body = {
                msg: "没有查到" + name + typeName
            }
        }
    } else if(ctx.query.type == 5){
        let res = await db.find("hardwareHistory", obj)
        if (res.length > 0) {
            ctx.body = {
                state: 200,
                res,
                msg: "查询成功"
            }
        } else {
            ctx.body = {
                msg: "没有查到内容"
            }
        }
    } else if (ctx.query.type == 6) {
        let res = await db.find("hardwaredelivery", obj)

        if (res.length > 0) {
            ctx.body = {
                state: 200,
                res,
                msg: "查询成功"
            }
        } else {
            ctx.body = {
                msg: "没有查到内容"
            }
        }
    }else {
        let res = await db.find("materialHistory", obj)
        if (res.length > 0) {
            ctx.body = {
                state: 200,
                res,
                msg: "查询成功"
            }
        } else {
            ctx.body = {
                msg: "没有查到内容"
            }
        }
    }
    // console.log("前端传过来",params)
    // if (name) {
    //     if (typeName) {
    //         let res
    //         if (ctx.query.type == 2) {
    //             res = await db.find("materialGoods", { name: { $regex: name }, typeName: { $regex: typeName } })
    //         } else if (ctx.query.type == 3) {
    //             res = await db.find("deliveryHistory", { name: { $regex: name }, typeName: { $regex: typeName } })
    //         } else {
    //             res = await db.find("materialHistory", { name: { $regex: name }, typeName: { $regex: typeName } })
    //         }

    //         if (res.length > 0) {
    //             ctx.body = {
    //                 state: 200,
    //                 res,
    //                 msg: "查询成功"
    //             }
    //         } else {
    //             ctx.body = {
    //                 msg: "没有查到" + name + typeName
    //             }
    //         }
    //     } else {
    //         let res
    //         if (ctx.query.type == 2) {
    //             res = await db.find("materialGoods", { name: { $regex: name } })
    //         } else if (ctx.query.type == 3) {
    //             res = await db.find("deliveryHistory", { name: { $regex: name } })
    //         } else {
    //             res = await db.find("materialHistory", { name: { $regex: name } })
    //         }

    //         if (res.length > 0) {
    //             ctx.body = {
    //                 state: 200,
    //                 res,
    //                 msg: "查询成功"
    //             }
    //         } else {
    //             ctx.body = {
    //                 msg: "没有查到" + name + typeName
    //             }
    //         }
    //     }
    // } else if (typeName) {
    //     let res
    //     if (ctx.query.type == 2) {
    //         res = await db.find("materialGoods", { typeName: { $regex: typeName } })
    //     }
    //     else if (ctx.query.type == 3) {
    //         res = await db.find("deliveryHistory", { typeName: { $regex: typeName } })
    //     } else {
    //         res = await db.find("materialHistory", { typeName: { $regex: typeName } })
    //     }

    //     if (res.length > 0) {
    //         ctx.body = {
    //             state: 200,
    //             res,
    //             msg: "查询成功"
    //         }
    //     } else {
    //         ctx.body = {
    //             msg: "没有查到" + name + typeName
    //         }
    //     }
    // }
})



module.exports = router

