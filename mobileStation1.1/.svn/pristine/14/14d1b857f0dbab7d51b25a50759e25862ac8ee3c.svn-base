!function () {
    var queryId = OperationURL.getQueryString("id");
    var queryType = OperationURL.getQueryString("type");
    var isKeep = '';

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
                /* if ($(".praise-btn").hasClass('color-999')) {
                 $(".praise-btn").removeClass('color-999')
                 }*/
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
    // 跳转页面查询字段，渲染新页面

    var sendData = {
        "id": queryId,
        "type": queryType
    };

    // 获取详情数据
    getAccountDetailInfo(sendData, true, function (result) {
        console.log(result);
        template.config("escape", false);
        var detaiStr = template('account-detail-box', result);
        $(".account-detail-box").html(detaiStr);
        // 相关单品查看详情
        checkDetail();
        isKeep = result.data.isKeep;
        //判断是否收藏
        if (isKeep == 1) {
            $('.praise-btn').addClass('color-red');
        } else {
            collect(result.data);
        }

        //判断是否已经预约
        if (result.data.isSign == 1) { //已预约
            $("#order-btn ").html('已预约')
        } else {
            makeOrder();
        }

    });
    // 相关单品查看详情
    function checkDetail(id, type) {
        $(".check-detail").click(function () {
            var id = $(this).attr('data-id');
            var type = $(this).attr('data-type');
            window.location.href = "../../../../detailed_account/account_detail.html?id=" + id + "&type=" + type;
        })

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
                    modifyData.id = data.id;
                    modifyData.type = data.type;
                    modifyData.actionType = 2;
                    getStateInfo(modifyData, true, function (result) {
                        if (result.code == 0) {
                            isKeep = 1;
                            $('.praise-btn').removeClass('color-999').addClass('color-red');
                        }
                    })
                }

            });
            console.log(data);
        })
    }

    //我要预约跳转页面
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
}();