const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let { time, num, numL, numR, name, typename,address, operating} = ctx.query;
    console.log(num)
    //拿到历史表中修改前time所对应的数据
    let date = await db.find('historyList', { time })
    let historyName = date[0].name;
    let historTypename = date[0].typename
    console.log(historyName,historTypename,typename)
    /*这里的逻辑还需要考虑
             思路：
               库存：
                 拿到之前的数据，对库存进行加减
                 修改后的产品数量要进行入库操作
               历史记录：
                 要删除修改前的历史记录
                 保存修改后的数据
               
           */
    //如果产品的名字不等于修改后的名字或产品规格不等于修改后的规格执行这里
    if (date[0].name != name || date[0].typename != typename) {
        if (date[0].num == num && date[0].numL == numL && date[0].numR == numR) {
            //情况1：num、numL.numR都没有修改
            // 先去库存里减去修改的数据

            let ckDate = await db.find('goods', { name: historyName, typename: historTypename })
            console.log(ckDate)
            // 修改前的实际库存
            let kcNum = ckDate[0].num;
            let kcNumL = ckDate[0].numL;
            let kcNumR = ckDate[0].numR
            // 修改后的实际库存
            let sjNum = kcNum - num;
            let sjNumL = kcNumL - numL;
            let sjNumR = kcNumR - numR;
            if (sjNumL <= sjNumR) {
                num = sjNum + sjNumL;
                numL = sjNumL - sjNumL;
                numR = sjNumR - sjNumL;
            } else if (sjNumL > sjNumR) {
                num = sjNum - sjNumR;
                numL = sjNumL - sjNumR;
                numR = sjNumR - sjNumR;
            }
            // 更新数据库
            let updateRes = await db.update('goods', { name: historyName, typename: historTypename }, { $set: { num, numL, numR } });
            // 查找到修改后的对应的数据
            let findRes = await db.find('goods', { name, typename })
            if (findRes[0]) {
                // 如果库存里面有该产品就直接给产品添加数量
                console.log('看看这里', ctx.query.name, ctx.query.typename, ctx.query.numR)
                let resNum = findRes[0].num + ctx.query.num;
                let resNumL = findRes[0].numL + ctx.query.numL;
                let resNumR = findRes[0].numR + ctx.query.numR;
                if (resNumL <= resNumR) {
                    resNum = resNum + resNumL;
                    resNumL = resNumR - resNumL;
                    resNumR = resNumR - resNumR
                } else if (resNumL > resNumR) {
                    resNum = resNum + resNumR;
                    resNumL = resNumL - resNumL;
                    resNumR = resNumL - resNumR
                }
                let updateFindRes = await db.update('goods', { name: ctx.query.name, typename: ctx.query.typename }, { $set: { num: resNum, numL: resNumL, numR: resNumR } })
                ctx.body = {
                    status: 200
                }
                next()
            } else {
                // 如果修改后库存没有该产品就报404，直接添加到库存里
                ctx.body = {
                    status: 404,
                }
                next()
            }

        } else {
            //情况1：num、numL.numR有修改
            console.log(888)
        }


    }



})


module.exports = router;