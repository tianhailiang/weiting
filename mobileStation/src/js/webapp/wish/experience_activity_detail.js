
 var Id = OperationURL.getQueryString("id");


function init(){

      var isView= OperationURL.getQueryString("isView");//获取是否被查看

       if(isView=="0"){
         //如果没被查看则调入
           operate();

        };


      update();




   
};




function update(){
    
 


  var param = {
        id:Id,  
      
  };
  
 activityInfo(param, true, function(result){

     var listData=result.data;

      if (result.code == 0) {

        
        
        $("#main-box").html(template("template1",{data:listData}));

        $("#actHeader").attr("style", "background:url("+listData.headImg+") no-repeat center;background-size:cover;");
       
        $("#act-ontent").html(listData.content);

         $("#act-ontent p").attr("style","font-size:0.24rem;line-height:0.39rem;")

         $("#act-ontent img").each(function(i){

             
                $(this).removeAttr('style');
              
                $(this).attr("style","margin:0 auto;");
          });



        
      } else {

         console.log(result.message);
      }

  });



};



function myapply(id){
   //我要报名 判断是否登录

   
 var param={};
 
    isLogin(param,true,function(result){ 

   
         if(result.code==0){


           window.location.href="join_apply.html?id="+id+"&phone="+result.data.phoneNum;


       }else if(result.code==3){

           window.location.href="../order/bind_phone.html?id="+id+"&action_type=2";

       }else{
          console.log(result.msg);
       }

    });

     
};



  function operate(){
             //查看 
              

              var param={

                 type:"7",

                 actionType:1,

                 id:Id
              }


             lpcOperate(param, true, function(result){
              //调查看接口
                

                  if(result.code==0){
                     
                     

                  }else{
                    
                      console.log(result.msg)
                  }
             });

  };



