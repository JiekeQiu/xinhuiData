/**
 * 原料历史记录修改逻辑
 * @params type==2 修改五金出库
 * 1. 拿到name和typeName先调用deletematerial删除接口进行数量删减
 * 2. 删减成功后，调用入库接口materialaddgood
 * 3. 如果成功的话就更新历史记录
 * 
 * 需要做一个封装，因为五金仓库的修改逻辑是一样的
 * 
 */
const Router = require("koa-router");
const db = require("../../../db/database")
const router = new Router();
const axios = require("axios");

const ObjectID = require("mongodb").ObjectId
router.get('/', async (ctx, next) => {
    let { name, typeName, num, _id, price, money, username, unit, time, operation, remark, address } = ctx.query
    _id = new ObjectID(_id)
    // 查到原料仓库对应的数据
    // let ylRes = await db.find("hardwareHistory", { _id: _id })
    let ylRes
    if(ctx.query.type == 2){
        ylRes = await db.find("hardwaredelivery", { _id: _id })
    }else{
        ylRes = await db.find("hardwareHistory", { _id: _id })
    }
    let param
    if (ctx.query.type == 2) {
        param = {
            name: ylRes[0].name,
            typeName: ylRes[0].typeName,
            num: ylRes[0].num,
            type: 2
        }
    } else {
        param = {
            name: ylRes[0].name,
            typeName: ylRes[0].typeName,
            num: ylRes[0].num
        }
    }


    let deleteData = await axios.get("http://localhost:18883/deletehardware", { params: param }).then(res => {
        if (res.status == 200) {
            return true
        }
    })

    if (deleteData) {
        let data = await db.find("hardwareGoods", { name, typeName })
        console.log('看到',data)
        if (data.length > 0) {
            // 说明仓库有材料
            // let nums = data[0].num * 1 + num * 1
            let nums
            if (ctx.query.type == 2) {
                nums = data[0].num * 1 - num * 1
            } else {
                nums = data[0].num * 1 + num * 1
            }

            let res = await db.update("hardwareGoods", { _id: data[0]._id }, { $set: { num: nums } })
            if (res.modifiedCount > 0) {
                // let historyRes = await db.update("hardwareHistory", { _id }, { $set: { name, typeName, num, price, money, username, address, remark } })
                let historyRes
                if (ctx.query.type == 2) {
                    historyRes = await db.update("hardwaredelivery", { _id }, { $set: { name, typeName, num, price, money, username, address, remark } })
                } else {
                    historyRes = await db.update("hardwareHistory", { _id }, { $set: { name, typeName, num, price, money, username, address, remark } })
                }
                if (historyRes.modifiedCount > 0) {
                    ctx.body = {
                        state: 200,
                        msg: "修改成功"
                    }

                } else {
                    ctx.body = {
                        msg: "库存已修改，历史记录修改失败，请联系管理员！"
                    }
                }
            } else {
                ctx.body = {
                    msg: "库存没有更改成功，请核对！"
                }
            }
        } else {
            // 说明是新材料
            if (ctx.query.type == 2) {
                ctx.body={
                    msg:"修改失败，没有找到该材料"
                }
            } else {
                let res = await db.insert("hardwareGoods", { name, typeName, num, unit, address, remark })
                if (res.insertedId) {
                    console.log(res.insertedId)
                    let updateRes = await db.update("hardwareHistory", { _id }, { $set: { name, typeName, num, price, money, username, unit, time, operation, remark, address, compare: 0 } })
                    if (updateRes.modifiedCount > 0) {
                        ctx.body = {
                            state: 200,
                            msg: "修改成功"
                        }
                    } else {
                        ctx.body = {
                            msg: "库存已修改，历史记录更新失败，请联系管理员！"
                        }
                    }

                } else {
                    ctx.body = {
                        msg: "没有成功加入库存，请联系管理员"
                    }
                }
            }

        }

    }
})



module.exports = router

