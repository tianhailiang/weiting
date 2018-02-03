

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
  


 aliveInfo(param, true, function(result){


      if (result.code == 0) {
         
       console.log(result)
     

          template.config("escape", false); //让标签转换

          document.querySelector("#scr-main").innerHTML=template("template1",{data:result.data});
            
         $("#act-content p").attr("style","font-size:12px;line-height:18px;")

          $("#act-content img").each(function(i){

             
                $(this).removeAttr('style');
              
                $(this).attr("style","margin:0 auto;");
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

                      window.location.href = "../order/bind_phone.html?id="+Id+"&action_type=11";

                 }

          },false);   


          
          $("#alive_ul li").click(detailClick); 


            document.querySelector("#icon_collect").addEventListener("click",operateCollect,false); //点击收藏   

              $(".alive_dl").click(function(){
                 //点击跳转往期攻略详情页

                    var id=$(this).attr("data-id");
                     
                    window.location.href ="alive_strategy_detail.html?id="+id;

              });

          
          document.querySelector("#aliveList").addEventListener("click",function(){
               
                window.location.href="alive_list.html";

          },false);


        
      } else {

        console.log(result.msg);

      }

  });




};     



function detailClick() { 
   // 点击商品跳转到对应商品详情页。
  var id =$(this).attr("data-id");

  var type = $(this).attr("data-type");

   var url = "";


    switch (type) {

      case "6":
           
            url = "../detailed_account/weddingHouse_detail.html?id=" + id + "&type=6";
        
           
            break;

       default :
       
          
           url="../detailed_account/account_detail.html?id="+id+ "&type="+type;  
          
          break;
       

    }


    window.location.href = url;
   

};




function operateCollect(){
             //收藏 
              
      var that=this;

      var param={

         type:"8",

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
              
                 window.location.href="../order/bind_phone.html?id="+Id+"&action_type=8";
               
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



/*=============接口================*/

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




var aliveInfo = function (param, async, succfun) {
   
   //跳转攻略详情页接口 (13、跳转攻略详情页接口)

    var testurl = "/api/wishAlive";
    var useurl = config.getUrl() + "getGuideDetails";
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


// var isLogin = function (param, async, succfun) {
//    //（1、判断是否登录接口）

//     var testurl = "/api/isLogin";
//     var useurl = config.getUrl() + "isLogin";
//     var url = useurl;

//     $.ajax({
//         type: config.getType(),
//         url: url,
//         dataType: config.getDataType(),
//         data: param,
//         async: async,
//         success: function (data, status) {
//             succfun(data);

//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             console.log("Error " + textStatus);
//         }
//     });

// };