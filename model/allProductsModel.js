const db = require("./sqlpool");

module.exports ={
    complex(callback){
        let sql="SELECT * FROM goods JOIN goodspic ON goodsPic.goods_id = goods.goods_id WHERE goods.state=1 AND goodspic.master=1 ORDER BY  goods.burst DESC , goods.volume DESC";
        db.sqlpool(sql,[],callback);
    },
    new(callback){
        let sql="SELECT * FROM goods JOIN goodspic ON goodsPic.goods_id = goods.goods_id WHERE goods.state=1 AND goodspic.master=1 ORDER BY goods.create_time DESC";
        db.sqlpool(sql,[],callback);
    },
    volume(callback){
        let sql="SELECT * FROM goods JOIN goodspic ON goodsPic.goods_id = goods.goods_id WHERE goods.state=1 AND goodspic.master=1 ORDER BY goods.volume DESC";
        db.sqlpool(sql,[],callback);
    },
    price(lower,upper,order,callback){
        let sql="SELECT * FROM goods JOIN goods_att ON goods.goods_id = goods_att.goods_id AND goods_att.order_id=1 JOIN goodspic ON goodsPic.goods_id = goods.goods_id WHERE goodspic.master=1";
        if(lower!=undefined){
            sql+=" and goods_att.price>? ";
        }
        if(upper!=undefined){
            sql+=" and goods_att.price<? ";
        }
        if(order!=undefined){
            if(order==1){
                sql+=" order by goods_att.price ASC";
            }else{
                sql+=" order by goods_att.price DESC";
            }
        }
        db.sqlpool(sql,[lower,upper,order],callback);
    }

}