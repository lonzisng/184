// 开始添加内容
// 先写一个方法
// 还有准备一些基础的原有数据
// 疑问1:为何直接(里面写一个方法？这样的是全局的还是相当于什么意思？)
(function () {
    $(function () {
        //基础数据一个数组   数组里面是N个对象
        const dataArr = [{
            id : "1" ,
            card : "6661234561" ,
            password: "zxc123" ,
            amount: "100000" ,
        },
        {
            id : "2",
            card : "6661234562",
            password: "zxc123",
            amount: "100000"
        },
            {
                id : "3",
                card : "6661234563",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "4",
                card : "6661234564",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "5",
                card : "6661234565",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "6",
                card : "6661234566",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "7",
                card : "6661234567",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "8",
                card : "6661234568",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "9",
                card : "6661234569",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "10",
                card : "6661234571",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "11",
                card : "6661234572",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "12",
                card : "6661234573",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "13",
                card : "6661234574",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "14",
                card : "6661234575",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "15",
                card : "6661234576",
                password: "zxc123",
                amount: "100000"
            },
            {
                id : "16",
                card : "6661234577",
                password: "zxc123",
                amount: "100000"
            },
        //这里就是默认的VIP用户了
        ];
        if (!window.localStorage) {  //判断是否兼容本地数据库储存
            alert("浏览器不支持localStorage");
        }else {
            let  storage = window.localStorage;
            if (localStorage.getItem("data") == null) {  //如果本地没有data数据就创造一个data数据在本地
                storage.setItem("data",JSON.stringify(dataArr));  //本地储存中创造了一个data   然后把dataArr数组对象都写入了本地的data中
            }
            let currentPage = 1, //当前页面
                totalPage = 1 ,  //页面总页数
                pageItemNum = 5 ; //每页可以显示多少条内容
                
                /*
                向页面输入内容

                output = 输出的意思
                 */
                
            function output() {
                let data = JSON.parse(storage.getItem("data"));
                if (data.length - (currentPage - 1) * pageItemNum > pageItemNum) {
                    //这里相当于只显示第一页的内容因为10个账户只有在第一页5个数据中能被输出
                    //第二页开始的时候就是10-3-1*5 = 10注意页面都是从第一页开始的没有第0页
                    //上面条件成立表示可以整页输出
                    for (let i = (currentPage - 1) * pageItemNum; i <currentPage * pageItemNum; i++){
                        //进行分页 从哪一个开始以及哪一个结束
                        let id = data[i].id,
                            card = data[i].card,
                            password = data[i].password,
                            amount = data[i].amount;
                        $("#tbody").append(`<tr><td><input type="checkbox"></td><td class="dataId">${id}</td><td>${card}</td><td>${password}</td><td>${amount}</td><td><button class="btn btn-default btn-sm delItem" type="button" data-toggle="modal" data-target=".bs-example-modal-sm">删除</button>&nbsp;<button class="btn btn-default btn-sm editItem">更改信息</button></td></tr>`);
                    }
                }else {
                    //这里是不够整页输出
                    for (let i = (currentPage - 1) * pageItemNum; i < data.length; i++){
                        //这里的情况差不多就是超过了2页的时候
                        //页面超过了规定的5也  后面的页面也会重新创建一个页面来显示
                        let id = data[i].id,
                            card = data[i].card,
                            password = data[i].password,
                            amount = data[i].amount;
                        $("#tbody").append(`<tr><td><input type="checkbox"></td><td class="dataId">${id}</td><td>${card}</td><td>${password}</td><td>${amount}</td><td><button class="btn btn-default btn-sm delItem" type="button" data-toggle="modal" data-target=".bs-example-modal-sm">删除</button><button class="btn btn-default btn-sm editItem">编辑</button></td></tr>`);
                    }
                }
            }
            output();


            /*
            计算一共有多少页面并且输出到内容
             */
            function calcPageNum() {
                //计算总页码
                let data = JSON.parse(storage.getItem("data"));
                let temp = data.length % pageItemNum;  //取模
                if (temp == 0){
                    //可以一个整页  一个整页的时候输出
                    totalPage = parseInt(data.length / pageItemNum);
                }else {
                    totalPage = parseInt(data.length / pageItemNum + 1);
                    //不能再完整的页面显示的时候就新增一页继续把那些输出
                }

                for (let i = $("#page").find("li").length - 1; i < totalPage + 1; i++){
                    //这里的i  是在遍历《1》这个翻页的数组
                    //这里递增新内容的页面
                    $("#page").find("li:last").before(`<li><span>${i}</span></li>`);
                    //找到位置以后再最后的一个LI前面增加一个LI也就是页面了
                }
                if ($("#page").find("li").length - 2 > totalPage){
                    // 这里是判断如果以后添加了新内容，但是新内容添加了页面也增加了 就要删除新内容的同时也要删除新页面
                    $("#page").find("li:last").prev().remove();
                    //删除空页==删除上一页  不然上一页也会显示这里
                }
            }
            calcPageNum();

            /*
            更改当前页面状态
             */
            
            function changePage() {
                $("#page").find("li.active").removeClass("active").end().find("li:eq(" + currentPage + ")").addClass("active");
                    //removeChild删除class名字   删除了以后返回上一次破坏性操作之前，把它变成自动获取li下表来添加CLASS名字
            }

            /*
            更改页面的时候的点击事件
            蓝色背景光标
            */

            $("#page").on("click","li:not(:first,:last)",function () {  //事件委托
             currentPage = $(this).text();  //获取当前文本
                // isArrowDisabled();
                changePage(); // 更改页码状态
                $("#tbody").text("");  //清空页面之前的页面再重新载入页面
                output();
            });

            /*
            左右翻页的事件
             */
            $("#page").find("li:first,li:last").click(function () {
                if ($(this).index() == 0 && currentPage > 1) {
                    currentPage--;

                }else if ($(this).index() == $("#page").find("li").length - 1 && currentPage < $("#page").find("li").length - 2 ){
                    currentPage++;

                }else {
                    return;
                }
                changePage();  //改变页面状态
                isArrowDisabled();  //检查左右页面
                $("#tbody").text(""); //清空页面
                output(); //重新写入当前页内容；
            });

            /*
            判断第一页的时候还有最后一页的时候左右翻页的箭头禁用
             */
            function isArrowDisabled() {
                if (currentPage > 1 ){
                    $("#page").find("li:first").removeClass("disabled");
                    //页面不止一页可以翻页就把禁止点击的class标签移除
                }else {
                    $("#page").find("li:first").addClass("disabled");
                    //只有一页  添加class
                }
                if (currentPage == $("#page").find("li").length - 2) {
                    //里面的条件满足了说明已经在最后一页把禁用的标志添加进去
                    $("#page").find("li:last").addClass("disabled");
                }else {
                    $("#page").find("li:last").removeClass("disabled");
                }
            }

            /*
            现在做添加数据的
             */
            $("#submit").click(function (){
                let data = JSON.parse(storage.getItem("data"));
                let addCard = $("#addMessage").find("input#inputCard").val(),
                    addPassword = $("#addMessage").find("input#inputPassword").val(),
                    addAmount = $("#addMessage").find("input#inputAmount").val(),
                    addId = parseInt(data[data.length - 1].id) + 1;
                //每次添加以后自动添加一个ID
                if (!inputTest(addCard, addPassword, addAmount, -1)) {
                //     //这里是判断执行另外一个函数方法检测输入的卡号以及一些东西
                    return;
                }
                data.push({
                    id: addId.toString(),
                    card: addCard,
                    password: addPassword,
                    amount: addAmount
                });
                //把数据添加到数组里面
                storage.setItem("data", JSON.stringify(data));
                //数组添加了以后记得要把数组对象放到本地的那个储存
                calcPageNum(); //总页码计算输出
                currentPage = $("#page").find("li").length - 2;
                //设置当前页面为尾页
                changePage(); // 更改页码状态
                $("#tbody").text(""); //清空页面
                output(); //清空页面以后重新加载内容
                $("#addModal").modal('hide'); //添加进去以后还要隐藏模态框
            });

            /*
            判断添加的数据
             */
            function inputTest(addCard, addPassword, addAmount, index) { //
                let text1 = "",
                    patt1 = /^600123456[0-9]{2,3}$/g;
                patt2 = /^[0-9]/,
                    data = JSON.parse(storage.getItem("data"));
                if (isNaN(addCard)) {
                    text1 = "* 请输入数字";
                    $(".helpBlock1").text(text1);
                    $(".helpBlock1").removeClass("hidden");
                    //移除提示信息
                    $(".helpBlock1").parent().parent().addClass("has-error");
                    return 0;
                } else if (/^\s*$/g.test(addCard)) {
                    text1 = "* 卡号不能为空";
                    $(".helpBlock1").text(text1);
                    $(".helpBlock1").removeClass("hidden");
                    $(".helpBlock1").parent().parent().addClass("has-error");
                    return 0;
                }
                for (let i = 0; i < data.length; i++) {
                    if (index == i) {
                        continue;
                    }
                    if (index < 0 && addCard == data[i].card) {
                        text1 = "* 此账号已存在，请重新输入";
                        $(".helpBlock1").text(text1);
                        $(".helpBlock1").removeClass("hidden");
                        $(".helpBlock1").parent().parent().addClass("has-error");
                        return 0;
                    }
                }
                if (!patt1.test(addCard)) {
                    console.log(2);
                    text1 = "* 必须以600123456开头后跟2-3位数字";
                    $(".helpBlock1").text(text1);
                    $(".helpBlock1").removeClass("hidden");
                    $(".helpBlock1").parent().parent().addClass("has-error");
                    return 0;
                }
                if (patt2.test(addPassword)) {
                    text1 = "* 密码不能以数字开头";
                    $(".helpBlock2").text(text1);
                    $(".helpBlock2").removeClass("hidden");
                    $(".helpBlock2").parent().parent().addClass("has-error");
                    return 0;
                } else if (/^\s*$/g.test(addPassword)) {
                    text1 = "* 密码不能为空";
                    $(".helpBlock2").text(text1);
                    $(".helpBlock2").removeClass("hidden");
                    $(".helpBlock2").parent().parent().addClass("has-error");
                    return 0;
                }
                if (isNaN(addAmount)) {
                    text1 = "* 请输入数字";
                    $(".helpBlock3").text(text1);
                    $(".helpBlock3").removeClass("hidden");
                    $(".helpBlock3").parent().parent().addClass("has-error");
                    return 0;
                } else if (/^\s*$/g.test(addAmount)) {
                    text1 = "* 金额不能为空，可为0";
                    $(".helpBlock3").text(text1);
                    $(".helpBlock3").removeClass("hidden");
                    $(".helpBlock3").parent().parent().addClass("has-error");
                    return 0;
                }
                return 1;
            }

            /*
            初始化错误提示
            就是那些点击框框的时候会提示的那个
             */
            $(".form-group").find("input").focus(clearErrorMessage);//输入框获得焦点时
            function clearErrorMessage() {
                if ($(".form-group").hasClass("has-error")) {
                    $(".form-group").removeClass("has-error");
                }
                if (!$("span.help-block").hasClass("hidden")) {
                    $("span.help-block").addClass("hidden");
                }
            }
            
            /*
            删除信息
             */
            
            $("#tbody").on("click","button.delItem",function () {//事件委托
                let id = $(this).parent().siblings(".dataId").text(),
                    jom = $(this);
                //??
                $("#yesDel").click(function () {
                    let data = JSON.parse(storage.getItem("data"));
                    data.forEach(function (item, index, arr) {
                        if (item.id == id) {
                            data.splice(index, 1); //删除数据中对应条目
                            storage.setItem("data", JSON.stringify(data)); //更改localStorage数据
                        }
                    })
                    $("#delComfirm").modal("hide"); //隐藏模态框
                    jom.parentsUntil("#tbody").remove(); //删除页面上的元素
                    calcPageNum(); //重新计算页码
                    if (currentPage > 1 && $("#tbody").children().length == 0) {
                        currentPage--; //改变当前页
                    }
                    changePage(); // 更改页码状态
                    $("#tbody").text(""); //清空页面
                    output(); //页码内容输出
                })
            });

            /*
            全选操作
            */
            $("#selectAll").click(function () { //
                if ($(this)[0].checked) {
                    $("#tbody").find("input").attr("checked", true);
                } else {
                    $("#tbody").find("input").attr("checked", false);
                }
            })


            /*
             删除选中的所有信息
            */
            $("#delSelected").click(function () { //
                $("#yesDel").click(function () {
                    $("#tbody").find("input:checked").each(function (i) { //循环选中
                        let currentId = $(this).parent().next().text(); //获取id
                        let data = JSON.parse(storage.getItem("data")); //获取数据
                        data.forEach(function (item, index, arr) {
                            if (item.id == currentId) {
                                data.splice(index, 1); //删除数据中对应条目
                                storage.setItem("data", JSON.stringify(data)); //更改localStorage数据
                            }
                        })
                        $(this).parentsUntil("#tbody").remove(); //删除页面元素
                    });
                    $("#delComfirm").modal("hide"); //隐藏模态框
                    calcPageNum(); //重新计算页码
                    if (currentPage > 1 && $("#tbody").children().length == 0) {
                        currentPage--; //改变当前页
                    }
                    changePage(); // 更改页码状态
                    $("#tbody").text(""); //清空页面
                    output(); //页码内容输出
                })
            })


            /*
             编辑信息
           */
            $("#tbody").on("click", "button.editItem", function () { //事件委托
                clearErrorMessage(); //初始化错误提示
                let currentId = $(this).parent().siblings(":eq(1)").text();
                let jom = $(this).parent().parent();
                let currentIndex = -1;
                let data = JSON.parse(storage.getItem("data"));
                data.forEach(function (item, index, arr) { //初始化编辑窗口
                    if (item.id == currentId) {
                        currentIndex = index;
                        $("#editId").text(data[index].id);
                        $("#editCard").val(data[index].card);
                        $("#editPassword").val(data[index].password);
                        $("#editAmount").val(data[index].amount);
                    }
                })
                $("#editBox").show(); //显示编辑窗口
                $("#editIt").click(function () {
                    let editedCard = $("#editCard").val(),
                        editedPassword = $("#editPassword").val(),
                        editedAmount = $("#editAmount").val();
                    if (!inputTest(editedCard, editedPassword, editedAmount, currentIndex)) {
                        return;
                    } //输入验证
                    $("#editComfirm").modal("show"); //显示模态框
                    $("#yesEdit").click(function () { //确认写入
                        data[currentIndex].card = editedCard; //写入数组
                        data[currentIndex].password = editedPassword;
                        data[currentIndex].amount = editedAmount;
                        storage.setItem("data", JSON.stringify(data));
                        jom.children(":eq(2)").text(editedCard); //写入页面
                        jom.children(":eq(3)").text(editedPassword);
                        jom.children(":eq(4)").text(editedAmount);
                        $("#editComfirm").modal("hide"); //隐藏模态框
                        $("#editBox").hide(); //隐藏编辑窗口
                    })
                })
            })

            /*
             隐藏编辑窗口
            */

            $("#closeEdit").click(function () {
                $("#editBox").hide();
            })
            $("#editBox").click(function () {
                $(this).hide();
            })
            $("#edit").click(function () {
                event.stopPropagation(); //阻止事件冒泡
            })
        }
    })
})();