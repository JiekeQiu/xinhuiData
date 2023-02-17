// 客户总金额汇总
const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');
 
router.get('/',async(ctx,next)=>{
    let {username,timeStart,timeEnd} = ctx.query
    if(username){
        if(timeStart&&timeEnd){
            let res = await db.find("delivery",{name:username,date:{'$gte':timeStart,'$lte':timeEnd}})
            console.log("总金额",res)
            if(res.length!=0){
                let money = 0
                let num = 0
                let arr =[]
                let obj = {}
                res.forEach(item => {
                    let data = JSON.parse(item.tableData)
                    data.forEach(item=>{
                        console.log("看看",item.unit)
                        let nums =0
                        if(item.unit=="只"){
                            nums = item.num/2
                        }else{
                            nums = item.num
                        }
                        num+=nums*1

                    })
                    money+=item.AllMoney*1
                });
                let sjnum = num.toFixed(2)
                let sjmoney = money.toFixed(2)
                obj.username = username
                obj.num = sjnum
                obj.money = sjmoney

                
                arr.push(obj)
                ctx.body={
                    state:200,
                    res:arr
                }
            }else{
                ctx.body={
                    state:404,
                    msg:"没有找到该订单"
                }
                next()
            }
        }else{
            let res = await db.find("delivery",{name:username})
            if(res.length!=0){
                let money = 0
                let num = 0
                let arr =[]
                let obj = {}
                res.forEach(item => {
                    let data = JSON.parse(item.tableData)
                    data.forEach(item=>{
                        console.log("看看",item.unit)
                        let nums =0
                        if(item.unit=="只"){
                            nums = item.num/2
                        }else{
                            nums = item.num
                        }
                        num+=nums*1

                    })
                    money+=item.AllMoney*1
                });
                let sjnum = num.toFixed(2)
                let sjmoney = money.toFixed(2)
                obj.username = username
                obj.num = sjnum
                obj.money = sjmoney

                
                arr.push(obj)
                ctx.body={
                    state:200,
                    res:arr
                }
            }else{
                ctx.body={
                    state:404,
                    msg:"没有找到该订单"
                }
                next()
            }
        }
    }else if(timeStart&&timeEnd){
        let res = await db.find("delivery",{date:{'$gte':timeStart,'$lte':timeEnd}})
        if(res.length!=0){
            let arr = res
            var arr1 = [];
               var k = true;
               for(var i in arr){
                   k = true;
                   var tableData = eval('(' + arr[i].tableData + ')');
                   if(arr1.length>0){
                       for(var t in arr1){
                           if(arr1[t].name == arr[i].name){
                               arr1[t].list.push.apply(arr1[t].list,tableData)
                               k = false;
                           }
                           if(k&&arr1.length-1 == t){
                               arr1.push({name:arr[i].name,list:tableData});
                           }
                       }
                   }else{
                       arr1.push({name:arr[i].name,list:tableData});
                   }
               }
               let resArr = []
               for(var i in arr1){
                   var numTxt = 0;
                   let money = 0
                    let arrs = []
                   for(var m in arr1[i].list){
                       let num = 0
                       // console.log("看看这是",arr1[i].list[m].All)
                       arrs.push(arr1[i].list[m].All)

                       

                       // money = money+arr1[i].list[m].All*1
                       if(arr1[i].list[m].unit=="只"){
                           num =arr1[i].list[m].num/2;
                           numTxt= numTxt +num
                       }else{
                           numTxt =numTxt+ arr1[i].list[m].num*1;
                       }
                       
                       
                   }
                   function countSum(arr){
                    if (!arr.length) return 0;
                    arr = arr.map((v) => {
                        if (v && !Number.isNaN(Number(v))) return Math.round(v * 100);
                        return 0;
                    });
                    const result =  arr.reduce((prev, curr) => {
                        return prev + curr
                    }, 0);
                    return result / 100;
            
                }
                   resArr.push({
                       username:arr1[i].name,
                       money:countSum(arrs),
                       num:numTxt
                   })
                }
                console.log("这是什么",resArr)
                




            
            ctx.body = {
                state:200,
                res:resArr
            }
       
    
        }else{
            ctx.body={
                state:404,
                msg:"该时间范围内没有订单"
            }
        }
    }
    
    function countSum(arr){
        if (!arr.length) return 0;
        arr = arr.map((v) => {
            if (v && !Number.isNaN(Number(v))) return Math.round(v * 100);
            return 0;
        });
        const result =  arr.reduce((prev, curr) => {
            return prev + curr
        }, 0);
        return result / 100;

    }
})


module.exports = router;


