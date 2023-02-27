// 客户总金额汇总
const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let { username, timeStart, timeEnd } = ctx.query

    if (username) {
        if (timeStart && timeEnd) {
            // 这里是查询前端时间范围内的所有结果
            let res = await db.find("delivery", { name: username, date: { '$gte': timeStart, '$lte': timeEnd } })
            // 把每个月的内容都放在数组list里
            // console.log('时间范围内的数据',res)
            let len = res.length
            if (len != 0) {
                let result = {};
                res.forEach((item) => {
                    let num = 0;
                    let money = Number(item.AllMoney).toFixed(2);
                    let date = item.date.substring(0, 7);
                    let tableData = JSON.parse(item.tableData);
                    tableData.forEach((dataItem) => {
                        if (dataItem.unit === '只') {
                            num += Number(dataItem.num) / 2;
                        } else {
                            num += Number(dataItem.num);
                        }
                        
                    })
                    if (result[date]) {
                        result[date].num = (result[date].num*1 + num*1).toFixed(0);
                        result[date].money = (result[date].money * 1 + money * 1).toFixed(2);
                    } else {
                        result[date] = {
                            name: username,
                            date: date,
                            num: num,
                            money: money,
                        }
                    }
                })
                let arr = Object.values(result);
                ctx.body = {
                    state: 200,
                    res: arr
                }
                next()
            } else {
                //没有查到内容 
                ctx.body = {
                    state: 404,
                    msg: timeStart + '至' + timeEnd + "时间段内没有订单"
                }



            }

        } else {
            // 这里是根据客户信息查询
            let res = await db.find('delivery', { name: username })
            let len = res.length
            if (len != 0) {
                let result = {};
                res.forEach((item) => {
                    let num = 0;
                    let money = Number(item.AllMoney).toFixed(2);
                    let date = item.date.substring(0, 7);
                    let tableData = JSON.parse(item.tableData);
                    tableData.forEach((dataItem) => {
                        if (dataItem.unit === '只') {
                            num += Number(dataItem.num) / 2;
                        } else {
                            num += Number(dataItem.num);
                        }
                    })
                    if (result[date]) {
                        result[date].num = result[date].num + num;
                        result[date].money = (result[date].money * 1 + money * 1).toFixed(2);
                    } else {
                        result[date] = {
                            name: username,
                            date: date,
                            num: num,
                            money: money,
                        }
                    }
                })
                let arr = Object.values(result);
                ctx.body = {
                    state: 200,
                    res: arr
                }
                next()
            } else {
                //没有查到内容 
                ctx.body = {
                    state: 404,
                    msg: "没有找到" + username + "的订单"
                }
            }

        }
    } else if (timeStart && timeEnd) {
        // 这里为输入时间范围查找全部信息
        let res = await db.find("delivery", { date: { '$gte': timeStart, '$lte': timeEnd } })
        // 把每个月的内容都放在数组list里
        // console.log('时间范围内的数据',res)
        let len = res.length
        if (len != 0) {
            let result = {};
            res.forEach((item) => {
                let num = 0;
                let money = Number(item.AllMoney).toFixed(2);
                let date = item.date.substring(0, 7);
                let tableData = JSON.parse(item.tableData);
                let name = item.name
                tableData.forEach((dataItem) => {
                    if (dataItem.unit === '只') {
                        num += Number(dataItem.num) / 2;
                    } else {
                        num += Number(dataItem.num);
                    }
                })
                // console.log("")
                if (result[name]) {
                    result[name].num = result[name].num + num;
                    result[name].money = (result[name].money * 1 + money * 1).toFixed(2);
                } else {
                    result[name] = {
                        name: name,
                        date: date,
                        num: num,
                        money: money,
                    }
                }
            })
            let arr = Object.values(result);
            ctx.body = {
                state: 200,
                res: arr
            }
            next()
        } else {
            //没有查到内容 
            ctx.body = {
                state: 404,
                msg: timeStart + '至' + timeEnd + "时间段内没有订单"
            }
        }

    }


    // console.log("总金额", res)
    //         if (res.length != 0) {
    //             let money = 0
    //             let num = 0
    //             let arr = []
    //             let obj = {}
    //             res.forEach(item => {
    //                 let data = JSON.parse(item.tableData)
    //                 data.forEach(item => {
    //                     console.log("看看", item.unit)
    //                     let nums = 0
    //                     if (item.unit == "只") {
    //                         nums = item.num / 2
    //                     } else {
    //                         nums = item.num
    //                     }
    //                     num += nums * 1

    //                 })
    //                 money += item.AllMoney * 1
    //             });
    //             let sjnum = num.toFixed(2)
    //             let sjmoney = money.toFixed(2)
    //             obj.username = username
    //             obj.num = sjnum
    //             obj.money = sjmoney


    //             arr.push(obj)
    //             ctx.body = {
    //                 state: 200,
    //                 res: arr
    //             }
    //         } else {
    //             ctx.body = {
    //                 state: 404,
    //                 msg: "没有找到该订单"
    //             }
    //             next()
    //         }
    //     } else {
    //         let res = await db.find("delivery", { name: username })
    //         if (res.length != 0) {
    //             let money = 0
    //             let num = 0
    //             let arr = []
    //             let obj = {}
    //             res.forEach(item => {
    //                 let data = JSON.parse(item.tableData)
    //                 data.forEach(item => {
    //                     console.log("看看", item.unit)
    //                     let nums = 0
    //                     if (item.unit == "只") {
    //                         nums = item.num / 2
    //                     } else {
    //                         nums = item.num
    //                     }
    //                     num += nums * 1

    //                 })
    //                 money += item.AllMoney * 1
    //             });
    //             let sjnum = num.toFixed(2)
    //             let sjmoney = money.toFixed(2)
    //             obj.username = username
    //             obj.num = sjnum
    //             obj.money = sjmoney


    //             arr.push(obj)
    //             ctx.body = {
    //                 state: 200,
    //                 res: arr
    //             }
    //         } else {
    //             ctx.body = {
    //                 state: 404,
    //                 msg: "没有找到该订单"
    //             }
    //             next()
    //         }
    //     }
    // } else if (timeStart && timeEnd) {
    //     let res = await db.find("delivery", { date: { '$gte': timeStart, '$lte': timeEnd } })
    //     let start = timeStart.substring(0, 10)
    //     let end = timeEnd.substring(0, 10)
    //     if (res.length != 0) {
    //         let arr = res
    //         var arr1 = [];
    //         var k = true;
    //         for (var i in arr) {
    //             k = true;
    //             var tableData = eval('(' + arr[i].tableData + ')');
    //             if (arr1.length > 0) {
    //                 for (var t in arr1) {
    //                     if (arr1[t].name == arr[i].name) {
    //                         arr1[t].list.push.apply(arr1[t].list, tableData)
    //                         k = false;
    //                     }
    //                     if (k && arr1.length - 1 == t) {
    //                         arr1.push({ name: arr[i].name, list: tableData });
    //                     }
    //                 }
    //             } else {
    //                 arr1.push({ name: arr[i].name, list: tableData });
    //             }
    //         }
    //         let resArr = []
    //         for (var i in arr1) {
    //             var numTxt = 0;
    //             let money = 0
    //             let arrs = []
    //             for (var m in arr1[i].list) {
    //                 let num = 0
    //                 console.log("看看这是",arr1[i].list[m].All)
    //                 arrs.push(arr1[i].list[m].All)



    //                 // money = money+arr1[i].list[m].All*1
    //                 if (arr1[i].list[m].unit == "只") {
    //                     num = arr1[i].list[m].num / 2;
    //                     numTxt = numTxt + num
    //                 } else {
    //                     numTxt = numTxt + arr1[i].list[m].num * 1;
    //                 }


    //             }
    //             function countSum(arr) {
    //                 if (!arr.length) return 0;
    //                 arr = arr.map((v) => {
    //                     if (v && !Number.isNaN(Number(v))) return Math.round(v * 100);
    //                     return 0;
    //                 });
    //                 const result = arr.reduce((prev, curr) => {
    //                     return prev + curr
    //                 }, 0);
    //                 return result / 100;

    //             }
    //             if (start == end) {
    //                 resArr.push({
    //                     username: arr1[i].name,
    //                     money: countSum(arrs),
    //                     num: numTxt,
    //                     time: end
    //                 })
    //             } else {

    //                 resArr.push({
    //                     username: arr1[i].name,
    //                     money: countSum(arrs),
    //                     num: numTxt,
    //                     time: start+'至'+end
    //                 })
    //             }
    //             //    resArr.push({
    //             //        username:arr1[i].name,
    //             //        money:countSum(arrs),
    //             //        num:numTxt
    //             //    })
    //         }
    //         // console.log("这是什么",resArr)






    //         ctx.body = {
    //             state: 200,
    //             res: resArr
    //         }


    //     } else {
    //         ctx.body = {
    //             state: 404,
    //             msg: "该时间范围内没有订单"
    //         }
    //     }
    // }

    // function countSum(arr) {
    //     if (!arr.length) return 0;
    //     arr = arr.map((v) => {
    //         if (v && !Number.isNaN(Number(v))) return Math.round(v * 100);
    //         return 0;
    //     });
    //     const result = arr.reduce((prev, curr) => {
    //         return prev + curr
    //     }, 0);
    //     return result / 100;

    // }

})


module.exports = router;


