const db = require("./sqlpool");

module.exports = {
    orderList(callback){
        let sql="SELECT * FROM order_list AS ol,order_details AS od ,goods,goodspic AS pic,goods_att AS ga\n" +
            " WHERE ol.order_id=od.order_no\n" +
            "  AND goods.goods_id=od.goods_id \n" +
            "  AND goods.goods_id=ga.goods_id\n" +
            "  AND ga.imge_id=pic.goods_id \n" +
            "  AND ga.id=od.att_order\n" +
            "  AND pic.master=1";
        db.sqlpool(sql,[],callback);
    }
};
