$(function(){
    $(".mask").mouseover(function () {
        $(".float_layer").show()
        $(".big_box").show()
    })
    $(".mask").mouseout(function () {
        $(".float_layer").hide()
        $(".big_box").hide()
    })
    $(".mask").mousemove(function (e) {
        var l = e.pageX - $(".small_box").offset().left - ($(".float_layer").width() / 2)
        var t = e.pageY - $(".small_box").offset().left - ($(".float_layer").height() / 2)
        if (l < 0) {
            l = 0
        }
        if (l > $(this).width() - $(".float_layer").width()) {
            l = $(this).width() - $(".float_layer").width()
        }
        if (t < 0) {
            t = 0
        }
        if (t > $(this).height() - $(".float_layer").height()+20) {
            t = $(this).height() - $(".float_layer").height()+20
        }

        $(".float_layer").css({
            "left": l,
            "top": t-20
        })
        var pX = l / ($(".mask").width() - $(".float_layer").width())
        var pY = t / ($(".mask").height() - $(".float_layer").height())
        $(".big_box img").css({
            "left": -pX * ($(".big_box img").width() - $(".big_box").width()),
            "top": -pY * ($(".big_box img").height() - $(".big_box").height())
        })
    })

    $("#imgList").on("click","li",function(){
        if($(this).hasClass("checked")){ return;}
        $(this).siblings().removeClass("checked");
        $(this).addClass("checked");
        let src = $(this).find("img").attr("src");
        $(".small_box").find("img").attr("src",src);
        $(".big_box").find("img").attr("src",src);
    })
    $("#sort").on("click","li",function(){
        if($(this).hasClass("checked")){ return;}
        $(this).siblings().removeClass("checked");
        $(this).addClass("checked");
        let arr = $(this).attr("data-price").split("&");
        let stock = $(this).attr("title").split("：")[1];
        $("#newPrice").text(arr[0]);
        $("#oldPrice").text(arr[1]);
        $("#stock").text(stock);
    })

    $("#reduce").click(function(){
        let num = $("#num").val();
        if(num==1){
            return;
        }
        $("#num").val(--num);
    })
    $("#add").click(function(){
        let num = $("#num").val();
        $("#num").val(++num);
    })
    $("#messageTag").click(()=>{
        $("#messageBox").show();
        $("#reviewBox").hide();
        $("#messageTag").addClass("checked");
        $("#reviewTag").removeClass("checked");
    })
    $("#reviewTag").click(()=>{
        $("#messageBox").hide();
        $("#reviewBox").show();
        $("#messageTag").removeClass("checked");
        $("#reviewTag").addClass("checked");
    })
    $("#addToCard").click(()=>{
        let goodsId = $("#goodsName").attr("data-id");
        let newPrice = $("#newPrice").text();
        let sortId = $("#sort").find(".checked").attr("data-attid");
        let amount = $("#num").val();
        let param = "goodsId="+goodsId+"&sortId="+sortId+"&newPrice="+newPrice+"&amount="+amount;
        $.ajax({
            url:"/addToCard.do",
            type:"post",
            data:param,
            cache:false,
            processData: false,
            success:(data)=>{
                if(data.code===200){
                    $("#addToCard").text("加入成功");
                    setTimeout(function(){
                        $("#addToCard").text("加入购物车");
                    },1000);
                }else if(data.code===-200){
                    $("#addToCard").text("已存在商品");
                    setTimeout(function(){
                        $("#addToCard").text("加入购物车");
                    },1000);
                }else{
                    location.href="login.html";
                }
            }
        })
    })
})
       