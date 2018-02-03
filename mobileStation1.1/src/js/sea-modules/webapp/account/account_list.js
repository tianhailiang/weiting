!function () {
    //获取城市数据
    getCityInfo(null, true, function (result) {
        var cityStr = template("area", result);
        $(".type").html(cityStr);
        var cityName = localStorage.cityName || "北京";
        $('.city').html(cityName);
        selectCity();
    });
    //获取轮播图
    getWishBanner({type:2},true,function (result) {
        var bannerStr = template('swiper-banner',result);
        $(".swiper-banner").html(bannerStr);
        topBanner();
    });
    // 清单首页 热门清单
    getHotItemInfo(null, true, function (result) {
        console.log(result);
        var hotItemStr = template('hot-item-second', result.data);
        $(".hot-list-box").html(hotItemStr);
        var recommedItem = template('hot-single-box', result.data);
        $('.hot-single-box').html(recommedItem);
        //图片惰性加载
        $("img").lazyload({
            "effect": "show",
            placeholder : "../../../../src/images/loading.gif"
        });
        for (var i = 0; i < result.data.hotTopics.length; i++) {
            var swiperClass = $(".hot-list-swiper" + i);
            new Swiper(swiperClass, {
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 10,
                freeMode: true
            });
        }

        // 跳转单品列表详情页
        $(".hot-list-item").click(function () {
            var id = $(this).attr('data-id');
            window.location.href = "../../../../detailed_account/hot_list_collect.html?id=" + id;
        });

        //跳转分类详情页
        $(".filter-item >li").click(function () {
            var curType = $(this).attr('data-type');
            var selectCity = $('.city').html();
            var cityId = $(".type>li:contains("+selectCity+")").attr('data-cid');
            if (curType == 1 || curType == 2 || curType == 3) {
                window.location.href = "../../../../detailed_account/account_item.html?type=" + curType +"&location="+cityId;
            }else if(curType == 6){
                window.location.href = "../../../../detailed_account/wedding_house.html?type=" + curType +"&location="+cityId;
            } else{
                window.location.href = "../../../../detailed_account/account_item2.html?type=" + curType +"&location="+cityId;
            }
        });
        //跳转热门单品详情页
        $(".hot-single-box >li").click(function () {
            var curId = $(this).attr('data-id');
            var curType = $(this).attr('data-type');
            window.location.href = "../../../../detailed_account/account_detail.html?id=" + curId + "&type=" + curType;
        })
    });

    // 轮播图
    function topBanner() {
        var bannerSwiper = new Swiper('#banner-container', {
            pagination: '.swiper-pagination',
            paginationClickable: false,
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false,
            loop: true

        })
    }


    /*遮罩层显示*/
    function layerShow() {
        var winW = $(window).width();
        var winH = $(window).height();
        $('.black-layer').css({
            'width': winW,
            'height': winH
        }).show();
    }

    $('.black-layer').click(function () {
        layerHide();
    });

    /*遮罩层隐藏*/
    function layerHide() {
        $('.black-layer').hide();
        $(".type").hide();
        $("html").css("overflow", "auto");
    }

    // 弹出选择城市下拉框
    function selectCityShow() {
        $(".filter-header").click(function () {
            $("html").css("overflow", "hidden");
            $(".type").show();
            layerShow()
        })
    }

    selectCityShow();
    // 选择城市内容
    function selectCity() {
        $(".type li").click(function () {
            localStorage.cityName = $(this).html();
            $(".city").html(localStorage.cityName);
            layerHide();
        })
    }

    
        document.querySelector("#perCenter").addEventListener("click",function(event){
           //点击进入个人中心
                   event.preventDefault();

               isLogin(null,true,function(result){

                     if(result.code==0){

                         window.location.href = "../miccenter/personal.html";
                     }else if(result.code==3){

                         window.location.href = "../order/bind_phone.html?action_type=3";
                     }else{
                        console.log(result.msg);
                     }

               });    


        },false);  



}();