const allProductsModel = require("../model/allProductsModel");

module.exports = {
    complex(req,res){
        allProductsModel.complex((err,data)=>{
            if(!err){
                if(data.length>0){
                    res.send({code:200,msg:"ok",data});
                }else{
                    res.send({code:600,msg:"数据读取错误"});
                }
            }else{
                res.send({code:700,msg:"数据库错误"});
            }
        });
    },
    new(req,res){
        allProductsModel.new((err,data)=>{
            if(!err){
                if(data.length>0){
                    res.send({code:200,msg:"ok",data});
                }else{
                    res.send({code:600,msg:"数据读取错误"});
                }
            }else{
                res.send({code:700,msg:"数据库错误"});
            }
        });
    },
    volume(req,res){
        allProductsModel.volume((err,data)=>{
            if(!err){
                if(data.length>0){
                    res.send({code:200,msg:"ok",data});
                }else{
                    res.send({code:600,msg:"数据读取错误"});
                }
            }else{
                res.send({code:700,msg:"数据库错误"});
            }
        });
    },
    price(req,res){
        let lower = req.body.lower,
            upper = req.body.upper,
            order = req.body.order;
        allProductsModel.price(lower,upper,order,(err,data)=>{
            if(!err){
                if(data.length>0){
                    res.send({code:200,msg:"ok",data});
                }else{
                    res.send({code:600,msg:"数据读取错误"});
                }
            }else{
                res.send({code:700,msg:"数据库错误"});
            }
        });
    },
    splbGoods(req,res){
        let id = req.body.id;
        allProductsModel.splbGoods(id,(err,data)=>{
            if(!err){
                if(data.length>0){
                    res.send({code:200,msg:"ok",data});
                }else{
                    res.send({code:600,msg:"数据读取错误"});
                }
            }else{
                res.send({code:700,msg:"数据库错误"});
            }
        })
    }
}