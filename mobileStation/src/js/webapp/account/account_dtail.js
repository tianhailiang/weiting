$(function () {
    var queryId = OperationURL.getQueryString("id");
    var queryType = OperationURL.getQueryString("type");
    var isView = OperationURL.getQueryString("isView");//获取是否被查看
    if (isView == "0") {
        //如果没被查看则调入
        operate();
    }
    function operate() {
        //查看
        var param = {
            type: queryType,
            actionType: 1,
            id: queryId
        };
        lpcOperate(param, true, function (result) {
            //调查看接口
            if (result.code == 0) {
            } else {
                console.log(result.msg)
            }
        });
    }


    // swiperTab 切换
    var mySwiper = null;

    function swiperTab() {
        var mySwiper = new Swiper('.swiper-container', {
            onSlideChangeStart: function () {
                var index = mySwiper.activeIndex;
                $(".swiper-slide >div").hide();
                $(".swiper-slide >div:eq(" + index + ")").show();
            },
            onSlideChangeEnd: function (swiper) {
                var j = mySwiper.activeIndex;
                $('.swiper-nav:eq(0) li').removeClass('selected').eq(j).addClass('selected');
                $('.swiper-nav:eq(1) li').removeClass('selected').eq(j).addClass('selected');
            }
        });

        $('.swiper-nav li').on('click', function (e) {
            e.preventDefault();
            var i = $(this).index();
            $(".swiper-slide >div").hide();
            $(".swiper-slide >div:eq(" + i + ")").show();
            $('.swiper-nav:eq(0) li').removeClass('selected').eq(i).addClass('selected');
            $('.swiper-nav:eq(1) li').removeClass('selected').eq(i).addClass('selected');
            mySwiper.slideTo(i, 1000, false);
        });
    }

    //页面滚动时导航置顶

    function navFixed() {
        $("#scroll-div").on("scroll", function () {
            var navTop = $(".tab-box").offset().top;
            var winScrollT = $(window).scrollTop();
            if (winScrollT > navTop) {
                $("#tab-btn-fixed").css("visibility","visible");
            } else {
                $("#tab-btn-fixed").css("visibility","hidden");
            }
        });
    }

    function test() {
        // 判断此刻到顶部的距离是否和1秒前的距离相等

        if (document.documentElement.scrollTop == topValue) {

            alert("滚动条停止滚动了!");

            clearInterval(interval);

            interval = null;

        }

    }

    // 跳转页面查询字段，渲染新页面

    var sendData = {
        "id": queryId,
        "type": queryType
    };
    getAccountDetailInfo(sendData, true, function (result) {
        if (result.code == 0) {
            isOrder = result.data.isSign;  // 是否预约状态
            var data = result.data;
            var str = result.data.detail;
            var brandStr = result.data.brand;
            var detailStr = template('account-detail', {data: data});
            $(".product-img-box").html(detailStr);
            $(".product-details-1").html(str);
            $(".tab-content-3 >div").html(brandStr);
            $(".product-details-1 img").removeAttr("style");
            swiperTab();
            guessLikeDetail();
            navFixed();
            makeOrder();
        }
    });

    //我要预约跳转页面
    function makeOrder() {
        var url = "../order/";
        $("#order-btn ").click(function () {
            isLogin(null, false, function (result) {
                console.log(result);
                if (result.code == 0) {  //  已经绑定
                    if (isOrder == 0) {
                        window.location.href = url + "join_info.html" + "?id=" + queryId + "&type=" + queryType + "&phoneNum=" + result.data.phoneNum;
                    } else {
                        hint_info('您已预约,请到店体验');
                    }
                } else if (result.code == 1) {
                    hint_info('系统异常');
                } else if (result.code == 3) {  //  用户未登录
                    window.location.href = url + "bind_phone.html" + "?id=" + queryId + "&type=" + queryType + "&action_type=1";
                }
            })
        })
    }

    // 猜你喜欢 跳转详情页
    function guessLikeDetail() {
        $(".guess-like li").on("click", function () {
            var curId = $(this).attr('data-pid');
            var curType = $(this).attr('data-ptype');
            var url = "../detailed_account/";
            window.location.href = url + "account_detail.html?id=" + curId + "&type=" + curType;
        });
    }
});