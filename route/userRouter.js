/**
 * @Description:
 * @author WXH
 * @date 2019/04/29 15:50:24
*/

const myExpress=require("express");
const userController=require("../controller/userController");
const userRouter=myExpress.Router();
//用户路由
userRouter.post("/order.do",userController.getOrderList);

module.exports=userRouter;