!function () {
    // 筛选滑动
    var queryCategory = OperationURL.getQueryString('type');
    var queryLocation = OperationURL.getQueryString('location');
    var sendData = {};
    sendData.category = queryCategory;
    sendData.location = queryLocation;
    sendData.type = 0;
    // 获取筛选条件
    var filterData = '';
    if (queryCategory == 4) {  //饰品
        filterData = [
            {"name": "全部", "type": 0},
            {"name": "皇冠", "type": 1},
            {"name": "头纱", "type": 2},
            {"name": "手套", "type": 3},
            {"name": "方巾", "type": 4},
            {"name": "领带", "type": 5},
            {"name": "领结", "type": 6},
            {"name": "婚鞋", "type": 7},
            {"name": "饰品", "type": 8},
            {"name": "胸贴", "type": 9},
            {"name": "衬衣", "type": 10},
            {"name": "胸针", "type": 11},
            {"name": "袖口", "type": 12},
            {"name": "男鞋", "type": 13},
            {"name": "毛披肩", "type": 14}
        ];
    } else if (queryCategory == 9) { //回礼
        filterData = [
            {"name": "全部", "type": 0},
            {"name": "茶叶", "type": 1},
            {"name": "糖果", "type": 2}
        ]
    } else {  //礼堂
        filterData = [
            {"name": "全部", "type": 0},
            {"name": "国内", "type": 1},
            {"name": "国外", "type": 2}
        ]
    }

    var filterStr1 = template('filter-first', {data: filterData});
    $("#filter-1").html(filterStr1);
    var hotListSwiper1 = new Swiper('#filter-1', {
        slidesPerView: 4,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true
    });
    //获取全部数据
    function getData() {
        getMaterialInfo(sendData, true, function (result) {
            var hotItemListStr = template('filter-content', result);
            $(".filter-content").html(hotItemListStr);
            userOerate();
            $("img").lazyload({
                "effect": "show",
                placeholder: "../../../../src/images/loading.gif"
            });
        });
    }

    getData();
    itemFilter();
    // 筛选功能
    function itemFilter() {
        $('.filter-item p a').click(function () {
            var index = $(this).parent().parent().index();
            var curType = $(this).attr('data-type');
            console.log(index);
            if (index == 0) {
                $('.filter-item p a:not(:first)').removeClass('selected')
            } else {
                $('.filter-item p a:first').removeClass('selected')
            }
            $('.filter-item p a').removeClass('selected');
            $(this).addClass('selected');
            sendData.type = curType;
            console.log(sendData);
            getData();
        })
    }

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
            getStateInfo(modifyData, true, function (result) {
                    if(queryCategory == 6){
                        window.location.href = "../../../../detailed_account/weddingHouse_detail.html?id=" + curId;
                    }else{
                        window.location.href = "../../../../detailed_account/account_detail.html?id=" + curId + "&type=" + curType;
                    }
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