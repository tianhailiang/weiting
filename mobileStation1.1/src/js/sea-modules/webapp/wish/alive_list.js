
 var memberId=getCookie("WISHLIST_MEMBER_ID");

function init(){

  update();



             document.querySelector("#service").addEventListener("click",function(){
                //点击客服进入
               if(memberId!=""){
                    //根据用户Id判断登没登陆

                      window.location.href = "../detailed_account/kefu_1.1.html?phoneNum=" +  localStorage.userPhoneNum +"&sid=128324&entry=5&ref=link";

                 }else{

                      window.location.href = "../order/bind_phone.html?id="+Id+"&action_type=11";

                 }

          },false);          

};


function update(){
   
 aliveList(null, true, function(result){


      if (result.code == 0) {

          console.log(result)
       

          template.config("escape", false); //让标签转换

          document.querySelector("#scr-main").innerHTML=template("template1",{data:result.data});

          
          $(".alive").click(function(){
             //点击进入攻略详情页
             var id=$(this).attr("data-id");

              window.location.href ="alive_strategy_detail.html?id="+id;
               
          });

           

        
      } else {

        console.log(result.msg);
      }

  });

}



/*=============接口================*/


var aliveList = function (param, async, succfun) {
   
   //7 查询攻略列表(新加) 

    var testurl = "../../../../testdata/wish/alive_list.json";

    var useurl = config.getUrl() + "getGuideList";
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

