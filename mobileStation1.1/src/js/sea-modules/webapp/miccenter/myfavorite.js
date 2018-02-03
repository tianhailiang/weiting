

 var param = {
        type: "1",

    };


function init() {

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

                window.location.href = "../detailed_account/kefu_1.1.html?phoneNum=" +  localStorage.userPhoneNum +"&sid=128324&entry=5&ref=link";

           },false);

       


    

      
        $(window).on("scroll",function(){
           

              $(".lazy-img").lazyload({

                       placeholder: ""
                                  

              });

           

        });


        

         $("#fav_nav_ul li").click(function(){

            $("#fav_nav_ul li").find("span").removeClass("fav_nav_act");

            $(this).find("span").addClass("fav_nav_act");
            
             param.type=$(this).attr("data-type");

             
               update();

         });


           update();



};



function update() {

   

        favoriteInfo(param, true, function (result) {

            var listData = result.data;

                if (result.code == 0) {
                   
                     console.log(result)


                     $("#fav_box").html(template("template1" , {data: listData}))

                      $(".lazy-img").lazyload({

                           placeholder: "",
                            
                       });



                            if(param.type==10){
                               //专题

                               $("#iconfont-ul").removeClass("fav_iconfont_ul");

                                $(".mic_fav_li").addClass("vertical_li");

                                
                                   swipActivty();

                           }else{
                                
                              $("#iconfont-ul").addClass("fav_iconfont_ul");
                                
                               $(".mic_fav_li").removeClass("vertical_li");

                           }



                      $("#mic_fav_ul li").click(favoriteDetail);  //点击进入详情页
                      
                      var removeFavLi=document.querySelectorAll(".removeFav_li");

                      for(var i=0;i<removeFavLi.length;i++){
                         //点击删除收藏

                          removeFavLi[i].addEventListener("click",removeFav,true);
             

                      };
  


                } else {

                    console.log(result.msg);
                }

        });




};



function favoriteDetail() {
 /*收藏页面跳转详情页*/

    var id=$(this).attr("data-id");

    var type=$(this).attr("data-type");

    var isView=$(this).attr("data-isView");

    if (type == 1 || type == 2 || type == 3 ||type==4||type==5 ||type==9) { // 白纱 礼服 男装 周边 配饰

        window.location.href = "../detailed_account/account_detail.html?id=" + id + "&type=" + type+"&isView=" + isView;

    } else if (type == 6) {  // 婚礼堂

      window.location.href = "../detailed_account/weddingHouse_detail.html?id=" + id + "&type=6&isView=" + isView;;

    } else if (type == 7) {  // 活动
        window.location.href="../wish/experience_activity_detail.html?id=" + id+"&isView=" + isView;;

    } else if (type == 8) {   // 攻略
       
       window.location.href="../wish/alive_strategy_detail.html?id=" +id+"&isView=" + isView;;
    }else if(type==10){
        //专题
          window.location.href = "../detailed_account/hot_list_collect_detail.html?id=" + id + "&isView=" + isView;

    }else if(type==11){
       //案列
       window.location.href="../wish/planning_division_detail.html?id=" + id + "&isView=" + isView;

    }


};




function removeFav(event){
 
 //删除收藏
 event.stopPropagation();

 var that=this;
 
 var id=$(this).attr("data-id");

 var type=$(this).attr("data-type");


    var param={
        id:id,
        type:type,
    }

      delFavorite(param,true,function(result){

        
           if(result.code==0){

               $.wishListAlert("<div class='layer-ball-box'>删除成功</div>");
             
             
                  
               $(that).parent().parent().parent().remove();


           }else{

              $.wishListAlert("<div class='layer-ball-box'>"+result.msg+"</div>");
           }


      });

 

};



function swipActivty(){
  //活动商品轮播。
    var  mySwiper3= new Swiper('.swiper-container3', {
      

      slidesPerView :'2.5',

      freeMode : true,
      
      spaceBetween : 7.5,
    
    });


};



/*==========接口=============*/



var favoriteInfo = function (param, async, succfun) {
  //我的收藏展示接口 (4、获取会员的收藏列表)

    var testurl = "/api/micfavorite" + param.type;

    var useurl = config.getUrl() + "getMemberCollection";
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


var delFavorite = function (param, async, succfun) {

  //12、删除收藏功能
    
    var url = config.getUrl() + "delMemberCollection";

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