

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
  


 aliveInfo(param, true, function(result){

     var listData=result.data;

      if (result.code == 0) {

         

        $("#scr-main").html(template("template1",{data:listData}));


          

         $("#act-ontent").html(listData.content);


        $("#act-ontent p").attr("style","font-size:0.24rem;line-height:0.39rem;")

          $("#act-ontent img").each(function(i){

             
                $(this).removeAttr('style');
              
                $(this).attr("style","margin:0 auto;");
          });

       


        
      } else {

        console.log(result.msg);
      }

  });



};     



function detailClick(id,dataType) { 
   // 点击商品跳转到对应商品详情页。
    
   if(dataType==1){

       window.location.href ="../detailed_account/account_detail.html?id="+id;

   }else{

      window.location.href="../detailed_account/weddingHouse_detail.html?id=" + id + "&type=6"; 
   }

  
   

};






    function operate(){
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
                    
                      console.log(result.msg)
                  }

             });

    };
