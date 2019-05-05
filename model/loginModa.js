const db = require("./sqlPool");  //引入数据库查询

module.exports = {
    //注册账号
    addUser(phone,pwd,callback){
        let time = new Date();
        let user = "xsj"+time.getTime();
        let sql = `insert into user values(null,?,?,?,?,?,?,?,?,?,?,?,?)`;
        let craetedate = time.toLocaleString();
        db.sqlpool(sql,[user,"",pwd,"default","",phone,time,"","","",craetedate,1],callback);
    },

    //验证登陆
    login(phone,pwd,callback){
        let sql = "SELECT * FROM USER WHERE (phone=? AND pwd=?) OR (USER=? AND pwd=?) ";
        db.sqlpool(sql,[phone,pwd,phone,pwd],callback);
    },

    //获取用户订单中的全部商品
    orderGoods(name,currentPage,pageSize,callback){
        let sql = `SELECT goods_att.order_id,shopcard.goods_id,goods_att.stock,shopcard.goods_id,goodspic.route,goods.goods_name,goods_att.price,shopcard.Shop_Num FROM shopcard JOIN goods ON shopcard.goods_id=goods.goods_id JOIN goods_att ON ( shopcard.att_id=goods_att.order_id AND goods.goods_id=goods_att.goods_id ) JOIN goodspic ON goods.goods_id=goodspic.goods_id WHERE goodspic.order_id=goods_att.img_id AND shopcard.user_id= ? ;`;
        let arr = [];
        let start = (currentPage-1)*pageSize;
            pageSize = Number(pageSize);
        arr.push(name);
        arr.push(start);
        arr.push(pageSize);
        db.sqlpool(sql,arr,callback);
    },

    //删除商品
    shanchu(goodsId,userId,callback){
        let sql = "UPDATE shopcard SET state=0 WHERE id=? and user_id=? " ;
        db.sqlpool(sql,[goodsId,userId],callback);
    },

    //增加商品
    zengjia(Nuber,goods,userId,callback){
        let sql = "UPDATE shopcard SET Shop_Num=? WHERE user_id=? AND id=?";
        db.sqlpool(sql,[Nuber,userId,goods],callback);
    },

    //加入收藏
    shou(goodsId,userId,callback){
        let data = new Date(),
            craetedate = data.toLocaleString();
        let sql = "INSERT INTO collect_table VALUES (?,?,?,?,?)";
        db.sqlpool(sql,[null,userId,goodsId,craetedate,1],callback)
    },

    //获取用户地址
    dizhi(userId,callback){
        let sql = "SELECT * FROM address WHERE user_id=? AND receiver_state=1 ";
        db.sqlpool(sql,[userId],callback);
    },

    //提交订单
    order(goodsId,userId,stock,price,Shop_Num,zongjia,dizhi,callback){
        let Time = new Date(),
            data = Time.toLocaleString();   //当前时间
        let danhao = Time.getTime();     //自动生成单号
        let arr=[];
        let sql = `INSERT INTO order_list 
         (order_id,user_id,order_no,payment,address_id,payment_type,postage,Courier_num,STATUS,payment_time,send_time,end_time,close_time,create_time) 
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        for (let i=1; i<goodsId.length;i++){
            sql +=",(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        }
        for (let j=0;j<goodsId.length;j++){
            arr.push(null,userId,danhao,zongjia,dizhi,2,12,"",1,data,data,data,data,data);
        }
        db.sqlpool(sql,arr,callback);
},

    //验证支付密码
    Paywsd(pwd,userId,callback){
        let sql = "SELECT * FROM USER WHERE user_id=? AND paypwd=? ";
        db.sqlpool(sql,[userId,pwd],callback)
    },

    //提交订单详情
    orderDetails(userid,goodsid,attid,shopNum,price,zongjia,callback){
        let Time = new Date(),
            data = Time.toLocaleString();   //当前时间
        let arr=[];
        let sql = `INSERT INTO order_details 
         (id,user_id,order_no,goods_id,att_order,goods_num,goods_Price,total_price,create_time,state) 
          VALUES (?,?,?,?,?,?,?,?,?,?) `;
        for (let i=1; i<goodsid.length;i++){
            sql +=",(?,?,?,?,?,?,?,?,?,?)";
        }
        for (let j=0;j<goodsid.length;j++){
            arr.push(null,userid,goodsid[j],goodsid[j],attid[j],shopNum[j],price[j],zongjia,data,2);
        }
        db.sqlpool(sql,arr,callback);
    },

};