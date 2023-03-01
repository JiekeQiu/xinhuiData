/**
 * 
 */
const Router = require("koa-router");
const XLSX = require('xlsx')
const axios = require("axios");


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let { data } = ctx.query
    let docs = JSON.parse(data)
    if (docs.title == "客户详单") {
        await axios.get('http://localhost:18883/findbill', { params: docs }).then(response => {
            console.log("看看结果", response.data.arr)
            let num = 0
            let All = 0
            response.data.arr.forEach(item => {
                let nums
                if (item.unit == "只") {
                    nums = Math.ceil(item.num / 2)
                } else {
                    nums = item.num
                }
                let number = Number(nums)
                let numAll = Number(item.All)
                num += number
                All += numAll

            })
            let a = All.toFixed(2)
            let c = num.toFixed(0)
            response.data.arr.push({
                time: "总计",
                num: num*1,
                All: a*1
            })
            let arrList = []
            response.data.arr.forEach(item => {
                let obj = {
                    "送货日期": item.time,
                    "送货单号": item.No,
                    "客户名称": item.username,
                    "产品名称": item.name,
                    "产品规格": item.typeNmae,
                    "单位": item.unit,
                    "数量": item.num*1,
                    "单价": item.money,
                    "总金额": item.All*1,
                    "备注": item.remark,
                }
                arrList.push(obj)
            });
            let json = [{}]
            if (docs.length != 0) {
                // 实例化一个工作簿
                let book = XLSX.utils.book_new()
                // 实例化一个Sheet，并定义表头
                let sheet = XLSX.utils.json_to_sheet(json, { header: ["新辉眼镜有限公司对账单（客户：）"] })
                // 从A2行开始插入数据
                XLSX.utils.sheet_add_json(sheet, arrList, { skipHeader: false, origin: "A2" });
                //   定义表格样式
                sheet['!cols'] = [
                    { wch: 18 }, { wch: 20 }, { wch: 12 }, { wch: 25 }, { wch: 25 }, { wch: 5 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 25 }
                ]
                sheet['!rows'] = [
                    { hpt: 40 }, { hpt: 40 }
                ]
                // 合并表头单元格
                sheet['!merges'] = [
                    { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }
                ]
                // 将Sheet写入工作簿
                XLSX.utils.book_append_sheet(book, sheet, '对象')
                let res = XLSX.write(book, { type: 'buffer' })
                ctx.set("Content-Type", "application/octet-stream")
                ctx.set("Content-Disposition", "attachment; filename=" + encodeURIComponent(arrList[0].客户名称 + ".xlsx"));
                ctx.body = res;


            }

        })
    } else if (docs.title == "客户订单总金额") {
        await axios.get('http://localhost:18883/billmoney', { params: docs }).then(response => {
            let money = 0
            let num = 0
            response.data.res.forEach(item => {
                money += item.money * 1
                num += item.num * 1

            })
            let a = money.toFixed(2)
            let b = num.toFixed(0)
            response.data.res.push({
                date: "总计",
                num: b * 1,
                money: a
            })
            console.log("技术按", response.data.res)
            let arrList = []
            response.data.res.forEach(item => {
                let obj = {
                    "送货日期": item.date,
                    "客户名称": item.name,
                    "总数量": item.num * 1,
                    "金额": item.money * 1
                }
                arrList.push(obj)
            });
            let json = [{}]
            if (docs.length != 0) {
                // 实例化一个工作簿
                let book = XLSX.utils.book_new()
                // 实例化一个Sheet，并定义表头
                let sheet = XLSX.utils.json_to_sheet(json, { header: ["新辉眼镜有限公司对账单（客户：）"] })
                // 从A2行开始插入数据
                XLSX.utils.sheet_add_json(sheet, arrList, { skipHeader: false, origin: "A2" });
                //   定义表格样式
                sheet['!cols'] = [
                    { wch: 18 }, { wch: 20 }, { wch: 12 }, { wch: 25 }, { wch: 25 }, { wch: 5 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 25 }
                ]
                sheet['!rows'] = [
                    { hpt: 40 }, { hpt: 40 }
                ]
                // 合并表头单元格
                sheet['!merges'] = [
                    { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }
                ]
                // 将Sheet写入工作簿
                XLSX.utils.book_append_sheet(book, sheet, '对象')
                let res = XLSX.write(book, { type: 'buffer' })
                ctx.set("Content-Type", "application/octet-stream")
                ctx.set("Content-Disposition", "attachment; filename=" + encodeURIComponent(arrList[0].客户名称 + ".xlsx"));
                ctx.body = res;


            }

        })
    } else if (docs.title == "客户订单金额") {
        await axios.get('http://localhost:18883/findmoney', { params: docs }).then(response => {
            let num = 0
            response.data.arr.forEach(item=>{
                let number = Number(item.AllMoney)
                num+=number
            })
          let a = num.toFixed(2)
          console.log("看看结果", a)

          response.data.arr.push({
                time:"总订单数："+response.data.arr.length,
                name:"总金额：",
                AllMoney:a*1,
            })
            let arrList = []
            response.data.arr.forEach(item => {

                let obj = {
                    "送货日期": item.time,
                    "送货单号": item.No,
                    "客户名称": item.name,
                    "金额": item.AllMoney*1
                }
                arrList.push(obj)
            });
            let json = [{}]
            if (docs.length != 0) {
                // 实例化一个工作簿
                let book = XLSX.utils.book_new()
                // 实例化一个Sheet，并定义表头
                let sheet = XLSX.utils.json_to_sheet(json, { header: ["新辉眼镜有限公司对账单（客户：）"] })
                // 从A2行开始插入数据
                XLSX.utils.sheet_add_json(sheet, arrList, { skipHeader: false, origin: "A2" });
                //   定义表格样式
                sheet['!cols'] = [
                    { wch: 18 }, { wch: 20 }, { wch: 12 }, { wch: 25 }, { wch: 25 }, { wch: 5 }, { wch: 12 }, { wch: 12 }, { wch: 15 }, { wch: 25 }
                ]
                sheet['!rows'] = [
                    { hpt: 40 }, { hpt: 40 }
                ]
                // 合并表头单元格
                sheet['!merges'] = [
                    { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }
                ]
                // 将Sheet写入工作簿
                XLSX.utils.book_append_sheet(book, sheet, '对象')
                let res = XLSX.write(book, { type: 'buffer' })
                ctx.set("Content-Type", "application/octet-stream")
                ctx.set("Content-Disposition", "attachment; filename=" + encodeURIComponent(arrList[0].客户名称 + ".xlsx"));
                ctx.body = res;


            }

        })
    }




})
module.exports = router;