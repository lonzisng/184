const myExpress= require("express");
const userRouter = myExpress.Router();
const userController = require("../controller/indexController")

userRouter.get("/", (req,res)=> {
    res.redirect("/index.html");
})
userRouter.get("/index.html",userController.banNer);
module.exports=userRouter;