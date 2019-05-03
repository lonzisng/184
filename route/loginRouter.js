const myExpree = require("express");  //引入模块
const loginController = require("../controller/loginController");  //引入控制
const loginRouter = myExpree.Router();

loginRouter.post("/regis.do",loginController.verificationCode);       //获取验证码
loginRouter.post("/verify.do",loginController.verify);              //注册验证短信
loginRouter.post("/userForm.do",loginController.landingVerification);              //验证登陆的账号密码
loginRouter.post("/commodity.do",loginController.orderGoods);     //去获取用户全部商品的订单  并且分页
loginRouter.post("/zhuxiao.do",loginController.zhuxiao);    //用户退出
module.exports = loginRouter;  //暴露出去路由
