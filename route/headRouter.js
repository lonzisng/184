const myEx = require("express");
const router = myEx.Router();
const headCon = require("../controller/headController");
const allProductsModel = require("../model/allProductsModel");

router.post("/search.do",headCon.search);
router.get("/login.html",(req,res)=>{
    res.redirect("/page/login.html");
});
router.get("/register.html",(req,res)=>{
    res.redirect("/page/registe.html");
});
router.get("/index.html",(req,res)=>{
    res.redirect("/index.html");
});
router.get("/allProducts.html",(req,res)=>{
    allProductsModel.banner((err,banner)=>{
        if(!err){
            if(banner.length>0){
                allProductsModel.splb((err,splb)=>{
                    if(!err){
                        if(splb.length>0){
                            allProductsModel.complex((err,goods)=>{
                                if(!err){
                                    if(goods.length>0){
                                        res.render("allProducts",{banner,splb,goods});
                                    }else{
                                        res.send({code:400,msg:"没有goods数据"});
                                    }
                                }else{
                                    res.send({code:600,msg:"splb数据读取错误"});
                                }
                            })
                        }else{
                            res.send({code:400,msg:"没有splb数据"});
                        }
                    }else{
                        res.send({code:600,msg:"splb数据读取错误"});
                    }
                })
            }else{
                res.send({code:400,msg:"没有banner数据"});
            }
        }else{
            res.send({code:600,msg:"banner数据读取错误"});
        }
    });
});
router.get("/giftGiving.html",(req,res)=>{
     res.redirect("/giftGiving.html");
});
router.get("/tasteDetective.html",(req,res)=>{
     res.redirect("/tasteDetective.html");
});
router.get("/aboutUs.html",(req,res)=>{
     res.redirect("/aboutUs.html");
});
router.get("/userCenter.html",(req,res)=>{
     res.redirect("/userCenter.html");
});
router.get("/help.html",(req,res)=>{
     res.redirect("/help.html");
});

module.exports = router;