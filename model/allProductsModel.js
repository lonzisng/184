const db = require("./sqlpool");

module.exports ={
    complex(callback){
        let sql="SELECT goods.goods_id as id,goods.goods_name as name,goods_att.price,goodspic.route as src,goods.burst AS burst, goods.food AS food,goods.gift AS gift,goods.recommend AS recommend FROM goods JOIN goodspic ON goodsPic.goods_id = goods.goods_id JOIN goods_att ON goods.goods_id = goods_att.goods_id WHERE goods.state=1 AND goodspic.master=1 AND goods_att.order_id=1 and goods.state=1 ORDER BY  goods.burst DESC , goods.volume DESC";
        db.sqlpool(sql,[],callback);
    },
    new(callback){
        let sql="SELECT goods.goods_id as id,goods.goods_name as name,goods_att.price,goodspic.route as src,goods.burst AS burst, goods.food AS food,goods.gift AS gift,goods.recommend AS recommend FROM goods JOIN goodspic ON goodsPic.goods_id = goods.goods_id JOIN goods_att ON goods.goods_id = goods_att.goods_id WHERE goods.state=1 AND goodspic.master=1 AND goods_att.order_id=1 and goods.state=1 ORDER BY goods.create_time DESC";
        db.sqlpool(sql,[],callback);
    },
    volume(callback){
        let sql="SELECT goods.goods_id as id,goods.goods_name as name,goods_att.price,goodspic.route as src,goods.burst AS burst, goods.food AS food,goods.gift AS gift,goods.recommend AS recommend FROM goods JOIN goodspic ON goodsPic.goods_id = goods.goods_id JOIN goods_att ON goods.goods_id = goods_att.goods_id WHERE goods.state=1 AND goodspic.master=1 AND goods_att.order_id=1 and goods.state=1 ORDER BY goods.volume DESC";
        db.sqlpool(sql,[],callback);
    },
    price(lower,upper,order,callback){
        let sql="SELECT * FROM goods JOIN goods_att ON goods.goods_id = goods_att.goods_id AND goods_att.order_id=1 JOIN goodspic ON goodsPic.goods_id = goods.goods_id WHERE goods.state=1 and goodspic.master=1";
        if(lower!=undefined&&lower!=""){
            sql+=" and goods_att.price>? ";
        }
        if(upper!=undefined&&upper!=""){
            sql+=" and goods_att.price<? ";
        }
        if(order!=undefined){
            if(order==0){
                sql+=" order by goods_att.price ASC";
            }else{
                sql+=" order by goods_att.price DESC";
            }
        }
        console.log(sql);
        db.sqlpool(sql,[lower,upper,order],callback);
    },
    banner(callback){
        let sql="select sort,banner,target from advertisement where attr='allProducts' and state=1";
        db.sqlpool(sql,[],callback);
    },
    splb(callback){
        let sql="select id,splb_name as name from splb where state=1";
        db.sqlpool(sql,[],callback);
    },
    splbGoods(id,callback){
        let sql="SELECT goods.goods_id as id,goods.goods_name as name,goods_att.price,goodspic.route as src,goods.burst AS burst, goods.food AS food,goods.gift AS gift,goods.recommend AS recommend FROM goods JOIN goodspic ON goodsPic.goods_id = goods.goods_id JOIN goods_att ON goods.goods_id = goods_att.goods_id WHERE goods.state=1 AND goodspic.master=1 AND goods_att.order_id=1 and goods.state=1 and goods.splb_id=? ";
        db.sqlpool(sql,[id],callback);
    }
}