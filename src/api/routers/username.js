const Router = require("koa-router");
// 创建路由
const router = new Router();
//引入数据库
const db = require('../../db/database');
// 引入自定义的token文件
const token = require('../../utils/token');
// // 使用路由
router.post('/', async (ctx, next) => {
    //拿到前端传过来的数据
    let { username, password } = ctx.request.body;

    //把前端的数据以对象的形式插入goods集合
    let res = await db.find('userlist', { username, password });
    res = res[0]
    if (res) {
        if (res.username === username && res.password === password) {
            let _token = token.create(username);
            ctx.body = {
                status:200,
                token: _token,
                username: res.username,
                _id: res._id,
                character:res.character
            };
        } else {
            ctx.body = {
                status: 404,
                msg: "fail"
            }
        }
    } else {
        ctx.body = {
            status: 404,
            msg: "fail"
        }
    }
    next()

});


// router.get('/',async(ctx,next)=>{

//     let {username,password} = ctx.query;
//     console.log(ctx.query)
//     let res = await db.find('userlist',{username,password});
//   ctx.body = res

// })


module.exports = router;