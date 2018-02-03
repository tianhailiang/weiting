$(function () {
    // swiperTab 切换
    function swiperTab() {
        var mySwiper = new Swiper('.swiper-container', {
            onSlideChangeEnd: function (swiper) {
                var j = mySwiper.activeIndex;
                $('.swiper-nav li').removeClass('selected').eq(j).addClass('selected');

            },
            onSlideChangeStart: function () {
                var index = mySwiper.activeIndex;
                if(index == 2){
                    var tabH = $(".tab-content-3 p").height();
                    $(".swiper-slide").css('height', tabH + 'px');
                    $(".swiper-wrapper").css('height', tabH + 'px');
                }else{
                    var H = $(".product-details").eq(index).height();
                    $(".swiper-slide").css('height', H + 'px');
                    $(".swiper-wrapper").css('height', H + 'px');
                }
                /* var H = $(".product-details").eq(index).height();
                 $(".swiper-slide").css('height', H + 'px');
                 $(".swiper-wrapper").css('height', H + 'px');*/
            }
        });

        $('.swiper-nav li').on('touchstart mousedown', function (e) {
            e.preventDefault();
            var index = $(this).index();
            if(index == 2){
                var tabH = $(".tab-content-3 p").height();
                $(".swiper-slide").css('height', tabH + 'px');
                $(".swiper-wrapper").css('height', tabH + 'px');
            }else{
                var H = $(".product-details").eq(index).height();
                $(".swiper-slide").css('height', H + 'px');
                $(".swiper-wrapper").css('height', H + 'px');
            }
            $('.swiper-nav li').removeClass('selected').eq(index).addClass('selected');
            mySwiper.slideTo(index, 1000, false);
        });
    }

    //页面滚动时导航置顶
    function navFixed() {
        $("body").scroll(function () {
            var navTop = $(".tab-box").offset().top;
            var winScrollT = $(window).scrollTop();
            if (winScrollT > navTop) {
                $(".swiper-nav").addClass('swiper-nav-fixed');
            } else {
                $(".swiper-nav").removeClass('swiper-nav-fixed');
            }

        });
    }

    // 跳转页面查询字段，渲染新页面
    var queryId = OperationURL.getQueryString("id");
    var queryType = OperationURL.getQueryString("type");
    var sendData ={
        "id": queryId,
        "type":queryType
    };
    getAroundDetailInfo(sendData, true, function (result) {
        console.log(result);
        if (result.code == 0) {
            var data = result.data;
            var productDetailStr = data.detail;
            var brandStr = result.data.brand;
            var detailStr = template('account-detail', {data: data});
            $(".product-img-box").html(detailStr);
            $(".product-around-detail").html(productDetailStr);
            $(".tab-content-3").html(brandStr);
            swiperTab();
            navFixed();
            var imgNum = $('img').length;
            $('img').load(function () {
                if (!--imgNum) {
                    var tabH = $(".product-details").height();
                    $(".swiper-wrapper").height(tabH);
                }
            });
        }
    })
});