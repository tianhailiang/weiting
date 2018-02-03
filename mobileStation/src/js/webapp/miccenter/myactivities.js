

function init(){

  
  update();

};




function update(){

	myActivityInfo

  var param = {
      
   };



  myActivityInfo(param, true, function(result){

       var listData=result.data;

        if (result.code == 0) {

            

          $("#active-ul").html(template("template",{data:listData}));
         

       


        } else {

          console.log(result.msg);
        }

  });


};




function detailClick(id) { 
   // 点击商品跳转到对应商品详情页。
    

   window.location.href = "../wish/experience_activity_detail.html?id="+id;


}