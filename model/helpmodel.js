const sqlpool = require("./sqlpool");
module.exports = {
    help:(text,callback)=>{
        let sql = `SELECT * FROM xsj.help;`;
        let b=[text];
        sqlpool.query(sql,b,callback);
    },
    /*查询具体活动图片列表*/
// ImgControlle : (id,callback)=>{
//     let sql = "SELECT * FROM activity_img WHERE activity_id = ?"
//     let param = [id];
//     sqlPool.query(sql,param,callback);
// }



};




