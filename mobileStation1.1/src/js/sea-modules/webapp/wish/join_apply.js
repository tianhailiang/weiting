
 
 // var phone=OperationURL.getQueryString("phone");

 function init(){

       
       $("#phone").val(localStorage.userPhoneNum);
       
  
      $("#wishName,#phone").bind("keyup", function(){
          

		        var name = $("#wishName").val();

		        var phone = $("#phone").val();

		        if(name != "" &&phone != ""){

		            $("#btn-sure").addClass("active");

		             $("#btn-sure").attr("disabled", false);

		        } else {

		            $("#btn-sure").removeClass("active");
		            $("#btn-sure").attr("disabled", true);
		        }
       });



        $("#service").click(function(){
             //点击客服进入
           
                  window.location.href = "../detailed_account/kefu_1.1.html?phoneNum=" +  localStorage.userPhoneNum +"&sid=128324&entry=5&ref=link";
          
        });

      
          

};





function sureClick(){
	   //确认报名 

	   var name = $("#wishName").val();

	   var phone = $("#phone").val();
	
	 

         if (!validate.phone(phone)) {

	    	   $.wishListAlert("<div class='layer-ball-box'>敢不敢把手机号写对</div>");
	    	
	    	     return false;
       	 };

        var  activityId=OperationURL.getQueryString("id");

        var param = {

            id: activityId,
        	  name:name,
            phoneNum :phone
            
        };
        

      $.loadingShow();


     
       applyName(param,true, function(result){
           

         $.loadingHide();

            if(result.code == 0){

                     var userInfo = JSON.stringify(result);

                    $.wishListAlert("<div class='layer-ball-box'><i  class='iconfont circle-hook' style='margin-bottom:18px;'>&#xe66c;</i>"+result.msg+"</div>");
               

                   window.location.href = "../detailed_account/kefu_1.1.html?custromInfo=" + userInfo+"&type=7";    

            }else{

                $.wishListAlert("<div class='layer-ball-box'><i  class='iconfont circle-hook-fork' style='margin-bottom:18px;'>&#xe629;</i>"+result.msg+"</div>");

            }


        });
  
};



/*===============接口==================*/

var applyName = function (param, async, succfun) {
   //活动报名预约接口
    var testurl = "/api/wishApply";
    var useurl = config.getUrl() + "activityRegistration";
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