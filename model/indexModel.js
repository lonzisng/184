const db = require("./sqlpool");
module.exports = {
    banner:(callback)=>{
        console.log(111);
        let sql="SELECT banner FROM advertisement WHERE attr='index'";
        db.sqlpool(sql,[],callback);
    },
    explosion:(callback)=>{
        let sql="SELECT * FROM goodspic,goods,goods_att WHERE goodspic.goods_id = goods.goods_id AND goodspic.master=1 AND goodspic.goods_id = goods_att.goods_id AND goods_att.order_id=1";
        db.sqlpool(sql,[],callback);
    },
}