const db = require("../model/indexModel")
module.exports={
    banNer(req,res){

       db.banner((err,data)=>{
        if (!err) {
            console.log(data);
            // data=>banner
            db.explosion((err,date)=>{
                for(let i=0;i<data.length;i++){
                    data[i].banner="img"+data[i].banner;
                }
                for (let i=0;i<date.length;i++){
                    date[i].route="/img/goods"+date[i].route;
                }
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