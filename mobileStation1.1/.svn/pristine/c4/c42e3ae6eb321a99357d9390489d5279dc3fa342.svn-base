!function () {
    var queryId = OperationURL.getQueryString("id");
    var sendData = {id: queryId};
    getHotItemDetailInfo(sendData, true, function (result) {
        var hotItemListStr = template('hot-item-list', result);
        $(".hot-item-list").html(hotItemListStr);
        userOerate();
        $("img").lazyload({
            "effect": "show",
            placeholder: "../../../../src/images/loading.gif"
        });
    });
    // 单品查看功能点亮、收藏功能

    function userOerate() {
        var modifyData = {};

        //增加查看数
        $('.list-detail >div >img').click(function () {
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
                if (result.code == 0) {
                    window.location.href = "../../../../detailed_account/account_detail.html?id=" + curId + "&type=" + curType;
                }
            });

            return false
        });
        //收藏功能
        var collectSendData = {};
        $('.collect-btn').one("click", function () {
            isLogin(null, false, function (result) {
                //未登录
                if (result.code !== 0) {
                    bindPhone.register();
                }
            });

            var curId = $(this).attr('data-id');
            var curType = $(this).attr('data-type');
            var collectNum = Number($(this).find('.fs12').html());
            if (!$(this).find('.icon').hasClass('red-heart')) {
                $(this).find('.icon').addClass('red-heart');
                collectNum++;
                $(this).find('.fs12').html(collectNum);
                collectSendData.id = curId;
                collectSendData.type = curType;
                collectSendData.actionType = 2;
                getStateInfo(collectSendData, true, function (result) {
                    if (result.code == 0) {
                        info_alert('收藏成功');
                    }
                });
            }

            return false
        });

    }
}();