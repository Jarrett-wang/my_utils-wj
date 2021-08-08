//获取url参数
export function getQueryVariable(option) {
  var queryUrl = window.location.search.substring(1);
  var paramsArr = queryUrl.split("&");
  for (var i = 0; i < paramsArr.length; i++) {
    var params = paramsArr[i].split("=");
    if (params[0] === option) { return params[1]; }
  }
  return (false);
}