
    


function init(){
	
  personInfoMation();
  
	$("#appDate").change(function(){
		//生日输入框改变 获取其值

		$("#perInfo-birthday").html($(this).val());


	});


  wxConfig();



             document.querySelector("#photo").onclick=function(){

                  
                       chooseImg();
        
              };  

            

              document.querySelector("#chooseImg").onclick=function(){

                  
                       chooseImg();
        
              };  
                
              document.querySelector("#preCancel").onclick=function(){

                  
                      $("#cpm-box").hide();
        
              };  

            document.querySelector("#chopHead").addEventListener("click",function(){ 
             //选择头像点击
                $("#cpm-box").show();

            },false);  

             document.querySelector("#preAmendName").addEventListener("click",function(){ 
               //修改姓名
               
                 $("#pre-input-name").val($("#perInfo-userName").html());

                 $("#perInfo-box").hide();
                 $("#perInfo-box").animate({left:"-100%"});
                  
                  $("#amend-box-name").show();

                 $("#amend-box-name").animate({left:0});

            },false);  


             document.querySelector("#preSaveName").addEventListener("click",function(){ 

                 //修改姓名保存


               if($("#pre-input-name").val()==""){

                      $.wishListAlert("<div class='layer-ball-box'>没有输入昵称，请重新填写</div>");

                      return false;
               };

               $("#perInfo-userName").html($("#pre-input-name").val());

                 
                    $("#amend-box-name").animate({left:"100%"});
                    $("#amend-box-name").hide();

                   $("#perInfo-box").show();

                   $("#perInfo-box").animate({left:0});
  
            },false);

            
              document.querySelector("#preAmendPhone").addEventListener("click",function(){ 
                   //修改手机号

               $("#pre-input-phone").val( $("#perInfo-phone").html());

               $("#perInfo-box").hide();
               $("#perInfo-box").animate({left:"-100%"});

                $("#amend-box-phone").show();
               $("#amend-box-phone").animate({left:0});
    
          },false);
          
          
           document.querySelector("#preSavePhone").addEventListener("click",function(){ 
              //修改手机号保存

               if (!validate.phone($("#pre-input-phone").val())) {

                   $.wishListAlert("<div class='layer-ball-box'>敢不敢把手机号写对</div>");
        
                   return false;
               };
   
              $("#perInfo-phone").html($("#pre-input-phone").val());

              $("#amend-box-phone").animate({left:"100%"});
              $("#amend-box-phone").hide();
               
               $("#perInfo-box").show();

               $("#perInfo-box").animate({left:0});

                        

          },false);  

           document.querySelector("#preAmendSex").addEventListener("click",function(){ 
              //修改性别

                $("#cpm-box-sex").show();

          },false);  

            document.querySelector("#preSexCancel").addEventListener("click",function(){ 
              //性别取消

                $("#cpm-box-sex").hide();

          },false);  

           document.querySelector("#selectMan").addEventListener("click",function(){   
               //选择男


               $("#perInfo-sex").html($(this).text());

               $("#cpm-box-sex").hide();

          },false);  


           document.querySelector("#selectWoman").addEventListener("click",function(){     
               //选择女

             $("#perInfo-sex").html($(this).text());

             $("#cpm-box-sex").hide();

          
          },false);

         
         document.querySelector("#per_btn_save").addEventListener("click",preInfoSave,false); 

       
       







};


function personInfoMation(){

  //调取个人信息接口
  var param={};

	personalInfo(param,true,function(result){

	        if(result.code==0){

              console.log(result)
	        
			             if(result.data.headImg!=""){

		                      $("#perInfo-header").attr("style","background:url("+result.data.headImg+") no-repeat center;background-size:cover;")
			             }else{

			             	  $("#perInfo-header").attr("style","background:url(../src/images/personal-bg.png) no-repeat center;background-size:cover;")
			             }
			           
		              
		                    $("#perInfo-userName").html(result.data.userName);
		              

		                	$("#perInfo-phone").html(result.data.phoneNum);
		                

		                      if(result.data.sex==0){

		                      	$("#perInfo-sex").html("男");

		                      }else{
                            
		                      	 	$("#perInfo-sex").html("女");
		                      }


                         $("#perInfo-birthday").html(result.data.birthday);
                   


	        }else{

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

    document.getElementById("appDate").value = today();

   
    
});



function preInfoSave(){
// 个人信息保存接口

  if($("#perInfo-sex").text()=="男"){

   var sexNum=0;
  }else{
     var sexNum=1;
  }

  var getImg= $("#perInfo-header").css("background-image");
  var headImg=getImg.substring(32,getImg.length-1);



  var param={

  	headImg:headImg,
  	userName:$("#perInfo-userName").text(),
  	phoneNum:$("#perInfo-phone").text(),
    sex:sexNum,
    birthday:$("#perInfo-birthday").text()

  };


  

  perCenterAmend(param,true,function(result){

      if(result.code==0){

      	   $.wishListAlert("<div class='layer-ball-box'>保存成功</div>");

      }else{

      	   $.wishListAlert("<div class='layer-ball-box'>"+result.msg+"</div>");
      }



  });

};


  


function wxConfig() {
  //TODO 微信配置
  var param = {
    url:location.href.split('#')[0],
   
  };

  getWxConfig(param, true, function(result) {
      
 
    wx.config({
        debug:false,
        appId: "wx0155c458e601b602",
        timestamp: result.timestamp,
        nonceStr: result.nonceStr,
        signature: result. signature,
        jsApiList:[ 'chooseImage','uploadImage']
    });

   
  });

  

};


function chooseImg(){
  //选择图片方法
   

       var param = {  

                localIds:"",  
                serverId:"", 
                          
          }; 

           wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {

              param.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
           

                $("#perInfo-header").attr("style", "background:url("+ param.localIds+") no-repeat center;background-size:cover;");

                      setTimeout(function(){
                         
                                 wx.uploadImage({

                                        localId:param.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得

                                        isShowProgressTips: 1, // 默认为1，显示进度提示
                                        success: function (res) {

                                            param.serverId = res.serverId; // 返回图片的服务器端ID
                                             
                                           

                                            uploadSeverImg(param,true,function(result){

                                              if(result.code==0){

                                                  $("#perInfo-header").attr("style", "background:url("+ result.data.img+") no-repeat center;background-size:cover;");
                                                  
                                                   $("#cpm-box").hide();

                                              }else{
                                                
                                                 $.wishListAlert("<div class='layer-ball-box'>"+result.msg+"</div>");
                                              }


                                            });
                         
                                        }


                                    });


                          
                      },100)
            

              }
          
          });



};
            
     
      
/*==============接口=================*/


var personalInfo = function (param, async, succfun) {

   // 个人中心接口 （2、获取个人信息接口）
    var testurl = "/api/personalInfo";

    var useurl = config.getUrl() + "getMemberInfo";

    var url = useurl;


    $.ajax({
        type: config.getType(),
        url: url,
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




var perCenterAmend = function (param, async, succfun) {
  //个人中心修改保存（3、修改个人信息接口）

    var testurl = "/api/perCenterAmend";

    var useurl = config.getUrl() + "modifyMemberInfo";
    var url = useurl;


    $.ajax({
        type: config.getType(),
        url: url,
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
    


var getWxConfig = function (param, async, succfun) {
    //微信配置签名

    var testurl = "";
    var useurl = "http://m.wishlist1314.com/wishlist_mobile/wechat/getConfig";
    var url = useurl;
    $.ajax({
        type: config.getType(),
        url: url,
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



var uploadSeverImg = function (param, async, succfun) {
    //上传图片到服务器
    var testurl = "";
    var useurl = config.getUrl() + "confimImage";
    var url = useurl;
    $.ajax({
        type: config.getType(),
        url: url,
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









































