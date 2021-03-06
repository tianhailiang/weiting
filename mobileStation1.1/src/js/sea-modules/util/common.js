
/**
 * 公共类库、方法
 * 
 */



/**
 * 获取URL
 * 
 */

//(function(doc,window){
//
//  function OperationURL(){
//
//  }
//
//  OperationURL.getDomain = function(){
//      //TODO 获取域名
//      var host = location.host;
//      if(host.indexOf("localhost")>0||host.indexOf(":")>0){
//          return host;
//      }
//      return host.split(".")[0];
//  };
//
//  OperationURL.getDomainSec = function(){
//      //TODO 获取二级域名
//      var host = location.host;
//      var domain = host.split(".");
//      if(domain.length > 0){
//          return domain[0];
//      }
//      return "";
//  };
//
//  OperationURL.getUrlParent = function(url){
//      var index = url.lastIndexOf("/");
//      var new_url = url.substring(0, index + 1);
//      return new_url;
//  };
//
//  OperationURL.getUrlOrigin = function(){
//      var new_url = location.origin+"/";
//      return new_url;
//  };
//
//  OperationURL.getUrlParam = function(url){
//      var index = url.lastIndexOf("?");
//      var url_param = url.substring(index + 1, url.length);
//      var param_arr = url_param.split("|");
//      var paramObj = {};
//      for(var i in param_arr){
//          var str = param_arr[i];
//          var key = str.split("=")[0];
//          var value = str.split("=")[1];
//          paramObj[key] = value;
//      }
//      return paramObj;
//  };
//
//  OperationURL.getQueryString = function(name){
//      var reg;
//      var search = window.location.search.substr(1);
//      if(search.indexOf("?") != -1){
//          reg = new RegExp("(^|&)" + name + "=([^]*)(&|$)");
//      }else{
//          reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//      }
//      var r = search.match(reg);
//      if(r != null) return r[2];
//      return null;
//  }
//
//  /*
//   * 加载Url
//   * @winType:窗口类型
//   * @mode:模式
//   * @orientation:横屏 or 竖屏
//   * @title:标题
//   * @url:页面地址
//   * */
//  OperationURL.loadURL = function(winType, mode, orientation, title, url){
//      if(browseInfo.isTongLianApp()){
//         
//          webviewInterface.createWindow(winType, mode, orientation, title, url);
//      }
//      else {          
//          
//         
//          window.location.href = url;
//      }
//  };
//
//  window.OperationURL = OperationURL;
//
//})(document,window);
//
//
//
//
///*
// * 正则表达式校验
// * 
// */
//
//var validate = {
//  //phone
//  phone: function(phone){
//      if(!/^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9 ]|177)\d{8}$/.test(phone)){
//          return false;
//      }
//      return true;
//  },
//  
//  //身份证
//  card: function(card) {
//      var l = 0;
//      var i = card;
//      var m = {11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙",21: "辽宁",22: "吉林",23: "黑龙",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",81: "香港",82: "澳门",91: "国外"};
//      if (!/^\d{17}(\d|x)$/i.test(i)) {
//          return false
//      }
//      i = i.replace(/x$/i, "a");
//      if (m[parseInt(i.substr(0, 2))] == null) {
//          return false
//      }
//      var n = i.substr(6, 4) + "-" + Number(i.substr(10, 2)) + "-" + Number(i.substr(12, 2));
//      var j = new Date(n.replace(/-/g, "/"));
//      if (n != (j.getFullYear() + "-" + (j.getMonth() + 1) + "-" + j.getDate())) {
//          return false
//      }
//      for (var d = 17; d >= 0; d--) {
//          l += (Math.pow(2, d) % 11) * parseInt(i.charAt(17 - d), 11)
//      }
//      if (l % 11 != 1) {
//          return false
//      }
//      return true;
//  }
//};
//
//
//
//
//
/*
* 信息提示
* 
*/


//
///*
// * 加载
// * 
// */
//
//(function($){
//  $.extend({
//      loadingShow:function(){
//          layer.open({
//              type:2
//          });
//
//      }
//  });
//
//})(jQuery);
//
///*
// * 隐藏
// * 
// */
//
//(function($){
//  $.extend({
//      loadingHide:function(){
//          layer.closeAll();
//      }
//  });
//})(jQuery);


define(function(require, exports, module) {


    var common=function(){};
    
    
 (function($){
    $.extend({
        wishListAlert:function(msg){
            layer.open({
                shade:false,
                time:1,
                content:msg
            });
        }
    });
})(jQuery);

/*
 * 设置cookie
 * 
 */

common.setCookie=function (name,value,leftCircle){
         
		   var oDate=new Date();
		
		   oDate.setDate(oDate.getDate()+leftCircle);
		
		   document.cookie=name+"="+value+";expiers="+oDate+";path=/;";


	};
	
	
	 common.getCookie = function (name){
          
        var reg=/\s+/g;
        var cookie=document.cookie.replace(reg,"");
        var cookieArr=cookie.split(";");
         
         for(var i=0;i<cookieArr.length;i++){

            var attrArr=cookieArr[i].split("=");
            if(attrArr[0]==name){

               return attrArr[1];

            }

            return "";
         }


    };

 /*
 * 获取cookie
 * 
 */

  module.exports=common;


    
});

