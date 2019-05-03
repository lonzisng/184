const db = require("./sqlpool");
module.exports = {
    banner:(callback)=>{
        console.log(111);
        let sql="select banner from advertisement ";
        db.sqlpool(sql,[],callback);
    },
    explosion:(callback)=>{
        let sql="SELECT * FROM goodspic,goods,goods_att WHERE goodspic.goods_id = goods.goods_id AND goodspic.master>0";
        db.sqlpool(sql,[],callback);
    },
}