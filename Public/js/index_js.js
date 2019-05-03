
$(".fist_pohto").mouseenter(function(){
    $(this).css({"transform":"rotatey(360deg)","transition":"all 4s"})
})
$(".fist_pohto").mouseleave(function(){
    $(this).css({"transform":"rotatey(0deg)","transition":"all 4s"})
})
$("#fist").mouseenter(()=>{
    $("#fistpohop").css({"transform":"scale(1.2)","transition":"all 4s"})
})
$("#fist").mouseleave(()=>{
    $("#fistpohop").css({"transform":"scale(1)","transition":"all 4s"})
})
$("#last").mouseenter(()=>{
    $("#lastpohop").css({"transform":"scale(1.2)","transition":"all 4s"})
})
$("#last").mouseleave(()=>{
    $("#lastpohop").css({"transform":"scale(1)","transition":"all 4s"})
})
$("#dier").mouseenter(()=>{
    $("#dierge").css({"transform":"scale(1.2)","transition":"all 4s"})
})
$("#dier").mouseleave(()=>{
    $("#dierge").css({"transform":"scale(1)","transition":"all 4s"})
})

$(".poster-main").Carousel({
    "width":1200,
    "height":400,
    "posterWidth":370,
    "posterHeight":370,
    "scale":0.83,
    "speed": 1500,
    "autoPlay":true,
    "delay":500,
    "verticalAlign":"middle"
});
<!--轮播-->
$(function() {
    //$("#toright").hide();
    //$("#toleft").hide();
    $('#toright').hover(function() {
        $("#toleft").hide()
    }, function() {
        $("#toleft").show()
    })
    $('#toleft').hover(function() {
        $("#toright").hide()
    }, function() {
        $("#toright").show()
    })
})

var t;
var index = 0;
/////自动播放
t = setInterval(play, 3000)

function play() {
    index++;
    if (index > 4) {
        index = 0
    }
    // console.log(index)
    $("#lunbobox ul li").eq(index).css({
        "background": "#666"
    }).siblings().css({
        "background": "#aaa"
    })

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
};

///点击鼠标 图片切换
$("#lunbobox ul li").click(function() {

    //添加 移除样式
    //$(this).addClass("lito").siblings().removeClass("lito"); //给当前鼠标移动到的li增加样式 且其余兄弟元素移除样式   可以在样式中 用hover 来对li 实现
    $(this).css({
        "background": "#666"
    }).siblings().css({
        "background": "#aaa"
    })
    var index = $(this).index(); //获取索引 图片索引与按钮的索引是一一对应的
    // console.log(index);

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）
});

/////////////上一张、下一张切换
$("#toleft").click(function() {
    index--;
    if (index <= 0) //判断index<0的情况为：开始点击#toright  index=0时  再点击 #toleft 为负数了 会出错
    {
        index = 4
    }
    console.log(index);
    $("#lunbobox ul li").eq(index).css({
        "background": "#666"
    }).siblings().css({
        "background": "#aaa"
    })

    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）必须要写
}); // $("#imgbox a ")获取到的是一个数组集合 。所以可以用index来控制切换

$("#toright").click(function() {
    index++;
    if (index > 4) {
        index = 0
    }
    console.log(index);
    $(this).css({
        "opacity": "0.5"
    })
    $("#lunbobox ul li").eq(index).css({
        "background": "#666"
    }).siblings().css({
        "background": "#aaa"
    })
    $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000); // siblings  找到 兄弟节点(不包括自己）
});
$("#toleft,#toright").hover(function() {
        $(this).css({
            "color": "black"
        })
    },
    function() {
        $(this).css({
            "opacity": "0.3",
            "color": ""
        })
    })
///

///////鼠标移进  移出
$("#lunbobox ul li,.lunbo a img,#toright,#toleft ").hover(
    ////////鼠标移进
    function() {
        $('#toright,#toleft').show()
        clearInterval(t);

    },
    ///////鼠标移开
    function() {
        //$('#toright,#toleft').hide()
        //alert('aaa')
        t = setInterval(play, 3000)

        function play() {
            index++;
            if (index > 4) {
                index = 0
            }
            $("#lunbobox ul li").eq(index).css({
                "background": "#666",
            }).siblings().css({
                "background": "#aaa"
            })
            $(".lunbo a ").eq(index).fadeIn(1000).siblings().fadeOut(1000);
        }
    })
