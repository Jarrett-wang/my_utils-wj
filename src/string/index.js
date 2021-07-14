export function reverseString(str) {
  // 将字符串转换成数组
  let arr = str.split("");
  // 使用数组的翻转方法
  arr.reverse();
  // 将数组拼接成字符串
  let s = arr.join("");
  return s;
}

export function palindrome(str) {
  return reverseString(str) === str;
}

// 文字长度过长时，截取部分剩下的用...代替
export function truncate(str, size) {
  return str.slice(0, size) + "...";
}