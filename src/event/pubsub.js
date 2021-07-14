const listeners = {};
const pubSub = {
  // 发布
  pub: (name, opts = {}) => {
    if (!listeners[name]) return;
    // 依次执行注册的消息对应的动作序列
    listeners[name].forEach(cb => cb(opts));
  },
  // 接收
  sub: (name, cb) => {
    if (listeners[name]) {
      listeners[name].push(cb);
    } else {
      listeners[name] = [cb];
    }

    return () => {
      const idx = listeners[name].indexOf(cb);
      if (idx > -1) listeners[name].splice(idx, 1);
    };
  },
};
export default pubSub;