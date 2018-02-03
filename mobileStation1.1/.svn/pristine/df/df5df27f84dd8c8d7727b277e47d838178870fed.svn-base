
 var Id = OperationURL.getQueryString("id");

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

    
        update();

      

 };


 function update(){

   var param={
     	id:Id
   }

   planListInfo(param,true,function(result){
      
       if(result.code==0){

           console.log(result)   
           
           $("#scr-main").html(template("template1",{data:result.data}));  

          $("#plan_list_ul li").click(function(event){
            //点击进入真实案列详情页
              event.preventDefault();

               var id=$(this).attr("data-id");
               var isView=$(this).attr("data-isView");

               window.location.href="planning_division_detail.html?id="+id+"&isView="+isView;
          });


          var collectLi= document.querySelectorAll(".collect_li"); 
       
          for(var i=0;i<collectLi.length;i++){
               //点击收藏 

              collectLi[i].addEventListener("click", operateCollect,true);
              

          };

         


       }else{
          
         console.log(result.msg);
       }


   });
  

 };



function operateCollect(event){
             //收藏 
       event.stopPropagation();
       var that=this;
      
      var id=$(that).attr("data-id");

      var param={

         type:"11",

         actionType:2,

         id:id
      }
   
       

       lpcOperate(param, true, function(result){
        //调查看接口
          

            if(result.code==0){

                 $.wishListAlert("<div class='layer-ball-box'>收藏成功</div>");

                 $(that).attr("style","color:#e8796e;");
                                         
                 that.removeEventListener("click",operateCollect,true);


            }else if(result.code==3){
              
                 window.location.href="../order/bind_phone.html?id="+id+"&action_type=11";
               
            }else{

                console.log(result.msg);
                 
            }

       });

};



/*=============接口===========*/

var  planListInfo = function (param, async, succfun) {
   
   //14、策划师作品列表(新加)

    var testurl = "../../../../testdata/wish/planning_division_list.json";

    var useurl = config.getUrl() + "getPlanningWorks";

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
