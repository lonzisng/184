/*jshint esversion:6*/
//严格模式
'use static';

const db = require("../model/giftmode");

module.exports = {
    gift(req,res){
        db.gift((err,data)=>{
            console.log(data);
            if(!err){
                if(data.length>0){
                    res.render('giftGiving.html',{data});
                }else{
                    res.send({code:600,msg:"数据读取错误"});
                }
            }else{
                res.send({code:700,msg:"数据库错误"});
            }
        });
    }
};
