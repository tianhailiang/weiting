
 var Id = OperationURL.getQueryString("id");

 var memberId=getCookie("WISHLIST_MEMBER_ID");

function init(){

      var isView= OperationURL.getQueryString("isView");//获取是否被查看

       if(isView=="0"){
         //如果没被查看则调入
           operateSee();

        };


      update();


        $(window).on("scroll",function(){


                if($(this).scrollTop()>0 ){

                    $(".icon_div").attr("style","opacity:0");

                    $(".icon_header").attr("style","color:#666");
                    
                    if($("#icon_collect").attr("style")=="color:#e8796e"){
                          //判断收藏颜色。
                          

                              $("#icon_collect").attr("style","color:#e8796e");
                          
                      }else{

                           $("#icon_collect").attr("style","color:#666");
                      }
                   


                }else{
                   
                     $(".icon_div").attr("style","opacity:0.4");
                     
                     $(".icon_header").attr("style","color:#fff");


                     if($("#icon_collect").attr("style")=="color:#e8796e"){
                          //判断收藏颜色。

                              $("#icon_collect").attr("style","color:#e8796e");
                          
                      }else{

                           $("#icon_collect").attr("style","color:#fff");
                      }
                   
                }
          
           
       });

   
};




function update(){
    
 
  var param = {
        id:Id,  
      
  };
  
 activityInfo(param, true, function(result){

     var listData=result.data;

      if (result.code == 0) {
          
           console.log(result)
        
           template.config("escape", false); //让标签转换

          document.querySelector("#scr-main").innerHTML=template("template1",{data:result.data});
       
         $("#act-ontent p").attr("style","font-size:12px;line-height:20px;")

         $("#act-ontent img").each(function(i){

             
                $(this).removeAttr('style');
              
                $(this).attr("style","margin:0 auto;max-width: 100%;");
          });


          document.querySelector("#btnBack").addEventListener("click",function(){
              //返回键
                window.history.go(-1);

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


          document.querySelector("#icon_collect").addEventListener("click",operateCollect,false); //点击收藏   
          

          if(result.data.isSign==0){

              document.querySelector("#apply").innerHTML="我要报名";

          }else{
              document.querySelector("#apply").innerHTML="已报名";
          }


         document.querySelector("#apply").addEventListener("click",function(){
                //我要报名 判断是否登录

              

                if(result.data.isActivity==1){
                       
                        $.wishListAlert("<div class='layer-ball-box'>活动已过期</div>");
                        
                        return false;
                  }

                 if(result.data.isSign==1){
                     
                        $.wishListAlert("<div class='layer-ball-box'>活动已报名</div>");

                        return false;

                 }



                 if(memberId!=""){
                              //根据用户Id判断登没登陆

                               window.location.href="join_apply.html?id="+Id;

                  }else{

                        window.location.href="../order/bind_phone.html?id="+Id+"&action_type=2";

                  }


           },false);

       
         
        
      } else {

         console.log(result.message);
      }


  });



};



function operateCollect(){
             //收藏 
              
      var that=this;

      var param={

         type:"7",

         actionType:2,

         id:Id
      }
   

       
       lpcOperate(param, true, function(result){
        //调查看接口
          

            if(result.code==0){

                 $.wishListAlert("<div class='layer-ball-box'>收藏成功</div>");

                 $(that).attr("style","color:#e8796e");
                  
                 document.querySelector("#icon_collect").removeEventListener("click",operateCollect,false);


            }else if(result.code==3){
              
                 window.location.href="../order/bind_phone.html?id="+Id+"&action_type=2";
               
            }else{

                console.log(result.msg);
            }

       });

};





function operateSee(){
     //查看

              var param={
                 type:"8",

                 actionType:1,

                 id:Id
              }



                 lpcOperate(param, true, function(result){
                   //调查看接口
                

                  if(result.code==0){

                      

                  }else{

                      console.log(result.msg);
                  }

             });
  

};



/*============接口=======*/

var activityInfo = function (param, async, succfun) {
  //活动详情页接口  (12、跳转活动详情页接口)

    var testurl = "/api/wishActivity";
    var useurl = config.getUrl() + "getActivityDetails";
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


