/**
 * @params type = 1 原料入库
 * @params type = 2 五金入库
 */
const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const ObjectID = require("mongodb").ObjectId
router.get('/', async (ctx, next) => {
    let { tableData, username, time ,operation} = ctx.query
    let data = JSON.parse(tableData)
    if (ctx.query.type == 1) {
        // 这里是产品入库
        console.log("有没有")
        for (let i = 0; i < data.length; i++) {
            let res = await db.find("materialGoods", { name: data[i].name, typeName: data[i].typeName })
            if (res.length > 0) {
                // 如果有这款产品则在这里叠加
                let nums = res[0].num * 1 + data[i].num * 1
                nums.toFixed(2)
                _id = new ObjectID(res[0]._id)
                let arr = await db.update("materialGoods", { _id }, { $set: { num: nums } })
                if (arr.modifiedCount > 0) {
                    // 直接把数据传到历史记录表里
                    let res = await db.insert('materialHistory', { name: data[i].name, typeName: data[i].typeName, num: data[i].num, unit: data[i].unit,address:data[i].address, price: data[i].price, money: data[i].money, remark: data[i].remark, username, time ,operation})
                    if (res.acknowledged) {
                        ctx.body = {
                            state: 200,
                            msg: "入库成功"
                        }
                    } else {
                        ctx.body = {
                            msg: "入库失败"
                        }
                    }
                } else {
                    ctx.body = {
                        msg: "入库失败"
                    }
                }

            } else {
                // 这里是新材料
                console.log("这里是行材料", data[i])
                let res = await db.insert('materialGoods', { name: data[i].name, typeName: data[i].typeName, num: data[i].num, unit: data[i].unit, address: data[i].address, remark: data[i].remark ,compare:0})
                if (res.acknowledged) {
                     // 直接把数据传到历史记录表里
                     let res = await db.insert('materialHistory', { name: data[i].name, typeName: data[i].typeName, num: data[i].num, unit: data[i].unit, price: data[i].price, money: data[i].money, remark: data[i].remark,address:data[i].address, username, time ,operation})
                     console.log("有咩有到", res)
                     if (res.acknowledged) {
                         ctx.body = {
                             state: 200,
                             msg: "入库成功"
                         }
                     } else {
                         ctx.body = {
                             msg: "入库失败"
                         }
                     }
                } else {
                    ctx.body = {
                        msg: "入库失败"
                    }
                }
            }
        }
    } else if (ctx.query.type == 2) {
        for (let i = 0; i < data.length; i++) {
            let res = await db.find("hardwareGoods", { name: data[i].name, typeName: data[i].typeName })
            if (res.length > 0) {
                // 如果有这款产品则在这里叠加
                let nums = res[0].num * 1 + data[i].num * 1
                nums.toFixed(2)
                _id = new ObjectID(res[0]._id)
                let arr = await db.update("hardwareGoods", { _id }, { $set: { num: nums } })
                if (arr.modifiedCount > 0) {
                    // 直接把数据传到历史记录表里
                    let res = await db.insert('hardwareHistory', { name: data[i].name, typeName: data[i].typeName, num: data[i].num, unit: data[i].unit,address:data[i].address, price: data[i].price, money: data[i].money, remark: data[i].remark, username, time ,operation})
                    if (res.acknowledged) {
                        ctx.body = {
                            state: 200,
                            msg: "入库成功"
                        }
                    } else {
                        ctx.body = {
                            msg: "入库失败"
                        }
                    }
                } else {
                    ctx.body = {
                        msg: "入库失败"
                    }
                }

            } else {
                // 这里是新材料
                console.log("这里是行材料", data[i])
                let res = await db.insert('hardwareGoods', { name: data[i].name, typeName: data[i].typeName, num: data[i].num, unit: data[i].unit, address: data[i].address, remark: data[i].remark ,compare:0})
                if (res.acknowledged) {
                     // 直接把数据传到历史记录表里
                     let res = await db.insert('hardwareHistory', { name: data[i].name, typeName: data[i].typeName, num: data[i].num, unit: data[i].unit, price: data[i].price, money: data[i].money, remark: data[i].remark,address:data[i].address, username, time ,operation})
                     console.log("有咩有到", res)
                     if (res.acknowledged) {
                         ctx.body = {
                             state: 200,
                             msg: "入库成功"
                         }
                     } else {
                         ctx.body = {
                             msg: "入库失败"
                         }
                     }
                } else {
                    ctx.body = {
                        msg: "入库失败"
                    }
                }
            }
        }
        
    }
})



module.exports = router

