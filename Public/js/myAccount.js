/**
 * @Description:
 * @author WXH
 * @date 2019/4/28 11:25
 */
$("#updatePwd").click(function () {
    console.log("222");
    $(".updatePwd").show();
    $("#update").click(function () {
        console.log("333");
        $(".updatePwd").hide();
    });
});