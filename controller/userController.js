/**
 * @Description:
 * @author WXH
 * @date 2019/04/29 16:00:17
*/
const userModel=require("../model/userModel");

module.exports={
    //查询所有订单
    getOrderList(req,res){
        userModel.orderList((err,data)=>{
            // console.log(err);
            // console.log(data.length);
            if(!err){
                //判断订单状态
                for(let i=0;i<data.length;i++){
                    // console.log(data[i].state);
                    switch (data[i].state) {
                        case 1:data[i].state="待付款";break;
                        case 2:data[i].state="待发货";break;
                        case 3:data[i].state="待收货";break;
                        case 4:data[i].state="待评价";break;
                        case 5:data[i].state="已完成";break;
                        case 6:data[i].state="退款中";break;
                        case 7:data[i].state="退款";break;
                    }
                    // console.log(data[i].state);
                    let time=new Date();
                    data[i].create_time=time.toLocaleString();
                }
              // console.log(data[0].state);
                res.send({code:200,message:data});
            }else{
                res.send({code:700,message:"数据库出错"});
            }
        })
    }
};