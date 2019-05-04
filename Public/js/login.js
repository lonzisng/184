/* descirpton:
* author:巴落成
* date 2019/4/28 15:57
*/
$(function () {
    //登陆添加点击事件
    $("#Add").click(function () {
            let account = $("#account").val(),  //获取账户输入值
                pwd = $("#pwd").val(),   //获取密码输入值
                verify = $("#verify").val(),   //获取验证码输入值
                H = panduan(account,pwd);
               if(H==0){
                  return;
        }else if (H==1) {
                   let text1 = "";
                   //格式对的去发起请求验证密码
                   let pares = $("#formLand").serialize();
                   ajaxFn("post","/userForm.do",pares,function (data) {
                       let obj = JSON.parse(data);
                       if (obj.code ==1){
                           location.href="/page/shopCart.html";
                       }else {
                           text1 = "* 账号或密码错误";
                           $(".helpBlock2").text(text1);
                           $(".helpBlock2").show();
                       }
                   })
               }

            //自动去除空格
            $.trim(account);
            $.trim(pwd);
            $.trim(verify);


        });

    //这里是对账号正则判断
    function panduan(account,pwd){
      let   text1 = "" ,
            pattern  = new RegExp("[`~!@#$^&*=|{}':;',\\[\\]<>《》/?~！@#￥……&*|{}【】‘；：”“'。，、？' ']"),
            pattern1 = /^[0-9]/ ,
            han = /^[\u4e00-\u9fa5]+$/;  //只能输入汉字的正则表达式

        //对账号进行判断
        if (/^\s*$/g.test(account)){
            text1 = "* 账号不可为空";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }else if (pattern.test(account)) {
            text1 = "* 账号中不可使用特殊符号";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }else if (han.test(account)) {
            text1 = "* 账号不可以使用汉字";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }else if (account.length<6) {
            text1 = "* 账号不可少于6位数";
            $(".helpBlock1").text(text1);
            $(".helpBlock1").show();
            return 0;
        }
        //对密码进行判断
        if (/^\s*$/g.test(pwd)){
            text1 = "* 密码不可为空";
            $(".helpBlock2").text(text1);
            $(".helpBlock2").show();
            return 0;
        }else if (pattern.test(pwd)) {
            text1 = "* 密码中不可使用特殊符号";
            $(".helpBlock2").text(text1);
            $(".helpBlock2").show();
            return 0;
        }else if (han.test(pwd)) {
            text1 = "* 密码不可以使用汉字";
            $(".helpBlock2").text(text1);
            $(".helpBlock2").show();
            return 0;
        }else if (pattern1.test(pwd)){
            text1 = "* 密码不可以数字开头";
            $(".helpBlock2").text(text1);
            $(".helpBlock2").show();
            return 0;
        }else if (pwd.length < 6){
            text1 = "* 密码不可以少于6位数";
            $(".helpBlock2").text(text1);
            $(".helpBlock2").show();
            return 0;
        }
        return 1;
    };

    //点击input框的时候隐藏提示信息
    $("#account").click(function () {
        $(".helpBlock1").hide();
        $(".helpBlock2").hide();
        $(".helpBlock3").hide();
    });
    $("#pwd").click(function () {
        $(".helpBlock1").hide();
        $(".helpBlock2").hide();
        $(".helpBlock3").hide();
    });
    $("#verify").click(function () {
        $(".helpBlock1").hide();
        $(".helpBlock2").hide();
        $(".helpBlock3").hide();
    });

});