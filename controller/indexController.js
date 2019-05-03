const db = require("../model/indexModel")
module.exports={
    banNer(req,res){

       db.banner((err,data)=>{
        if (!err) {
            console.log(data);
            // data=>banner
            for(let i=0;i<data.length;i++){
                data[i].banner="img"+data[i].banner;
            }
            db.explosion((err,date)=>{
                console.log(err);
                console.log(date);
                // data=>food
                if(!err){
                   //data->explosin
                    res.render("index.html",{data:data,date:date})
                }
            })
        }
    })
}
}