/**
 * 原料历史记录搜索
 * @params type=2 库存查询
 * @params type=3 出库查询
 */
const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId
router.get('/', async (ctx, next) => {
    let { name, typeName } = ctx.query
    if (name) {
        if (typeName) {
            let res
            if (ctx.query.type == 2) {
                res = await db.find("materialGoods", { name: { $regex: name }, typeName: { $regex: typeName } })
            } else if (ctx.query.type == 3) {
                res = await db.find("deliveryHistory", { name: { $regex: name }, typeName: { $regex: typeName } })
            } else {
                res = await db.find("materialHistory", { name: { $regex: name }, typeName: { $regex: typeName } })
            }

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
        } else {
            let res
            if (ctx.query.type == 2) {
                res = await db.find("materialGoods", { name: { $regex: name } })
            } else if (ctx.query.type == 3) {
                res = await db.find("deliveryHistory", { name: { $regex: name } })
            } else {
                res = await db.find("materialHistory", { name: { $regex: name } })
            }

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
        }
    } else if (typeName) {
        let res
        if (ctx.query.type == 2) {
            res = await db.find("materialGoods", { typeName: { $regex: typeName } })
        }
        else if (ctx.query.type == 3) {
            res = await db.find("deliveryHistory", { typeName: { $regex: typeName } })
        } else {
            res = await db.find("materialHistory", { typeName: { $regex: typeName } })
        }

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
    }
})



module.exports = router

