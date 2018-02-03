//手机端 

//提示信息 普通信息框，并设置2秒自动关闭
function info_alert(info,callBack){ 
    layer.open({
        content: info,
        style: 'background:#000; color:#555; border:none;line-height:110px;text-align:center;font-size:18px',
        time: 1,
        yes : function(){
            callBack && callBack();
        }
    });
}


//提示框，并显示1个按钮：
function hint_info(info,callBack){ 
    var index = layer.open({
        content: info,
        btn: ["确定"],
        yes:function(){ 
            callBack && callBack();
            layer.close(index);
        }
    });
}

/*
确认框；
* @param string info 提示信息
 * @param function callBack 点击确定的回调函数
*/
function confirm_mobile( info, callBack ){ 
    var index = layer.open({
        content: info,
        btn: ['确认', '取消'],
        shadeClose: false,
        yes: function(){
            callBack && callBack();
            layer.close(index);
        }
    });
}


/**
 * 手机端 加载层；
 * @param string text 提示信息 缺省为加载中...
 */
function load_start( text ){
    var text = text || '加载中...';
    window.layer_loading_id = layer.open({
        style: 'background:none;border:none;box-shadow:none;font-size:12px',
        type: 2,
        shadeClose: false,
        content: text
    });
}

/**
 * 结束加载层；
 */
function load_stop(){
    layer.close( window.layer_loading_id );
}



