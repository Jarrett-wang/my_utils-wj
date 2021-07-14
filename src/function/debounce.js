/**
 * 实现函数防抖
 * 该函数会从上一次被调用后，延迟 wait 毫秒后调用 callback
 * @param {*} callback 
 * @param {*} time 
 * @returns 
 */
export function debounce(callback, time) {
  // 定时器变量
  let timeId = undefined;
  // 返回一个函数
  return function (e) {
    if (timeId !== undefined) {
      // 清空定时器
      clearTimeout(timeId);
    }

    // 启动定时器
    timeId = setTimeout(() => {
      // 执行回调
      callback.call(this, e);
      // 执行完了重置id
      timeId = undefined;
    }, time);
  };
}