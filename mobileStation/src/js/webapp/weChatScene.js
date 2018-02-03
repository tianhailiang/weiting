
function init(){

    

	     var mySwiper = new Swiper ('.swiper-container', {
		 		direction:"vertical",
		 		loop : true,
			  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
			    swiperAnimateCache(swiper); //隐藏动画元素 
			    swiperAnimate(swiper); //初始化完成开始动画
			  }, 

			  onSlideChangeEnd: function(swiper){ 
			    
			    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	          
	            var index = swiper.activeIndex;
	           
                    if(index>6){
                    	index=1;
                    }
                    if(index<1){
                    	index=6;
                    }

                 $("#prog").val(1*(index));

                 $("#member").html(index);
                 
            

                  // $("#page2-flowers").attr("style","opacity:0");

	             // $(".swiper-wrapper>.swiper-slide").find("#page2-flowers").removeClass("lowerDown")
 
			 
	             // $(".swiper-wrapper>.swiper-slide").eq(index).find("#page2-flowers").addClass("lowerDown");
                
	     
			  }
			  
		 });    

        


   



   //       $("#page2-flowers").bind("webkitAnimationEnd",function(){
		 	
		 	
		 //    $(this).attr("style","opacity:1");
		    
		 	
		 // });


         $(".page4-color").scrollbar({direction:'x'});
      
        
         tab.tabClick($("#page4Content li"),"i","ico-right-hook");
         tab.tabClick($("#page5Content li"),"i","ico-right-hook");
         tab.tabClick($("#page6Content li"),"i","ico-right-hook");
        


};