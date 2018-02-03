!function () {
    var sendData = {};
    var queryType = OperationURL.getQueryString("type");
    var queryId = OperationURL.getQueryString("id");
    var queryActionType = OperationURL.getQueryString("action_type");
   
    var reInvidateCode = ''; //后台获取的验证码
    // 120s倒计时
    function countDown() {
        $(".get-invidate-code").off("click");
        var countDownTime = 120;
        var timer = window.setInterval(function () {
            countDownTime--;
            $(".count-down").children('i').html(countDownTime);
            if (countDownTime == 0) {
                clearInterval(timer);
                countDownTime = 120;
                $(".count-down").children('i').html(countDownTime);
                getInvidateCode();
            }
        }, 1000);
    }

    //获取验证码
    function getInvidateCode() {
        $(".get-invidate-code").on("click", function () {
            var teleNumber = $.trim($(".tele-number").val());
            sendData = {phoneNum: teleNumber};
            if (!validate.phone(teleNumber)) {
                hint_info('请填写手机号码');
                $(".tele-number").val('');
            } else {
                countDown();
                //获取短信验证码
                getInvidateCodeInfo(sendData, false, function () {
                    $(".validate-code-tip").css("visibility","visible");
                })
            }
        });
    }

    getInvidateCode();
    //表单提交
    // var hostUrl = "http://m.wishlist1314.com/wishlist_mobile/mobileStation/order/";

    $(".region-btn").click(function () {
        var teleNumber = $.trim($(".tele-number").val());
        var validateCode = $(".validate-code").val();
        var userInviteCode = $(".invite-code").val();
        if (teleNumber == "" || validateCode == "") {
            hint_info('请将信息填写完整');
            return
        }
        //15532787853
        //621204
        sendData.phoneNum = teleNumber;
        sendData.yzm = validateCode;
        sendData.inviteCode = userInviteCode;
        console.log(sendData);
        sumbitPhoneNuber(sendData, false, function (result) {
            console.log(result);
            if (result.code == 0) {
                 //登录成功 把电话号存起来
                   localStorage.userPhoneNum = sendData.phoneNum;

                window.setTimeout(function () {
                    if (queryActionType == 1) {  //预约
                        window.location.href = "../order/join_info.html" + "?id=" + queryId + "&type=" + queryType + "&phoneNum=" + result.data.phoneNum;
                    } else if (queryActionType == 2) {   // 报名

                        window.location.href = "../wish/join_apply.html?id=" + queryId ;
                    } else if(queryActionType == 3) {  // 个人中心
                        window.location.href = "../miccenter/personal.html";
                    }else if(queryActionType == 4){//首页图片链接

                       window.location.href="../miccenter/myWidding.html";

                     }else if(queryActionType==8){
                          
                          window.location.href="../wish/alive_strategy_detail.html?id="+ queryId;
                       
                     }else if(queryActionType==11){

                       window.location.href="../wish/planning_division_detail.html?id="+ queryId;

                     }else if(queryActionType==12){

                        window.location.href="../wish/planning_division_introduce.html?id="+ queryId;

                     }else if(queryActionType==13){
                     	
                     	 window.location.href="../index.html";
                     	
                     	}else{   //客服
                        window.location.href = "../detailed_account/kefu.html?phoneNum=" + result.data.phoneNum +"&sid=128324&entry=5&ref=link";
                    }

                }, 500);

            } else if (result.code == 1) {
                hint_info('系统异常');
            } else if (result.code == 3) {
                hint_info('手机号填写错误');
            } else if (result.code == 4) {
                hint_info('验证码填写错误');
            }
        });
    });
}()
