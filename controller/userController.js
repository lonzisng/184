/**
 * @Description:
 * @author WXH
 * @date 2019/04/29 16:00:17
*/
const userModel=require("../model/userModel");

module.exports={
    //显示所有订单
    getOrderList(req,res){
        let obj=req.session.userName,
            id = obj[0].user_id;
        // console.log(name);
        userModel.orderList(id,(err,data)=>{
            // console.log(err);
            // console.log(data);
            if(!err){
                //判断订单状态
                for(let i=0;i<data.length;i++){
                    // console.log(data[i].state);

                    // console.log(data[i].goods_name);
                    let time=new Date();
                    data[i].create_time=time.toLocaleString();
                }
              // console.log(data[0].state);
                res.send({code:200,message:data});
            }else{
                res.send({code:700,message:"数据库出错"});
            }
        })
    },

    //显示收藏列表
    getCollectionList(req,res){
        let obj=req.session.userName,
            id = obj[0].user_id;

        userModel.CollectionList(id,(err,data)=>{
            // console.log(data);
            // console.log(err);
            if(!err){
                res.send({code:200,message:data});
            }else{
                res.send({code:700,message:"数据库出错"});
            }
        })
    },

    //显示地址列表
    getAddressList(req,res){
        let obj=req.session.userName,
            id = obj[0].user_id;
        userModel.AddressList(id,(err,data)=>{
            // console.log(data);
            // console.log(err);
            if(!err){
                res.send({code:200,message:data});
            }else{
                res.send({code:700,message:"数据库出错"});
            }
        })
    },

    //显示文章
    getArticleList(req,res){
        let obj=req.session.userName,
            id = obj[0].user_id;
        userModel.getArticleList(id,(err,data)=>{
            // console.log(data);
            // console.log(err);
            if(!err){
                res.send({code:200,message:data});
            }else{
                res.send({code:700,message:"数据库出错"});
            }
        })
    },

    //账号信息
    getCount(req,res){
        let obj=req.session.userName,
            id = obj[0].user_id;
        userModel.getArticleList(id,(err,data)=>{
            // console.log(data);
            // console.log(err);
            if(!err){
                res.send({code:200,message:data});
            }else{
                res.send({code:700,message:"数据库出错"});
            }
        })
    },
    //状态
    getState(req,res){
        let state=req.body.state;
        let id=req.body.id;
        console.log(state);
        console.log(id);
        userModel.getState(state,id,(err,data)=>{
            // console.log(data);
            // console.log(err);
            if(!err){
                res.send({code:200,message:data});
            }else{
                res.send({code:700,message:"数据库出错"});
            }
        })
    },
    //添加地址
    getAddAddress(req,res){
        let obj=req.session.userName,
            id = obj[0].user_id,
            people=req.body.people,
            pro=req.body.pro,
            city=req.body.city,
            county=req.body.county,
            detailsAddress=req.body.detailsAddress,
            number=req.body.number;
        // console.log(req.body);
        // console.log(people);
        // console.log(pro[1]);

        userModel.getAddAddress(id,people,number,pro[1],city[1],county[1],detailsAddress,(err,data)=>{
            // console.log(data);
            // console.log(err);
            if(!err){
                res.send({code:200,message:data});
            }else{
                res.send({code:700,message:"数据库出错"});
            }
        })
    }
};