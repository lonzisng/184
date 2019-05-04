(() => {

        //一级导航
    $(".nav").on("click","ul>li>a",function(e) {
        if (e.target.innerHTML === "售后说明-"){
            $("#nav_2").css({"display":"none"})
            $(".nav>ul>li:nth-of-type(1)>a").html("售后说明+");

        } else if (e.target.innerHTML === "售后说明+"){
            $("#nav_2").css({"display":"block"})
            $(".nav>ul>li:nth-of-type(1)>a").html("售后说明-");

        }
        else   if (e.target.innerHTML === "运费说明-"){

            $(".nav>ul>li:nth-of-type(2)>a").html("运费说明+");
                $("#nav_3").css({"display":"none"})

            }
        else   if (e.target.innerHTML === "运费说明+"){

            $(".nav>ul>li:nth-of-type(2)>a").html("运费说明-");
            $("#nav_3").css({"display":"block"})

        }
        else   if (e.target.innerHTML === "用户安全-"){
            $(".nav>ul>li:nth-of-type(3)>a").html("用户安全+");
            $("#nav_4").css({"display":"none"})
            }
        else   if (e.target.innerHTML === "用户安全+"){
            $(".nav>ul>li:nth-of-type(3)>a").html("用户安全-");
            $("#nav_4").css({"display":"block"})
        }
        else   if (e.target.innerHTML === "常见问题-"){
            $(".nav>ul>li:nth-of-type(4)>a").html("常见问题+");
            $("#nav_5").css({"display":"none"})
            }
        else   if (e.target.innerHTML === "常见问题+"){
            $(".nav>ul>li:nth-of-type(4)>a").html("常见问题-");
            $("#nav_5").css({"display":"block"})
        }
    });

    function text(){
        $(".text>div").css({"display": "none"});
    }
function color () {
    $("#nav_2").find("li>a").css({"background-color":"rgba(99,99,99,0)"});
}
        //二级菜单点击切换对应的页面
           $("#nav_2").on("click","li>a",function(e){
               console.log("li>a");
               if (e.target.innerHTML === "发票说明") {
                   text();
                   $(".text2").css({"display": "block"});
                   color();
                   $("#nav_2").find("li:nth-of-type(1)>a").css({"background-color":"rgba(99,99,99,.3)"})

               }
               else if(e.target.innerHTML === "退换货流程"){
                   text()
                   $(".text3").css({"display": "block"});

                   color();
                   $("#nav_2").find("li:nth-of-type(2)>a").css({"background-color":"rgba(99,99,99,.3)"})

               }
               else  if(e.target.innerHTML === "退换货说明"){
                   text()
                   $(".text4").css({"display": "block"});
                   color();
                   $("#nav_2").find("li:nth-of-type(3)>a").css({"background-color":"rgba(99,99,99,.3)"})
               }
           })



})();





// $(".nav>ul>li").click(function () {
//     $(".nav>ul>li").find("ul").css({"display": "block"});
// });
// $("#nav_2").addEventListener("click",function (event) {
//     var target=event.target;
//     if (target.nodeName =="li"){
//         target.style.backgroundColor = "red";
//     }
// })

// $("#nav_2>li").onmouseover(function () {
//     $("#nav_2>li").css({"background-color":"rgba(99,99,99,.3)"})
// }).onmouseout(function () {
//     $("#nav_2>li").css({"background-color": "#ffffff"});
// })