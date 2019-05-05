const db = require("./sqlpool");

module.exports={
    goods(goodsId,callback){
        let sql="SELECT * FROM goods JOIN goods_att ON goods.goods_id=goods_att.goods_id WHERE goods.goods_id = ? ";
        db.sqlpool(sql,[goodsId],callback);
    },
    review(goodsId,callback){
        let sql="SELECT * FROM goods JOIN goods_review ON goods.goods_id=goods_review.goods_id JOIN USER ON user.user_id=goods_review.user_id WHERE goods.goods_id = ? ";
        db.sqlpool(sql,[goodsId],callback);
    },
    goodspic(goodsId,callback){
        let sql="SELECT * FROM goods JOIN goodspic ON goods.goods_id=goodspic.goods_id WHERE goods.goods_id = ? ";
        db.sqlpool(sql,[goodsId],callback);
    },
    addToCard(userId,goodsId,attId,num,callback){
        let date = new Date();
        date = date.toLocaleString();
        let sql="insert into shopcard values(null,?,?,?,?,?,1);"
        db.sqlpool(sql,[goodsId,userId,attId,num,date],callback);
    },
    searchCard(userId,goodsId,attId,callback){
        let sql="select * from shopcard where goods_id=? and user_id=? and att_id=?";
        db.sqlpool(sql,[goodsId,userId,attId],callback);
    }
}