(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


//   (function(doc, win){

//     var docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function () {
//     var clientWidth = docEl.clientWidth;
//     var clientHeight =docEl.clientHeight;

//     if (!clientWidth) return;
//     docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
//     if(clientHeight<clientWidth){
//         docEl.style.fontSize = 100 * (clientWidth / 1136) + 'px';
//     }else{
//         docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
//         }
//     };

//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);

// })(document, window);