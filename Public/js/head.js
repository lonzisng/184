
$(function(){
    $(window).scroll(function(){
        let top=$(document).scrollTop();
        if(top>10){
            $("header").addClass("min");
        }else if(top<50){
            $("header").removeClass("min");
        }
    })
});

$(function(){
    //search
    let search=()=>{
        let keywords = $.trim($("#keywords").val());
        if(/^\s*$/g.test(keywords)){
            $("#keywords").val("").attr("placeholder","关键字不能为空");
            return;
        }
        let arr = keywords.split(" ");
        if(arr.length<1){
            $("#keywords").val("").attr("placeholder","关键字不能为空");
            console.log("123");
            return;
        }
        let temp="";
        for(let i =0;i<arr.length;i++){
            if(arr[i]==""){
                arr.splice(i,1);
                i--;
            }else{
                temp +="&"+i+"="+arr[i];
            }
        }
        if(window.sessionStorage){
            let xsjLS = window.sessionStorage;
            xsjLS.setItem("search",temp)
        }
        location.href = "/head/allProducts.html";
    };
    $("#doSearch").click(search);

    //toTop
    $("#toTop").click(function(){
        let timer;
        console.log("1");
        timer=setInterval(function(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if(scrollTop>1){
                console.log("2");
                scrollBy(0,-30);
            }else{
                clearInterval(timer);
            }
        },1);
    })
    if(location.pathname=="/login.html"||location.pathname=="/register.html"){
        sessionStorage.removeItem("user");
    }
    if(sessionStorage.getItem("user")!=null){
        $("#userCenter").show();
    }else{
        $("#unlogin").show();
    }


})