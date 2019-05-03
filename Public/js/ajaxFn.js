/* descirpton:
* author:巴落成
* date 2019/4/7 10:15
*/
//自己封装的一个ajax
function ajaxFn(method,url,param,callback,svnc){
    //1.创建一个XHR对象  兼容的写法
    let xhrHttp;
    if (window.XMLHttpRequest) {  //兼容
        xhrHttp = new XMLHttpRequest();
    }else if (window.ActiveXObject){
        xhrHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2.设置请求open(请求方式，路径，同步异步
    svnc = svnc || true;
    if (method == "get") {
        url = url + "?" + param;
    }
    xhrHttp.open(method,url,svnc);   //true = 异步
    //3.接受响应数据
    xhrHttp.onreadystatechange = () =>{
        if (xhrHttp.readyState == 4 && xhrHttp.status == 200) {
            //获取的值转换obj对象
            // let obj = JSON.parse(xhrHttp.responseText);
            // userList = obj.message;
            // dispalyUser();
            callback(xhrHttp.responseText);
        }
    };
    //发送数据
    if (method == "post") {
        xhrHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhrHttp.send(param);
    }else {
        xhrHttp.send(null);
    }
};

// get 方法--jquery
function get(url,param,callback,svnc) {
    let method = "get";
    ajaxFn(method,url,param,callback,svnc)
};

// post方法--jquery
function post(url,param,callback,svnc) {
    let method = "post";
    ajaxFn(method,url,param,callback,svnc)
};

// getJSON方法--jquery
function getJSON(url,param,callback,svnc) {
    let newCallback = function(responseText){
        let obj = JSON.parse(responseText);
        callback(obj);
    };
    get(url,param,newCallback,svnc);
}