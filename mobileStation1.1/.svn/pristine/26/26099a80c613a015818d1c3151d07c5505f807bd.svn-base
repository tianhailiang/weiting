


var type = "1";

var flag = 0;

 var paging = new QueryWithOrder();





function init() {

          
       var minH=$(window).height() -$("#swiper-container1").height();//获取最小高度

        $(".water").attr("style","min-height:"+minH+"px;")


    var mySwiper1 = new Swiper('#swiper-container1', {

        slidesPerView: '4',
        freeMode: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        onTap: function () {

            mySwiper2.slideTo(mySwiper1.clickedIndex);
            
           
        }


    });


    var mySwiper2 = new Swiper('#swiper-container2', {
       
        onSlideChangeStart: function (swiper) {

              type = swiper.activeIndex + 1;
              
               // if(type<3){

               //         var distance=(type-1)*1.61+"rem";
                      
               //         document.getElementById("ibox").style.webkitTransform ="translateX("+distance+")";

               //       $("#ibox").attr("style","transform:translateX("+distance+")");
                   
               //     }else if(type>5){

               //         var distance=(type-4)*1.55+"rem";
                    
               //         document.getElementById("ibox").style.webkitTransform ="translateX("+distance+")";

               //     }else if(type==5&&mySwiper1.activeIndex==3){

                        
              
               //             var distance=(type-4)*1.55+"rem";
                         
               //             document.getElementById("ibox").style.webkitTransform ="translateX("+distance+")";


               //     }

            
             

      
              updateNavPosition();

        },

        onSlideChangeEnd: function (swiper) {


            //请求数据
            type = swiper.activeIndex + 1;

      
          
            update(true);
          
           
            
        }


    });


          function updateNavPosition() {

              $('#swiper-container1 .active-nav').removeClass('active-nav');

              var activeNav = $('#swiper-container1 .swiper-slide').eq(mySwiper2.activeIndex).addClass('active-nav');
               
              // console.log(activeNav.index()+" " +mySwiper1.activeIndex);

              // console.log(type)

                
                if (activeNav.index() >= 2 ) {


                    if (activeNav.index() > mySwiper1.activeIndex && mySwiper1.activeIndex != 3) {

                        

                        mySwiper1.slideNext();

                    }


                }
              


                if (activeNav.index() <= mySwiper1.activeIndex && activeNav.index() > 0) {

                


                     mySwiper1.slidePrev();

                }


          };

        


      update(true);



      
        $(window).on("scroll",function(){
            //滚动执行瀑布流

              $(".lazy-img").lazyload({

                       placeholder: ""
                                  

              });

           

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


        favoriteInfo(param, true, function (result) {

            var listData = result.data;



                if (result.code == 0) {
                   
                   
                       

                    $(".waterfall" + type).html(template("template" + type, {data: listData}));
                         
                          $(".waterfall").hide();
                         
                          $(".waterfall"+type).show();

                        $("#swiper-container2").height( $(".waterfall"+type).outerHeight(true));
                       

                          $(".lazy-img").lazyload({

                               placeholder: "",
                                
                           });

  



                          if (type == 1 || type == 2 || type == 3 || type == 5) {


                               water.waterfall($(".waterfall" + type), $(".waterfall" + type + " .picList"));
                                  
                              
                                $("#swiper-container2").height( $(".waterfall"+type).outerHeight(true));

                          };



                          


                } else {

                    console.log(result.msg);
                }

        });


    };


};






function favoriteDetail(curId, curType) {
 /*收藏页面跳转详情页*/

    if (curType == 1 || curType == 2 || curType == 3) { // 白纱 礼服 男装

        window.location.href = "../detailed_account/account_detail.html?id=" + curId + "&type=" + curType;

    } else if (curType == 4 || curType == 5) { // 周边配饰

        window.location.href = "../detailed_account/accountAround_detail.html?id=" + curId + "&type=" + curType;

    } else if (curType == 6) {  // 婚礼堂

      window.location.href = "../detailed_account/weddingHouse_detail.html?id=" + curId + "&type=" + curType;

    } else if (curType == 7) {  // 活动
        window.location.href="../wish/experience_activity_detail.html?id=" + curId;

    } else if (curType == 8) {   // 攻略
       
       window.location.href="../wish/alive_strategy_detail.html?id=" +curId;
    }


};




function removeFav(target,evnet,id,actionType){
 
 //删除收藏
 event.stopPropagation();
 

    var param={
        id:id,
        type:actionType,
    }

      delFavorite(param,true,function(result){

        
           if(result.code==0){

               $.wishListAlert("<div class='layer-ball-box'>删除成功</div>");
             
             
                  
               $(target).parent().parent().parent().parent().remove();


           }else{

              $.wishListAlert("<div class='layer-ball-box'>"+result.msg+"</div>");
           }


      });

 

};