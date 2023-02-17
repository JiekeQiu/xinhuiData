//引入koa
const koa = require("koa");
const static = require('koa-static');
let routers = require('./api/routers')

const app = new koa();

app.use(static('./'));
app.use(routers.routes())
app.listen('18883',()=>{
    console.log("服务器启动成功：http://localhost:18883")
})