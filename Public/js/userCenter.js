/**
 * @Description:
 * @author WXH
 * @date 2019/4/29 12:43
 */
$("#menu").find("li").click(function () {
    $(this).css("color","#cfa972");
    $(this).siblings().css("color","black");
    $(this).siblings().find("li").css("color","black");
});
//点击跳转页面
$("#menu").find("li").click(function () {
    $(".right").html("");
    var id=$(this).attr("data-id");
    switch (id) {
        // 我的订单
        case "1":
            $(".right").append(`  <%-include('myOrder.html')%>`);
            break;
        case "1.1":
            $(".right").append(`  <%-include('myOrder.html')%>`);
            break;
        case "1.2":
            $(".right").append(`  <%-include('myOrder.html')%>`);
            break;
        case "1.3":
            $(".right").append(`  <%-include('myOrder.html')%>`);
            break;
        case "1.4":
            $(".right").append(`  <%-include('myOrder.html')%>`);
            break;
        case "1.5":
            $(".right").append(`  <%-include('myOrder.html')%>`);
            break;
        case "1.6":
            $(".right").append(`  <%-include('myOrder.html')%>`);
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
            $(".right").append(`  <%-include('myArticle.html')%>`);
            break;
        case "5.2":
            $(".right").append(`  <%-include('myArticle.html')%>`);
            break;
        // 账号信息
        case "6":
            $(".right").append(`  <%-include('myAccount.html')%>`);
            break;
    }
});