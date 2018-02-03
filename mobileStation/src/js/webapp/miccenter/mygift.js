!function () {

    // swiperTab 切换
    function swiperTab() {
        var ininH = $(document).height() - 50;

        var mySwiper = new Swiper('.swiper-container', {
            onInit: function (mySwiper) {
                var j = mySwiper.activeIndex;
                var curLength = $(".swiper-slide").eq(j).find(".coupon-list >div").length;
                var curWidth = $(".coupon-list >div").width()-70;
                if(curLength == 0 ){
                    $(".swiper-wrapper").height(ininH);
                }else{
                    $(".swiper-wrapper").height(curLength*curWidth);
                }
            },
            onSlideChangeStart: function (mySwiper) {
                var j = mySwiper.activeIndex;
                $('.swiper-nav li a').removeClass('selected').eq(j).addClass('selected');
                var curLength = $(".swiper-slide").eq(j).find(".coupon-list >div").length;
                var curWidth = $(".coupon-list >div").width()-70;
                if(curLength < 0 ){
                    $(".swiper-wrapper").height(ininH)
                }else{
                    $(".swiper-wrapper").height(curLength*curWidth)
                }


            }

        });

        $('.swiper-nav li').on('touchstart mousedown', function (e) {
            e.preventDefault();
            var i = $(this).index();
            var ininH = $(document).height() - 50;
            // var H = $(".coupon-list").eq(i).height() + 40;
            var curLength = $(".swiper-slide").eq(i).find(".coupon-list >div").length;
            var curWidth = $(".coupon-list >div").width()-70;
            if(curLength == 0 ){
                $(".swiper-wrapper").height(ininH);
            }else{
                $(".swiper-wrapper").height(curLength*curWidth);
            }

         /*   $(".swiper-slide").css('height', H + 'px');
            $(".swiper-wrapper").css('height', H + 'px');*/
            $('.swiper-nav li a').removeClass('selected').eq(i).addClass('selected');
            mySwiper.slideTo(i, 1000, false);
        });
    }


    swiperTab();

    getCouponInfo(null, true, function (result) {

        var ableData = result.data.able;
        var disableData = result.data.disable;
        var ableStr = template("able", {data: ableData});
        $(".coupon-able-list").html(ableStr);
        var disableStr = template("disable", {data: disableData});
        $(".coupon-disable-list").html(disableStr);
        
    })
}();
