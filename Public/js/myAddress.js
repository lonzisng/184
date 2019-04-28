/**
 * @Description:
 * @author WXH
 * @date 2019/4/28 9:58
 */
// 添加地址
$("#add").click(function () {
    //打开添加窗口
    $(".addAddress").show();

    //定义省市的信息
    var provList = ['江苏','浙江','福建','湖南'];
    var cityList = [];
    cityList[0] = ['南京', '苏州', '宿迁', '扬州'];
    cityList[1] = ['杭州', '温州', '宁波', '台州'];
    cityList[2] = ['福州', '厦门', '泉州', '漳州'];
    cityList[3] = ['长沙', '湘潭', '株洲', '湘西'];

//获取select元素
    var provSelect = document.querySelector('#prov');
    var citySelect = document.querySelector('#city');

//把省的信息 添加到第一个select元素中
    provList.forEach(function(val, index){
        //DOM操作  了解
        provSelect.add(new Option(val, index))
    });
//给第一个select绑定change事件
    provSelect.onchange = function(){
        //获取 当前的选项
        var index = this.value;

        //清空第二个select原先内容
        citySelect.length = 0;

        //选择对应的城市列表，添加到第二个select
        cityList[index].forEach(function(val, index){
            citySelect.add(new Option(val, index));
        })
    };
//手工触发一次 change事件
    provSelect.onchange();
    //关闭窗口
    $("#saveAddress").click(function () {
        $(".addAddress").hide();
    });
});

// 修改地址
$("#update").click(function () {
    console.log("222");
    //打开添加窗口
    $(".updateAddress").show();

    //定义省市的信息
    var provList = ['江苏','浙江','福建','湖南'];
    var cityList = [];
    cityList[0] = ['南京', '苏州', '宿迁', '扬州'];
    cityList[1] = ['杭州', '温州', '宁波', '台州'];
    cityList[2] = ['福州', '厦门', '泉州', '漳州'];
    cityList[3] = ['长沙', '湘潭', '株洲', '湘西'];

//获取select元素
    var provSelect = document.querySelector('#updateProv');
    var citySelect = document.querySelector('#updateCity');

//把省的信息 添加到第一个select元素中
    provList.forEach(function(val, index){
        //DOM操作  了解
        provSelect.add(new Option(val, index))
    });
//给第一个select绑定change事件
    provSelect.onchange = function(){
        //获取 当前的选项
        var index = this.value;

        //清空第二个select原先内容
        citySelect.length = 0;

        //选择对应的城市列表，添加到第二个select
        cityList[index].forEach(function(val, index){
            citySelect.add(new Option(val, index));
        })
    };
//手工触发一次 change事件
    provSelect.onchange();
    //关闭窗口
    $("#updateSave").click(function () {
        $(".updateAddress").hide();
    });
    $("#reset").click(function () {
        $(".updateAddress").hide();
    });
});