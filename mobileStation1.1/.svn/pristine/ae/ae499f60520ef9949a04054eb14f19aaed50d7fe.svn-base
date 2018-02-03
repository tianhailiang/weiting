!function () {
    var queryId = OperationURL.getQueryString("id");
    var queryType = OperationURL.getQueryString("type");
    //15532787853
   /* var queryId = "402882665711f41b015711f9c83d0002";
    var queryType = 1;*/
    var queryPhoneNum = OperationURL.getQueryString("phoneNum");
    $(".user-phone").val(queryPhoneNum);
    $(".submit-btn").click(function () {
        var userName = $(".user-name").val();
        var userPhone = $(".user-phone").val();
        var joinNumber = $(".join-number").val();
        var sendData = {
            id:queryId,
            type:queryType,
            name:userName,
            phoneNum: userPhone,
            inNum :joinNumber
        };
        if(userName =='' || userPhone =='' || joinNumber == ''){
            hint_info('请完整填写信息');
        }
        console.log(sendData);
        var url = "../detailed_account/kefu.html";
        submitConfirmOrder(sendData, false, function (result) {
            console.log(result.data)
            var userInfo = JSON.stringify(result);
            if (result.code == 0) {
                var name = result.data.name;
                var phoneNum = result.data.phoneNum;
                var bookNum = result.data.bookNum;
                var isNum = result.data.inNum;
                var bookTime = result.data.bookTime;
                var pcName = result.data.pcName;
                var link = result.data.link;

                window.location.href = url + "?custromInfo="+userInfo;
                
                 //window.location.href = url + "&oid=" + phoneNum + "&magic=[{key:'手机号码',val:'" + phoneNum + "'},{key:'姓名',val:'" + name + "'},{key:'预约单号',val:'" + bookNum + "'},{key:'预约时间',val:'" + bookTime + "'},{key:'预约商品名称',val:'" + pcName + "'},{key:'预约人数',val:'" + isNum + "'}]";
            } else if (result.code == 1) {
                hint_info('系统异常')
            } else if (result.code == 3) {
                hint_info('用户未登录')
            } else if (result.code == 4){
                hint_info('参数错误')
            }else if (result.code == 5){
                hint_info('用户已经预约过')
            }
        });
    })
}();