var paging = new QueryWithOrder();
var categoryTypeId = ''; // 大类筛选存储ID 区分服饰与婚礼堂
var accountListData = ''; // 瀑布流数据 全局变量
var accountData = ''; //存储请求筛选数据 全局变量
//获取清单列表数据需传的参数
var sendData = {
    location: "chengshi1",
    category: 0,
    pageSize: 4,
    pageNo: 1,
    filter: "none",
    code: "none"
};
function init() {
    // 瀑布流
    var windowH = $(window).height();
    $(".wrapper0").height(windowH - $("#fixed-header").height() - $("#infooter").height());
    //请求筛选数据
    getAccountListFilterInfo(null, true, function (result) {

        accountData = result;
        // 衣服大类选项数据绑定
        var clothesStr = template('category', result);
        $(".clothes-type").html(clothesStr);
        typeSelect();   // 弹出衣服种类选择浮层
        clothesSelect(); //衣服大类单项选择
        citySelect();    //城市地区选择
    });


    jumpDetail(); // 跳转详情页
    userOperate();    // 点赞收藏操作


    pullupCommon(0);


    var data = ""; // ajax请求数据

    //绑定服装数据


    // 加载婚礼堂数据
    function loadWeddingHouse() {
        flag = true;
        getAccountListInfo(sendData, true, function (result) {
            if (result.data.list.length != 0) {
                bindWeddingHouse(result);
            }
        });
    }


    //城市地区数据绑定
    function cityDataBind() {
        var cityStr = template('area', accountData);
        $(".city").html(cityStr);
        $(".city li").on("click", function () {
            var cityStr = $(this).html();
            $(".city-select").find('span').html(cityStr);
            layerHide();
            var cityId = $(this).attr('data-cid');
            sendData.location = cityId;
            sendData.pageNo = 1;
            $("#waterfall").html('');
            update(true);
            water.waterfall($("#waterfall"), $(".picList"));
        })
    }

    //城市地区选择
    function citySelect() {
        $(".city-select").click(function () {
            cityDataBind();
            $(".clothes-type").hide();
            $(".type-part").hide();
            $(".city").show();
            layerShow();
        });
    }

// 弹出衣服种类选择浮层
    function typeSelect() {
        $('.all-kind >span').click(function () {
            $('.type-part').hide();
            $(".city").hide();
            $('.clothes-type').toggle();
            if ($(".clothes-type").is(":hidden")) {
                layerHide();
            } else {
                layerShow();
            }
        });
    }


//衣服小类选择
    function clothesPartSelect() {
        var codeAry = [];
        var filterAry = [];
        $(".type-part-li li").on('click', function () {
            var curId = $(this).attr('data-typeid');
            var curCode = $(this).parent().prev().attr('data-typecode');
            var index = $(this).parent().parent().attr("data-index");

            // codeAry、 filterAry push 类型 ID
            if (!$(this).hasClass('selected')) {
                $(this).addClass('selected');

            } else {
                $(this).removeClass('selected');
            }
        });
        //完成提交
        $(".submit-filter-btn").click(function () {
            $('.clothes-type').hide();
            $('.type-part').hide();
            $("#waterfall").html('');
            filterAry.length = 0;
            codeAry.length = 0;
            $(".type-part-li >li.selected").each(function () {
                var curId = $(this).attr("data-typeid");
                var curCode = $(this).parent().prev().attr('data-typecode');
                if (codeAry.indexOf(curCode) == -1) {
                    codeAry.push(curCode);
                }
                curId = "'" + curId + "'";
                filterAry.push(curId);

            });
            sendData.code = codeAry.join() || "none";
            sendData.filter = filterAry.join() || "none";
            layerHide();
            update(true);
            water.waterfall($("#waterfall"), $(".picList"));

            ZhPullScroll.refresh();


        });
        //重置
        $(".reset-filter-btn").click(function () {
            $(".type-part .type-part-item ul li").removeClass('selected');
        })
    }

//衣服小类选择

//衣服大类单项选择
    function clothesSelect() {
        $('.clothes-type li').on('click', function () {
            var str = $(this).html();
            $('.all-kind >span').html(str);
            $('.clothes-type').hide();
            $('.black-layer').hide();
            var isChild = $(this).attr('data-ischild');
            categoryTypeId = $(this).attr('data-categoryid');
            var index = $(this).index();
            var data = accountData.data.category[index];
            if (isChild == 1) {
                $(".filter-btn").show();
                var typePartStr = template('type-part-filter', {data: data});
                $(".type-part").html(typePartStr);
                clothesPartSelect(); //衣服小类选择
            } else {
                $(".filter-btn").hide();
            }
            $("#waterfall").html('');
            sendData.category = categoryTypeId;
            sendData.pageNo = 1;
            sendData.filter = "none";
            sendData.code = "none";
            console.log(sendData);
            update(true);
        })
    }

    /*筛选按钮*/
    $('.filter-btn').click(function () {
        $('.clothes-type').hide();
        $('.type-part').toggle();
        $(".city").hide();
        if($(".black-layer").is(":hidden")){
            layerShow();
        }else{
            layerHide();
        }

    });

    /*遮罩层显示*/
    function layerShow() {
        var winW = $(window).width();
        var winH = $(window).height();
        $('.black-layer').css({
            'width': winW,
            'height': winH
        }).show();
    }

    $('.black-layer').click(function () {
        layerHide()
    });

    /*遮罩层隐藏*/
    function layerHide() {
        $('.black-layer').hide();
        $(".clothes-type").hide();
        $(".type-part").hide();
        $(".city").hide();
    }

// 点赞、收藏功能
    var winH = $("body").height();
    $(".login-dialog").css('height', winH);
    var regionData = {};
    var reInvidateCode = '';

    function userOperate() {
        $("#waterfall").delegate(".user-operate >span:not(:first)", "click", function (event) {
            // alert('here')
            var index = $(this).index();
            var sendData = {};
            var curId = $(this).attr('data-aid');
            var curType = $(this).attr('data-type');
            var curAction = $(this).attr('data-action');
            var curCollectNum = $(this).find('span').html();
            sendData.id = curId;
            sendData.type = curType;
            sendData.actionType = curAction;
            // 发送点赞收藏请求
            var _this = this;
            getStateInfo(sendData, true, function (result) {
                console.log(result);
                if (result.code == 0) {
                    //点亮图标
                    if (index == 1) {  // 点击收藏
                        if (!$(_this).find("i").hasClass("icon-collected")) {
                            $(_this).find("i").addClass("icon-collected");
                            curCollectNum++;
                            $(_this).find('span').html(curCollectNum);
                            $.wishListAlert("<div class='layer-ball-box'>收藏成功</div>");
                        }
                    } else if (index == 2) {  // 点击赞
                        if (!$(_this).find("i").hasClass("icon-praised")) {
                            $(_this).find("i").addClass("icon-praised");
                            curCollectNum++;
                            $(_this).find('span').html(curCollectNum);
                            $.wishListAlert("<div class='layer-ball-box'>点赞成功</div>");
                        }
                    }
                } else if (result.code == 1) {
                    hint_info('系统异常')
                } else if (result.code == 3) {
                    //用户未登录
                    $(".login-dialog").show();
                    $("html").css("overflow", "hidden");
                    memberRegion(curId, curType, curAction, index, _this, curCollectNum);
                } else if (result.code == 4) {
                    hint_info("操作对象不存在")
                }
            });
            event.stopPropagation();
            $(this).undelegate("click");
        });
    }

    /*弹窗输入信息 完成注册*/
    function memberRegion(cid, cType, aType, cIndex, _this, curCollectNum) {
        //获取验证码
        getInvidateCode();

        $("#submit-region-btn").click(function () {
            var teleNumber = $(".tele-number").val();
            var validateCode = $(".validate-code").val();
            regionData.type = cType;
            regionData.actionType = aType;
            regionData.id = cid;
            regionData.phoneNum = teleNumber;
            regionData.yzm = validateCode;
            regionData.inviteCode = "ajdkgiov";
            if (teleNumber == "" || validateCode == "") {
                hint_info('请填写完整信息');
                return
            }
            console.log(regionData);
            actionSubmitRegin(regionData, false, function (result) {
                console.log(result);
                if (result.code == 0) {
                    // 15532787853
                    // 877382
                    $(".login-dialog").hide();
                    $("html").css("overflow", "auto");
                    if (cIndex == 1) {  // 点击收藏
                        if (!$(_this).find("i").hasClass("icon-collected")) {
                            $(_this).find("i").addClass("icon-collected");
                            curCollectNum++;
                            $(_this).find('span').html(curCollectNum);
                            $.wishListAlert("<div class='layer-ball-box'>收藏成功</div>");
                        }
                    } else if (cIndex == 2) {  // 点击赞
                        if (!$(_this).find("i").hasClass("icon-praised")) {
                            $(_this).find("i").addClass("icon-praised");
                            curCollectNum++;
                            $(_this).find('span').html(curCollectNum);
                            $.wishListAlert("<div class='layer-ball-box'>点赞成功</div>");
                        }
                    }
                    console.log(cIndex);
                } else if (result.code == 1) {
                    hint_info('系统异常');
                    load_stop();
                } else if (result.code == 3) {
                    hint_info('手机号填写错误');
                    load_stop();
                } else if (result.code == 4) {
                    hint_info('验证码填写错误');
                    load_stop();
                }
            });
        });

    }

    //获取验证码

    function getInvidateCode() {
        $(".get-invidate-code").on("click", function () {
            var teleNumber = $(".tele-number").val();
            regionData = {phoneNum: teleNumber};
            console.log(regionData);
            countDown();
            //获取短信验证码
            getInvidateCodeInfo(regionData, false, function () {
                $(".validate-code-tip").css("visibility","visible");
            })
        });
    }

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

// 点击跳转详情页面
    function jumpDetail() {
        var url = "../detailed_account/";
        //更改查看状态，表示已经查看
        $("#waterfall").delegate(".picList,.wedding-house-list", "click", function () {
            var curId = $(this).attr('data-id');
            var curType = $(this).attr('data-type');
            var sendData = {
                id: curId,
                type: curType,
                actionType: 1
            };

            var curEle = $(this).find(".user-operate").children('span:eq(0)');
            curEle.children('i').addClass('icon-looked');
            var curNum = curEle.children('span').html();
            curNum++;
            curEle.children('span').html(curNum);
            console.log(curNum);
            getStateInfo(sendData, true, function (result) {

            });
            if (curType == 6) {
                window.location.href = url + "weddingHouse_detail.html?id=" + curId + "&type=" + curType;
            } else if (curType == 4 || curType == 5) {
                window.location.href = url + "accountAround_detail.html?id=" + curId + "&type=" + curType;
            } else {
                window.location.href = url + "account_detail.html?id=" + curId + "&type=" + curType;
            }
            return false
        });
    }
}
function update(isRefresh) {
    // 加载瀑布流数据
    var shopInfoData = "";
    if (isRefresh) {    // 页面加载

        paging.refreshPage();
        var page = paging.getPaging();
        sendData.pageSize = page.pageSize;
        sendData.pageNo = page.currentPage;

        getAccountListInfo(sendData, true, function (result) {
            accountListData = result;
            // 绑定体验店信息
            if (!shopInfoData) {
                shopInfoData = accountListData.data.experienceStore;
                var shopInfoStr = template('shop-info', {data: shopInfoData});
                $(".banner-box").html(shopInfoStr);
            }
            // 绑定瀑布流数据
            if (accountListData.data.list.length != 0) {
                if (categoryTypeId != 5) {
                    bindClothData(accountListData);
                    window.setTimeout(function () {
                        water.waterfall($("#waterfall"), $(".picList"));
                        ZhPullScroll.refresh();
                        //ZhPullScroll.scrollTo(0, -100, 200)
                    }, 200);
                } else {
                    bindWeddingHouse(accountListData);
                    ZhPullScroll.refresh();
                }
            }
        });
    } else {  // 向下滑动的加载
        paging.addPage();
        var page = paging.getPaging();
        sendData.pageSize = page.pageSize;
        sendData.pageNo = page.currentPage;
        if (accountListData.data.list.length != 0) {
            getAccountListInfo(sendData, true, function (result) {
                accountListData = result;
                if (categoryTypeId != 5) {
                    bindClothData(accountListData);
                    window.setTimeout(function () {
                        water.waterfall($("#waterfall"), $(".picList"));
                        ZhPullScroll.refresh();
                    }, 300);
                } else {
                    bindWeddingHouse(accountListData);
                    ZhPullScroll.refresh();
                }

            });

        }
    }
}


function bindClothData(result) {
    var html = "";

    var i = 0, length = result.data.list.length, item;
    for (; i < length; i++) {
        item = result.data.list[i];
        html += '<div class="picList" data-id="' + item.id + '" data-type="' + item.type + '">';
        html += '<div class="picThumbnail">';
        //html += '<a href="javascript:;"><img src="/src/images/loading.gif" data-original="' + item.icon + '" class="lazy-img"></a>';
        html += '<a href="javascript:;"><img src="' + item.icon + '" style="height: ' + item.height / 2 + 'px"></a>';
        html += '</div>';
        html += '<div class="picDescription">';
        if (item.isRent) {
            if (item.isRent == 0) {
                html += '<p>' + item.title + '</p>';
            } else {
                html += '<p><i class="tc clothes-label">可租</i>' + item.title + '</p>';
            }
        } else {
            html += '<p>' + item.title + '</p>';
        }

        if (item.isPreference == 0) {
            html += '<p class="picDescription-money">￥<span>' + item.price + '</span></p>';
        } else {
            html += '<p class="picDescription-money">￥<span>' + item.price + '</span><i class="tc clothes-label ml-15">结婚特惠季</i></p>';
        }
        html += '<p class="user-operate">';
        if (item.isView == 1) {
            html += '<span><i class="icon iconfont icon-look icon-looked">&#xe605;</i><span>' + item.viewNum + '</span></span>';
        } else {
            html += '<span><i class="icon iconfont icon-look">&#xe605;</i><span>' + item.viewNum + '</span></span>';
        }
        if (item.isKeep == 1) {
            html += '<span data-type="' + item.type + '" data-aid = "' + item.id + '" data-action="2"><i class="icon iconfont icon-look icon-collected">&#xe62e;</i><span>' + item.keepNum + '</span></span>';
        } else {
            html += '<span data-type="' + item.type + '" data-aid = "' + item.id + '" data-action="2"><i class="icon iconfont icon-look">&#xe62e;</i><span>' + item.keepNum + '</span></span>';
        }
        if (item.isLike == 1) {
            html += '<span  data-type="' + item.type + '" data-aid = "' + item.id + '" data-action="3"><i class="icon iconfont icon-look icon-praised">&#xe652;</i><span>' + item.likeNum + '</span> </span>';
        } else {
            html += '<span data-type="' + item.type + '" data-aid = "' + item.id + '" data-action="3"><i class="icon iconfont icon-look">&#xe652;</i><span>' + item.likeNum + '</span> </span>';
        }
        html += '</p>';
        html += '</div>';
        html += '</div>';
    }

    $("#waterfall").append(html);

}


function bindWeddingHouse(result) {
    var weddingStr = '';
    var i = 0, length = result.data.list.length, item;
    for (; i < length; i++) {
        item = result.data.list[i];
        weddingStr += '<dl class="wedding-house-list" data-id="' + item.id + '" data-type="' + item.type + '">';
        //weddingStr += '<dt><img src="/src/images/loading.gif" data-original="'+item.icon+'" class="lazy-img"></dt>';
        weddingStr += '<dt><img src="' + item.icon + '"></dt>';
        weddingStr += '<dd>';
        weddingStr += '<div class="describe">';
        weddingStr += '<div class="title"><h3>' + item.title + '</h3><span class="address">' + item.location + '</span></div>';
        weddingStr += '<p>' + item.subtitle + '</p>';
        weddingStr += '<p class="user-operate wedding-user-operate">';
        if (item.isView == 1) {
            weddingStr += '<span><i class="icon iconfont icon-look icon-looked">&#xe605;</i><span>' + item.viewNum + '</span></span>';
        } else {
            weddingStr += '<span><i class="icon iconfont icon-look">&#xe605;</i><span>' + item.viewNum + '</span></span>';
        }
        if (item.isKeep == 1) {
            weddingStr += '<span data-type="' + item.type + '" data-aid = "' + item.id + '" data-action="2"><i class="icon iconfont icon-look icon-collected">&#xe62e;</i><span>' + item.keepNum + '</span></span>';
        } else {
            weddingStr += '<span data-type="' + item.type + '" data-aid = "' + item.id + '" data-action="2"><i class="icon iconfont icon-look">&#xe62e;</i><span>' + item.keepNum + '</span></span>';
        }
        if (item.isLike == 1) {
            weddingStr += '<span  data-type="' + item.type + '" data-aid = "' + item.id + '" data-action="3"><i class="icon iconfont icon-look icon-praised">&#xe652;</i><span>' + item.likeNum + '</span> </span>';
        } else {
            weddingStr += '<span data-type="' + item.type + '" data-aid = "' + item.id + '" data-action="3"><i class="icon iconfont icon-look">&#xe652;</i><span>' + item.likeNum + '</span> </span>';
        }
        weddingStr += '</p>';
        weddingStr += '</div>';
        weddingStr += '</dd>';
        weddingStr += '</dl>';
    }

    $("#waterfall").append(weddingStr);

    initHeight();

}

function initHeight() {
    var leng = $("#waterfall .wedding-house-list").length;
    var curH = $("#waterfall .wedding-house-list").height();
    $("#waterfall").height(leng * curH + leng * 20);
}
//底部菜单 预约事件
function orderCustromSer() {
    $(".fixed-order-btn").click(function () {
        isLogin(null, false, function (result) {
            console.log(result);
            if (result.code == 0) {  //  已经登录
                window.location.href = "/wishlist_mobile/mobileStation/detailed_account/kefu.html?phoneNum=" + result.data.phoneNum + "&sid=128324&entry=5&ref=link";
            } else if (result.code == 1) {
                hint_info('系统异常');
            } else if (result.code == 3) {  //  用户未登录
                window.location.href = "../order/bind_phone.html?sid=128324&entry=5&ref=link&action_type=4";
            }
        })
    })
}
orderCustromSer();
function personClick(event) {
    //点击跳转个人中心
    event.stopPropagation();
    isLogin(null, true, function (result) {
        if (result.code == 0) {
            window.location.href = "/wishlist_mobile/mobileStation/miccenter/personal.html";
        } else if (result.code == 3) {
            window.location.href = "/wishlist_mobile/mobileStation/order/bind_phone.html?action_type=3";
        } else {
            console.log(result.msg);
        }

    });

}

//检测是否横屏

$(window).resize(function () {
    water.waterfall($("#waterfall"), $(".picList"));
});