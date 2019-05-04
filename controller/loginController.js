const userModal = require("../model/loginModa");  //引入Modal
const AV = require("leanengine");  //引用短信模块
AV.initialize("97aRsEWDXl9ucQAgGNJyvEbJ-gzGzoHsz","CRuIrLojxBakfEjBUhJBYTXv");  //配置短信
module.exports={
    //获取短信
    verificationCode(req,res){
        let phone = req.body.phone;
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: phone,
            name: '184三阶段',
            op: '注册验证',
            ttl: 10                    // 验证码有效时间为 10 分钟
        }).then(function(){
            res.send("发送成功")
        }, function(err){
            res.send("发送失败")
        });
    },

    //用户注册以及验证短信
    verify(req,res){
        let verify = req.body.verify,
            phone = req.body.mobilePhone,
            pwd = req.body.pwd;
        //验证短信收到的码
        AV.Cloud.verifySmsCode(verify, phone).then(function () {
            //验证成功  账号信息写入数据库
            userModal.addUser(phone,pwd,(err,data)=>{
                if (data.affectedRows > 0) {
                    res.send({code:1,message:"注册成功"});
                }else {
                    res.send({code:-1,message:"注册失败"});
                }
            })

        }, function (err) {
            res.send("验证码错误")
        });
    },

    //登陆验证
    landingVerification(req,res){
        let user = req.body.user,
            pwd = req.body.pwd;
        userModal.login(user,pwd,(err,data) =>{
            req.session.userName = data;
            if (!err) {
                if (data.length>0) {
                    res.send({code:1,message:"登陆成功"});
                }else {
                    res.send({code:0,message:"账号或密码错误"});
                }
            }else {
                res.send({code:3,message:"数据库出错"});
            }
        })
    },

    //获取订单中的全部商品
    orderGoods(req,res){
       let obj = req.session.userName,
           currentPage = req.body.currentPage,
           pageSize = req.body.pageSize,
           name = obj[0].user_id;
      userModal.orderGoods(name,currentPage,pageSize,(err,data)=>{
          req.session.goodes = data;
          if (!err){
              res.send({code:1,message:data});
          }else {
              res.send({code:-1,message:"数据库出错"});
          }
      })
    },

    //用户退出
    zhuxiao(req,res){
        req.session.destroy();    //这里是直接清空全部
        res.redirect("/index.html");   //退出以后停留在首页
    },

    //用户删除商品
    shanchu(req,res){
        let goodsId = req.body.id,
            userId = req.session.userName[0].user_id;
        userModal.shanchu(goodsId,userId,(err,data)=>{
            if (!err){
                res.send({code:1,message:data});
            }else {
                res.send({code:-1,message:"删除失败"});
            }
        })
    },

    //用户增加购物车商品数量
    zeng(req,res){
        let Nuber = req.body.ShopNum,
            goods = req.body.id,
            userId = req.session.userName[0].user_id;
        userModal.zengjia(Nuber,goods,userId,(err,data)=>{
            if (!err){
                res.send({code:1,message:data});
            }else {
                res.send({code:-1,message:"增加失败"});
            }
        })
},

    //加入收藏表
    shou(req,res){
        let goodsId = req.body.goodsId,
            userId = req.session.userName[0].user_id;
        userModal.shou(goodsId,userId,(err,data)=>{
            if (!err){
                res.send({code:1,message:"收藏成功"});
            }else {
                res.send({code:-1,message:"收藏失败"});
            }
        })
},

    //获取用户地址
    dizhi(req,res){
        let userId = req.session.userName[0].user_id;
        userModal.dizhi(userId,(err,data)=>{
            if (!err){
                res.send({code:1,message:data});
            }else {
                res.send({code:-1,message:"地址呢"});
            }
        })
    },

    //提交订单
    order(req,res){
        let dizhi = req.body.A,
            goodsId = [],
            userId = req.session.userName[0].user_id,
            stock = [],
            price = [],
            Shop_Num = [],
            zongjia = req.body.B;
        for (let i=0;i<req.session.goodes.length;i++){
            goodsId.push(req.session.goodes[i].goods_id);
            stock.push(req.session.goodes[i].stock);
            price.push(req.session.goodes[i].price);
            Shop_Num.push(req.session.goodes[i].Shop_Num);
        }
        console.log(req.session.goodes);
        userModal.order(goodsId,userId,stock,price,Shop_Num,zongjia,dizhi,(err,data)=>{
            if (!err){
                res.send({code:1,message:data});
            }else {
                res.send({code:-1,message:"地址呢"});
            }
        })
    },

    //验证密码
    Paywsd(req,res){
        let pwd = req.body.P1+req.body.P2+req.body.P3+req.body.P4+req.body.P5+req.body.P6,
            userId = req.session.userName[0].user_id;
        userModal.Paywsd(pwd,userId,(err,data)=>{
            console.log(1);
            console.log(data);
            if (data.length>0){
                res.send({code:1,message:"支付成功"});
            }else {
                res.send({code:2,message:"支付失败"});
            }
        })
    }
};