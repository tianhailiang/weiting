

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



  myActivityInfo(null, true, function(result){

       var listData=result.data;

        if (result.code == 0) {

            console.log(result)

          $("#scr-main").html(template("template",{data:listData}));

            $("#act_ul li").click(function(){
            //点击进入详情页 
              var id=$(this).attr("data-id");
             
              window.location.href = "../wish/experience_activity_detail.html?id="+id;


           });
         


        } else {

          console.log(result.msg);
        }

  });


};





/*============接口===============*/



var myActivityInfo = function (param, async, succfun) {
   //我的活动展示接口  (7.获取用户参与活动列表)

    var testurl = "/api/micactivity";

    var useurl = config.getUrl() + "getMemberActivities";
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
