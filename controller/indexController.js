const db = require("../model/indexModel")
module.exports={
    banNer(req,res){

       db.banner((err,data)=>{
        if (!err) {
            db.explosion((err,date)=>{
                for(let i=0;i<data.length;i++){
                    data[i].banner="img"+data[i].banner;
                }
                for (let i=0;i<date.length;i++){
                    date[i].route="/img/goods"+date[i].route;
                }
                console.log(date);
                if(!err){
                    res.render("index.html",{data:data,date:date})
                }
            })
        }
    })
}
}