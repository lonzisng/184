const goodsDetailModel = require("../model/goodsDetailsModel");

module.exports={
    goods:(req,res)=>{
        let id = req.query.g;
        goodsDetailModel.goods(id,(err,goods)=>{
            if(!err){
                if(goods.length>0){
                    goodsDetailModel.goodspic(id,(err,pic)=>{
                        if(!err){
                            if(pic.length>0){
                                goodsDetailModel.review(id,(err,review)=>{
                                    if(!err){
                                        res.render("productDetails.html",{goods,pic,review});
                                    }else{console.log("review读取错误");}
                                })
                            }else{console.log("pic没有数据");}
                        }else{console.log("pic读取错误");}
                    })
                }else{console.log("goods没有数据");}
            }else{console.log("goods读取错误");}
        })
    }
}