const myEx = require("express");
const router = myEx.Router();
const headCon = require("../controller/headController");
const allProductsModel = require("../model/allProductsModel");

router.get("/head.html",(req,res)=>{
    let user = req.session.userName;
    res.render("head.html",user);
})
router.post("/head/search.do",headCon.search);
router.get("/index.html",(req,res)=>{
    res.redirect("/index.html");
});
router.get("/allProducts.html",(req,res)=>{
    allProductsModel.banner((err,banner)=>{
        console.log(err);
        if(!err){
            if(banner.length>0){
                allProductsModel.splb((err,splb)=>{
                    console.log(err);
                    if(!err){
                        if(splb.length>0){
                            allProductsModel.complex((err,goods)=>{
                                console.log(err);
                                if(!err){
                                    if(goods.length>0){
                                        console.log(banner,splb,goods);
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

module.exports = router;