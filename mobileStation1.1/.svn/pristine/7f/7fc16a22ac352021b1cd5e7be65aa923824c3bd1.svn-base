
 var memberId=getCookie("WISHLIST_MEMBER_ID");

function init(){


       getNoticeInfo(null, true, function (result) {
              //显示消息

                if(result.code==0){

                     
                       if(result.data.count>Number(localStorage.noticeNumber)){
                             
                             $("#news").show();

                       }else{
                          
                             $("#news").hide();

                       }

               
                }else{
                   
                   console.log(result.msg);
                }

            });


           document.querySelector("#bell").addEventListener("click",function(){
                     //点击进入消息系统

                         window.location.href="../detailed_account/message_notify.html";    

            },false);
       

           document.querySelector("#service").addEventListener("click",function(){
              //点击客服进入
             
              if(memberId!=""){
                  //根据用户Id判断登没登陆

                    window.location.href = "../detailed_account/kefu_1.1.html?phoneNum=" +  localStorage.userPhoneNum +"&sid=128324&entry=5&ref=link";

               }else{

                    window.location.href = "../order/bind_phone.html";

               }

           },false);


             document.querySelector("#mic-header-box").addEventListener("click",function(){
               //点击进入修改信息

                        window.location.href="personal_information.html";

            },false);

            document.querySelector("#myfavorite").addEventListener("click",function(){ 
              //点击进入我的收藏
                window.location.href="myfavorite.html";

            },false);    

            document.querySelector("#myactivity").addEventListener("click",function(){ 
              //点击进入我的活动
              window.location.href="myactivities.html";

            },false);  

             document.querySelector("#myOrder").addEventListener("click",function(){ 
              //点击进入我的预约
              window.location.href="../order/my_order.html";

            },false);  

            document.querySelector("#myCoupon").addEventListener("click",function(){ 
              //点击进入我的礼卷
               window.location.href="mygift.html";

            },false);  



            personCenter();




};


function personCenter(){

  //调取个人信息接口
  

	personalInfo(null,true,function(result){

	        if(result.code==0){
	        
            
	             if(result.data.headImg!=""){
                      $("#mic-header").attr("style","background:url("+result.data.headImg+") no-repeat center;background-size:cover;");
	             }else{

                 

	             	$("#mic-header").attr("style","background:url(../src/images/personal-bg.png) no-repeat center;background-size:cover;");
	             }
	           
                if(result.data.userName!=""){

                    $("#micUserName").html(result.data.userName);

                }else{

                	  $("#micUserName").html(result.data.nickname);
                }

               


	        }else{

              console.log(result.msg);

	            
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



var getNoticeInfo = function (param, async, succfun) {

  //2 获取通知数量、系统通知、用户预约通知 (新加) 0系统消息、1预约消息

    var testurl = "";

    var useurl = config.getUrl() + "getUserMsgNoticeNumber";

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