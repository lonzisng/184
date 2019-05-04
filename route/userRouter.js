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
userRouter.post("/collection.do",userController.getCollectionList);
userRouter.post("/address.do",userController.getAddressList);
userRouter.post("/article.do",userController.getArticleList);
userRouter.post("/count.do",userController.getCount);
userRouter.post("/state.do",userController.getState);

module.exports=userRouter;