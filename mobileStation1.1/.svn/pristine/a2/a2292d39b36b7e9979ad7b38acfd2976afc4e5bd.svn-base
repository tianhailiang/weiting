
var Id = OperationURL.getQueryString("id");

 var memberId=getCookie("WISHLIST_MEMBER_ID");


function init(){

       update();


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

                  window.location.href = "../order/bind_phone.html?id="+Id+"&action_type=12";

             }

         },false);




};







function update(){
//更新

   var param={
   	id:Id

   }

   
   planIntroduce(param,true,function(result){
      
      if(result.code==0){

          console.log(result)

          template.config("escape", false); //让标签转换

          document.querySelector("#scr-main").innerHTML=template("template1",{data:result.data});
         
            document.querySelector("#plan_atten").addEventListener("click",function(){
              //关注
                    var that=this;

                   if(memberId!=""){
                        
                        attention(that);

                   }else{
                       
                       window.location.href= "../order/bind_phone.html?id="+Id+"&action_type=12";

                   }


          },false);

           
          
          document.querySelector("#introduce-head").addEventListener("click",function(){
              //弹出策划师介绍
               var heig=document.documentElement.clientHeight;
              
                  $("#grade_box").height(heig);

                  $("#grade_box").show();
                   
                    document.addEventListener('touchmove', myStop,false);

                    document.querySelector("#icon_circle_x").addEventListener("click",function(){
                            
                             $("#grade_box").hide();

                          document.removeEventListener('touchmove', myStop, false);

                      },false); 


           },false);


            $("#plan_introduce_ul li").click(function(){
                //跳转案列详情页

                  var id=$(this).attr("data-id");
                 
                 window.location.href="planning_division_detail.html?id="+id;


            });



            var collectLi= document.querySelectorAll(".collect_li"); 
       
            for(var i=0;i<collectLi.length;i++){
                 //点击收藏 

                collectLi[i].addEventListener("click", operateCollect,true);
                

            };

           document.querySelector("#planList").addEventListener("click",function(){
              //连接策划师列表页
             

                 window.location.href="planning_division_list.html?id="+Id;
           
          },false);


         document.querySelector("#planWord").addEventListener("click",planWord,false);

         


      }else{

      	console.log(result.msg);
      }


   });


};




function attention(that){
  //关注

  var isfollow = $(that).attr("data-isfollow"); 

  var id=$(that).attr("data-id");

  
  var param={
     
     id:id
  };
  
  if(isfollow==0){
    
     attentionInfo(param,true,function(result){

            if(result.code==0){
               
               $(that).attr("style","color:#666;")
             
               $("#fans").text(result.data);
              
               
                  $(that).attr("data-isfollow","1"); 
             
            }else{

            	console.log(result.msg);
            }


     });



  }else{

  	 cancelAttention(param,true,function(result){

          if(result.code==0){
               
               $(that).attr("style","color:#e87a6e;")

               $("#fans").text(result.data);

               $(that).attr("data-isfollow","0"); 

          }else{

          	 console.log(result.msg);
          }

  	 });

  }


};




function operateCollect(){
             //收藏 
         
     event.stopPropagation();

       var that=this;
      
      var id=$(this).attr("data-id");

      var param={
         type:"11",

         actionType:2,

         id:id
      }
   

       lpcOperate(param, true, function(result){
        //调查看接口
          

            if(result.code==0){

                 $.wishListAlert("<div class='layer-ball-box'>收藏成功</div>");

                 $(that).attr("style","color:#a84eda;");
                                         
                 that.removeEventListener("click",operateCollect,true);


            }else if(result.code==3){
              
                 window.location.href="../order/bind_phone.html?id="+id+"&action_type=12";
               
            }else{

                console.log(result.msg);
            }

       });

};




function planWord(){

 //显示留言评论

      var Top= $("#grade_word_box").offset().top;

   
      var heig=document.documentElement.clientHeight;
          

      $("#grade_word_box").attr("style","display:block;top:"+Top+"px;height:"+heig+"px;");

      document.addEventListener('touchmove', myStop,false);

       document.querySelector("#grade_submit").addEventListener("click",function(){
          //点击提交    
                 var content=$("#grade_txt").val();

                  var phone = $("#grade_iphone").val();
                 
                  if(content==""){
                     
                     $.wishListAlert("<div class='layer-ball-box'>请填写您的留言</div>");

                     return false;

                 };

                 if (!validate.phone(phone)) {

                   $.wishListAlert("<div class='layer-ball-box'>敢不敢把手机号写对</div>");
                
                     return false;
                 };


              
                var param={
                   
                   id:Id,
                   phoneNum:phone,
                   content:content

                } 

              

              referWord(param,true,function(result){
                   
                  if(result.code==0){

                        $("#grade_word_box").hide();

                        document.removeEventListener('touchmove', myStop, false);
                      
                       $.wishListAlert("<div class='layer-ball-box'>提交成功</div>");
                         


                  }else if(result.code==3){
                      
                      window.location.href="../order/bind_phone.html?id="+Id+"&action_type=11";

                  }else{

                      $.wishListAlert("<div class='layer-ball-box'>"+result.msg+"</div>");

                  }  

              });


       },false);


        document.querySelector("#grade_cancel").addEventListener("click",function(){
            //点击留言取消 
                    
                     $(this).parent().parent().parent().parent().hide();

                    document.removeEventListener('touchmove', myStop, false);

         },false);
    

  

};




function myStop(e){

     e.preventDefault();
};




/*===========接口=========*/


var  planIntroduce = function (param, async, succfun) {
   
   //13、查看策划师个人资料详情(新加)

    var testurl = "../../../../testdata/wish/planning_division_introduce.json";

    var useurl = config.getUrl() + "getPersonalData";

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




var lpcOperate = function (param, async, succfun) {
  
  //(16、查看、点赞、收藏接口)

    var testurl = "/api/lpcOperate";

    var useurl = config.getUrl() + "modifyStatData";
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


 var attentionInfo = function (param, async, succfun) {
   
   //11、关注策划师接口

    var testurl = "../../../../testdata/wish/attention.json";

    var useurl = config.getUrl() + "focusPlanning";

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


var cancelAttention= function (param, async, succfun) {
   
   //11.1、取消关注策划师接口

    var testurl = "../../../../testdata/wish/cancelAttention.json";

    var useurl = config.getUrl() + "cancelAttention";

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


var  referWord = function (param, async, succfun) {
   
   //16、给策划师留言(新加)


    var testurl = "../../../../testdata/wish/referWord.json";

    var useurl = config.getUrl() + "messageProblem";

    var url =useurl;

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