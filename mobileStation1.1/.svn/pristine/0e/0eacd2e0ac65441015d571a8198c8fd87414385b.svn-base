
var id=null;

 var mySwiper1=null;

function init(){

         
         linkLogin();   
               
       

               
    		     mySwiper1 = new Swiper('#swiper-container1', {
    	            noSwiping : true,
    	            hashnav:true,

    		    });
        
 
          

         
          $("#widding-btn-amend").click(function(){
              //修改  

               mySwiper1.slideTo(1, 0, false);


        
          });

         

        

           $("#appDate").focus(function(){
             //input 获得焦点
                $("#widding-date-p").show();

           });

           

           $(".ball-select span").click(function(){
                 //已定 未定
                 $(".ball-select span").removeClass("has-set-act");
                 $(this).addClass("has-set-act");
                 


           });


           $("#go1").click(function(){
           	//下一步
               
               if($("#appDate").val()==""){
                   $. wishListAlert("<div class='layer-ball-box' >请填写婚期</div>");
                   return false;

               }

               if($("#myWidding-site-li-right").text()==""){
                   $. wishListAlert("<div class='layer-ball-box' >请填写婚宴场地</div>");
                   return false;

               }


                if($("#appDate").val()!=""&& $("#myWidding-site-li-right").text()!=""){
                     
                      $("#go1").hide();
                       $("#go2").show();
                     mySwiper1.slideNext();
                }


           });

         
             $("#go2").click(function(){
               //下一步
               var colorTxt=$(".widding-color-ul li").find(".color-right-hook").prev(".widding-color-name").text();

               if(colorTxt==""){
                   $. wishListAlert("<div class='layer-ball-box' >请选择颜色</div>");
                   return false;
               }

                if(colorTxt!=""){

                      $("#go2").hide();
                       $("#go3").show();
                     mySwiper1.slideNext();
                }


            });


             $("#go3").click(function(){
               //下一步
               var styleTxt=$("#widding-style-ul").find(".color-right-hook").prev(".widding-style-name").text();

               if(styleTxt==""){
                   $. wishListAlert("<div class='layer-ball-box' >请选择你的婚礼风格</div>");
                   return false;
               }

                if(styleTxt!=""){

                       $("#go3").hide();
                       $("#go4").show();

                     mySwiper1.slideNext();
                }


            });

          
              $("#go4").click(function(){
               //下一步
                var fullTxt=$("#widding-full-ul").find(".color-right-hook").prev(".widding-full-name").text();

               if(fullTxt==""){
                   $. wishListAlert("<div class='layer-ball-box' >请选择你的西装</div>");
                   return false;
               }

                if(fullTxt!=""){

                       $("#go4").hide();
                       $("#go5").show();

                     mySwiper1.slideNext();
                }


            });

            
              $("#go5").click(function(){
               //下一步
               var dressTxt=$("#widding-dress-ul").find(".color-right-hook").prev(".widding-dress-name").text();

               if( dressTxt==""){
                   $. wishListAlert("<div class='layer-ball-box' >请选择你的婚纱</div>");
                   return false;
               }

                if( dressTxt!=""){

                     
                      window.location.href="myWidding_sure.html";
                    
                }


            });
            

          

            var mySwiper2 = new Swiper('#swiper-container2', {
                 
            });

          


           
            $("#widColorNav span").click(function(){
            	//颜色点击切换

                $("#widColorNav span").removeClass("widding-color-act");

            	  $(this).addClass("widding-color-act");

                
                  var distance = ($(this).index()) *$(this).width()+"px";

                 document.getElementsByClassName("ibox")[0].style.webkitTransform = "translateX(" + distance + ")";
         

                $(".ibox").attr("style", "transform:translateX(" + distance + ")");

                 mySwiper2.slideTo($(this).index(), 500, false);

               

            });



            $("#mygift").click(function(){
              //点击进入我的礼卷

              window.location.href="mygift.html";


            });
               
           
           
         

};


 function linkLogin(){
           //判断是否登录 

    var param={};

        isLogin(param, true, function (result) {

            if (result.code == 0) {
                 
                  $("#slide1").html('<ul class="micWidding-ul"><li><div class="micWidding-li-left"><i class="iconfont book">&#x3447;</i></div><p class="micWidding-li-right">通过填写您的婚礼的基本需求，<br/>WISHLIST能够更好为您设计并计划您的婚礼，您还可以获得一份您专属的筹备计划（独家手册），不可能错过的真人1V1一站式服务体验，现在就开始吧。</p></li><li><div class="micWidding-li-left"><i class="iconfont give-gift"> &#xe6f3;</i></div><p class="micWidding-li-right">完善第一步，我们会奖励您<br/>WISHLIST体验店专用的新手礼金1000元，全国体验店满场服装任意套餐均可使用</p></li></ul><div class="myWidding-btn-start" ><a class="btn-start" id="widding-btn-start">立即开始</a></div>');
                  
                    $("#widding-btn-start").click(function(){
                           //立即开始
                              mySwiper1.slideNext();
               


                    });


                    updateStep();  //必须在上面


            } else if (result.code == 3) {
                         
                window.location.href = "/wishlist_mobile/mobileStation/order/bind_phone.html?action_type=4";     
                         

            } else {

                console.log(result.msg);
            }

        });
              


  };  






function selectSite(){
  //触发婚宴场地事件
 
   $("#widding-date-p").hide();
   $("#Widding-site-p").show();
   $("#ball-box").show();
   $("#go1").hide();

};


function ballSure(){
  //确定按钮
  
  $("#myWidding-site-li-right").text($(".has-set-act").text());

   $("#Widding-site-p").hide();
   $("#ball-box").hide();
   $("#go1").show();


};

function ballCancel(){
// 取消按钮
  $("#ball-box").hide();
  $("#Widding-site-p").hide();
  $("#go1").show();

};


function updateStep(){
  
  var param={}; 

   myWiddingStep(param, true, function(result){

         var listData=result.data;
     
           

          if (result.code == 0) {

          	   
            $("#widding-color-ul1").html(template("template1",{data:listData}));
            $("#widding-color-ul2").html(template("template2",{data:listData}));
            $("#widding-style-ul").html(template("template3",{data:listData}));
            $("#widding-full-ul").html(template("template4",{data:listData}));
            $("#widding-dress-ul").html(template("template5",{data:listData}));

               updateAmend();


          } else {

             console.log(result.msg);
          }

      });
 


};


  
  function colorSelect(target){
           //颜色选择 最多只能选择俩
            var colorNum=$(".widding-color-ul li").find("span").length;
        
         
            if($(target).find("span").hasClass("color-right-hook")){

	                   $(target).find("span").remove();

	           }else{
	                  
	               if(colorNum>=2){

                      $. wishListAlert("<div class='layer-ball-box' >选择不能超过2种</div>");
	               	
	                	return false;

	                }else{
	                	
	                
	                	$(target).append("<span class='iconfont color-right-hook'>&#xe62d;</span>");
	                
	                	
	                }   
	         
	                  
	        };	

               
    };


     function styleSelect(target){
             //风格选择 最多选择俩
          var styleNum=$("#widding-style-ul li").find("span").length;
          
           if($(target).find("span").hasClass("color-right-hook")){
	                    $(target).find("span").remove();

	        }else{
	                  
	               if(styleNum>=2){

	               	$. wishListAlert("<div class='layer-ball-box' >选择不能超过2种</div>");
	                	return false;


	                }else{
	                	$(target).append("<span class='iconfont color-right-hook'>&#xe627;</span>");
	                }   
	             
                
	        };	

   };



     function fullSelect(target){
             //礼服选择 最多选择俩

          var fullNum=$("#widding-full-ul li").find("span").length;
          
           if($(target).find("span").hasClass("color-right-hook")){
	                    $(target).find("span").remove();

	        }else{
	                  
	               if(fullNum>=2){

                  $. wishListAlert("<div class='layer-ball-box' >选择不能超过2种</div>");
	               	
	                	return false;

	                }else{
	                	$(target).append("<span class='iconfont color-right-hook'>&#xe627;</span>");
	                }   
	             
                
	        };	

     };


   function dressSelect(target){
             //礼服选择 最多选择俩

          var fullNum=$("#widding-dress-ul li").find("span").length;
          
           if($(target).find("span").hasClass("color-right-hook")){

	                    $(target).find("span").remove();

	        }else{
	                  
	               if(fullNum>=2){

                    $. wishListAlert("<div class='layer-ball-box' >选择不能超过2种</div>");
	               	
	                	return false;

	                }else{
	                	$(target).append("<span class='iconfont color-right-hook'>&#xe627;</span>");
	                }   
	             
                
	        };	

  };
  





function updateAmend(){
  //获取会员婚礼接口

  var param={};


     myWiddingAmend(param, true, function(result){

         var listData=result.data;
     
        

          if (result.code == 0) {

                   
                    
          	       id=listData.id;


		          	  if(listData.weddingDate!=""){

		          	  	  $("#widding-date").html(listData.weddingDate);

		          	  	  document.getElementById("appDate").value=listData.weddingDate;
		          	  }


		          	  if(listData.hotel!=""){
                      
                      if(listData.hotel==0){
                         $("#widding-site").html("未定");
                         $("#myWidding-site-li-right").html("未定");

                      }else{
                         $("#widding-site").html("已定");
                         $("#myWidding-site-li-right").html("已定");
                      }

		          	  	
		          	  }
		              
		              if(listData.color!=""){

                  
		              	 $("#widding-color").html(listData.color);

		              	  var colorArry=listData.color.split(" ");


                       $(".widding-color-ul li .widding-color-name").each(function(i){
                           //把数据带过来。  
                            

                            if(colorArry[0]+","==$(this).text()||colorArry[1]+","==$(this).text()){
                                   

                                 $(this).parent().append("<span class='iconfont color-right-hook'>&#xe627;</span>");

                            };

                       });


		              }





		             if(listData.style!=""){

		             	$("#widding-style").html(listData.style);
		             	var styleArry=listData.style.split(" ");
                        
                        $("#widding-style-ul li .widding-style-name").each(function(i){

                                    
                              if(styleArry[0]+","==$(this).text()||styleArry[1]+","==$(this).text()){
                                  
                                   $(this).parent().append("<span class='iconfont color-right-hook'>&#xe627;</span>");

                              }; 

                        });   

		             }


		             if(listData.dressStyle!=""){

	                     $("#widding-dress").html(listData.dressStyle);
                         
                         var dressArry=listData.dressStyle.split(" ");

                         $("#widding-dress-ul li .widding-dress-name").each(function(i){


                              if(dressArry[0]+","==$(this).text()||dressArry[1]+","==$(this).text()){
                                  
                                   $(this).parent().append("<span class='iconfont color-right-hook'>&#xe627;</span>");

                              }; 

                         });


		             }

	                 if(listData.menswear!=""){

	                    $("#full-dress").html(listData.menswear);
                        
                        var fullArry=listData.menswear.split(" ");

                        $("#widding-full-ul li .widding-full-name").each(function(i){


                              if(fullArry[0]+","==$(this).text()||fullArry[1]+","==$(this).text()){
                                  
                                   $(this).parent().append("<span class='iconfont color-right-hook'>&#xe627;</span>");

                              }; 

                        });

	                 }

                
            
          } else {

             console.log(result.msg);
          }



      });


};






function widdingRefer(){
  // 最后一步提交

  var hotelTxt=$("#myWidding-site-li-right").text();

  if( hotelTxt=="未定"){
  	  hotelTxt=0;
  }else{
  	 hotelTxt=1;
  };


  var colorTxt=$(".widding-color-ul li").find(".color-right-hook").prev(".widding-color-name").text().split(",");

     colorTxt.pop();//删除最后一个元素空格。
  
   var colorStr=colorTxt.toString();//将数组转换为字符串



  var styleTxt=$("#widding-style-ul").find(".color-right-hook").prev(".widding-style-name").text().split(",");
      styleTxt.pop();
      var styleStr=styleTxt.toString();
  
  var fullTxt=$("#widding-full-ul").find(".color-right-hook").prev(".widding-full-name").text().split(",");
     fullTxt.pop();
  var fullStr=fullTxt.toString();

  var dressTxt=$("#widding-dress-ul").find(".color-right-hook").prev(".widding-dress-name").text().split(",");
      dressTxt.pop();
    var dressStr=dressTxt.toString();  


  var param={

  	id:id,
  	weddingDate:document.getElementById("appDate").value,
  	hotel:hotelTxt,
  	color:colorStr,
  	style:styleStr,
  	menswear:fullStr,
  	dressStyle:dressStr,


  };

  


  myWiddingRefer(param, true, function(result){

         var listData=result.data;
         
     
          if (result.code == 0) {

             

            
          } else {

             console.log(result.msg);
          }

      });






};





$(function () {
  //调用日历插件

    var currYear = (new Date()).getFullYear();
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 1900, //开始年份
        endYear: currYear + 2000 //结束年份
    };
    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    var optDateTime = $.extend(opt['datetime'], opt['default']);
    var optTime = $.extend(opt['time'], opt['default']);
    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
    $("#appTime").mobiscroll(optTime).time(optTime);
    //获取当前的时间
    function today(){
        var today=new Date();
        var h=today.getFullYear();
        var m=today.getMonth()+1;
        var d=today.getDate();
        return h+"-"+m+"-"+d;
    }

    // document.getElementById("appDate").value = today();

   
    
});



