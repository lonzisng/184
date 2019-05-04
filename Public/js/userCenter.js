/**
 * @Description:
 * @author WXH
 * @date 2019/05/02 23:15:43
*/

var myOrderList=[]; //订单列表

$(document).ready(function () {
    checkColor();
    skipPage();
    getMyOrder();
});
//点击颜色切换
function checkColor(){
    $("#menu").find("li").click(function () {
        $(this).css("color","#cfa972");
        $(this).siblings().css("color","black");
        $(this).siblings().find("li").css("color","black");
        return false;
    });
}
//点击跳转页面
function skipPage(){
    $("#menu").find("li").click(function () {
        $(".right").html("");
        var id=$(this).attr("data-id");
        switch (id) {
            // 我的订单
            case "1":
                $(".right").append(`  <%-include('myOrder.html')%>`);
                getMyOrder();
                break;
            //待付款
            case "1.1":
                $(".right").append(`  <%-include('goodsPay.html')%>`);
                break;
            // 待发货
            case "1.2":
                $(".right").append(`  <%-include('goodsDeliver.html')%>`);
                break;
            //待收货
            case "1.3":
                $(".right").append(`  <%-include('goodsReceived.html')%>`);
                break;
            //待评价
            case "1.4":
                $(".right").append(`  <%-include('goodsEvaluate.html')%>`);
                break;
            //退款
            case "1.5":
                $(".right").append(`  <%-include('goodsRefund.html')%>`);
                break;
            // 我的评价
            case "1.6":
                $(".right").append(`  <%-include('myEvaluation.html')%>`);
                break;
            // 我的收藏
            case "2":
                $(".right").append(`  <%-include('myCollection.html')%>`);
                break;
            // 我的地址
            case "3":
                $(".right").append(`  <%-include('myAddress.html')%>`);
                break;
            //我的物流
            case "4":
                $(".right").append(`  <%-include('myLogistics.html')%>`);
                break;
            // 我的文章
            case "5":
                $(".right").append(`  <%-include('myArticle.html')%>`);
                break;
            case "5.1":
                console.log(id);
                $(".right").append(`  <%-include('articleDetails.html')%>`);
                break;
            case "5.2":
                $(".right").append(`  <%-include('myArticle.html')%>`);
                break;
            // 账号信息
            case "6":
                $(".right").append(`  <%-include('myAccount.html')%>`);
                break;
        }
        return false;
    });
}
//显示我的订单
function getMyOrder(){
    $.ajax({
        type:"post",
        url:"/user/order.do",
        success:(data)=>{
            // console.log(data.message);
            myOrderList = data.message;
            dispalyMyOrder();
        }
    });
}
//转换时间为yyyy-mm-dd
function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
function dispalyMyOrder(){
    $("#myOrderTbody").html("");
    for(let i=0;i<myOrderList.length;i++){
        // console.log(i);
        $("#myOrderTbody").append(`
                <tr>
                <td colspan="2">
                    <span>${myOrderList[i].create_time}</span>
                    <span>订单号:${myOrderList[i].order_no}</span>
                </td>
                </tr>
                <tr>
                <td><img src="../img/goods${myOrderList[i].route}" alt=""></td>
                <td>
                    <span>[${myOrderList[i].name}]</span><br/>
                   ${myOrderList[i].resume}
                </td>
                <td>￥${myOrderList[i].price}</td>
                <td>${myOrderList[i].goods_num}</td>
                <td>
                ￥${myOrderList[i].total_price}
                <p>(含运费:￥${myOrderList[i].postage})</p>
                </td>
                <td>
                        ${myOrderList[i].state}
                        <p>查看详情</p>
                </td>
                <td>
                    <a href="#" class="confirmReceipt">确认收货</a>
                </td>
            </tr>
                `)
    }
}