const db = require("./sqlpool");
module.exports = {
    gift:(arr,callback)=>{
        let sql = 'SELECT * FROM goods  INNER JOIN goods_att  ON goods.goods_id = goods_att.goods_id INNER JOIN goodspic ON goods.goods_id =goodspic.goods_id  WHERE MASTER=1 AND img_id=1;'
        db.sqlpool(sql,arr,callback);
    }
};




