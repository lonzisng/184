const headModel = require("../model/headModel");
module.exports= {
    search(req,res){
        let arr=[];
        for (const key in req.body) {
            arr[key] = "%"+req.body[key]+"%";
        }
        headModel.search(arr,(err,data)=>{
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