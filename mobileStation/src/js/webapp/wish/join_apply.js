
 
 var phone=OperationURL.getQueryString("phone");

function init(){

       

        $("#phone").val(phone);
       
  
      $("#wishName,#phone,#apply-num").bind("keyup", function(){
          

		        var name = $("#wishName").val();

		        var phone = $("#phone").val();

		        var applyNum=$("#apply-num").val();

		        if(name != "" &&phone != ""&& applyNum!=""){

		            $("#btn-sure").addClass("active");

		             $("#btn-sure").attr("disabled", false);

		        } else {

		            $("#btn-sure").removeClass("active");
		            $("#btn-sure").attr("disabled", true);
		        }
       });
      
          

};





function sureClick(){
	   //确认报名 

	   var name = $("#wishName").val();

	   var phone = $("#phone").val();
	
	   var applyNum=$("#apply-num").val();


         if (!validate.phone(phone)) {

	    	   $.wishListAlert("<div class='layer-ball-box'>敢不敢把手机号写对</div>");
	    	
	    	     return false;
       	 };

        var  activityId=OperationURL.getQueryString("id");

    
        var param = {

            id: activityId,
        	  name:name,
            phoneNum :phone,
            num :applyNum 
        };
        

      $.loadingShow();
     
       applyName(param,true, function(result){
           
              

         $.loadingHide();

            if(result.code == 0){

                   $.wishListAlert("<div class='layer-ball-box'><i  class='iconfont circle-hook' style='margin-bottom:18px;'>&#xe66c;</i>"+result.msg+"</div>");
               

                  window.location.href = "../detailed_account/kefu.html?phoneNum=" +param.phoneNum +"&sid=128324&entry=5&ref=link";    

                

            }else{

                $.wishListAlert("<div class='layer-ball-box'><i  class='iconfont circle-hook-fork' style='margin-bottom:18px;'>&#xe629;</i>"+result.msg+"</div>");

            }


        });
  
};
