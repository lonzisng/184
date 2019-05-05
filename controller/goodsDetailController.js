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
    },
    addToCard:(req,res)=>{
        if(req.session.userName){
            console.log(req.session.userName);
            let userId=req.session.userName[0].user_id,
                goodsId=req.body.goodsId,
                attId=req.body.sortId,
                num=req.body.amount;
                console.log(userId,goodsId,attId,num);
            goodsDetailModel.searchCard(userId,goodsId,attId,(err,data)=>{
                if(!err){
                    if(data<0){
                        goodsDetailModel.addToCard(userId,goodsId,attId,num,(err,data)=>{
                            console.log(err);
                            if(!err){
                                if(data.affectedRows==1){
                                    res.send({code:200,msg:"ok"});
                                }else{res.send({code:600,msg:"数据操作失败"}); }
                            }else{res.send({code:700,msg:"数据库操作失败"});}
                        })
                    }else{res.send({code:-200,msg:"购物车已存在该商品"});}
                }else{res.send({code:700,msg:"数据库操作失败"});}
            })
        }else{res.send({code:-100,msg:"unlogin"});}
        
    }
}