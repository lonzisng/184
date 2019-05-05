// const userModal = require("../modal/articleModal");
// module.exports = {
//     getUserList(req, res) {
//         userModal.getuserList((err, data) => {
//             // console.log(data);
//             if (!err) {
//                 // console.log(1111);
//                 userModal.getsplbList((err, splb) => {
//                     // console.log(data);
//                     if (!err) {
//                         res.render("tasteDetective.html", {data, splb});
//                         // res.send({code:-1,message:"数据库"});
//                     }
//                 });
//             } else {
//                 res.send({code: -1, message: "数据库出错"});
//             }
//         });
//     },
//     getArticle(req, res) {
//         let id=req.query.a;
//         console.log(id);
//         // userModal.articleList((err, data) => {
//         //     console.log(data);
//         //     if (!err) {
//         //         // console.log(1111);
//         //         userModal.getsplbList((err, splb) => {
//         //             console.log(data);
//         //             if (!err) {
//         //                 res.render("tasteDetective.html", {data, splb});
//         //                 // res.send({code:-1,message:"数据库"});
//         //             }
//         //         });
//         //     } else {
//         //         res.send({code: -1, message: "数据库出错"});
//         //     }
//         //
//         // });

//     }
// }
const userModal = require("../model/articleModel");
module.exports = {
    getUserList(req, res) {
        userModal.getuserList((err, data) => {
            // console.log(data);
            if (!err) {
                // console.log(1111);
                userModal.getsplbList((err, splb) => {
                    // console.log(data);
                    if (!err) {
                        res.render("tasteDetective.html", {data, splb});
                        // res.send({code:-1,message:"数据库"});
                    }
                });
            } else {
                res.send({code: -1, message: "数据库出错"});
            }
        });
    },
    getArticle(req, res) {
        let id=req.query.a;
        console.log(id);
        userModal.articleList(id,(err,data)=>{
            if(!err){
                res.render("flavorDetails.html", {data});
            }else{
                res.send({code: -1, message: "数据库出错"});
            }
        })

    }
}
