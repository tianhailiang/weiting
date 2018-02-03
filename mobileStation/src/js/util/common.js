
/**
 * 公共类库、方法
 * 
 */


 (function($,doc,window){

      function tab(){

      }
 

   tab.tabClick=function(obj1,obj2,obj3){
     //点击面向对象切换图片
    
      $(obj1).click(function(){
         

         if($(this).find(obj2).hasClass(obj3)){
                
             $(this).find(obj2).removeClass(obj3); 

         }else{
            $(this).find(obj2).addClass(obj3);
        }

      });  
           
   };
   

   window.tab=tab;

  

})(jQuery,document,window);  





/**
 * 获取URL
 * 
 */

(function(doc,window){

    function OperationURL(){

    }

    OperationURL.getDomain = function(){
        //TODO 获取域名
        var host = location.host;
        if(host.indexOf("localhost")>0||host.indexOf(":")>0){
            return host;
        }
        return host.split(".")[0];
    };

    OperationURL.getDomainSec = function(){
        //TODO 获取二级域名
        var host = location.host;
        var domain = host.split(".");
        if(domain.length > 0){
            return domain[0];
        }
        return "";
    };

    OperationURL.getUrlParent = function(url){
        var index = url.lastIndexOf("/");
        var new_url = url.substring(0, index + 1);
        return new_url;
    };

    OperationURL.getUrlOrigin = function(){
        var new_url = location.origin+"/";
        return new_url;
    };

    OperationURL.getUrlParam = function(url){
        var index = url.lastIndexOf("?");
        var url_param = url.substring(index + 1, url.length);
        var param_arr = url_param.split("|");
        var paramObj = {};
        for(var i in param_arr){
            var str = param_arr[i];
            var key = str.split("=")[0];
            var value = str.split("=")[1];
            paramObj[key] = value;
        }
        return paramObj;
    };

    OperationURL.getQueryString = function(name){
        var reg;
        var search = window.location.search.substr(1);
        if(search.indexOf("?") != -1){
            reg = new RegExp("(^|&)" + name + "=([^]*)(&|$)");
        }else{
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        }
        var r = search.match(reg);
        if(r != null) return r[2];
        return null;
    }

    /*
     * 加载Url
     * @winType:窗口类型
     * @mode:模式
     * @orientation:横屏 or 竖屏
     * @title:标题
     * @url:页面地址
     * */
    OperationURL.loadURL = function(winType, mode, orientation, title, url){
        if(browseInfo.isTongLianApp()){
           
            webviewInterface.createWindow(winType, mode, orientation, title, url);
        }
        else {          
            
           
            window.location.href = url;
        }
    };

    window.OperationURL = OperationURL;

})(document,window);


/**
 * 排序字段
 * */
(function(doc,window){
    function OrderField(){

    }

    OrderField.fields = {
        "salesOrder" : "salesOrder",
        "priceOrder" : "priceOrder",
        "goodReputationOrder" : "goodReputationOrder"
    };

    window.OrderField = OrderField;

})(document,window);


/**
 * 筛选排序类
 * */

(function(doc,window){
   
    function QueryWithOrder(orderField){
        this.pageSize = 6;
        this.currentPage = 1;
        this.orderField = orderField;
        this.orderDesc =true;
        this.filterField = {};
    }

    //添加页
    QueryWithOrder.prototype.addPage = function(){
        this.currentPage += 1;
    }

    //刷新页面
    QueryWithOrder.prototype.refreshPage = function(){
        this.currentPage = 1;
    }

    //改变排序字段
    QueryWithOrder.prototype.changeOrderField = function(orderField){
        this.orderField = orderField;
    }
    //切换升序降序
    QueryWithOrder.prototype.changeOrderDesc = function(isDesc){
        this.orderDesc = isDesc;
    }

    //添加筛选字段
    QueryWithOrder.prototype.addFilterField = function(key, value){
        if(key!=undefined){
            this.filterField[key] = value;
        }
    }

    //移除筛选字段
    QueryWithOrder.prototype.removeFilterField = function(key){
        for(var _key in this.filterField){
            if(_key === key){
                delete this.filterField[_key];
            }
        }
    }

    //获取最终筛选参数对象
    QueryWithOrder.prototype.getQuerySting = function(){
        var obj = new Object();
        obj["pageSize"] = this.pageSize;
        obj["currentPage"] = this.currentPage;
        obj["orderDesc"] = this.orderDesc;
        obj["orderField"] = this.orderField;
        obj["filterField"] = this.filterField;
        return obj;
    }

    QueryWithOrder.prototype.getPaging = function(){
        var obj = new Object();
        obj["pageSize"] = this.pageSize;
        obj["currentPage"] = this.currentPage;
        return obj;
    }

    window.QueryWithOrder = QueryWithOrder;

})(document,window);



/*
 * 正则表达式校验
 * 
 */

var validate = {
    //phone
    phone: function(phone){
        if(!/^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9 ]|177)\d{8}$/.test(phone)){
            return false;
        }
        return true;
    },
    
    //身份证
    card: function(card) {
        var l = 0;
        var i = card;
        var m = {11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙",21: "辽宁",22: "吉林",23: "黑龙",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",81: "香港",82: "澳门",91: "国外"};
        if (!/^\d{17}(\d|x)$/i.test(i)) {
            return false
        }
        i = i.replace(/x$/i, "a");
        if (m[parseInt(i.substr(0, 2))] == null) {
            return false
        }
        var n = i.substr(6, 4) + "-" + Number(i.substr(10, 2)) + "-" + Number(i.substr(12, 2));
        var j = new Date(n.replace(/-/g, "/"));
        if (n != (j.getFullYear() + "-" + (j.getMonth() + 1) + "-" + j.getDate())) {
            return false
        }
        for (var d = 17; d >= 0; d--) {
            l += (Math.pow(2, d) % 11) * parseInt(i.charAt(17 - d), 11)
        }
        if (l % 11 != 1) {
            return false
        }
        return true;
    }
};


/*
* 清空文本框内容
* 
*/

(function($){
    
    $.fn.clearText=function(options){
        var defaults = {
            targetId : "",
            className : ""
        };
        var opts = $.extend({}, defaults, options);

        var obj = $(this);
       
        obj.bind("click",function(){
           if(opts.targetId!=""){
               $("#"+opts.targetId).val("");
           } else{
               $(this).prev("input").val("");
           }
        });
    }

})(jQuery);



/*
* 信息提示
* 
*/

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
 * 加载
 * 
 */

(function($){
    $.extend({
        loadingShow:function(){
            layer.open({
                type:2
            });
  
        }
    });

})(jQuery);

/*
 * 隐藏
 * 
 */

(function($){
    $.extend({
        loadingHide:function(){
            layer.closeAll();
        }
    });
})(jQuery);




/**
 * 瀑布流方法
 * 
 */

(function($,doc,window){

   function water(){

   };


 water.waterfall=function(showArea,contentArea){
        // 瀑布流
        var wfArea = showArea; //显示区域名称
        var wfList =contentArea; //内容区域名称

        var winW = $(document).width(); // 当前屏幕的宽度

   
     var wfWidth = winW * .485; //获取内容区域实际宽度（含Margin和Padding的值）

        var wfArr = []; //创建数组，用来记录内容区域高度
        var maxCol = Math.floor($(window).width() / wfWidth); //窗口的宽度除以内容区域宽度，并且向下取整（得出每行能放多少列）

         
        for (var i = 0; i < wfList.length; i++) { //根据内容区域数量进行循环
            

           var colHeight = wfList.eq(i).outerHeight(true); //获取每个内容区域的高度
        
            // console.log("内容高度"+colHeight);

            if (i < maxCol) { //如果i小于maxCol，那就说明是在一行里面（例如每行有4列，那就是4个为一组）
                wfArr[i] = colHeight; //把每组内容区域的高度，放入到数组中
                wfList.eq(i).css("top", 0); //第一行Li的默认Top值为0
                wfList.eq(i).css("left", i * wfWidth); //每个列的Left值就是当前列数*内容区域宽度
            } else {

                minHeight = Math.min.apply(null, wfArr); //获取数组中的最小值（也就是每行中，最小高度的那列）
                // console.log(minHeight);

                minCol = getArrayKey(wfArr, minHeight); //最小的值对应的指针

                wfArr[minCol] += colHeight; //加上新高度后更新高度值

                wfList.eq(i).css("top", minHeight); //先得到高度最小的Li，然后把接下来的li放到它的下面
                wfList.eq(i).css("left", minCol * wfWidth); //第i个列的左坐标就是i*列的宽度
            }

        }

        var wfLastLayerT = parseInt(wfList.last().css("top")); //最后一个元素的Top值

        

        var wfLastLayerH = wfList.last().outerHeight(true); //最后一个元素的高度
   

        var wfAreaH = wfLastLayerT + wfLastLayerH + "px"; //显示区域的高度为 最后一个元素的Top值+自身高度
      

       

        wfArea.css({"width":"96%", "height": wfAreaH}); //设置显示区域宽度和高度
        

    
          

    };


     function getArrayKey(s, v) { //使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个)
        for (k in s) {
            if (s[k] == v) {
                return k;
            }
        }
    };


  window.water=water;



})(jQuery,document,window);  


/**
 * 页面初始化入口
 * 
 */

$(document).ready(function(){

     $(document).ajaxError(function(e,xhr,opt){
        console.log("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
    });
     
    $("#btnBack").click(function(){
        window.history.go(-1);
        
    });

   
    $("#btnBack").click(function(){
        window.history.go(-1);
        
    });

      init();

  



});


function init(){
    //此为主函数入口，需要在各页面对应的js中覆盖此方法
    
}