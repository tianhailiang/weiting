/**
 * Created by zeke on 2016/1/14.
 */

/*
 * iscroll pull封装
 * 此模块依赖 jquery和iscroll-probe
 * */
(function (window, $, IScroll) {


    function IscrollPull(wrapper, topValue) {

        //解决iscroll在安卓手机上滑动不流畅,和ios里头尾能固定问题。
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);


        var self = this;
        // self.topValue = -topValue;
        self.pullDownFlag = 0;
        self.pullUpFlag = 0;

        self.iscroll = new IScroll(wrapper, {

            preventDefault: false,
            probeType: 3,
            mouseWheel: false,
            scrollbars: false,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            click: false,
          


        });


        self.iscroll.on("scroll", function () {


                    // console.log("this.y "+this.y+"this.maxScrollY "+this.maxScrollY);

                    if(this.y > 0){

                        //禁止上方反弹
                       
                        self.iscroll.scrollTo(0,0, 0);

                   
                    }else if (this.y < (this.maxScrollY - 40)) {
                        //判断上拉


                        self.pullUpFlag = 1;

                    }else if(this.y < (this.maxScrollY+20)){

                        // $pullUp.html("<i class='ico-loading'></i><span>正在加载...</span>");
               
                   }


                    if(this.y>-150){


                  
                        $("#nav-box2").hide();



                      } else if(this.y<=-150){

                            $("#nav-box2").show();
                        

                      }      

                   


        });




        self.iscroll.on("scrollEnd", function () {


            if (self.pullDownFlag == 1) {

                // $(self).trigger(IscrollPull.scrollPullEvent.pullDownEnd);

                // self.pullDownFlag = 0;


            } else if (self.pullUpFlag == 1) {

                $(self).trigger(IscrollPull.scrollPullEvent.pullUpEnd);

                self.pullUpFlag = 0;
                

            };
            

             $(".lazy-img").lazyload({

                     placeholder: "../src/images/loading_small.png",
                    threshold: 200, 
                    failure_limit : 6,
                
             });   

            
           

        });


    };


    IscrollPull.scrollPullEvent = {
        "pullDown": "pullDown",
        "pullDownEnd": "pullDownEnd",
        "pullUp": "pullUp",
        "pullUpEnd": "pullUpEnd"
    };


    IscrollPull.prototype.refresh = function () {
        var self = this;
        self.iscroll.refresh();
    };

    IscrollPull.prototype.scrollToTop = function () {
        var self = this;

        self.iscroll.scrollTo(0,-150, 0);


    };


    IscrollPull.prototype.destroy = function () {
        var self = this;
        self.iscroll.destroy();


    };

    IscrollPull.prototype.scrollToElement = function (element) {
        var self = this;

        self.iscroll.scrollToElement(element);
    };


    window.IscrollPull = IscrollPull;

})(window, jQuery, IScroll);



/*
 * 模拟原声滚动iscroll5
 * 
 */

(function (window, $, IScroll) {
    //原声滚动

    var flag = true;

    function ZHJIscroll(wrapper, num) {

        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);

        var self = this;
        self.pullUpFlag = 0;
        self.iscroll = new IScroll(wrapper, {
           preventDefault: false,
            probeType: 3,
            mouseWheel: false,
            scrollbars: false,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            click: false
        });


        self.iscroll.on("scroll", function () {

            // console.log("y:"+this.y+"   maxY:"+this.maxScrollY);

            // console.log("文档高度 "+$(".waterfall"+num).height());


             if ((-this.y) + $(window).height() < $(".waterfall" + num).height()) {
                flag = true;
            }
            if (this.y < this.maxScrollY + 50 && flag == true) {
                //滑到底部让其加载。开关关闭，避开有延时影响获取this.maxScrollY
                $(self).trigger(IscrollPull.scrollPullEvent.pullUpEnd);
                 flag = false;
            }
        });

           self.iscroll.on("scrollEnd", function () {
                $(".lazy-img").lazyload({
                    placeholder: "../src/images/loading.gif"
                });
           });

        ZHJIscroll.scrollPullEvent = {
            "pullDownEnd": "pullDownEnd",
            "pullUpEnd": "pullUpEnd"
        };

        ZHJIscroll.prototype.refresh = function () {
            var self = this;
            self.iscroll.refresh();
        };

        ZHJIscroll.prototype.destroy = function () {
            var self = this;
            self.iscroll.destroy();


        };

    };


    window.ZHJIscroll = ZHJIscroll;


})(window, jQuery, IScroll);



var myPullScroll = null;



function listCommon() {

    FastClick.attach(document.body);

    $pullDown = $(".pullDown");
    $pullUp = $(".pullUp");
    $scroller = $(".scroller");


    myPullScroll = new IscrollPull(".wrapper", $pullDown.height());


    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullDown, pullDown);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullDownEnd, pullDownEnd);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullUp, pullUp);
    $(myPullScroll).on(IscrollPull.scrollPullEvent.pullUpEnd, pullUpEnd);

    $(myPullScroll).trigger(IscrollPull.scrollPullEvent.pullDownEnd);


};



var ZhPullScroll = null;

function pullupCommon(num) {
    //原声滚动

    FastClick.attach(document.body);

    $scroller = $(".scroller");

    ZhPullScroll = new ZHJIscroll(".wrapper" + num, num);


    $(ZhPullScroll).on(IscrollPull.scrollPullEvent.pullDownEnd, pullDownEnd);
    $(ZhPullScroll).on(IscrollPull.scrollPullEvent.pullUpEnd, pullUpEnd);

    $(ZhPullScroll).trigger(IscrollPull.scrollPullEvent.pullDownEnd);


};


function pullDown() {


    $pullDown.html("松手刷新");
};

function pullDownEnd() {

    // console.log(" pullDownEnd");

    update(true);

};

function pullUp() {

    $pullUp.html("松手加载");

};


function pullUpEnd() {

    update(false);

};


function update(isRefresh) {
    //TODO 更新

};