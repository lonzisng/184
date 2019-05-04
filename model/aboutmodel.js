const db = require("./sqlpool");
module.exports = {
    about:(banner,callback)=>{
        let sql = `SELECT * FROM advertisement where attr='aboutUs'`;
        console.log(sql);
        db.sqlpool(sql,[banner],callback); 
    },
    /*查询具体活动图片列表*/
// ImgControlle : (id,callback)=>{
//     let sql = "SELECT * FROM activity_img WHERE activity_id = ?"
//     let param = [id];
//     sqlPool.query(sql,param,callback);
// }
};




