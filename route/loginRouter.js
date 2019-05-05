const myExpree = require("express");  //引入模块
const loginController = require("../controller/loginController");  //引入控制
const loginRouter = myExpree.Router();

loginRouter.post("/regis.do",loginController.verificationCode);       //获取验证码
loginRouter.post("/verify.do",loginController.verify);              //注册验证短信
loginRouter.post("/userForm.do",loginController.landingVerification);              //验证登陆的账号密码
loginRouter.post("/commodity.do",loginController.orderGoods);     //去获取用户全部商品的订单  并且分页
loginRouter.post("/zhuxiao.do",loginController.zhuxiao);    //用户退出
loginRouter.post("/delete.do",loginController.shanchu);    //删除商品
loginRouter.post("/Nuber.do",loginController.zeng);    //商品数量增加
loginRouter.post("/shoucang.do",loginController.shou);    //加入收藏
loginRouter.post("/dizhi.do",loginController.dizhi);    //获取地址
loginRouter.post("/order.do",loginController.order);    //提交订单
loginRouter.post("/Paywsd.do",loginController.Paywsd);    //验证支付密码
loginRouter.post("/orderDetails.do",loginController.orderDetails);    //提交订单详情
module.exports = loginRouter;  //暴露出去路由
