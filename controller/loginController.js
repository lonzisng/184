const userModal = require("../model/loginModel");  //引入Modal
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
            console.log("验证成功了准备注册成功了")
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
          if (!err){
              console.log("68楼")
              console.log(data)
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
    }

};