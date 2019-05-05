/* descirpton:
* author:巴落成
* date 2019/4/29 20:48
*/
$(function () {
    var commodity=[],  //临时储存数据
        totolPage = 0,  //总页面
        currentPage = 1,  //当前页面
        pageSize = 250;   //每页显示多少条数据


    $(document).ready(()=>{
        // 页面加载完毕执行这里的操作
        qingqiushuju();  //获取用户的商品订单
        shanchu();   //删除商品
        shoucang();  //加入收藏
        Nuber();
    });

    //通过用户ID获取用户的购物车商品
   function qingqiushuju() {
       let arr = "currentPage="+currentPage+"&pageSize="+pageSize;
       ajaxFn("post","/commodity.do",arr,(data)=>{
           let obj = JSON.parse(data);
           if (obj.message.length>0){
               commodity = obj.message;
               xianshi();
               tongji();
           }else {
               $("#form1").hide();
               $("#form2").show();
           }
       },true)
   };

   //把商品显示进去页面
    function xianshi() {
        $("#displayGoods").html("");
        let A;
        let src;
        for (let i = 0;i < commodity.length; i++){
            src = "../img/goods"+commodity[i].route;
            commodity[i].price;
            commodity[i].Shop_Num;
            A = commodity[i].price*commodity[i].Shop_Num;
            $("#displayGoods").append(`<tr>
                         <td><input type="checkbox" class="checkalles" checked="checked" data-id="${commodity[i].id}"></td>
                         <td><img src="${src}" alt=""><span>${commodity[i].goods_name}</span></td>
                         <td><p class="UnitPrice">${commodity[i].price}</p></td>
                         <td><div><p class="jian" data-id="${commodity[i].id}">-</p><p class="Numberr">${commodity[i].Shop_Num}</p><p class="jia" data-id="${commodity[i].id}">+</p></div></td>
                         <td><span style="color: #E83518" class="Subtotal">${A}</span></td>
                         <td><p class="col" data-id="${commodity[i].goods_id}">加入收藏</p>
                             <p class="del" data-id="${commodity[i].id}">删除</p>
                         </td>
                      </tr>`)
        }
    };

    //结算

    //获取商品详情内的数量进行加减
    function Nuber() {
        let H;
        $("#displayGoods").on("click",".jian", function(){
            let ShopNum = $(this).next().text();
            let id = $(this).attr("data-id");
            if (ShopNum>1) {
                ShopNum = parseInt(ShopNum)-1;
                $(this).next().text(ShopNum);
            }else if (ShopNum=1) {
                ShopNum = 1;
                $(this).next().text(ShopNum);
            };
            H = "ShopNum="+ShopNum + "&id="+id;
            ajaxFn("post","/Nuber.do",H,(data)=>{
                let obj = JSON.parse(data);
                if (obj.code == 1) {
                    qingqiushuju();
                }
            },true)
        });
        $("#displayGoods").on("click",".jia", function(){
            let ShopNum = $(this).prev().text();
                ShopNum = parseInt(ShopNum)+1;
                $(this).prev().text(ShopNum);
            let id = $(this).attr("data-id");
                H = "ShopNum="+ShopNum + "&id="+id;
            ajaxFn("post","/Nuber.do",H,(data)=>{
                let obj = JSON.parse(data);
                if (obj.code == 1) {
                    qingqiushuju();
                }
            },true)
        });
    };

    //点击事件删除商品
    function shanchu() {
        $("#displayGoods").on("click",".del",function(){
            let id = $(this).attr("data-id");
            ajaxFn("post","/delete.do","id="+id,function (data) {
                let obj = JSON.parse(data);
                if (obj.code == 1) {
                    qingqiushuju();
                }
            },true);
        })
    };

    //点击全选
     $(".checkall").click(()=>{
         let checkall = $(".checkall")[0],
             checkall1= $(".checkall")[1],
             checkalles = $(".checkalles");
         for (let i = 0; i < checkalles.length; i++) {
             checkalles[i].checked = checkall.checked || checkall1.checked;
         }
     });

     //自动统计购买商品总数
   function tongji() {
       let number = $("#displayGoods").children().length;
       $("#price").text(number);
       let C = $("#displayGoods").find(".Subtotal");
       let B= 0;
       for (let i=0; i<C.length; i++) {
           B += parseInt(C[i].innerText);
       }
       $("#zongjia").text(B);
   };

   //加入收藏
    function shoucang() {
        $("#displayGoods").on("click",".col",function () {
            let goodsId = $(this).attr("data-id");
            ajaxFn("post","/shoucang.do","goodsId="+goodsId,(data)=>{
                let obj = JSON.parse(data);
                if (obj.code == 1) {
                    alert(obj.message);
                }
            },true)
        })
    };

});