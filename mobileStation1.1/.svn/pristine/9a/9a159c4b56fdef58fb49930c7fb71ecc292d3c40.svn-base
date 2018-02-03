!function () {
    var queryId = OperationURL.getQueryString("id");
    var queryType = OperationURL.getQueryString("type");
    var queryPhoneNum = OperationURL.getQueryString("phoneNum");
    $("#user-phone").val(queryPhoneNum);
    var areaId = '';
    var houseId = '';
    // 获取预约地区信息
    getOrderAreaInfo(null, true, function (result) {
        var areaStr = template("area-select", result);
        $("#user-select").html(areaStr);
        selectCity();
        // 默认显示第一条
        var defalutCity = result.data[0].name;
        var defalutHouse = result.data[0].weddingHall[0].name;
        $("#user-select_dummy").val(defalutCity + '   ' + defalutHouse);
        areaId = $('#user-select').children("li").children('div:contains(' + defalutCity + ')').attr('data-id');
        houseId = $('#user-select').children("li").find('ul>li:contains(' + defalutHouse + ')').attr('data-id');
    });
    // 城市体验店选择


    function selectCity() {
        $('#user-select').mobiscroll().treelist({
            theme: 'mobiscroll',
            display: 'bottom',
            lang: 'zh',
            fixedWidth: [90, 160, 170],
            labels: ['省', '婚礼堂'],
            onSelect: function (valueText) {
                console.log(valueText);
                var selectAry = valueText.split(' ');
                var area = selectAry[0];
                var house = selectAry[1];
                areaId = $(this).children("li").children('div:contains(' + area + ')').attr('data-id');
                houseId = $(this).children("li").find('ul>li:contains(' + house + ')').attr('data-id');
                console.log(areaId, houseId);
            }
        });
    }

    $(".confirm-order").click(function () {
        var userName = $("#user-name").val();
        var userPhone = $("#user-phone").val();
        var sendData = {
            id: queryId,
            type: queryType,
            name: userName,
            phoneNum:userPhone,
            weddingHallId: houseId,
            location: areaId
        };
        if (userName == '' || userPhone == '') {
            hint_info('请完整填写信息');
        }
        if (!validate.phone(userPhone)) {
            hint_info('请填写正确手机号');
        }
        console.log(sendData);
        var url = "../detailed_account/kefu_1.1.html";
        sumbitOrderInfo(sendData, false, function (result) {
            var userInfo = JSON.stringify(result);
            console.log(userInfo);
            if (result.code == 0) {
                var name = result.data.name;
                var phoneNum = result.data.phoneNum;
                var bookNum = result.data.bookNum;
                var bookTime = result.data.bookTime;
                var pcName = result.data.pcName;

                window.location.href = url + "?custromInfo=" + userInfo;

                //window.location.href = url + "&oid=" + phoneNum + "&magic=[{key:'手机号码',val:'" + phoneNum + "'},{key:'姓名',val:'" + name + "'},{key:'预约单号',val:'" + bookNum + "'},{key:'预约时间',val:'" + bookTime + "'},{key:'预约商品名称',val:'" + pcName + "'},{key:'预约人数',val:'" + isNum + "'}]";
            } else if (result.code == 1) {
                hint_info('系统异常')
            } else if (result.code == 3) {
                hint_info('用户未登录')
            } else if (result.code == 4) {
                hint_info('参数错误')
            } else if (result.code == 5) {
                hint_info('用户已经预约过')
            }
        });
    })
}();