// 删除数据接口
const Router = require('koa-router')
const router = new Router();
const db = require('../../db/database');
router.get('/', async (ctx, next) => {
  /**
   * 思路：
   * 1、拿到前端传过来的数据（修改前，修改后)
   *2、新老数据进行对比，并拿到修改的具体的数据（oldArr）和修改后的数据（newArr）
   * 3、处理数据
   * 3.1、oldArr的数据去goods集合里重新入库，
   * 3.2、newArr的数据去goods集合里重新出库
   * 4、返回信息
   * 
   */
  let { oldParams } = ctx.query
  let oldArr = JSON.parse(oldParams)
  // 对比修改前、修改后的数据
  
  console.log('看看oldArr',oldArr);
 // 声明一个容器，装出库后的库存
 let sjData = []
  // 具体修改的数据重新入库
  for(let i=0;i<oldArr.length;i++){
    let name = oldArr[i].name
    let typename = oldArr[i].typeNmae
    let unit = oldArr[i].unit
    let remark = oldArr[i].remark
    let num = oldArr[i].num
    let left = remark.indexOf("左")
    let right = remark.indexOf("右")
    let utilize = remark.indexOf("用")
    let scrap = remark.indexOf("废")
    let rkData = await db.find('goods',{name,typename});
    if(rkData.length>0){
      // console.log("看看修改哪些",rkData)
      let kcNum = rkData[0].num
      let numL = rkData[0].numL
      let numR = rkData[0].numR
      if(unit=="副"){
        // 这里是副数
        // 判断是退货还是出库
        if(num<0&&utilize!=-1){
          // 说明是可利用的退货
          console.log("可利用的退货")
          let sjNum = kcNum*1+num*1
          code({
            sjNum:sjNum,
            name:name,
            typename:typename,
            numL:numL,
            numR:numR,
            code:200
          })
        }else if(num>0){
          // 说明是出库的
          console.log("出库的")
           let sjNum = kcNum*1+num*1
           code({
            sjNum:sjNum,
            name:name,
            typename:typename,
            numL:numL,
            numR:numR,
            code:200
          })
        }


      }else if(unit=="只"){
        // 这里是只数
        if(left!=-1){
          // 这里是左手
          if(num<0&&utilize!=-1){
            // 这里是有用的退货
            let sjnumL = numL*1+num*1
            if(numR>0){
              // 说明可以配成副
             
               let sjnum = kcNum*1+sjnumL*1;
               let sjnumR = numR-sjnumL
               numL=0;
               code({
                sjNum:sjnum,
                name:name,
                typename:typename,
                numL:numL,
                numR:sjnumR,
                code:200
              })
              
            }else if(numR==0){
              // 不能配成副
              let sjnumL = numL*1+num*1
              if(sjnumL>=0){
                code({
                  sjNum:kcNum,
                  name:name,
                  typename:typename,
                  numL:sjnumL,
                  numR:numR,
                  code:200
                })
              }else if(sjnumL<0){
                // 需要配平副数
                let sjnum = kcNum*1+sjnumL*1
                let sjnumR = numR-sjnumL
                numL = 0
                code({
                  sjNum:sjnum,
                  name:name,
                  typename:typename,
                  numL:0,
                  numR:sjnumR,
                  code:200
                })
              }
            }


          }else if(num>0){
            // 这里是出库的
            let sjnumL = numL*1+num*1;
            if(numR>0){
              // 需要配平副
              let flag = sjnumL-numR
              if(flag>=0){
                // 左手大于等于右手
                let sjnum = kcNum*1+numR*1
                sjnumL = flag
                numR = 0
                code({
                  sjNum:sjnum,
                  name:name,
                  typename:typename,
                  numL:sjnumL,
                  numR:numR,
                  code:200
                })
              }else if(flag<0){
                // 右手大
                let sjnum = kcNum*1+sjnumL*1
                numR = -flag
                numL = 0
                code({
                  sjNum:sjnum,
                  name:name,
                  typename:typename,
                  numL:numL,
                  numR:numR,
                  code:200
                })
              }             
            }else if(numR==0){
              // 不需要配平
              code({
                sjNum:kcNum,
                name:name,
                typename:typename,
                numL:sjnumL,
                numR:numR,
                code:200
              })
            }


          }


        }else if(right!=-1){
          // 这里是右手
          if(num>0){
            // 这里是出库
            let sjnumR = numR*1+num*1
            if(numL>0){
              // 需要配平副数
              let flag = sjnumR*1-numL*1
              if(flag>=0){
                // 右手大于等于左手
                let sjnum = kcNum*1+numL*1
                sjnumR = flag
                numL = 0
                code({
                  sjNum:sjnum,
                  name:name,
                  typename:typename,
                  numL:numL,
                  numR:sjnumR,
                  code:200
                })

              }else if(flag<0){
                // 左手大于右手
                let sjnum = kcNum*1+sjnumR*1
                numL = -flag
                numR = 0
                code({
                  sjNum:sjnum,
                  name:name,
                  typename:typename,
                  numL:numL,
                  numR:numR,
                  code:200
                })
              }

            }else if(numL==0){
              // 不需要配平
              code({
                sjNum:kcNum,
                name:name,
                typename:typename,
                numL:numL,
                numR:sjnumR,
                code:200
              })
            }


          }else if(num<0&&utilize!=-1){
            // 这里是有用的退货
            let sjnumR = numR*1+num*1
            if(numL>0){
              // 右手为0
              let sjnum = kcNum*1+sjnumR*1
              let sjnumL = numL*1-sjnumR
              numR = 0
              code({
                sjNum:sjnum,
                name:name,
                typename:typename,
                numL:sjnumL,
                numR:numR,
                code:200
              })
            }else if(numL==0){
              //左手为0
              if(sjnumR>=0){
                code({
                  sjNum:kcNum,
                  name:name,
                  typename:typename,
                  numL:numL,
                  numR:sjnumR,
                  code:200
                })
              }else if(sjnumR<0){
                // 需要配平副
                let sjnum = kcNum*1+sjnumR;
                let sjnumL = numL-sjnumR
                numR = 0
                code({
                  sjNum:sjnum,
                  name:name,
                  typename:typename,
                  numL:sjnumL,
                  numR:numR,
                  code:200
                })
              }
            }
          }



        }



      }
    }
  }
  // 打印入库后的库存
  console.log("打印入库后的库存",sjData)

  // 封装入库状态
  function code(obj){
    let sjObj = {
      name:obj.name,
      typename:obj.typename,
      num:obj.sjNum,
      numL:obj.numL,
      numR:obj.numR,
      code:obj.code
    };
    sjData.push(sjObj)
  }
  // 更新数据库
  for(let i=0;i<sjData.length;i++){
    let name = sjData[i].name
    let typename = sjData[i].typename
    let num = sjData[i].num
    let numL = sjData[i].numL
    let numR = sjData[i].numR
    let res = await db.update('goods',{name,typename},{$set:{num,numR,numL}})
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
})





module.exports = router


