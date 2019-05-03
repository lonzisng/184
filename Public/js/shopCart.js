/* descirpton:
* author:巴落成
* date 2019/4/29 20:48
*/
$(function () {
    var commodity=[],  //临时储存数据
        totolPage = 0,  //总页面
        currentPage = 1,  //当前页面
        pageSize = 5;   //每页显示多少条数据


    $(document).ready(()=>{
        //请求个人中心的商品
        qingqiushuju();
    });

    //通过用户ID获取用户的购物车商品并且分页
   function qingqiushuju() {
       let arr = "currentPage="+currentPage+"&pageSize="+pageSize;
       console.log(arr+"我看看有多少页面");
       ajaxFn("post","/commodity.do",arr,(data)=>{
           let obj = JSON.parse(data);
           commodity = obj.message;
           xianshi();
       },true)
   };

   //把商品显示进去页面
    function xianshi() {
        $("#displayGoods").html("");
        for (let i = 0;i < commodity.length; i++){
            $("#displayGoods").append(`<tr>
                         <td><input type="checkbox" data-id="${commodity[i].id}"></td>
                         <td>${commodity[i].route}${commodity[i].name}</td>
                         <td>${commodity[i].price}</td>
                         <td>${commodity[i].Shop_Num}</td>
                         <td><span>价格</span></td>
                         <td><span class="del" data-id="${commodity[i].id}">加入收藏</span>
                             <span class="del" data-id="${commodity[i].id}">删除</span>
                         </td>
                      </tr>`)
        }
    }
})