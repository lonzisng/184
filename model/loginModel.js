const db = require("./sqlPool");  //引入数据库查询

module.exports = {
    //注册账号
    addUser(phone,pwd,callback){
        let time = new Date();
        let user = "xsj"+time.getTime();
        let sql = `insert into user values(null,?,?,?,?,?,?,?,?,?,?,?,?)`;
        let craetedate = time.toLocaleString();
        db.sqlpool().query(sql,[user,"",pwd,"default","",phone,time,"","","",craetedate,1],callback);
    },

    //验证登陆
    login(phone,pwd,callback){
        let sql = "SELECT * FROM USER WHERE (phone=? AND pwd=?) OR (USER=? AND pwd=?) ";
        db.sqlpool().query(sql,[phone,pwd,phone,pwd],callback);
    },

    //获取用户订单中的全部商品
    orderGoods(name,currentPage,pageSize,callback){
        let sql = "SELECT * FROM shopcard JOIN goods_att JOIN goodspic JOIN goods ON user_id=? AND shopcard.goods_id = goods_att.goods_id AND goods_att.imge_id=goodspic.id AND shopcard.goods_id=goods.goods_id";
        let arr = [];
        let start = (currentPage-1)*pageSize;
            pageSize = Number(pageSize);
        arr.push(name);
        arr.push(start);
        arr.push(pageSize);
        db.sqlpool().query(sql,arr,callback);
    }

};