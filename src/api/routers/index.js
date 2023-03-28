//引入koa
const koa = require("koa");
// 引入路由
const Router = require("koa-router");

//引入koa-body用于请求头的操作
const koaBody = require('koa-body');
//创建路由
const router = new Router();

const userRouter = require('./username');
const materialgoodsRouter = require('./material/materialgoods');
const edithistoryRouter = require('./material/edithistory');
const edithardwareRouter = require('./material/edithardware');
const materialaddgoodsRouter = require('./material/addgoods');
const materialmessageRouter = require('./material/materialmessage');
const deliverylistRouter = require('./material/deliverylist');
const deletematerialRouter = require('./material/deletematerial');
const deletehardwareRouter = require('./material/deletehardware');
const materialsearchRouter = require('./material/materialsearch');
const replenishmentRouter = require('./material/replenishment');
const listRouter = require('./list');
const ckAddRouter = require('./ckAdd');
const goodsnameRouter = require('./goodsname');
const goodsnumRouter = require('./goodsnum');
const addgoodsRouter = require('./addgoods');
const addhistoryRouter = require('./addhistory');
const historyListRouter = require('./historyList');
const findHistoryRouter = require('./findHistory');
const findSearchRouter = require('./findSearch');
const delRouter = require('./del');
const basicsRouter = require('./basics');
const updateRouter = require('./update');
const allRouter = require('./all');
const searchRouter = require('./search');
const cksearchRouter = require('./cksearch');
const saveRouter = require('./save');
const ckfindRouter = require('./ckFind');
const updateHistoryRouter = require('./updateHistory');
const loseRouter = require('./lose');
const delgoodsRouter = require('./delgoods');
const msgRouter = require('./msg');
const delMsgRouter = require('./delMsg');
const updatemsgRouter = require('./updateMsg');
const searchMsgRouter = require('./searchMsg');
const billSearchRouter = require('./billSearch');
const findbillRouter = require('./findbill');
const findMoneyRouter = require('./findMoney');
const billMoneyRouter = require('./billMoney');
const exportfileRouter = require('./exportfile');

const tokenVerify = require('./tokenverify');
// 使用koa-body
router.use(koaBody({
    multipart:true,
    formidable:{
        // 指定保存路径
        uploadDir:'./uploads',
        keepExtensions:true,
        // 改文件名
        onFileBegin(filename,file){
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
        }
    }
    
}))
router.use('/user',userRouter.routes())
router.use('/materialgood',materialgoodsRouter.routes())
router.use('/materialaddgood',materialaddgoodsRouter.routes())
router.use('/editmaterialhistory',edithistoryRouter.routes())
router.use('/edithardware',edithardwareRouter.routes())
router.use('/deliverylist',deliverylistRouter.routes())
router.use('/deletematerial',deletematerialRouter.routes())
router.use('/deletehardware',deletehardwareRouter.routes())
router.use('/materialsearch',materialsearchRouter.routes())
router.use('/materialmessage',materialmessageRouter.routes())
router.use('/replenishment',replenishmentRouter.routes())
router.use('/billmoney',billMoneyRouter.routes())
router.use('/exportfile',exportfileRouter.routes())
router.use('/findmoney',findMoneyRouter.routes())
router.use('/findbill',findbillRouter.routes())
router.use('/billsearch',billSearchRouter.routes())
router.use('/updatemsg',updatemsgRouter.routes())
router.use('/delMsg',delMsgRouter.routes())
router.use('/msg',msgRouter.routes())
router.use('/searchMsg',searchMsgRouter.routes())
router.use('/delgoods',delgoodsRouter.routes())
router.use('/lose',loseRouter.routes())
router.use('/save',saveRouter.routes())
router.use('/ckadd',ckAddRouter.routes())
router.use('/goods',listRouter.routes())
router.use('/goodsname',goodsnameRouter.routes())
router.use('/goodsnum',goodsnumRouter.routes())
router.use('/all',allRouter.routes())
router.use('/kcsearch',searchRouter.routes())
router.use('/cksearch',cksearchRouter.routes())
router.use('/basicsss',basicsRouter.routes())
router.use('/delList',delRouter.routes())
router.use('/addgoods',addgoodsRouter.routes())
router.use('/addhistory',addhistoryRouter.routes())
router.use('/findHistory',findHistoryRouter.routes())
router.use('/update',updateRouter.routes())
router.use('/findList',historyListRouter.routes())
router.use('/findSearch',findSearchRouter.routes())
router.use('/ckfind',ckfindRouter.routes())
router.use('/updatehistory',updateHistoryRouter.routes())
router.use('/token',tokenVerify.routes());
// 把router暴露出去
module.exports = router;
