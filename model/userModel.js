const db = require("./sqlpool");

module.exports = {
    //全部订单
    orderList(id,callback){
        let sql="SELECT ol.create_time,od.order_no,\n" +
            "ol.order_id ,pic.route,pic.master,\n" +
            "goods.goods_name,goods.resume,\n" +
            "od.goods_Price,od.goods_num,\n" +
            "od.total_price,od.state,ol.postage\n" +
            "FROM order_list AS ol ,\n" +
            "USER AS u,\n" +
            "order_details AS od ,\n" +
            "goods,goodspic AS pic,\n" +
            "goods_att AS ga\n" +
            "WHERE u.user_id=1\n" +
            "AND u.user_id=ol.user_id\n" +
            "AND  u.user_id=od.user_id\n" +
            "AND ol.order_id=od.order_no\n" +
            "AND goods.goods_id=od.goods_id \n" +
            "AND goods.goods_id=ga.goods_id\n" +
            "AND ga.imge_id=pic.goods_id\n" +
            "AND ol.order_id=pic.order_id\n" +
            "AND goods.goods_id=pic.goods_id\n" +
            "AND pic.master=1";
        db.sqlpool(sql,[id],callback);
    },
    //收藏
    CollectionList(id,callback){
        let sql="\n" +
            "SELECT * FROM USER AS u,collect_table AS ct, \n" +
            "            goods AS gd,goods_att AS gt,goodspic AS pic\n" +
            "            WHERE u.user_id=1\n" +
            "            AND  u.user_id=ct.user_id\n" +
            "            AND gd.goods_id=ct.goods_id\n" +
            "            AND gd.goods_id =gt.goods_id\n" +
            "            AND gd.goods_id=pic.goods_id\n" +
            "            AND gt.imge_id=pic.id\n" +
            "            AND pic.master=1\n";
        db.sqlpool(sql,[id],callback);
    },
    //全部地址
    AddressList(id,callback){
        let sql="\n" +
            "\n" +
            "SELECT * FROM address AS ad,USER AS u\n" +
            " WHERE  u.user_id=?\n" +
            "  AND ad.user_id=u.user_id";
        db.sqlpool(sql,[id],callback);
    },
    //文章
    getArticleList(id,callback){
        let sql="SELECT * FROM USER AS u ,article AS ar\n" +
            "WHERE u.user_id=? and u.user_id=ar.user_id";
        db.sqlpool(sql,[id],callback);
    },
    //账号信息
    getArticleList(id,callback){
        let sql="SELECT * FROM USER AS u \n" +
            "WHERE u.user_id=? ";
        db.sqlpool(sql,[id],callback);
    },
    //订单状态
    getState(state,id,callback){
        let sql="UPDATE order_details AS od SET state=?+1 WHERE user_id=? ";
        db.sqlpool(sql,[state,id],callback);
    },

    //添加地址
    getAddAddress(id,people,number,pro,city,county,detailsAddress,callback){
        let time=new Date();
        let sql="insert into address values(null,?,?,?,null,?,?,?,?,'0',?,1)";
        console.log(sql);
        db.sqlpool(sql,[id,people,number,pro,city,county,detailsAddress,time],callback);
    }
};
