const db = require("./sqlpool");
module.exports = {
    login:(arr,callback)=>{
        let sql = "select * from user where user=? and user_pwd=?";
        db.sqlpool(sql,arr,callback);
    },
    banner:(arr,callback)=>{
        let sql = "select good_id,count(1) from goodspic where order_id,count(1)";
        db.sqlpool(sql,arr,callback);
    }
}