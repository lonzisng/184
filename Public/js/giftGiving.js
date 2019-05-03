var _index=0;
var timePlay=null;
$("#container .ImgList").eq(0).show().siblings("div").hide();//只显示第一张

$("ul.button li").click(function(){
         clearInterval(timePlay);
       _index=$(this).index();
        $("ul.button li .hover").removeClass('hover');
        $(this).find('a').addClass("hover");
       $("#container .ImgList").eq(_index).fadeIn().siblings("p").fadeOut();//淡出
       autoPlay();
    });

//自动轮播
function autoPlay(){
    timePlay=setInterval(function(){
                _index++;
                 if(_index<3){
                     if(_index==2){_index=-1; }
                       $("ul.button li .hover").removeClass('hover');
                     $("ul.button li").eq(_index).find('a').addClass("hover");
                     $("#container .ImgList").eq(_index).fadeIn().siblings("p").fadeOut();
                    }else{_index=-1;}
            },3000);
     };
 autoPlay();//调用和执行


$(".pic").click(function(){
    location.href='productDetails.html';
});
$(".che").click(function(){
    location.href='shopCart.html';
});
//商品动效
$(".pic1").mouseenter(()=>{
    $(".pic1").css({"transform":"scale(1.2)","transition":"all 2s"})
})
$(".pic1").mouseout(()=>{
    $(".pic1").css({"transform":"scale(1)","transition":"all 2s"})
});
$(".pic2").mouseenter(()=>{
    $(".pic2").css({"transform":"scale(1.2)","transition":"all 2s"})
})
$(".pic2").mouseout(()=>{
    $(".pic2").css({"transform":"scale(1)","transition":"all 2s"})
});
$(".pic3").mouseenter(()=>{
    $(".pic3").css({"transform":"scale(1.2)","transition":"all 2s"})
})
$(".pic3").mouseout(()=>{
    $(".pic3").css({"transform":"scale(1)","transition":"all 2s"})
});
$(".pic4").mouseenter(()=>{
    $(".pic4").css({"transform":"scale(1.2)","transition":"all 2s"})
})
$(".pic4").mouseout(()=>{
    $(".pic4").css({"transform":"scale(1)","transition":"all 2s"})
});
$(".pic5").mouseenter(()=>{
    $(".pic5").css({"transform":"scale(1.2)","transition":"all 2s"})
})
$(".pic5").mouseout(()=>{
    $(".pic5").css({"transform":"scale(1)","transition":"all 2s"})
});
$(".pic6").mouseenter(()=>{
    $(".pic6").css({"transform":"scale(1.2)","transition":"all 2s"})
})
$(".pic6").mouseout(()=>{
    $(".pic6").css({"transform":"scale(1)","transition":"all 2s"})
});
$(".pic7").mouseenter(()=>{
    $(".pic7").css({"transform":"scale(1.2)","transition":"all 2s"})
})
$(".pic7").mouseout(()=>{
    $(".pic7").css({"transform":"scale(1)","transition":"all 2s"})
});
$(".pic8").mouseenter(()=>{
    $(".pic8").css({"transform":"scale(1.2)","transition":"all 2s"})
})
$(".pic8").mouseout(()=>{
    $(".pic8").css({"transform":"scale(1)","transition":"all 2s"})
});
