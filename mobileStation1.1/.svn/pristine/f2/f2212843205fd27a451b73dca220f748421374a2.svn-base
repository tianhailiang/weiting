!function () {
    // 筛选滑动
    var queryCategory = OperationURL.getQueryString('type');
    var queryLocation = OperationURL.getQueryString('location');
    var sendData = {};
    sendData.category = queryCategory;
    sendData.location = queryLocation;
    sendData.code = [];
    sendData.filter = [];
    // 获取筛选条件
    getFilterInfo({type: queryCategory}, true, function (result) {

        // 绑定筛选条件
        var filterStr1 = template('filter-first', result);
        $("#filter-1").html(filterStr1);
        var filterStr2 = template('filter-second', result);
        $("#filter-2").html(filterStr2);
        var filterStr3 = template('filter-third', result);
        $("#filter-3").html(filterStr3);
        var hotListSwiper1 = new Swiper('#filter-1', {
            slidesPerView: 4,
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true
        });
        var hotListSwiper2 = new Swiper('#filter-2', {
            slidesPerView: 4,
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true
        });
        var hotListSwiper3 = new Swiper('#filter-3', {
            slidesPerView: 4,
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true
        });
        // 点击筛选条件
        function clothFilter(target) {
            var codeAry = '';
            var filterAry = [];
            $(".filter-item-" + target + " >p a").click(function () {
                var index = $(this).parent().parent().index();
                if (index == 0) {
                    $(".filter-item-" + target + " >p a:not(:first)").removeClass('selected');
                } else {
                    $(".filter-item-" + target + " >p a:first").removeClass('selected');
                }
                $(this).toggleClass('selected');
                codeAry = [];
                filterAry = [];
                $(".filter-item >p a.selected").each(function () {
                    var curId = $(this).attr('data-id');
                    var curType = $(this).attr('data-code');
                    if (curId !== "000") {
                        codeAry.push("'" + curId + "'");
                    }
                    if (filterAry.indexOf(curType) == -1 && curId !== "000") {
                        filterAry.push(curType)
                    }
                });
                sendData.code = filterAry.join(',');
                sendData.filter = codeAry.join(',');
                console.log(sendData);
                getData();
            });
        }


        var aa = "first";
        var bb = "second";
        var cc = "third";
        clothFilter(aa);
        clothFilter(bb);
        clothFilter(cc);
    });
    //获取全部数据
    function getData() {
        console.info(sendData);
        getClothInfo(sendData, true, function (result) {
            var hotItemListStr = template('filter-content', result);
            $(".filter-content").html(hotItemListStr);
            userOerate();
           // checkDetail();
            $("img").lazyload({
                "effect": "show",
                placeholder: "../../../../src/images/loading.gif"
            });
        });
    }

    getData();
    // 查看详情
    function checkDetail() {
        $(".filter-content >div> img").click(function () {
            var id = $(this).parent().attr('data-id');
            var type = $(this).parent().attr('data-type');
            //console.log(id,type);
            window.location.href = "../../../../detailed_account/account_detail.html?id=" + id + "&type=" + type;
        })
    }

    // 单品查看功能点亮、收藏功能
    /*function userOerate() {
     //增加查看数
     $('.filter-content >div >img').click(function () {
     var curEle = $(this).parent().children(".list-item-status").children('.fl');
     var viewNum = Number(curEle.find('span.fs12').html());
     viewNum++;
     if (!curEle.children('icon').hasClass('green-eye')) {
     curEle.find('span.icon').addClass('green-eye');
     curEle.find('span.fs12').html(viewNum);
     }
     return false
     });

     //收藏功能
     $('.collect-btn').one("click", function () {
     var _this = $(this);
     var collectNum = Number(_this.find('.fs12').html());
     isLogin(null, true, function (result) {
     // 用户已登录
     if (result.code == 0) {
     if (!_this.find('.icon').hasClass('red-heart')) {
     _this.find('.icon').addClass('red-heart');
     collectNum++;
     _this.find('.fs12').html(collectNum);
     info_alert('收藏成功');
     }
     } else if (result.code == 3) { // 用户未登录
     // 用户绑定手号
     bindPhone.register();
     if (!_this.find('.icon').hasClass('red-heart')) {
     _this.find('.icon').addClass('red-heart');
     collectNum++;
     _this.find('.fs12').html(collectNum);
     info_alert('收藏成功');
     }
     }
     });

     return false
     });
     }*/
    // 单品查看功能点亮、收藏功能

    function userOerate() {
        var modifyData = {};

        //增加查看数
        $('.filter-content >div >img').click(function () {
            var curId = $(this).parent().attr('data-id');
            var curType = $(this).parent().attr('data-type');
            var curEle = $(this).parent().children(".list-item-status").children('.fl');
            var viewNum = Number(curEle.find('span.fs12').html());
            viewNum++;
            if (!curEle.children('icon').hasClass('green-eye')) {
                curEle.find('span.icon').addClass('green-eye');
                curEle.find('span.fs12').html(viewNum);
            }
            modifyData.id = curId;
            modifyData.type = curType;
            modifyData.actionType = 1;
            getStateInfo(modifyData, true, function () {
                   window.location.href = "../../../../detailed_account/account_detail.html?id=" + curId + "&type=" + curType;
            });

            return false
        });
        //收藏功能
        var collectSendData = {};
        $('.collect-btn').one("click", function () {
            var that = $(this);
            var curId = $(this).attr('data-id');
            var curType = $(this).attr('data-type');
            var collectNum = Number(that.find('.fs12').html());

            isLogin(null, false, function (result) {
                //未登录
                if (result.code !== 0) {
                    bindPhone.register();
                } else {
                    if (!that.find('.icon').hasClass('red-heart')) {
                        that.find('.icon').addClass('red-heart');
                        collectNum++;
                        that.find('.fs12').html(collectNum);
                        collectSendData.id = curId;
                        collectSendData.type = curType;
                        collectSendData.actionType = 2;
                        console.log(collectSendData);
                        getStateInfo(collectSendData, true, function (result) {
                            if (result.code == 0) {
                                info_alert('收藏成功');
                            }
                        });
                    }
                }
            });


            return false
        });

    }

}();