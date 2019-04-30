"use strict";
const myEx = require("express");
const ejs = require("ejs");
const logger = require("morgan");
const bodyparser = require("body-parser");
const favicon = require("serve-favicon");
const mysession = require("express-session");
const cookieParser = require("cookie-parser");
const app = myEx();
// 连接路由
const unloginRouter = require("./router/unloginRouter");
const allProductsRouter = require("./route/allProductsRouter");
// const goodsRouter = require("./route/goodsRouter");


// 服务配置
app.use(logger("dev"));
app.use(favicon(__dirname + "/public/favicon.ico"));
app.set("views",__dirname+"/view");
app.engine("html",ejs.__express);
app.set("view engine","html");
app.use(myEx.static(__dirname + "/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(mysession({
    name:"xsj",
    secret:"xsj123",
    cookie:{maxAge:600000},
    rolling:true,
    resave:true,
    saveUninitialized:true
}));


// 路由配置
app.use("/unlogin",unloginRouter);
app.use("/allProducts",allProductsRouter);
app.use("/*",(req,res,next)=>{
    if(req.session){
        next();
    }else{
        res.redirect("/login.html");
    }
})

// 服务监听
app.listen(8080, () => {
    console.log("服务已启动");
})