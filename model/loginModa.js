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
        let sql = `SELECT shopcard.id,goods_att.stock,shopcard.goods_id,goodspic.route,goods.name,goods_att.price,shopcard.Shop_Num FROM shopcard JOIN goods_att JOIN goodspic JOIN goods ON user_id=? AND shopcard.att_id = goods_att.specification  
            AND shopcard.goods_id = goods_att.goods_id AND goods_att.imge_id=goodspic.id 
            AND shopcard.goods_id=goods.goods_id AND shopcard.state=1`;
        let arr = [];
        let start = (currentPage-1)*pageSize;
            pageSize = Number(pageSize);
        arr.push(name);
        arr.push(start);
        arr.push(pageSize);
        db.sqlpool().query(sql,arr,callback);
    },

    //删除商品
    shanchu(goodsId,userId,callback){
        let sql = "UPDATE shopcard SET state=0 WHERE id=? and user_id=? " ;
        db.sqlpool().query(sql,[goodsId,userId],callback);
    },

    //增加商品
    zengjia(Nuber,goods,userId,callback){
        let sql = "UPDATE shopcard SET Shop_Num=? WHERE user_id=? AND id=?";
        db.sqlpool().query(sql,[Nuber,userId,goods],callback);
    },

    //加入收藏
    shou(goodsId,userId,callback){
        let data = new Date(),
            craetedate = data.toLocaleString();
        let sql = "INSERT INTO collect_table VALUES (?,?,?,?,?)";
        db.sqlpool().query(sql,[null,userId,goodsId,craetedate,1],callback)
    },

    //获取用户地址
    dizhi(userId,callback){
        let sql = "SELECT * FROM address WHERE user_id=? AND receiver_state=1 ";
        db.sqlpool().query(sql,[userId],callback);
    },

    //提交订单
    order(goodsId,userId,stock,price,Shop_Num,zongjia,dizhi,callback){
        let Time = new Date(),
            data = Time.toDateString();
        let danhao = Time.getTime();
        let sql = `INSERT INTO order_list 
         (order_id,user_id,order_no,payment,address_id,payment_type,postage,Courier_num,STATUS,payment_time,send_time,end_time,close_time,create_time) 
          VALUES 
         (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.sqlpool().query(sql,[null,userId,danhao,zongjia,dizhi,2,12,"",1,data,data,data,data,data],callback);
    },

    //验证支付密码
    Paywsd(pwd,userId,callback){
        let sql = "SELECT * FROM USER WHERE user_id=? AND paypwd=? ";
        db.sqlpool().query(sql,[userId,pwd],callback)
    }

};