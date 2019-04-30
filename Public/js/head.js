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
    $("#doSearch").click(function(){
        let keywords = $.trim($("#keywords").val());
        if(/^\s*$/g.test(keywords)){
            $("#keywords").val("").attr("placeholder","关键字不能为空");
            return;
        }
        let arr = keywords.split(" ");
        console.log(arr);
        if(arr.length<1){
            $("#keywords").val("").attr("placeholder","关键字不能为空");
            console.log("123");
            return;
        }
        $.ajax({
            url:"/unlogin/search.do",
            type:"post",
            data:"arr="+arr,
            cache:false,
            processData: false,
            contentType: false,
            success:(data)=>{

            }
        })
    })
})