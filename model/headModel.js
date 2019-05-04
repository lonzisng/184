const db = require("./sqlpool");
module.exports = {
    search:(arr,callback)=>{
        let sql = "SELECT goods.goods_id AS id,goods.goods_name AS NAME,goods_att.price,goodspic.route AS src FROM goods JOIN goodspic ON goodsPic.goods_id = goods.goods_id JOIN goods_att ON goods.goods_id = goods_att.goods_id WHERE goodspic.master=1 AND goods_att.order_id=1  AND ( CONCAT( IFNULL(goods_name, ''),IFNULL(RESUME,''),IFNULL(details,''),IFNULL(label,'')) LIKE ? ";
        for(let i = 1;i<arr.length;i++){
            sql+="or CONCAT( IFNULL(goods_name, ''),IFNULL(RESUME,''),IFNULL(details,''),IFNULL(label,''))  LIKE ? ";
        }
        sql += ")";
        console.log(sql);
        db.sqlpool(sql,arr,callback);
    }
}