/**
 * @Description:
 * @author WXH
 * @date 2019/4/28 9:58
 */
// 添加地址
$(".right").on("click","#add",function () {
    //打开添加窗口
    $(".addAddress").show();
    $("#addressForm").find("input").val("");
    var provinceArr = new Array();
    var cityArr;
    var $selectProvince;
    var $selectCounty;
    var $selectCity;

    $("#queryProvince").click(showCities);

    $(function() {

        $selectProvince = $("#queryProvince");
        $selectCounty = $("#queryCounty");
        $selectCity = $("#queryCity");
        getJson();

    });

    function getJson() {
        //加载本地的json文件
        $.getJSON("js/address.json", function(data) {

            $.each(data, function(index, info) {

                provinceArr[index] = info;

                var $option = $("<option>" + info.area_name + "</option>");

                $option.val(index);

                $option.appendTo($selectProvince);

            });

        });

    }

    function showCities() {

        cityArr = new Array();

        var cityJson = provinceArr[$selectProvince.val()].city ;//获取当前省的所有市区的数据

        $selectCity.empty();

        $selectCounty.empty();

        $.each(cityJson, function(i, data) {

            cityArr[i] = data;

            var $option = $("<option>" + data.area_name + "</option>");

            $option.val(i);

            $selectCity.append($option);

        });

        $("#queryCity").click(showCounty);;
    }

    function showCounty() {

        $selectCounty.empty();

        var countyJson = cityArr[$("#queryCity").val()].district //获取当前市的所有区的数据

        $.each(countyJson, function(i, data) {

            var $option = $("<option>" + data.area_name + "</option>");

            $option.val(i);

            $selectCounty.append($option);

        });

    }

    //关闭窗口
    $("#saveAddress").unbind("click");
    $("#saveAddress").click(function (){
        var param=$("#addressForm").serialize(),
            pro=$("#queryProvince option:selected").text(),
            city=$("#queryCity option:selected").text(),
            county=$("#queryCounty option:selected").text();
            // console.log(param);
            //验证数据
        let patt=/^\S+$/;//只能输入中文
        let tel=/[0-9-()（）]{7,18}/; //电话号码

        let obj=param.split("&");
        let a=[];
        for(let i=0;i<obj.length;i++){
            let c=obj[i].split("=");
            a.push(c);
        }
        if(!patt.test(a[0][1])){
            $(".tips1").css("color","red",);
            $(".tips1").show();
        }else if(!tel.test(a[4][1])){
            $(".tips2").css("color","red");
            $(".tips2").show();
        }

        if(patt.test(a[0][1])&&patt.test(a[4][1])){
            layer.confirm('确定保存？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                layer.msg('保存成功', {icon: 1,time:800});
                $(".tips1").hide();
                $(".tips2").hide();
                $.ajax({
                    type:"post",
                    url:"/user/addAddress.do",
                    data:param+"&pro="+pro+"&city="+city+"&county="+county,
                    success:(data)=>{
                        $(".addAddress").hide();
                        getMyAddress();
                    }
                });
            }, function(){
                layer.msg('取消该操作', {time:800});
                $(".addAddress").hide();
            });
        }
    });
});

//删除地址


// 修改地址
$(".right").on("click","#update",function () {
        //打开添加窗口

        $(".updateAddress").show();
        $("#updateAddressForm").find("input").val("");
        var provinceArr = new Array();
        var cityArr;
        var $selectProvince;
        var $selectCounty;
        var $selectCity;

        $("#queryProvince1").click(showCities);

        $(function() {

            $selectProvince = $("#queryProvince");
            $selectCounty = $("#queryCounty");
            $selectCity = $("#queryCity");
            getJson();

        });

        function getJson() {
            //加载本地的json文件
            $.getJSON("js/address.json", function(data) {

                $.each(data, function(index, info) {

                    provinceArr[index] = info;

                    var $option = $("<option>" + info.area_name + "</option>");

                    $option.val(index);

                    $option.appendTo($selectProvince);

                });

            });

        }

        function showCities() {

            cityArr = new Array();

            var cityJson = provinceArr[$selectProvince.val()].city ;//获取当前省的所有市区的数据

            $selectCity.empty();

            $selectCounty.empty();

            $.each(cityJson, function(i, data) {

                cityArr[i] = data;

                var $option = $("<option>" + data.area_name + "</option>");

                $option.val(i);

                $selectCity.append($option);

            });

            $("#queryCity2").click(showCounty);;
        }

        function showCounty() {

            $selectCounty.empty();

            var countyJson = cityArr[$("#queryCity2").val()].district //获取当前市的所有区的数据

            $.each(countyJson, function(i, data) {

                var $option = $("<option>" + data.area_name + "</option>");

                $option.val(i);

                $selectCounty.append($option);

            });

        }

        //关闭窗口
        $("#updateSave").unbind("click");
        $("#updateSave").click(function () {

            var param=$("#updateAddressForm").serialize(),
                pro=$("#queryProvince option:selected").text(),
                city=$("#queryCity option:selected").text(),
                county=$("#queryCounty option:selected").text();
            console.log(param);
            //验证数据
            // let patt=/^[\u4e00-\u9fa5]+$/;//只能输入中文
            //
            // let tel=/[0-9-()（）]{7,18}/; //电话号码
            //

            $.ajax({
                type:"post",
                url:"/user/updateAddress.do",
                data:param+"&pro="+pro+"&city="+city+"&county="+county,
                success:(data)=>{
                    $(".updateAddressForm").hide();
                    getMyAddress();
                }
            });
        });
    //关闭窗口
    $("#updateSave").click(function () {
        $(".updateAddress").hide();
    });
    $("#reset").click(function () {
        $(".updateAddress").hide();
    });
});

//默认地址
$(".right").on("click","#defaultAddress",function () {
    $(this).css("border","1px solid @docColor","color","@dotColor");

});
