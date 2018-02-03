var flag = false;

var type = "0";  //请求的类型

var cont = true;

var paging = new QueryWithOrder();

var that = null;

var dataType = null;

var reInvidateCode = ''; //后台获取的验证码

var operateId = null; // 获取主键Id



function init() {

          
  
       initMicroInfo();

       update(true);

      
       mySwiper = new Swiper('#swiper-container2', {

       
        onSlideChangeStart: function (swiper) {

           

            var distance = (swiper.activeIndex) * 1.61 + "rem";

           document.getElementsByClassName("ibox")[0].style.webkitTransform = "translateX(" + distance + ")";
           document.getElementsByClassName("ibox")[1].style.webkitTransform = "translateX(" + distance + ")";

           $(".ibox").attr("style", "transform:translateX(" + distance + ")");

            if($("#nav-box2").css("display")=="block"){

               $(window).scrollTop(150);
            }


          
         },


        onSlideChangeEnd: function (swiper) {
            var lis = $(".nav-box ul>li");

            lis.find("a").removeClass('act');

            lis.eq(swiper.activeIndex).find("a").addClass("act");


            //请求数据
            type = swiper.activeIndex;

            // console.log("type " + type);

            

              update(true);

               

        }


    });


    $(".nav-box ul>li").click(function (event) {

        //点击切换事件
        event.preventDefault();

        type = $(this).index();

        mySwiper.slideTo(type, 500, false);

        $(".nav-box ul>li").find('a').removeClass('act');

        $(this).find("a").addClass('act');


        var distance = (type) * 1.61 + "rem";


        document.getElementsByClassName("ibox")[0].style.webkitTransform = "translateX(" + distance + ")";
        document.getElementsByClassName("ibox")[1].style.webkitTransform = "translateX(" + distance + ")";

        $(".ibox").attr("style", "transform:translateX(" + distance + ")");

         
           if($("#nav-box2").css("display")=="block"){

           
              $(window).scrollTop(150);
                   


            }

        

          update(true);




    });


        $("#tele-number,#validate-code").bind("keyup", function () {
            //登录判断按钮状态


            if ($("#tele-number").val() != "" && $("#validate-code").val() != "") {

                $("#finish-btn").addClass("active");

                $("#finish-btn").attr("disabled", false);

            } else {
                $("#finish-btn").removeClass("active");

                $("#finish-btn").attr("disabled", true);
            }

        });





        $(window).on("scroll",function(){
            //滚动加载



                     if($(this).scrollTop()>=150){

                         $("#nav-box2").show();

                     }else{

                            $("#nav-box2").hide();
                     }

                     $(".lazy-img").lazyload({
                            
                                placeholder: "",
                                threshold: 200,
                            

                    });    

                
                     
                     // console.log($(this).scrollTop() + $(window).height()+"滚动值")

                     // console.log($(document).height()+"文档高度")
                 
                 if ($(this).scrollTop() + $(window).height() >$(document).height()-40&&flag==true) {
                    

                            setTimeout(function(){

                                    update(false);

                            },100)
                           
                              
                           flag=false;

                    
                }




      });





};



function initMicroInfo() {
    //加载（图片轮播）
    var param = {};

    getMicroInfo(param, true, function (result) {

        if (result.code == 0) {

            $("#banner").html(template("bannerTemplate", result));
            swipeImg();
        } else {
            console.log(result.msg);
        }
    });

};


var swipeImg = function () {
    //TODO 轮播图
    var swiper_banner = new Swiper('#swiper-container1', {
        pagination: '.swiper-pagination',

        paginationClickable: false,
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        loop: true

    });

};


function update(isRefresh) {


    var param = {
        type: type,

    };

    if (isRefresh) {

        paging.refreshPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.pageNo = page.currentPage;

    
       
        wishInfo(param, true, function (result) {

            var listData = result.data;

            if (result.code == 0) {

              

                   if (listData == "") {
                          
                           $(".pullUp").html(" ");


                    }else{
                         
                          $(".pullUp").html("<i class='ico-loading'></i><span>正在加载...</span>");

                    }       
                  
                 

                   $("#date").html(listData.pubDate);
              
                    $(".wrapper-ul").hide();

                    $(".wrapper-ul" + type).show();


                  $(".wrapper-ul" + type).html(template("template" + type, {data: listData}));

                   

                         $(".lazy-img").lazyload({
                
                                placeholder: "",
                                threshold: 200,
                                failurelimit : 10,
                               
                  
                         });    
                    
                      
                      
                      flag=true;
                        


            } else {

                console.log(result.msg);
            }



        });


    } else {


        paging.addPage();
        var page = paging.getPaging();
        param.pageSize = page.pageSize;
        param.pageNo = page.currentPage;

       
        wishInfo(param, true, function (result) {

            var listData = result.data;



            if (result.code == 0) {


                        if (listData == "") {
                          

                            $(".pullUp").html(" ");
                             
                               flag=false;

                        }else{

                                 flag=true;
                      }
                

                      
                    $(".wrapper-ul").hide();

                    $(".wrapper-ul" + type).show();
                   
                    $(".wrapper-ul" + type).append(template("template" + type, {data: listData}));

                

               } else{

                   console.log(result.msg);
             };



        });

    };
    

};









function detailClick(target, id, isView) {
    // 点击商品跳转到对应商品详情页。


    var url = "";

    var dataType = $(target).attr("data-type");


    switch (dataType) {
        case "8":

            url = "/wishlist_mobile/mobileStation/wish/alive_strategy_detail.html?id=" +id + "&isView=" + isView;

            break;

        case "7":

            url = "/wishlist_mobile/mobileStation/wish/experience_activity_detail.html?id=" + id + "&isView=" + isView;
           
            break;

        case "6":
            url = "/wishlist_mobile/mobileStation/detailed_account/weddingHouse_detail.html?id=" + id + "&type=6" + "&isView=" + isView;
           
            break;

    }


    window.location.href = url;


};




function personClick(event) {
    //点击跳转个人中心
    event.stopPropagation();

    var param = {};

    isLogin(param, true, function (result) {

        if (result.code == 0) {

            window.location.href = "/wishlist_mobile/mobileStation/miccenter/personal.html";

        } else if (result.code == 3) {

            window.location.href = "/wishlist_mobile/mobileStation/order/bind_phone.html?action_type=3";

        } else {

            console.log(result.msg);
        }

    });

};





function userOrder(event) {
   event.stopPropagation();

/*footer 预约按钮判断是否登录*/

    var sendData = {
        phoneNum: "",
        yzm: "",
        inviteCode: ""
    };


    isLogin(null, true, function (result) {
       
        if (result.code == 0) {
            
             window.location.href = "/wishlist_mobile/mobileStation/detailed_account/kefu.html?phoneNum=" + result.data.phoneNum +"&sid=128324&entry=5&ref=link";


        } else if (result.code == 3) {

            window.location.href = "/wishlist_mobile/mobileStation/order/bind_phone.html";

        } else {

            console.log(result.msg);
        }

    });

   
};





function operate(target, event, type, id) {
    //查看 点赞 收藏 操作


    event.stopPropagation();

    that = target;

    dataType = type;

    operateId = id;

    var param = {
        type: dataType,

        actionType: $(target).index() + 1,
        id: operateId
    }


    lpcOperate(param, true, function (result) {
        //判断是否登录

       

                if (result.code == 0) {
                    

                   

                       lpcOperate(param, true, function(result){
                              //调查看 收藏 点赞接口
                                

                                  if(result.code==0){
                                     
                                               if(param.actionType=="2"){
                                                  
                                                    $.wishListAlert("<div class='layer-ball-box'>收藏成功</div>");

                                               }else{

                                                  $.wishListAlert("<div class='layer-ball-box'>点赞成功</div>");
                                                  
                                               }

                                                var origNum = parseInt($(that).find(".num").html()) + 1;

                                                $(that).find(".num").html(origNum);

                                                $(that).find("i").removeClass("bg-c");
                                               


                                                $(that).removeAttr("onclick");

                                  }else{
                                    
                                      console.log(result.msg)
                                  }


                      });


                } else if (result.code == 3) {
                       
                       var Top= $("#islogin").offset().top;
                       
                       var H=$(window).height();

                      
                      $("#islogin").attr("style","display:block;top:"+Top+"px;height:"+H+"px;");

                      document.addEventListener('touchmove', myStop,false);


                    


                } else {

                    console.log(result.msg);
                }


    });


};


function getInvidateCode() {

    //获取短信验证码 120秒倒计时

    var countDownTime = 120;

    var teleNumber = $("#tele-number").val();

    var param = {

        phoneNum: teleNumber

    };

    if (cont) {

        var timer = setInterval(function () {

            countDownTime--;

            $(".count-down").children('i').html(countDownTime);

            if (countDownTime == 0) {

                cont = true;

                clearInterval(timer);

                countDownTime = 120;

                $(".count-down").children('i').html(countDownTime);


            }

            cont = false;


        }, 1000);


        getInvidateCodeInfo(param, false, function (result) {

            if (result.code == 0) {

               

                 reInvidateCode = result.data.vCode;

            } else {

                $.wishListAlert("<div class='layer-ball-box'>"+result.msg+"</div>");
              

            }


        });


    };
    


};


function bindPhone() {
    //绑定手机号

    var teleNumber = $("#tele-number").val();

    var validateCode = $("#validate-code").val();

    if (!validate.phone(teleNumber)) {

        $.wishListAlert("<div class='layer-ball-box'>敢不敢把手机号写对</div>"); 

      

        return false;
    }
    ;

    if (validateCode != reInvidateCode) {
        
        $.wishListAlert("<div class='layer-ball-box'>您输入的验证码不正确</div>"); 


        return false;
    }


    var param = {
        id: operateId,

        type: dataType,

        actionType: $(that).index() + 1,

        phoneNum: teleNumber,

        yzm: validateCode,

        inviteCode: $("#invite-code").val(),
    }


 

    $.loadingShow();

    actionLogin(param, false, function (result) {

        $.loadingHide();

        if (result.code == 0) {

            

           if(param.actionType=="2"){
              
                $.wishListAlert("<div class='layer-ball-box'>收藏成功</div>");

           }else{

              $.wishListAlert("<div class='layer-ball-box'>点赞成功</div>");
              
           }
          

            var origNum = parseInt($(that).find(".num").html()) + 1;

            $(that).find(".num").html(origNum);

            $(that).find("i").removeClass("bg-c");

          
            $(that).removeAttr("onclick");


            $("#islogin").attr("style","display:none;");

                      
            document.removeEventListener('touchmove', myStop, false);
                   
        } else {

            $.wishListAlert("<div class='layer-ball-box'>"+result.msg+"</div>");
        }

    });


};




function myStop(e){

     e.preventDefault();
};