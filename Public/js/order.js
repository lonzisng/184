/* descirpton:
* author:巴落成
* date 2019/5/3 14:16
*/
$(function () {
    //点击事件
    $("#placeOrder").click(()=>{
        $("#payment").show();
    });
    $("#displayAddress").click(()=>{
        $("#addres").toggleClass("height");
    });
    $("#Merchandise").click(()=>{
        $("#Merchandise").toggleClass("H");
    });

    // //点击显示默认地址
    $("#addres").on("click",".address",function () {
        if ($(this).hasClass("kuang")){return;} //hasClass  查询当前有没有这个Class名字  有就返回不操作
        $(this).siblings().removeClass("kuang");  //siblings  除了自己以外的兄弟
        $(this).siblings().find("span,a").removeClass("xian").addClass("yin");
        $(this).addClass("kuang");
        $(this).children().addClass("xian");   //children孙子辈的
    });

    var commodity=[],  //临时储存数据商品
        idzhiArr = [],   //临时地址储存地址
        totolPage = 0,  //总页面
        currentPage = 1,  //当前页面
        pageSize = 250;   //每页显示多少条数据

    $(document).ready(()=>{
        // 页面加载完毕执行这里的操作
        qingqiushuju();  //获取用户的商品订单
        dizhi();   //获取用户地址
    });

    //通过用户ID获取用户的购物车商品
    function qingqiushuju() {
        let arr = "currentPage="+currentPage+"&pageSize="+pageSize;
        ajaxFn("post","/commodity.do",arr,(data)=>{
            let obj = JSON.parse(data);
            commodity = obj.message;
            xianshi();
            tongji();
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
                         <td><img src="${src}" alt=""><span>${commodity[i].name}</span></td>
                         <td><p>${commodity[i].price}</p></td>
                         <td><p>${commodity[i].Shop_Num}</p></td>
                         <td><span style="color: #E83518" class="Subtotal">${A}</span></td>
                      </tr>`)
        }
    };

    //自动统计购买商品总数和总价
    function tongji() {
        let C = $("#displayGoods").find(".Subtotal");
        let B= 0;
        for (let i=0; i<C.length; i++) {
            B += parseInt(C[i].innerText);
        }
        $("#zongjia").text(B);
    };

    //获取收件地址
    function dizhi() {
       ajaxFn("post","/dizhi.do","",(data)=>{
           let obj = JSON.parse(data);
           idzhiArr = obj.message;
           xieru();
       })
    };

    //写入地址
    function xieru() {
        $("#addres").html("");
        for (let i=0; i<idzhiArr.length;i++){
            $("#addres").append(`
             <div class="address">
                        <span class="yin">默认地址</span>
                        <p>${idzhiArr[i].receiver_name}</p>
                        <p>${idzhiArr[i].receiver_details}</p>
                        <a href="myaddress.html" class="yin">修改</a>
                        <span class="icon-activity icon yin"></span>
                    </div>
            `);
        };
        $("#addres").find("div.address:first").addClass("kuang");
        $("#addres").find("div.address:first").find("span,a").addClass("xian");
    };

    //获取商品订单详情
    $("#placeOrder").click(()=>{
        let A;
        let Time = new Date();
        let Timee = Time.toLocaleString();
        let danhao = Time.getTime();
        let zong = $("#zongjia").text();
        for (let i = 0;i < commodity.length; i++){
            commodity[i].price;
            commodity[i].Shop_Num;
            A = commodity[i].price*commodity[i].Shop_Num;
            $("#Merchandise").append(`
                   <li><span>商品名称:</span><span>${commodity[i].name}</span><span>${zong}</span><span>元</span></li>
                   <li><span>交易金额:</span><span>${A}</span><span>元</span></li>
                   <li><span>购买时间:</span><span>${Timee}</span></li>
                   <li><span>交易类型:</span><span>网银转账</span></li>
                   <li><span>交易号码:</span><span>${danhao}</span></li>
            `)
        };

    });

    //验证支付密码
    $("#paymentButton").click(()=>{
        let arr = $("#formPayWsd").serialize();
        ajaxFn("post","/Paywsd.do",arr,(data)=>{
            let obj = JSON.parse(data);
            if (obj.code==1){
                 $("#paymentt").show();
                 setTimeout(()=>{
                 location.href="../index.html";
               },2000);
            }else if (obj.code == 2){

                alert("支付密码错误"+"\n"+"请重新输入");
            }
        })
    })

    //提交订单有问题
    //提交订单  并且获取商品订单详情
    // $("#placeOrder").click(()=>{
    //     let A = $("#addres").find("div.address:first").find("p:last").text(),
    //         B = $("#zongjia").text(),
    //         C = "A="+A + "&B="+B;
    //     console.log(C);
    //     ajaxFn("post","/order.do",C,(data)=>{
    //         console.log("我已经提交上去咯");
    //         console.log(data)
    //     })
    // });
});