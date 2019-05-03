const unloginModel = require("../model/headModel");
module.exports= {
    search(req,res){
        let arr=req.body.arr;
        unloginModel.search(arr,(err,data)=>{
            if(!err){
                if(data.length>0){
                    res.send(data);
                }else{
                    res.send({code:600,message:"数据读取失败"});
                }
            }else{
                res.send({code:700,message:"数据库错误"});
            }
        })
    }
}