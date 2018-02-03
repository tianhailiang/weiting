/*请求数据接口方法*/

/*清单首页数据接口 start*/
// 获取筛选城市列表
var getCityInfo = function (param, async, succfun) {
    var testurl = "http://127.0.0.1:8080/testdata/account_list_city.json";
    var useurl = config.getUrl() + "getDataCategoryCity";
    $.ajax({
        type: "GET",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });

};
var getWishBanner = function (param, async, succfun) {
    var testurl = "http://127.0.0.1:8080/testdata/account_list_city.json";
    var useurl = config.getUrl() + "getBannerList";
    $.ajax({
        type: "POST",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });

};
//获取消息通知
var getNoticeInfo = function (param, async, succfun) {
    var testurl = "http://127.0.0.1:8080/testdata/notice_number.json";
    var useurl = config.getUrl() + "getUserMsgNoticeNumber";
    $.ajax({
        type: "GET",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
//获取消息通知详情
var getNoticeInfoDetail = function (param, async, succfun) {
    var testurl = "http://127.0.0.1:8080/testdata/notice_number.json";
    var useurl = config.getUrl() + "getMessageList";
    $.ajax({
        type: "POST",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
// 获取清单首页热门清单(前两个)
var getHotItemInfo = function (param, async, succfun) {
    var testurl = "http://127.0.0.1:8080/testdata/hot_item.json";
    var useurl = config.getUrl() + "getHotDetailedList";
    $.ajax({
        type: "GET",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
// 获取所有热门清单列表
var getAllHotItemInfo = function (param, async, succfun) {
    var testurl = "http://127.0.0.1:8080/testdata/hot_item_all.json";
    var useurl = config.getUrl() + "getAllHotTopicsList";
    $.ajax({
        type: "GET",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
//获取清单单品列表页
var getHotItemDetailInfo = function (param, async, succfun) {
    var testurl = "http://127.0.0.1:8080/testdata/hot_item_list.json";
    var useurl = config.getUrl() + "getRecommendingCommoditiesList";
    $.ajax({
        type: "POST",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
// 获取清单详情页
var getAccountDetailInfo = function (param, async, succfun) {
    var testurl = "http://127.0.0.1:8080/testdata/account_detail.json";
    var useurl = config.getUrl() + "getClothingDetails";
    $.ajax({
        type: "POST",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
//判断用户是否登录
var isLogin = function (param, async, succfun) {
    var useurl = config.getUrl() + "isLogin";
    var testurl = "http://127.0.0.1:8080/testdata/isLogin.json";
    $.ajax({
        type: "GET",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: true,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
// 获取短信验证码
var getInvidateCodeInfo = function (param, async, succfun) {
    var useurl = config.getUrl() + "getVerificationCode";
    $.ajax({
        type: config.getType(),
        url: useurl,
        dataType: config.getDataType(),
        data: param,
        async: async,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
// 注册手机号表单提交
var sumbitPhoneNuber = function (param, async, succfun) {
    var useurl = config.getUrl() + "login";
    $.ajax({
        type: config.getType(),
        url: useurl,
        dataType: config.getDataType(),
        data: param,
        async: async,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });

};
//查看、收藏接口
var getStateInfo = function (param, async, succfun) {
    var useurl = config.getUrl() + "modifyStatData";
    $.ajax({
        type: config.getType(),
        url: useurl,
        dataType: config.getDataType(),
        data: param,
        async: async,
        success: function (data) {
            succfun(data)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
// 获取筛选条件
var getFilterInfo = function (param, async, succfun) {
    var useurl = config.getUrl() + "getSearchTerms";
    var testurl = "http://127.0.0.1:8080/testdata/account_filter.json";
    $.ajax({
        type: "GET",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: async,
        success: function (data) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    })
};
// 获取清单服装列表  白纱、礼服、男装
var getClothInfo = function (param, async, succfun) {
    var useurl = config.getUrl() + "getList2";
    var testurl = "http://127.0.0.1:8080/testdata/hot_item_list.json";
    $.ajax({
        type: "GET",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: async,
        success: function (data) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    })
};
//获取、（4:周边配饰、6：婚礼堂、9:回礼）列表
var getMaterialInfo = function (param, async, succfun) {
    var useurl = config.getUrl() + "getList3";
    var testurl = "http://127.0.0.1:8080/testdata/hot_item_list.json";
    $.ajax({
        type: "POST",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: async,
        success: function (data) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    })
};
/*
 * 清单婚礼堂详情菜单
 * weddingHouse_detail.html
 *
 */
var weddingHouseMenuInfo = function (param, async, succfun) {
    var testurl = "/api/wedding_house_menu";
    var useurl = config.getUrl() + "getWeddingHallpackages";
    $.ajax({
        type: config.getType(),
        url: useurl,
        dataType: config.getDataType(),
        data: param,
        async: async,
        success: function (data, status) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    });
};
//获取预约信息
var getMyOrderInfo = function (param, async, succfun) {
    var useurl = config.getUrl() + "getAppointmentWeddingHallList";
    var testurl = "http://127.0.0.1:8080/testdata/hot_item_list.json";
    $.ajax({
        type: "GET",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: async,
        success: function (data) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    })
};
//获取预约信息
var getMyOrderInfoDetail = function (param, async, succfun) {
    var useurl = config.getUrl() + "getMemberBook";
    var testurl = "http://127.0.0.1:8080/testdata/hot_item_list.json";
    $.ajax({
        type: "POST",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: async,
        success: function (data) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    })
};
//获取预约地区信息
var getOrderAreaInfo = function (param, async, succfun) {
    var useurl = config.getUrl() + "getMemberBookNews";
    var testurl = "http://127.0.0.1:8080/testdata/hot_item_list.json";
    $.ajax({
        type: "POST",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: async,
        success: function (data) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    })
};
// 提交预约信息
var sumbitOrderInfo = function (param, async, succfun) {
    var useurl = config.getUrl() + "book";
    var testurl = "http://127.0.0.1:8080/testdata/hot_item_list.json";
    $.ajax({
        type: "POST",
        url: useurl,
        dataType: "JSON",
        data: param,
        async: async,
        success: function (data) {
            succfun(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error " + textStatus);
        }
    })
};
/*清单首页数据接口 end*/

