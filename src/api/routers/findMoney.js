/**
 * 客户订单金额查询
 */
const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let { username, No, timeStart, timeEnd } = ctx.query
    if (username) {
        if (No) {
            if (timeStart && timeEnd) {
                // 什么都有
                let res = await db.find("delivery", { name: username, No: No, date: { '$gte': timeStart, '$lte': timeEnd } })
                if (res.length != 0) {
                    let resObj = {}
                    let arr = []
                    resObj.name = res[0].name
                    resObj.No = res[0].No
                    resObj.address = res[0].address
                    resObj.phone = res[0].phone
                    resObj.time = res[0].date
                    resObj.AllMoney = res[0].AllMoney
                    arr.push(resObj)
                    ctx.body = {
                        state: 200,
                        arr,
                    }
                    next()
                } else {
                    ctx.body = {
                        state: 404,
                        msg: "没有找到该订单"
                    }
                }
            } else {
                let res = await db.find("delivery", { name: username, No: No })
                if (res.length != 0) {
                    let resObj = {}
                    let arr = []
                    resObj.name = res[0].name
                    resObj.No = res[0].No
                    resObj.address = res[0].address
                    resObj.phone = res[0].phone
                    resObj.time = res[0].date
                    resObj.AllMoney = res[0].AllMoney
                    arr.push(resObj)
                    ctx.body = {
                        state: 200,
                        arr,
                    }
                    next()
                } else {
                    ctx.body = {
                        state: 404,
                        msg: "没有找到该订单"
                    }
                }
            }
        } else {
            if (timeStart && timeEnd) {
                let res = await db.find("delivery", { name: username, date: { '$gte': timeStart, '$lte': timeEnd } })
                if (res.length != 0) {
                    let arr = []
                    res.forEach(item => {
                        let resObj = {}
                        resObj.name = item.name
                        resObj.No = item.No
                        resObj.address = item.address
                        resObj.phone = item.phone
                        resObj.time = item.date
                        resObj.AllMoney = item.AllMoney
                        arr.push(resObj)
                    });
                    ctx.body = {
                        state: 200,
                        arr,
                    }
                    next()
                } else {
                    ctx.body = {
                        state: 404,
                        msg: "没有找到该订单"
                    }
                }
            } else {
                let res = await db.find("delivery", { name: username })
                // console.log("看看",res)
                if (res.length != 0) {

                    let arr = []
                    for (let i = 0; i < res.length; i++) {
                        let resObj = {}
                        resObj.name = res[i].name
                        resObj.No = res[i].No
                        resObj.address = res[i].address
                        resObj.phone = res[i].phone
                        resObj.time = res[i].date
                        resObj.AllMoney = res[i].AllMoney
                        // console.log("家居服基督教",resObj)
                        arr.push(resObj)
                    };
                    console.log("蝴蝶结爱接电话", arr)
                    ctx.body = {
                        state: 200,
                        arr,
                    }
                    next()
                } else {
                    ctx.body = {
                        state: 404,
                        msg: "没有找到该订单"
                    }
                }
            }
        }
    } else {
        if (No) {
            if (timeStart && timeEnd) {
                let res = await db.find("delivery", { No: No, date: { '$gte': timeStart, '$lte': timeEnd } })
                if (res.length != 0) {
                    let resObj = {}
                    let arr = []
                    resObj.name = res[0].name
                    resObj.No = res[0].No
                    resObj.address = res[0].address
                    resObj.phone = res[0].phone
                    resObj.time = res[0].date
                    resObj.AllMoney = res[0].AllMoney
                    arr.push(resObj)
                    ctx.body = {
                        state: 200,
                        arr,
                    }
                    next()
                } else {
                    ctx.body = {
                        state: 404,
                        msg: "没有找到该订单"
                    }
                }
            } else {
                let res = await db.find("delivery", { No: No })
                if (res.length != 0) {
                    let resObj = {}
                    let arr = []
                    resObj.name = res[0].name
                    resObj.No = res[0].No
                    resObj.address = res[0].address
                    resObj.phone = res[0].phone
                    resObj.time = res[0].date
                    resObj.AllMoney = res[0].AllMoney
                    arr.push(resObj)
                    ctx.body = {
                        state: 200,
                        arr,
                    }
                    next()
                } else {
                    ctx.body = {
                        state: 404,
                        msg: "没有找到该订单"
                    }
                }
            }
        } else {
            if (timeStart && timeEnd) {
                let res = await db.find("delivery", { date: { '$gte': timeStart, '$lte': timeEnd } })
                if (res.length != 0) {
                    let arr = []
                    res.forEach(item => {
                        let resObj = {}
                        resObj.name = item.name
                        resObj.No = item.No
                        resObj.address = item.address
                        resObj.phone = item.phone
                        resObj.time = item.date
                        resObj.AllMoney = item.AllMoney
                        arr.push(resObj)
                    });
                    ctx.body = {
                        state: 200,
                        arr,
                    }
                    next()
                } else {
                    ctx.body = {
                        state: 404,
                        msg: "没有找到该订单"
                    }
                }
            }
        }
    }
})


module.exports = router;