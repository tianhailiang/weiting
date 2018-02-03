
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
                      
                      if($(".icon_collect").attr("style")=="color:#e8796e"){
                            //判断收藏颜色。
                            

                                $(".icon_collect").attr("style","color:#e8796e");
                            
                        }else{

                             $(".icon_collect").attr("style","color:#666");
                        }
                     


                  }else{
                     
                       $(".icon_div").attr("style","opacity:0.4");
                       
                       $(".icon_header").attr("style","color:#fff");


                       if($(".icon_collect").attr("style")=="color:#e8796e"){
                            //判断收藏颜色。

                                $(".icon_collect").attr("style","color:#e8796e");
                            
                        }else{

                             $(".icon_collect").attr("style","color:#fff");
                        }
                     
                  }
            
             
         });
   

      


};


function update(){

  var param={
  	id:Id
  }
  
  planDivision(param,true, function(result){


      if (result.code == 0) {
          
          console.log(result)

          template.config("escape", false); //让标签转换

          document.querySelector("#scr-main").innerHTML=template("template1",{data:result.data});
          
          
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

     

         document.querySelector("#icon_collect").addEventListener("click",operateCollect,false);   
        
          document.querySelector("#introduce").addEventListener("click",function(){
            //策划师介绍
              
              var id=$(this).attr("data-id");

              window.location.href="planning_division_introduce.html?id="+id;

          },false);


         

          document.querySelector("#plan_atten").addEventListener("click",function(){
              
              var that=this;
               if(memberId!=""){
                    
                    attention(that);

               }else{
                   
                   window.location.href= "../order/bind_phone.html?id="+Id+"&action_type=11";

               }


          },false);

          document.querySelector("#total").addEventListener("click",function(){
                //连接策划师列表页
                var id=$(this).attr("data-id");

                window.location.href="planning_division_list.html?id="+id;

          },false);

          
          $("#dependence-ul li").click(function(){
              //相关单品点击    
                var id=$(this).attr("data-id");
                var type=$(this).attr("data-type");

               window.location.href = "../detailed_account/account_item.html?id="+id+ "&type="+type ;  

          });

        
        document.querySelector("#planWord").addEventListener("click",planWord,false);

       
    
       

        
      } else {

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
  
console.log(isfollow)

  if(isfollow==0){

    
     attentionInfo(param,true,function(result){

            if(result.code==0){
             
               $(that).attr("style","color:#666;")
               $(that).next().text(result.data+"已关注");
               
              $(that).attr("data-isfollow","1"); 

            }else{

            	console.log(result.msg);
            }


     });



  }else{

  	 cancelAttention(param,true,function(result){

          if(result.code==0){
               
              $(that).attr("style","color:#e87a6e;")

              $(that).next().text(result.data+"已关注");

              $(that).attr("data-isfollow","0");  

          }else{

          	 console.log(result.msg);
          }

  	 });

  }


};





function operateCollect(){
             //收藏 
              
      var that=this;

      var param={

         type:"11",

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
              
                 window.location.href="../order/bind_phone.html?id="+Id+"&action_type=11";
               
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






function planWord(){

 //显示留言评论

      var id=$(this).attr("data-id");  

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
                   
                   id:id,
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


/*==============接口===============*/

var  planDivision= function (param, async, succfun) {
   
   //10、查看真实案例详情(新接口)

    var testurl = "../../../../testdata/wish/planning_division_detail.json";

    var useurl = config.getUrl() + "getWorkDetails";

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