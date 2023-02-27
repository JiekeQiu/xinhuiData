/**
 * 客户详单查询
 */

const Router = require("koa-router");


const router = new Router();
const db = require('../../db/database');
/**
 * 思路：
 * 产品名称和类型不能直接查询到，需要先根据条件获取到满足条件的所有tableData，然后过滤拿到所有满足的数据
 */
router.get('/', async (ctx, next) => {
    let {username,name,type,No,timeStart,timeEnd} = ctx.query
    console.log("有没有通",username)
    if(username){
        if(No){
            // 有username、NO
            if(name){
                // 有username、NO、name
                if(type){
                    // 有username、NO、name、type
                    if(timeStart&&timeEnd){
                        // 有username、NO、name、type、timeStart、timeEnd
                        console.log("有username、NO、name、type、timeStart、timeEnd")                            
                        // 精确查找
                        let res = await db.find("delivery",{name:username,No:No,date:{'$gte':timeStart,'$lte':timeEnd}})
                        reslutObj(res)
                    }else{
                    // 有username、NO、name、type没有timeStart、timeEnd
                    console.log("有username、NO、name、type没有timeStart、timeEnd")                            
                        let res = await db.find("delivery",{name:username,No:No})
                        console.log("看看",res)
                        reslutObj(res)
                    }
                }else{
                    // 有username、NO、name没有type
                    if(timeStart&&timeEnd){
                    // 有username、NO、name、timeStart、timeEnd没有type
                        console.log("有username、NO、name、timeStart、timeEnd没有type")  
                        let res = await db.find("delivery",{name:username,No:No,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let resArr = JSON.parse(res[0].tableData)
                            let arr=[]
                            resArr.some(item=>{
                                if(item.name==name){
                                    console.log("变",item)
                                    item.time = res[0].date
                                    item.No = No
                                    item.username = username
                                    arr.push(item)
                                    ctx.body = {
                                        state:200,
                                        arr
                                    }
                                    // next()
                                }
                            })
                        }else{
                            ctx.body={
                                state:404,
                                msg:"查询失败，没有找到相关信息"
                            }
                        }                         
                        
                    }else{
                    // 有username、NO、name没有type、timeStart、timeEnd
                    console.log("有username、NO、name没有type、timeStart、timeEnd")                            
                    let res = await db.find("delivery",{name:username,No:No})
                        if(res.length!=0){
                            let resArr = JSON.parse(res[0].tableData)
                            let arr=[]
                            resArr.some(item=>{
                                if(item.name==name){
                                    // console.log("变1",item)
                                    item.time = res[0].date
                                    item.No = No
                                    item.username = username
                                    arr.push(item)
                                    ctx.body = {
                                        state:200,
                                        arr
                                    }
                                    // next()
                                }
                            })
                        }else{
                            ctx.body={
                                state:404,
                                msg:"查询失败，没有找到相关信息"
                            }
                        }          
                    }
                }
            }else{
                // 有username、NO没有name
                if(type){
                    // 有username、NO、type没有name
                    if(timeStart&&timeEnd){
                        // 有username、NO、type、timeStart、timeEnd没有name
                        console.log("有username、NO、type、timeStart、timeEnd没有name")                            
                        let res = await db.find("delivery",{name:username,No:No,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                                let resArr = JSON.parse(res[0].tableData)
                                let arr=[]
                                resArr.some(item=>{
                                        if(item.typeNmae==type){
                                            item.time = res[0].date
                                            item.No = No
                                            item.username = username
                                            arr.push(item)
                                            ctx.body = {
                                                state:200,
                                                arr
                                            }
                                        }
                                    })
                        }else{
                                ctx.body={
                                    state:404,
                                    msg:"没有找到"
                                }
                        }
                    }else{
                        // 有username、NO、type没有name、timeStart、timeEnd
                        console.log("有username、NO、type没有name、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{name:username,No:No})
                        if(res.length!=0){
                            let resArr = JSON.parse(res[0].tableData)
                            let arr = []
                            resArr.some(item=>{
                                    if(item.typeNmae==type){
                                        item.time = res[0].date
                                        item.No = No
                                        item.username = username
                                        arr.push(item)
                                        ctx.body = {
                                            state:200,
                                            arr
                                        }
                                        next()
                                    }
                                })
                        }else{
                                ctx.body={
                                    state:404,
                                    msg:"没有找到"
                                }
                        }
                    }
                }else{
                    // 有username、NO没有name、type
                    if(timeStart&&timeEnd){
                    // 有username、NO、timeStart、timeEnd没有name、type
                        console.log("有username、NO、timeStart、timeEnd没有name、type")                            
                        let res = await db.find("delivery",{name:username,No:No,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let resArr = JSON.parse(res[0].tableData)
                            let arr = []
                            resArr.forEach(item=>{
                                item.time = res[0].date
                                item.No = No
                                item.username = username
                                // console.log("kjas",resArr)
                                arr=resArr
                            })
                            ctx.body={
                                state:200,
                                arr
                            }
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }
                        
                    }else{
                    // 有username、NO没有name、type、timeStart、timeEnd
                        console.log("有username、NO没有name、type、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{name:username,No:No})
                        if(res.length!=0){
                            let resArr = JSON.parse(res[0].tableData)
                            let arr = []
                            resArr.forEach(item=>{
                                item.time = res[0].date
                                item.No = No
                                item.username = username
                                // console.log("kjas",resArr)
                                arr=resArr
                            })
                            ctx.body={
                                state:200,
                                arr
                            }
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }
                    }
                }
            }
        }else{
            // 有username没有NO
            if(name){
                // 有username、name没有NO
                if(type){
                    // 有username、name、type没有NO
                    if(timeStart&&timeEnd){
                    // 有username、name、type、timeStart、timeEnd没有NO
                        console.log("有username、name、type、timeStart、timeEnd没有NO")                            
                        let res = await db.find("delivery",{name:username,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    // console.log("看看",item.name)
                                    if(item.name==name&&item.typeNmae==type){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username = username
                                        arr.push(item)
                                    }
                                })

                            }
                            // let arr = JSON.parse(res[0].tableData)
                            console.log("看看",arr)
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }
                            
                    }else{
                        // 有username、name、type没有NO、timeStart、timeEnd
                        console.log("有username、name、type没有NO、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{name:username})
                        console.log("看看",res)
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    if(item.name==name&&item.typeNmae==type){
                                        item.username = username
                                        item.No = res[i].No
                                        item.time = res[i].date
                                        arr.push(item)
                                    }
                                })
                            }
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }
                    }
                }else{
                    // 有username、name没有NO、type
                    if(timeStart&&timeEnd){
                    // 有username、name、timeStart、timeEnd没有NO、type
                        console.log("有username、name、timeStart、timeEnd没有NO、type")                            
                        let res = await db.find("delivery",{name:username,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    // console.log("看看",item.name)
                                    if(item.name==name){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username = username
                                        arr.push(item)
                                    }
                                })

                            }
                            // let arr = JSON.parse(res[0].tableData)
                            console.log("看看",arr)
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }
                                
                    }else{
                    // 有username、name没有NO、type、timeStart、timeEnd
                        console.log("有username、name没有NO、type、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{name:username})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    // console.log("看看",item.name)
                                    if(item.name==name){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username = username
                                        arr.push(item)
                                    }
                                })

                            }
                            // let arr = JSON.parse(res[0].tableData)
                            console.log("看看",arr)
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }
                    }
                }
            }else{
                // 有usernam没有NO、name
                if(type){
                    // 有usernam、type没有NO、name
                    if(timeStart&&timeEnd){
                    // 有usernam、type、timeStart、timeEnd没有NO、name
                        console.log("有usernam、type、timeStart、timeEnd没有NO、name")                            
                        let res = await db.find("delivery",{name:username,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    // console.log("看看",item.name)
                                    if(item.typeNmae==type){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username = username
                                        arr.push(item)
                                    }
                                })

                            }
                            // let arr = JSON.parse(res[0].tableData)
                            console.log("看看",arr)
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }       
                                    
                    }else{
                    // 有usernam、type没有NO、name、timeStart、timeEnd
                        console.log("有usernam、type没有NO、name、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{name:username})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    // console.log("看看",item.name)
                                    if(item.typeNmae==type){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username = username
                                        arr.push(item)
                                    }
                                })

                            }
                            // let arr = JSON.parse(res[0].tableData)
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }
                    }
                }else{
                    // 有usernam没有NO、name、type
                    if(timeStart&&timeEnd){
                    // 有usernam、timeStart、timeEnd没有NO、name、type
                        console.log("有usernam、timeStart、timeEnd没有NO、name、type")                            
                        let res = await db.find("delivery",{name:username,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.forEach(item=>{
                                    // console.log("看看",item.name)
                                    // if(item.name==name&&item.typeNmae==type){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username = username
                                        arr.push(item)
                                    // }
                                })

                            }
                            console.log("看看",arr)
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }            
                                        
                    }else{
                    // 有usernam没有NO、name、type、timeStart、timeEnd
                        console.log("有usernam没有NO、name、type、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{name:username})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.forEach(item=>{
                                    // console.log("看看",item.name)
                                    // if(item.name==name&&item.typeNmae==type){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username = username
                                        arr.push(item)
                                    // }
                                })

                            }
                            console.log()
                            module.exports = arr
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }          
                    }
                }
            }
        }
    }else{
        if(No){
            // 有No没有username
            if(name){
                // 有No、name没有username
                if(type){
                    // 有No、name、type没有username
                    if(timeStart&&timeEnd){
                    // 有No、name、type、timeStart、timeEnd没有username
                        console.log("有No、name、type、timeStart、timeEnd没有username")                            
                        let res = await db.find("delivery",{No:No,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            let resArr = JSON.parse(res[0].tableData)
                            resArr.some(item=>{
                                if(item.name==name&&item.typeNmae==type){
                                    item.time = res[0].date
                                        item.No = res[0].No
                                        item.username = res[0].name
                                        arr.push(item)
                                        ctx.body={
                                            state:200,
                                            arr
                                        }
                                }
                            })
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }               
                                            
                    }else{
                    // 有No、name、type没有username、timeStart、timeEnd
                        console.log("有No、name、type没有username、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{No:No})
                        if(res.length!=0){
                            let arr = []
                            let resArr = JSON.parse(res[0].tableData)
                            resArr.some(item=>{
                                if(item.name==name&&item.typeNmae==type){
                                    item.time = res[0].date
                                    item.No = res[0].No
                                    item.username = res[0].name
                                    arr.push(item)
                                    ctx.body={
                                        state:200,
                                        arr
                                    }
                                }
                            })
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }           
                    }
                }else{
                    // 有No、name没有username、type
                    if(timeStart&&timeEnd){
                    // 有No、name、timeStart、timeEnd没有username、type
                        console.log("有No、name、timeStart、timeEnd没有username、type")                            
                        let res = await db.find("delivery",{No:No,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            let resArr = JSON.parse(res[0].tableData)
                            resArr.some(item=>{
                                if(item.name==name){
                                    item.time = res[0].date
                                        item.No = res[0].No
                                        item.username = res[0].name
                                        arr.push(item)
                                        ctx.body={
                                            state:200,
                                            arr
                                        }
                                }
                            })
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }                               
                                                
                    }else{
                    // 有No、name没有username、type、timeStart、timeEnd
                        console.log("有No、name没有username、type、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{No:No})
                        if(res.length!=0){
                            let arr = []
                            let resArr = JSON.parse(res[0].tableData)
                            resArr.some(item=>{
                                if(item.name==name){
                                    item.time = res[0].date
                                        item.No = res[0].No
                                        item.username = res[0].name
                                        arr.push(item)
                                        ctx.body={
                                            state:200,
                                            arr
                                        }
                                }
                            })
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }           
                    }
                }
            }else{
                // 有No没有username、name
                if(type){
                    // 有No、type没有username、name 
                    if(timeStart&&timeEnd){
                    // 有No、type、timeStart、timeEnd没有username、name 
                        console.log("有No、type、timeStart、timeEnd没有username、name")                            
                        let res = await db.find("delivery",{No:No,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            let resArr = JSON.parse(res[0].tableData)
                            resArr.some(item=>{
                                if(item.typeNmae==type){
                                    item.time = res[0].date
                                        item.No = res[0].No
                                        item.username = res[0].name
                                        arr.push(item)
                                        ctx.body={
                                            state:200,
                                            arr
                                        }
                                }
                            })
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }                              
                                                
                    }else{
                    // 有No、type没有username、name、timeStart、timeEnd
                        console.log("有No、type没有username、name、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{No:No})
                        if(res.length!=0){
                            let arr = []
                            let resArr = JSON.parse(res[0].tableData)
                            resArr.some(item=>{
                                if(item.typeNmae==type){
                                    item.time = res[0].date
                                        item.No = res[0].No
                                        item.username = res[0].name
                                        arr.push(item)
                                        ctx.body={
                                            state:200,
                                            arr
                                        }
                                }
                            })
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }           
                    }
                }else{
                    // 有No没有username、name、type
                    if(timeStart&&timeEnd){
                    // 有No、timeStart、timeEnd没有username、name、type
                        console.log("有No、timeStart、timeEnd没有username、name、type")                            
                        let res = await db.find("delivery",{No:No,date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            let resArr = JSON.parse(res[0].tableData)
                            resArr.forEach(item => {
                                item.No = res[0].No
                                item.username = res[0].name
                                item.time = res[0].date
                                arr = resArr
                            });
                            ctx.body={
                                state:200,
                                arr
                            }
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }                                   
                                                    
                    }else{
                    // 有No没有username、name、type、timeStart、timeEnd
                        console.log("有No没有username、name、type、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{No:No})
                        if(res.length!=0){
                            let arr = []
                            let resArr = JSON.parse(res[0].tableData)
                            resArr.forEach(item => {
                                item.No = res[0].No
                                item.username = res[0].name
                                item.time = res[0].date
                                arr = resArr
                            });
                            ctx.body={
                                state:200,
                                arr
                            }
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            }
                        }                  
                    }
                }
            }
        }else{
            // 没有username、No
            if(name){
                // 有name没有username、No
                if(type){
                // 有name、type没有username、No
                    if(timeStart&&timeEnd){
                    // 有name、type、timeStart、timeEnd没有username、No
                        console.log("有name、type、timeStart、timeEnd没有username、No")                            
                        let res = await db.find("delivery",{date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    // console.log("看看",item.name)
                                    if(item.name==name&&item.typeNmae==type){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username =res[i].name
                                        arr.push(item)
                                    }
                                })

                            }
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            } 
                        }                        
                                                        
                    }else{
                    // 有name、type没有username、No、timeStart、timeEnd
                        console.log("有name、type没有username、No、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    // console.log("看看",item.name)
                                    if(item.name==name&&item.typeNmae==type){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username =res[i].name
                                        arr.push(item)
                                    }
                                })

                            }
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            } 
                        }                       
                    }
                }else{
                // 有name没有username、No、type
                    if(timeStart&&timeEnd){
                    // 有name、timeStart、timeEnd没有username、No、type
                        console.log("有name、timeStart、timeEnd没有username、No、type")                            
                        let res = await db.find("delivery",{date:{'$gte':timeStart,'$lte':timeEnd}})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    if(item.name==name){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username =res[i].name
                                        arr.push(item)
                                    }
                                })

                            }
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            } 
                        }                                                   
                                                        
                    }else{
                    // 有name没有username、No、type、timeStart、timeEnd
                        console.log("有name没有username、No、type、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    if(item.name==name){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username =res[i].name
                                        arr.push(item)
                                    }
                                })

                            }
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            } 
                        }                
                    }
                }
            }else{
                // 没有username、No、name
                if(type){
                // 有type没有username、No、name
                    if(timeStart&&timeEnd){
                    // 有type、timeStart、timeEnd没有username、No、name
                     console.log("有type、timeStart、timeEnd没有username、No、name")                            
                     let res = await db.find("delivery",{date:{'$gte':timeStart,'$lte':timeEnd}})
                     if(res.length!=0){
                         let arr = []
                         for(let i=0;i<res.length;i++){
                             let resArr = JSON.parse(res[i].tableData)
                             resArr.some(item=>{
                                 if(item.typeNmae==type){
                                     item.time = res[i].date
                                     item.No = res[i].No
                                     item.username =res[i].name
                                     arr.push(item)
                                 }
                             })

                         }
                         ctx.body={
                             state:200,
                             arr
                         }
                         next()
                     }else{
                         ctx.body={
                             state:404,
                             msg:"没有找到"
                         } 
                     }                                              
                                                        
                    }else{
                     // 有type没有username、No、name、timeStart、timeEnd
                        console.log("有type没有username、No、name、timeStart、timeEnd")                            
                        let res = await db.find("delivery",{})
                        if(res.length!=0){
                            let arr = []
                            for(let i=0;i<res.length;i++){
                                let resArr = JSON.parse(res[i].tableData)
                                resArr.some(item=>{
                                    if(item.typeNmae==type){
                                        item.time = res[i].date
                                        item.No = res[i].No
                                        item.username =res[i].name
                                        arr.push(item)
                                    }
                                })
   
                            }
                            ctx.body={
                                state:200,
                                arr
                            }
                            next()
                        }else{
                            ctx.body={
                                state:404,
                                msg:"没有找到"
                            } 
                        }                    
                    }
                }else{
                // 没有username、No、name、type
                    if(timeStart&&timeEnd){
                    // 有timeStart&&timeEnd没有username、No、name、type
                        console.log("有timeStart&&timeEnd没有username、No、name、type")                            
                        let res = await db.find("delivery",{date:{'$gte':timeStart,'$lte':timeEnd}})
                     if(res.length!=0){
                         let arr = []
                         for(let i=0;i<res.length;i++){
                             let resArr = JSON.parse(res[i].tableData)
                             resArr.forEach(item=>{
                                    item.time = res[i].date
                                    item.No = res[i].No
                                    item.username = res[i].name
                                    arr.push(item)
                            })

                         }
                         ctx.body={
                             state:200,
                             arr
                         }
                         next()
                     }else{
                         ctx.body={
                             state:404,
                             msg:"没有找到"
                         } 
                     }                                                  
                    }
                }
            }
        }
    };
    // 封装返回结果
    /**
     * @param state==200 查询成功
     * @param state==404 查询失败
     */
  function reslutObj(res){
        if(res.length!=0){
            let resArr = JSON.parse(res[0].tableData)
            let arr = []
            resArr.some(item=>{
                 if(item.name==name&&item.typeNmae==type){
                     console.log("变",item)
                     item.time = res[0].date
                     item.No = No
                     item.username = username
                     
                     arr.push(item)
                     ctx.body = {
                         state:200,
                         arr
                     }
                     next()
                 }
             })
        }else{
            ctx.body={
                state:404,
                msg:"没有找到"
            }
        }
    };

})

// console.log("看看")
module.exports = router;