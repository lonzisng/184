/*jshint esversion:6*/
//严格模式
'use static';

const aboutmodel = require("../model/aboutmodel");

module.exports = {
    aboutControlle : (request,response) => {
        let a=request.src;
        aboutmodel.about(a,(err,data)=>{
            console.log(data);
            if(!err){
                if(data.length > 0){
                    response.render('aboutUs.html',{data});
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
