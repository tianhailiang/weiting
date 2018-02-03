


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

                          window.location.href = "../detailed_account/kefu_1.1.html?phoneNum=" +  localStorage.userPhoneNum +"&sid=128324&entry=5&ref=link";

                     },false);



        update();


};


function update(){

   getCouponInfo(null,true,function(result){
       
       if(result.code==0){

          $("#gift_box").html(template("template1", {data: result.data}));

                    var mySwiper = new Swiper('#swiper-container1', {
                      //轮播切换
                       
                        onSlideChangeStart: function (swiper) {


                            var distance = (swiper.activeIndex) * 350 +"%" ;
                         
                           document.getElementsByClassName("gift_ibox")[0].style.webkitTransform = "translateX(" + distance + ")";
                          

                           $(".gift_ibox").attr("style", "transform:translateX(" + distance + ")");

                         
                         },


                        onSlideChangeEnd: function (swiper) {
                             
                             $("#mic_gift_ul>li").find("span").removeClass('gift_active');
                             
                             $("#mic_gift_ul>li").eq(swiper.activeIndex).find("span").addClass("gift_active");

                                $(".gift_slide_ul").hide();

                               $(".gift_slide_ul" + swiper.activeIndex).show();
                           
                        }


                   });


                     $("#mic_gift_ul>li").click(function(){
                        //点击切换


                           mySwiper.slideTo($(this).index() , 500, false);

                          $("#mic_gift_ul>li").find("span").removeClass('gift_active');

                          $("#mic_gift_ul>li").eq($(this).index()).find("span").addClass("gift_active");


                           var distance = ($(this).index()) * 350 +"%" ;
                         
                           document.getElementsByClassName("gift_ibox")[0].style.webkitTransform = "translateX(" + distance + ")";
                          

                           $(".gift_ibox").attr("style", "transform:translateX(" + distance + ")");

                           $(".gift_slide_ul").hide();

                          $(".gift_slide_ul" + $(this).index()).show();
                           

                     });     



       }else{

          console.log(result.msg);
       }


   });

   

};



/*===========接口===============*/



var getCouponInfo = function (param, async, succfun) {
   
    //获取用户礼券列表券  (6 提交会员婚礼信息接口)
   
    var testurl="../../../../testdata/miccenter/gift.json";

    var url = config.getUrl() + "getMemberCoupons";

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






