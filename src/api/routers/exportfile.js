/**
 * 
 */
const Router = require("koa-router");
const XLSX = require('xlsx')


const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let { data } = ctx.query
    let docs = JSON.parse(data)
    console.log("前端传",docs[0])
    let json = [{}]
    if (docs.length != 0) {
        // 实例化一个工作簿
        let book = XLSX.utils.book_new()
        // 实例化一个Sheet，并定义表头
        let sheet = XLSX.utils.json_to_sheet(json, { header: ["新辉眼镜有限公司对账单（客户：）"] })
        // 从A2行开始插入数据
        XLSX.utils.sheet_add_json(sheet, docs, { skipHeader: false, origin: "A2" });
        //   定义表格样式
        sheet['!cols'] = [
            { wch: 20 }, { wch: 30 }, { wch: 40 }, { wch: 40 }
        ]
        sheet['!rows'] = [
            { hpt: 60 }, { hpt: 40 }
        ]
        // 合并表头单元格
        sheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }
        ]
        // 将Sheet写入工作簿
        XLSX.utils.book_append_sheet(book, sheet, '对象')
        let res = XLSX.write(book, { type: 'buffer' })
        ctx.set("Content-Type", "application/octet-stream")
        ctx.set("Content-Disposition", "attachment; filename=" + encodeURIComponent(docs[0].客户名称+".xlsx"));
        ctx.body = res;


    }




})
module.exports = router;