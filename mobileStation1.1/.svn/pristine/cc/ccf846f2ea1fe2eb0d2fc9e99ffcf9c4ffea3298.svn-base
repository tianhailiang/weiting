$(function () {
    var queryId = OperationURL.getQueryString("id");
    var isKeep = '';
    var sendData = {
        id: queryId
    };

    // 获取婚礼堂详情
    weddingHouseDetailInfo(sendData, false, function (result) {
        console.log(result);
        if (result.code == 0) {
            var isOrder = result.data.isSign;  // 是否预约状态
            var weebingStr = template('webbing-house', result);
            $(".product-top").html(weebingStr);
            var reviewStr = template('editor-review', result);
            $(".review").html(reviewStr);
            /*绑定特别设施*/
            var speicalStr = template('special-service', {data:result.data.hardware});
            $(".speical-device-box").html(speicalStr);
            var length = $(".exhibition-box >div").length;
            if (length > 2) {
                $(".check-all").show();
            } else {
                $(".check-all").hide();
            }
            if (isOrder == 0) {
                makeOrder();
            } else {
                $("#order-btn ").html('已预约')
            }

            isKeep = result.data.isKeep;
            //判断是否收藏
            if (isKeep == 1) {
                $('.praise-btn').addClass('color-red');
            } else {
                collect(result.data);
            }
        }
    });
    //页面滚动时导航置顶
    function navFixed() {
        $(document).scroll(function () {
            var scrollTop = $(document).scrollTop();
            if (scrollTop > 50) { // 向上滚动时
                $(".top-nav").addClass('white-bg');
                $(".left-back-btn").addClass('left-back-btn-scroll');
                $(".right-btn span").removeClass('right-info-bg');
                if (isKeep == 1) {
                    $(".praise-btn").removeClass('color-999').addClass('color-red');
                } else {
                    $(".praise-btn").addClass('color-999');
                }
                $(".kefu-btn").addClass('color-red');
            } else {  //置顶
                $(".top-nav").removeClass('white-bg');
                $(".left-back-btn").removeClass('left-back-btn-scroll');
                $(".right-btn span").addClass('right-info-bg');
                if (isKeep == 1) {
                    $(".praise-btn").removeClass('color-999').addClass('color-red');
                } else {
                    $(".praise-btn").removeClass('color-999')
                }
                $(".kefu-btn").removeClass('color-red');
            }
        });
    }

    navFixed();

    //获取婚礼堂菜单详情
    weddingHouseMenuInfo(sendData, false, function (result) {
        if (result.data.length !== 0) {
            console.log(result);
            var menuData = result.data;
            if (result.code == 0) {
                var menuAry = [];
                $.each(result.data, function (index, item) { /*tab导航栏数据绑定*/
                    menuAry.push({cName: item.cName, cPrice: item.cPrice})
                });
                var weebingMenuStr = template('meal-menu-tab', {data: menuAry});
                $(".menu-tab").html(weebingMenuStr);
                /*菜单内容数据绑定*/
                var firstData = menuData[0];
                var menuStr = template('menu-gird', firstData);
                $(".menu-right").html(menuStr);
                var planStr = template('plan-gird', firstData);
                $(".plan-right").html(planStr);

                initMenuH();
                $(".packge-tab>ul>li").click(function () {
                    var index = $(this).index();
                    var curData = menuData[index];
                    $(this).addClass('selected').siblings().removeClass('selected');
                    console.log(curData);
                    var girdStr = template('menu-gird', curData);
                    var planStr = template('plan-gird', firstData);
                    $(".menu-right").html(girdStr);
                    $(".plan-right").html(planStr);
                    initMenuH();
                    checkMenu();
                });
            }
        }
    });

    // 查看全部
    $(".check-all").click(function () {
        var h = $(".exhibition-box").height();
        if (h == 252) {
            $('.exhibition-box').css("height", "auto");
            $(this).children('span').html('向上收起');
            $(this).children('i').addClass('icon-up');
        } else {
            $('.exhibition-box').css("height", "252px");
            $(this).children('span').html('查看全部');
            $(this).children('i').removeClass('icon-up');
        }

    });
    function initMenuH() {
        var menuRightH = $(".menu-right").outerHeight();
        var planRightH = $(".plan-right").outerHeight();
        $(".menu-left").height(menuRightH - 1).css("line-height", menuRightH + 'px');
        $(".plan-left").height(planRightH - 1).css("line-height", planRightH + 'px');
    }

    initMenuH();
    /*遮罩层弹出*/
    function layerShow() {
        var winW = $(window).width();
        var winH = $("body").height();
        $('.black-layer').css({
            'width': winW,
            'height': winH
        }).show();
        $("html").css("overflow","hidden");
    }

    /*遮罩层隐藏*/
    function layerHide() {
        $('.black-layer').hide();
        $(".menu-content").hide();
        $("html").css("overflow","auto");
    }

    // 收藏
    function collect(data) {
        $('.praise-btn').click(function () {
            isLogin(null, true, function (result) {
                // 用户未登录
                if (result.code !== 0) {
                    bindPhone.register();
                } else {
                    var modifyData = {};
                    modifyData.id =queryId;
                    modifyData.type = 6;
                    modifyData.actionType = 2;
                    console.log(modifyData);
                    getStateInfo(modifyData, true, function (result) {
                        if (result.code == 0) {
                            isKeep = 1;
                            $('.praise-btn').removeClass('color-999').addClass('color-red');
                        }
                    })
                }

            });
        })
    }
    //查看菜单内容
    function checkMenu() {
        $(".w-66 >ul>li a").on("click", function () {
            layerShow();
            var $curEle = $(this).parent().next(".menu-content");
            $curEle.show();
            if ($curEle.find('ul li').length > 2) {
                $(".check-menu-all").show();
            } else {
                $(".check-menu-all").hide();
            }
        });

        //策划中，查看单项介绍
        $(".plan-content li").on("click", function () {
            $(this).siblings().find("p").hide();
            $(this).find('i').toggleClass('icon-arrow-bottom');
            $(this).find('p').toggle();
        });

        // 菜单中展开全部
        $(".check-menu-all").click(function () {
            $(".menu-content ul").css("max-height", "inherit");
        });
        $(".close-menu").click(function () {
            layerHide();
            $(".menu-content").hide();
        });
    }

    checkMenu();

    function exhibitionAlbum(className) {
        var albumSwiper = new Swiper(className, {
            pagination: '.pagination',
            loop: true,
            grabCursor: true,
            paginationClickable: true
        })
    }

    // 宴会厅图片相册展示
    var winW = $(document).width();
    var winH = $(document).height();
    $(".exhibition-album").width(winW);

    function checkExhibition() {
        $(".exhibition-box dl dt").click(function () {
            layerShow();
            var index = $(this).parent().index();
            var curAlbumName = $(this).parent().next().children().attr("class");
            $(this).parent().next().children().attr("class", curAlbumName + index);
            curAlbumName = $(this).parent().next().children().attr("class");
            var swiperName = '.' + curAlbumName.split(' ')[1];
            $(this).parent().next('.exhibition-album').show();
            exhibitionAlbum(swiperName);
            return false
        });
    }

    checkExhibition();
    $(".black-layer").click(function () {
        $(".exhibition-album").hide();
        layerHide();
    });
    /*我要预约跳转页面*/
    function makeOrder() {
        $("#order-btn ").on("click", function () {
            // 判断是否登录
            isLogin(null, true, function (result) {
                // 用户已登录
                if (result.code !== 0) {
                    bindPhone.register();
                } else {
                    window.location.href = "../../../../order/join_info.html?id=" + queryId + "&type=" + queryType + "&phoneNum=" + result.data.phoneNum;
                }

            })
        })
    }
    makeOrder();

    //统筹流程弹窗
    function planDialog() {
        var winW = $(window).width();
        var winH = $(window).height();
        $(".plan-btn").click(function () {
            $(".plan-dialog img").height(winH).width(winW);
            $(".plan-dialog").show()
        });
        $(".plan-dialog").click(function () {
            $(this).hide()
        })
    }
    planDialog();
});