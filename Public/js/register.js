
/* descirpton:
* author:巴落成
* date 2019/4/28 15:57
*/
$(function () {
    //登陆添加点击事件
    $("#registerAdd").click(function () {
        let mobilePhone = $("#mobilePhone").val(),  //获取手机号
            pwd = $("#pwd").val(),   //获取密码
            pwdd = $("#pwdd").val(),   //获取重复密码
            verify = $("#verify").val(),   //获取验证信息
            H = panduan(mobilePhone,pwd,pwdd);
        console.log(H)
        if (H == 0) {
            //错误处理莫得
            return;
        }else if (H == 1) {
            //点击注册的时候判断短信验证码
                let params = $("#formRegister").serialize();
                ajaxFn("post","/verify.do",params,function (data) {
                    let obj = JSON.parse(data);
                    if (obj.code == 1){
                        location.href="/login.html";
                    }else{
                        alert(obj.message);
                    }
                },true)
        }

        //自动去除空格
        //对验证码进行
        $.trim(mobilePhone);
        $.trim(pwd);
        $.trim(pwdd);
        $.trim(verify);
    })

    function panduan(mobilePhone,pwd,pwdd){
       let  text1 = "" ,
            pattern1 = /^[0-9]/ ,
            pattern2 = /^1\d{10}$/,
            pattern  = new RegExp("[`~!@#$^&*=|{}':;',\\[\\]<>《》/?~！@#￥……&*|{}【】‘；：”“'。，、？' ']"),
            han = /^[\u4e00-\u9fa5]+$/;  //只能输入汉字的正则表达式

        //对手机号进行判断
        if (/^\s*$/g.test(mobilePhone)){
            text1 = "* 手机号不可为空";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }else if (pattern.test(mobilePhone)) {
            text1 = "* 手机号不可使用特殊符号";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }else if (han.test(mobilePhone)) {
            text1 = "* 手机号不可为汉字";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }else if (mobilePhone.length<6) {
            text1 = "* 手机号少于6位数";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }else if (!pattern2.test(mobilePhone)){
            text1 = "* 手机号有误";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }else if (/^\s*$/g.test(pwd)){   //对密码进行判断
            text1 = "* 密码不可为空";
            $(".helpBlock3").text(text1);
            $(".helpBlock3").show();
            return 0;
        }else if (pattern.test(pwd)) {
            text1 = "* 密码中不可使用特殊符号";
            $(".helpBlock3").text(text1);
            $(".helpBlock3").show();
            return 0;
        }else if (han.test(pwd)) {
            text1 = "* 密码不可以使用汉字";
            $(".helpBlock3").text(text1);
            $(".helpBlock3").show();
            return 0;
        }else if (pattern1.test(pwd)){
            text1 = "* 密码不可以数字开头";
            $(".helpBlock3").text(text1);
            $(".helpBlock3").show();
            return 0;
        }else if (pwd.length<6){
            text1 = "* 密码不可以数字开头";
            $(".helpBlock3").text(text1);
            $(".helpBlock3").show();
            return 0;
        }else if (/^\s*$/g.test(pwdd)){   //第二次密码
            text1 = "* 密码不可为空";
            $(".helpBlock4").text(text1);
            $(".helpBlock4").show();
            return 0;
        }else if (pattern.test(pwdd)) {
            text1 = "* 密码中不可使用特殊符号";
            $(".helpBlock4").text(text1);
            $(".helpBlock4").show();
            return 0;
        }else if (han.test(pwdd)) {
            text1 = "* 密码不可以使用汉字";
            $(".helpBlock4").text(text1);
            $(".helpBlock4").show();
            return 0;
        }else if (pattern1.test(pwdd)){
            text1 = "* 密码不可以数字开头";
            $(".helpBlock4").text(text1);
            $(".helpBlock4").show();
            return 0;
        }else if (pwdd.length<6){
            text1 = "* 密码不可以数字开头";
            $(".helpBlock4").text(text1);
            $(".helpBlock4").show();
            return 0;
        }else if (pwd!=pwdd) {
            text1 = "* 两次密码输入不一致";
            $(".helpBlock4").text(text1);
            $(".helpBlock4").show();
            return 0;
        }
        return 1;
    }
    //点击input框的时候隐藏提示信息
    $("#mobilePhone").click(function () {
        $(".helpBlock1").hide();
        $(".helpBlock2").hide();
        $(".helpBlock3").hide();
        $(".helpBlock4").hide();
    });
    $("#pwd").click(function () {
        $(".helpBlock1").hide();
        $(".helpBlock2").hide();
        $(".helpBlock3").hide();
        $(".helpBlock4").hide();
    });
    $("#pwdd").click(function () {
        $(".helpBlock1").hide();
        $(".helpBlock2").hide();
        $(".helpBlock3").hide();
        $(".helpBlock4").hide();
    });
    $("#verify").click(function () {
        $(".helpBlock1").hide();
        $(".helpBlock2").hide();
        $(".helpBlock3").hide();
        $(".helpBlock4").hide();
    });

    //发短信验证
$("#verifyAdd").click(function () {
    ajaxFn("post","/regis.do","phone="+$("#mobilePhone").val(),function (data) {
        alert(data)
    })
})

});