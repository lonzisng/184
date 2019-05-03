const db = require("./sqlpool");
module.exports = {
    search:(arr,callback)=>{
        let sql = "select * from commodity,article where like ? ";
        for(let i =0;i<arr.length;i++){
            sql+=" or like ? ";
        }
        db.sqlpool(sql,arr,callback);
    }
}