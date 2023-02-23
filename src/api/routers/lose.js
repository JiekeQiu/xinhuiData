const Router = require("koa-router");
const router = new Router();
const db = require('../../db/database');

router.get('/', async (ctx, next) => {
    let {params} = ctx.query
    let data = JSON.parse(params)
    // console.log(data)
    // 声明一个容器，装出库后的库存
    let sjData = []
    for(let i=0;i<data.length;i++){
        let name = data[i].name
        let typename = data[i].typeNmae
        let unit = data[i].unit
        let num = data[i].num
        let remark = data[i].remark
        let left = remark.indexOf("左")
        let right = remark.indexOf("右")
        let utilize = remark.indexOf("用")
        let scrap = remark.indexOf("废")
        let ckData = await db.find('goods', { name, typename })
        // console.log(ckData.length)

        if(ckData.length==0){
            code(name,typename,'','','','没有找到',"404")
        }else{
        // console.log("右",name,typename)
            if(unit=="副"){
                // 这里是副数
                // 拿到数量
                let sjnum = ckData[0].num-num;
                let sjnumR = ckData[0].numR;
                let sjnumL = ckData[0].numL;
                if(num>0){
                    // 这里是出库
                    if(sjnum>=0){
                        // 有库存
                        code(name,typename,sjnum,sjnumR,sjnumL,'出库成功',"200")
                    }else if(sjnum<0){
                        // 没库存
                        code(name,typename,sjnum,sjnumR,sjnumL,'出库失败，没有库存',"204")
                    }
                }else if(num<0){
                    // 这里是退货
                    if(utilize!=-1){
                        // 退货可用
                        code(name,typename,sjnum,sjnumR,sjnumL,'退货成功',"200")

                    }else if(scrap!=-1){
                        // 退货废品
                        ctx.body = {
                            state:200,
                            msg:"退货成功"
                        }
                        // code(name,typename,ckData[0].num,sjnumR,sjnumL,'退货成功',"205")
                    }
                }
            }else if(unit=="只"){
                // 这里是只数
                if(num>0){
                    // 这里是出库

                    if(left!=-1){
                        // 左手出库
                        let sjnumL = ckData[0].numL-num;
                        if(sjnumL>=0){
                            // 不需要兑换副数的数量
                            let sjnum = ckData[0].num;
                            let sjnumR = ckData[0].numR
                            code(name,typename,sjnum,sjnumR,sjnumL,'出库成功','200')

                        }else if(sjnumL<0){
                            // 需要用副数兑换
                            let sjnum = ckData[0].num*1+sjnumL*1;
                            let sjnumR = ckData[0].numR-sjnumL;
                            sjnumL = 0;
                            if(sjnum>=0){
                                code(name,typename,sjnum,sjnumR,sjnumL,'出库成功','200')
                            }else if(sjnum<0){
                                code(name,typename,sjnum,sjnumR,sjnumL,'出库失败','204')

                            }
                        }


                    }else if(right!=-1){
                        // 右手出库
                        let sjnumR = ckData[0].numR - num;
                        if(sjnumR>=0){
                            // 不需要用副兑换
                            let sjnum = ckData[0].num
                            let sjnumL = ckData[0].numL
                            code(name,typename,sjnum,sjnumR,sjnumL,'出库成功','200')
                        }else if(sjnumR<0){
                            // 需要用副兑换
                            let sjnum = ckData[0].num*1+sjnumR*1;
                            let sjnumL = ckData[0].numL-sjnumR
                            sjnumR = 0
                            if(sjnum>=0){
                                // 有库存
                                code(name,typename,sjnum,sjnumR,sjnumL,'出库成功','200')
                            }else if(sjnum<0){
                                // 没有库存
                                code(name,typename,sjnum,sjnumR,sjnumL,'出库失败','204')
                            }
                        }
                    }


                }else if(num<0){
                    // 这里是退货
                    if(left!=-1){
                        // 左手退货
                        if(utilize!=-1){
                            // 可回收
                            let nums = ckData[0].num
                            let numL = ckData[0].numL-num
                            let numR = ckData[0].numR
                            if(numR>0){
                                // 右手有值
                                let sjnumL = numL-numR
                                if(sjnumL>=0){
                                    // 左手大于等于右手
                                    let sjnum = nums*1+numR*1;
                                    let sjnumR = 0;
                                    code(name,typename,sjnum,sjnumR,sjnumL,'退货成功','200')
                                }else if(sjnumL<0){
                                    // 右手大
                                    let sjnum = nums*1-num
                                    let sjnumR = numR*1+num*1
                                    let sjnumL = 0
                                    code(name,typename,sjnum,sjnumR,sjnumL,'退货成功','200')
                                }
                            }else if(numR==0){
                                // 右手没有值
                                code(name,typename,nums,numR,numL,'退货成功','200')
                            }
                        }else{
                            console.log("左手退货")
                            ctx.body = {
                                state:200,
                                msg:"退货成功"
                            }
                        }

                    }else if(right!=-1){
                        // 右手退货
                        if(utilize!=-1){
                            // 可回收
                            let nums = ckData[0].num
                            let numL = ckData[0].numL
                            let numR = ckData[0].numR-num
                            if(numL>0){
                                // 左手右有值
                                let sjnumR = numR-numL
                                if(sjnumR>=0){
                                    // 右手比左手大
                                    let sjnum = nums*1+numL*1;
                                    let sjnumL = 0
                                    code(name,typename,sjnum,sjnumR,sjnumL,"退货成功","200")
                                }else if(sjnumR<0){
                                    // 左手比有手大
                                    let sjnum = nums*1-num
                                    let sjnumL = numL*+num*1
                                    let sjnumR = 0
                                    code(name,typename,sjnum,sjnumR,sjnumL,'退货成功','200')
                                }
                            }else if(numL==0){
                                // 右手有值
                                code(name,typename,nums,numR,numL,'退货成功','200')
                            }
                        }else{
                            ctx.body = {
                                state:200,
                                msg:"退货成功"
                            }
                        }
                    }



                }
            }
        }
    }
    console.log("看看容器",sjData)
   
/**
 * code转态表示
 * 404：没有该产品
 * 200：出库成功
 * 204：出库失败，没有库存
 * 205：退货成功，废品，不重新入库
 */
// 封装状态
    function code(name,typename,num,numR,numL,msg,code){
        let message =name+typename+msg
        let obj = {
            msg:message,
            name:name,
            typename:typename,
            num:num,
            numR:numR,
            numL:numL,
            code:code
        }
        sjData.push(obj)        
        console.log('退货副',sjData)
    }

    // 更新数据库
    let result = sjData.some(item=>{
        if(item.code=='404'||item.code=='204'){
           return true
        }
    })
    // console.log('最终结果',result)
    /**
     * 如果result的结果为false则可以出库，否则不能出库
     * state状态码（返回给前端的）
     * 200：出库成功
     * 203：数据更新出错
     * 404：没有找到该产品或产品还没入库
     */
    if(!result){
        // 可以出库

        // console.log("可以出库",sjData)
        /**
         * @param 这里是可以出库的代码，不能删掉
         *  */ 
        console.log("看看")
        for(let i=0;i<sjData.length;i++){
            let name=sjData[i].name;
            let typename = sjData[i].typename
            let num = sjData[i].num;
            let numR = sjData[i].numR;
            let numL = sjData[i].numL
            let res = await db.update('goods',{name,typename},{$set:{num,numR,numL}})
            console.log("结果",res)
            if(res.modifiedCount>0){
                ctx.body = {
                    state:200,
                    msg:"出库成功"
                }
            }else{
                ctx.body = {
                    state:203,
                    msg:"出库失败_数据更新出错"
                }
            }
        }
    }else{
        // 不可以出库
        let arr = []
        for(let i=0;i<sjData.length;i++){
            if(sjData[i].num==''){
                let resObj={ 
                    name:sjData[i].name,
                    typename:sjData[i].typename,
                    msg:"没有该产品"
                }
                arr.push(resObj)
            }else if(sjData[i].num<0){
                let resObj={
                    name:sjData[i].name,
                    typename:sjData[i].typename,
                    msg:"没有库存"
                }
                arr.push(resObj)
            }
        }
        ctx.body = {
            state:404,
            msg:"出库失败",
            res:arr
        }
    }
})


module.exports = router