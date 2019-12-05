/**
 * REM自适应
 * designWidth 设计稿实际宽度
 * maxWidth 制作稿的最大宽度
 * */
 
(function (designWidth = 375, maxWidth = 750) {
  var docEle = document.documentElement;

  //设置html fontSize
  var refreshRem = function () {
    var cWidth = docEle.clientWidth;
    if (cWidth > maxWidth) cWidth = maxWidth;
    docEle.style.fontSize = cWidth / designWidth * 100 + 'px';
  };
  refreshRem();

  //事件监听
  var timeID;
  window.addEventListener("resize", function () {
    clearTimeout(timeID);//防止执行两次
    timeID = setTimeout(refreshRem, 300);
  }, false);
  window.addEventListener("pageshow", function (evt) {
    //浏览器后退时重新计算
    if (evt.persisted) {
      clearTimeout(timeID);
      timeID = setTimeout(refresh, 300);
    }
  }, false);

})(375, 750);
