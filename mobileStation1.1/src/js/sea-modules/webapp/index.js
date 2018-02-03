
define(function(require, exports, module) {

    require('jquery');
    
    require("fastclick");
    FastClick.attach(document.body);
    
    require("swiper");
    
    var template = require('template');
    
    var common = require("common");
    
    require("lazyload");
    
    require("layer");

var flag=true;
var cont = true;


var param = {

        type: 0,
        city:null
       

};

common.setCookie("WISHLIST_MEMBER_ID","thg","100");

var memberId=common.getCookie("WISHLIST_MEMBER_ID");	
  
  
  
 /*=============接口================*/
	
var getCityInfo = function (param, async, succfun) {
              // 获取筛选城市列表
                var testurl = "../../../../testdata/account_list_city.json";
                var useurl = "http://m.wishlist1314.com/wishlist_mobile/mobile/getDataCategoryCity";

                $.ajax({
                    type: "GET",
                    url: testurl,
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


 var getNoticeInfo = function (param, async, succfun) {

    //2 获取通知数量、系统通知、用户预约通知 (新加) 0系统消息、1预约消息

    var testurl = "../../../../testdata/getNoticeInfo.json";

    var useurl ="http://m.wishlist1314.com/wishlist_mobile/mobile/getUserMsgNoticeNumber";

    var url = useurl;

    $.ajax({
        type: "GET",
        url: testurl ,
        dataType: "JSON",
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

var getMicroInfo = function (param, async, succfun) {

    //（banner-图片轮播） 10、获取banner列表

    var testurl = "/api/wishBanner";

    var useurl = "http://m.wishlist1314.com/wishlist_mobile/mobile/getBannerList";

    $.ajax({
        type:"GET",
        url: testurl,
        dataType: "JSON",
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


var wishInfo = function (param, async, succfun) {

   //心愿展示首页 11、获取心愿内容列表（精选是攻略、体验活动、婚礼堂的组合）

    var testurl = "/api/index" + param.type;
    var useurl = "http://m.wishlist1314.com/wishlist_mobile/mobile/getWishList";
   
    $.ajax({
        type:"GET",
        url: testurl,
        dataType: "JSON",
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


var lpcOperate = function (param, async, succfun) {

    //(16、查看、点赞、收藏接口)

    var testurl = "/api/lpcOperate";

    var useurl = "http://m.wishlist1314.com/wishlist_mobile/mobile/modifyStatData";
    


    $.ajax({
        type: "GET",
        url: testurl,
        dataType: "JSON",
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

	
	
	
     getCityInfo(null,true,function(result){
          //获取城市接口

            if(result.code==0){

                $("#header_city").html(result.data[0].name);
                
                param.city=result.data[0].id;

                for(var i=0;i<result.data.length;i++){

                  $("#city_ul").append("<li data-cid="+result.data[i].id+" >"+result.data[i].name+"</li>");
             
                     
                }

            }else{

               console.log(result.msg);
            }  


        });
 
   
       document.querySelector("#header_city_box").addEventListener("click",function(){
           
              //显示城市
                var heig=document.documentElement.clientHeight;

                 $("#city_box").height(heig);

                 $("#city_box").show();

                document.addEventListener('touchmove', myStop,false);


                   $("#city_ul li").click(function(){
                        //点击城市切换
                       
                        $("#header_city").html($(this).text());

                         $("#city_box").hide();
                         
                            document.removeEventListener('touchmove', myStop, false);

                   });


       },false);
       
       
      getNoticeInfo(null, true, function (result) {
        //显示消息

              if(result.code==0){

                   if(result.data.count>Number(localStorage.noticeNumber)){
                         
                         $("#news").show();

                   }else{
                      
                         $("#news").hide();

                   }

                document.querySelector("#bell").addEventListener("click",function(){
                   //点击进入消息系统

                       window.location.href="detailed_account/message_notify.html";    

                  },false);

              }else{
                 
                 console.log(result.msg);
              }

              localStorage.noticeNumber = result.data.count;

      });
   
        
         document.querySelector("#service").addEventListener("click",function(){
            //点击客服进入
           
            if(memberId!=""){
                //根据用户Id判断登没登陆

                  window.location.href = "detailed_account/kefu_1.1.html?phoneNum=" +  localStorage.userPhoneNum +"&sid=128324&entry=5&ref=link";

             }else{

                  window.location.href = "order/bind_phone.html";

             }
             
         },false);
         
         
        document.querySelector("#perCenter").addEventListener("click",function(event){
           //点击进入个人中心
                   event.preventDefault();

                 if(memberId==""){
                    
                      window.location.href = "order/bind_phone.html?action_type=3";

                 }else{

                      window.location.href = "miccenter/personal.html";

                 } 


        },false);  
        
        
     

       getMicroInfo({type:1}, true, function (result) {
              //加载（图片轮播）
              if (result.code == 0) {
                  
                  $("#banner").html(template("bannerTemplate", result));
                 
                 var swiper_banner = new Swiper('#swiper-container1', {
				        pagination: '.swiper-pagination',
				        paginationClickable: false,
				        spaceBetween: 0,
				        centeredSlides: true,
				        autoplay: 2500,
				        autoplayDisableOnInteraction: false,
				        loop: true
				
				    });
				    
              } else {
                  console.log(result.msg);
              }
          });


       

               
         var mySwiper = new Swiper('#swiper-container2', {

            onSlideChangeStart: function (swiper) {

                var wid=$(".ibox").width();
     
                var distance = (swiper.activeIndex) * wid +"px" ;
             
               document.getElementsByClassName("ibox")[0].style.webkitTransform = "translateX(" + distance + ")";
               document.getElementsByClassName("ibox")[1].style.webkitTransform = "translateX(" + distance + ")";

               $(".ibox").attr("style", "transform:translateX(" + distance + ")");

                if($("#nav-box2").css("display")=="block"){

                   $(window).scrollTop(214);
                }


             },

            onSlideChangeEnd: function (swiper) {
                 
                 $("#nav-box1 ul>li").find("a").removeClass('act');
                 $("#nav-box2 ul>li").find("a").removeClass('act');
                 $("#nav-box1 ul>li").eq(swiper.activeIndex).find("a").addClass("act");
                 $("#nav-box2 ul>li").eq(swiper.activeIndex).find("a").addClass("act");
                
                //请求数据
                param.type = swiper.activeIndex;

                // console.log("type " + type);

                  update();

            }


        });
        
          
           $(".nav-box ul>li").click(function (event) {

                  //点击切换事件
                  event.preventDefault();

                  param.type = $(this).index();

                  mySwiper.slideTo(param.type , 500, false);

                  $(".nav-box ul>li").find('a').removeClass('act');

                  $(this).find("a").addClass('act');

                      var wid=$(".ibox").width();
                    
                      var distance = param.type* wid +"px" ;

                  document.getElementsByClassName("ibox")[0].style.webkitTransform = "translateX(" + distance + ")";
                  document.getElementsByClassName("ibox")[1].style.webkitTransform = "translateX(" + distance + ")";

                  $(".ibox").attr("style", "transform:translateX(" + distance + ")");

                     if($("#nav-box2").css("display")=="block"){

                        $(window).scrollTop(214);
                            
                      }

                
                      update();
                      

            });
        
        
     
     
         update();  //初始化加载
        
	   function update() {
	
	        wishInfo(param, true, function (result) {
	
	            if (result.code == 0) {
	
	                    $("#date_time").html(result.data.time);
              
	                    $(".wrapper-ul").hide();

	                    $(".wrapper-ul" + param.type).show();
	                    
                        
                      
	                  $(".wrapper-ul" + param.type).html(template("template" + param.type, result));
	
	                     
					    var  mySwiper3= new Swiper('.swiper-container3', {
					        //活动商品轮播。
					
					      slidesPerView :'2.5',
					      freeMode : true,
					      spaceBetween : 7.5,
					    
					    });
	
                         $(".lazy-img").lazyload({
                
                                placeholder: "",
                                threshold: 200,
                                failurelimit : 10,
                               
                  
                         });   
	
	
		                   $(".wrapper-ul li").click(function(){
		                   	
		                   	   // 点击商品跳转到对应商品详情页。
   
								   var type=$(this).attr("data-type");						
								   var id=$(this).attr("data-id");
								   var isView=$(this).attr("data-isView");
								
								    switch (type) {
								
								        case "11":
								           
								           window.location.href="wish/planning_division_detail.html?id=" + id + "&isView=" + isView;
								           
								           break;
								
								        case "10":
								            
								            window.location.href = "detailed_account/hot_list_collect_detail.html?id=" + id + "&isView=" + isView;
								
								            break;
								
								        case "8":
								
								            window.location.href = "wish/alive_strategy_detail.html?id=" +id + "&isView=" + isView;
								
								            break;
								
								        case "7":
								
								            window.location.href = "wish/experience_activity_detail.html?id=" + id + "&isView=" + isView;
								           
								            break;
								
								        case "6":
								           
								            window.location.href = "detailed_account/weddingHouse_detail.html?id=" + id + "&type=6" + "&isView=" + isView;
								           
								            break;
								
								       default :
								          
								           window.location.href="detailed_account/account_detail.html?id="+id+ "&type="+type + "&isView=" + isView;  
								          
								          break;
								       
								
								    }
		                   	
		                   	
		                   });
		
		                  var collectLi= document.querySelectorAll(".collect_li"); 
		       
		                      for(var i=0;i<collectLi.length;i++){
		                           //点击收藏 
		
		                          collectLi[i].addEventListener("click", operateCollect,true);
		                          
		
		                      };
		
	                    
	            } else {
	
	                console.log(result.msg);
	            }
	
	        });
	
	};
	

           $(window).on("scroll",function(){
              //滚动加载

                       if($(this).scrollTop()>=214){

                           $("#nav-box2").show();

                       }else{

                              $("#nav-box2").hide();
                       }

                       $(".lazy-img").lazyload({
                              
                                  placeholder: "",
                                  threshold: 200,
          

                      });    
                      
              

        });  
        
        
         
	
	function operateCollect(event) {
		
		    //查看 点赞 收藏 操作
		
		    event.stopPropagation();
		
		    var that = this;
		
		    var dataType = $(this).attr("data-type");
		
		    var operateId = $(this).attr("data-id");
		
		    var param = {
		        type: dataType,
		
		        actionType: "2",
		
		        id: operateId
		    };

       

           lpcOperate(param, true, function(result){
                      //调查看 收藏 点赞接口
                        
                          if(result.code==0){

                               
                                       $.wishListAlert("<div class='layer-ball-box'>收藏成功</div>");

                                        var origNum = parseInt($(that).find(".num").html()) + 1;

                                        $(that).find(".num").html(origNum);

                                        $(that).find("i").attr("style","color:#e8796e;");
                                       
                                     
                                        that.removeEventListener("click",operateCollect,true);


                          }else if (result.code == 3) {
               
                              window.location.href = "order/bind_phone.html?action_type=3"; 

                          } else{
                            
                              console.log(result.msg)
                          }


                     });


               };
	 
 
   
});
        
        
  

