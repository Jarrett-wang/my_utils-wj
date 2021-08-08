//处理电话号码匹配手机号首尾，以类似“123****8901”的形式输出
export function handlePhoneNumber(str) {
  if (str !== null && str !== undefined) {
    var reg = /^(\d{3})\d*(\d{4})$/;
    return str.replace(reg, '$1****$2')
  } else {
    return str;
  }
}
//处理电话号码以344格式输出，类似“123 4567 8901”的形式
export function formatPhoneNumber(str) {
  if (str !== null && str !== undefined) {
    var reg = /^(\d{3})(\d{4})(\d{4})$/;
    return str.replace(reg, "$1 $2 $3")
  } else {
    return str;
  }
}