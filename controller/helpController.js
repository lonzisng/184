/*jshint esversion:6*/
//严格模式
'use static';

const db = require("../model/helpmodel");

module.exports = {
    helpControlle : (request,response) => {
        let a=request.src;
        let b=request.text;
        db.help([a,b],(err,data)=>{
            console.log(data);
            if(!err){
                if(data.length > 0){
                    response.render('help.html',{data});
                }
            }else{
                console.log(err);
            }
        });
    },







    // ImgControlle : (request,response) => {
    //     let id = request.body.id;
    //     activeModel.ImgControlle(id,(err,data)=>{
    //         if(!err){
    //             if(data.length > 0){
    //                 response.send(data);
    //             }
    //         }else{
    //             console.log(err);
    //         }
    //     })
    // }

};
