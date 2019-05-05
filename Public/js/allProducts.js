/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    // the settings for each one of the slides uncover instances.
    const uncoverOpts = [
        {
            // total number of slices.
            slicesTotal: 4,
            // slices color.
            slicesColor: 'rgba(255,255,255,1)',
            // 'vertical' || 'horizontal'.
            orientation: 'vertical',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: {show: 'top', hide: 'bottom'}
        },
        {
            slicesTotal: 7, 
            slicesColor: 'rgba(255,255,255,1)', 
            orientation: 'horizontal', 
            slicesOrigin:  {show: 'right', hide: 'right'}
        },
        {
            slicesTotal: 9,
            slicesColor: 'rgba(255,255,255,1)',
            orientation: 'vertical',
            slicesOrigin:  {show: 'bottom', hide: 'bottom'}
        },
        {
            slicesTotal: 5,
            slicesColor: 'rgba(255,255,255,1)',
            orientation: 'horizontal',
            slicesOrigin:  {show: 'left', hide: 'left'}
        },
        {
            slicesTotal: 6,
            slicesColor: 'rgba(255,255,255,1)',
            orientation: 'vertical',
            slicesOrigin:  {show: 'bottom', hide: 'bottom'}
        }
    ];

    class Slideshow {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
            this.slidesTotal = this.DOM.slides.length;
            this.current = 0;
            this.uncoverItems = [];
            this.DOM.slides.forEach((slide,pos) => this.uncoverItems.push(new Uncover(slide.querySelector('.slide__img'), uncoverOpts[pos])));
            this.init();
        }
        init() {
            this.isAnimating = true;
            this.DOM.slides[this.current].classList.add('slide--current');
            this.uncoverItems[this.current].show(true, {
                image: {
                    duration: 400,
                    delay: 0,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            }).then(() => this.isAnimating = false);
        }
        navigate(pos) {
            if ( this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1 ) return;
            this.isAnimating = true;

            this.uncoverItems[this.current].hide(true).then(() => {
                this.DOM.slides[this.current].classList.remove('slide--current');
                this.current = pos;

                const newItem = this.uncoverItems[this.current];
                newItem.hide();
                this.DOM.slides[this.current].classList.add('slide--current');
                newItem.show(true, {
                    image: {
                        duration: 800,
                        delay: 350,
                        easing: 'easeOutCubic',
                        scale: [1.3,1]
                    }
                }).then(() => this.isAnimating = false);
            });
        }
    }
    
    // Preload all the images in the page..
	imagesLoaded(document.querySelectorAll('.slide__img'), {background: true}, () => {
        document.body.classList.remove('loading');
        
        const slideshow = new Slideshow(document.querySelector('.slides'));
        
        const pagination = document.querySelector('.pagination');
        const triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
        triggers.forEach((trigger,pos) => {
            if ( pos === 0 ) {
                trigger.classList.add('pagination__item--current');
            }
            trigger.addEventListener('click', () => {
                if ( slideshow.isAnimating ) return;
                slideshow.navigate(pos);
                pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
                trigger.classList.add('pagination__item--current');
            })
        });
    
        document.addEventListener('keydown', (ev) => {
            if ( slideshow.isAnimating ) return;
            const keyCode = ev.keyCode || ev.which;
            let newpos;
            if ( keyCode === 37 ) {
                newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
                slideshow.navigate(newpos);
            }
            else if ( keyCode === 39 ) {
                newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
                slideshow.navigate(newpos);
            }
            else return;
            pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
            triggers[newpos].classList.add('pagination__item--current');
            
        });
        let auto = setInterval(function(){
            newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
            slideshow.navigate(newpos);
            pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
            triggers[newpos].classList.add('pagination__item--current');
        },4000);
    });
}

$(function(){
    let products=$("#products"),order="order=undefined";
    $("#complex").click(()=>{
        goodsFn("complex");
    });
    $("#new").click(()=>{
        goodsFn("new");
    });
    $("#volume").click(()=>{
        goodsFn("volume");
    });
    $("#price").click(()=>{
        order="order=0";
        priceFn(order);
    });
    $("#priceDown").click(()=>{
        order="order=1";
        priceFn(order);
    });
    $("#priceUp").click(()=>{
        order="order=0";
        priceFn(order);
    });

    $("#upperPrice").blur(()=>{
        let lowerPrice = $("#lowerPrice").val(),
            upperPrice = $("#upperPrice").val();
        let parameter = order+"&lower="+lowerPrice+"&upper="+upperPrice;
        console.log(parameter);
        priceFn(parameter);
    });

    function goodsFn(res){
        order="order=undefined";
        if($("#"+res).hasClass("checked")){
            return;
        }else{
            $("#"+res).addClass("checked").siblings().removeClass("checked");
        }
        $.ajax({
            url:"/allProducts/"+res+".do",
            type:"post",
            data:null,
            cache:false,
            processData: false,
            success:(data)=>{
                if(data.code===200){
                    let html="";
                    for(let i=0;i< data.data.length;i++){
                        html += `<div class="goods" data-id="${data.data[i].id}">
                                    <div><a href="/goodsDetail.do?g=${data.data[i].id}"><img src="../img/goods${data.data[i].src}" alt="" /></a></div>
                                    <h4>${data.data[i].name}</h4>
                                    <p>￥ ${data.data[i].price}<span class="icon icon-gouwuche shopcard"></span></p>
                                </div>`;
                    }
                    products.html(html);
                }else{
                    console.log(data.message);
                }
            }
        })
    }
    function priceFn(parameter){
        if(order=="order=0"){
            if($("#priceUp").hasClass("checked")){
                return;
            }else{
                $("#priceUp").addClass("checked");
                $("#priceDown").removeClass("checked");
            }
        }
        if(order=="order=1"){
            if($("#priceDown").hasClass("checked")){
                return;
            }else{
                $("#priceDown").addClass("checked");
                $("#priceUp").removeClass("checked");
            }
        }
        $.ajax({
            url:"/allProducts/price.do",
            type:"post",
            data:parameter+"",
            cache:false,
            processData: false,
            success:(data)=>{
                if(data.code===200){
                    let html="";
                    for(let i=0;i< data.data.length;i++){
                        html += `<div class="goods" data-id="${data.data[i].id}">
                                    <div><a href="/goodsDetail.do?g=${data.data[i].id}"><img src="../img/goods${data.data[i].src}" alt="" /></a></div>
                                    <h4>${data.data[i].name}</h4>
                                    <p>￥ ${data.data[i].price}<span class="icon icon-gouwuche shopcard"></span></p>
                                </div>`;
                    }
                    products.html(html);
                }else{
                    console.log(data.message);
                }
            }
        })
    }
    if(window.sessionStorage){
        let search = sessionStorage.getItem("search");
        if(search){
            console.log(search);
            $.ajax({
                url:"/head/search.do",
                type:"post",
                data:search,
                cache:false,
                processData: false,
                success:(data)=>{
                    $("#products").html("");
                    let html="";
                    for(let i=0;i<data.length;i++){
                        html+=`<div class="goods" data-id="${data[i].id}">
                            <div><a href="/goodsDetail.do?g=${data[i].id}"><img src="../img/goods/${data[i].src}" alt="" /></a></div>
                            <h4><a href="/goodsDetail?g=${data[i].id}">${data[i].NAME}</a></h4>
                            <p>￥ ${data[i].price}<span class="icon icon-gouwuche shopcard"></span></p>
                        </div>`
                    }
                    $("#products").html(html);
                }
            })
            sessionStorage.removeItem("search");
        }
    }

    $("#splbList").on("click","li",function(){
        let id=$(this).attr("data-id");
        console.log(id);
        $.ajax({
            url:"/allProducts/splbGoods.do",
            type:"post",
            data:"id="+id,
            cache:false,
            processData: false,
            success:(data)=>{
                if(data.code===200){
                    console.log(data);
                    let html="";
                    for(let i=0;i< data.data.length;i++){
                        html += `<div class="goods" data-id="${data.data[i].id}">
                                    <div><a href="/goodsDetail.do?g=${data.data[i].id}"><img src="../img/goods${data.data[i].src}" alt="" /></a></div>
                                    <h4>${data.data[i].name}</h4>
                                    <p>￥ ${data.data[i].price}<span class="icon icon-gouwuche shopcard"></span></p>
                                </div>`;
                    }
                    products.html(html);
                }else{
                    console.log(data.message);
                }
            }
        })
    })

    $("#products").on("click",".shopcard",function(){
        let goods = $(this).parent().parent();
        let goodsId = goods.attr("data-id");
        let newPrice = $(this).parent().text().split(" ")[1];
        let sortId = 1;
        let amount = 1;
        let param = "goodsId="+goodsId+"&sortId="+sortId+"&newPrice="+newPrice+"&amount="+amount;
        // $.ajax({
        //     url:"/addToCard.do",
        //     type:"post",
        //     data:param,
        //     cache:false,
        //     processData: false,
        //     success:(data)=>{
        //         if(data.code===200){
        //             $("#addToCard").text("加入成功");
        //             setTimeout(function(){
        //                 $("#addToCard").text("加入购物车");
        //             },1000);
        //         }else{
        //             location.href="login.html";
        //         }
        //     }
        // }) 
    })
})