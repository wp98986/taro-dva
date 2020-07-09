import '@tarojs/async-await';
import Taro from '@tarojs/taro';

// 获取openId
const getOpenId = () => {
  return Taro.getStorageSync('openId');
};

const callAfterOpenId = function(callback) {
  const app = Taro.getApp();
  const openId = getOpenId();
  if (openId) {
    callback();
  } else {
    // 如果页面独立打开，如分享的情况，openId可能有延迟
    app.getOpenIdCallBacks.push(callback);
  }
};

// 字符串拼接连接
function stringJoin(joinStr) {
  let result = '';
  let hasFirst = false;
  for (let i = 1; i < arguments.length; i++) {
    let tmp = arguments[i];
    if (tmp) {
      let tmpJoinStr = hasFirst ? joinStr : '';
      result += tmpJoinStr + tmp;
      hasFirst = true;
    }
  }
  return result;
}

const deepCopy = function(obj) {
  //对象深拷贝
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  // eslint-disable-next-line vars-on-top
  var newObj = new obj.constructor(); //保持继承链
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      //不遍历其原型链上的属性
      const val = obj[key];
      // eslint-disable-next-line no-caller
      newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
    }
  }
  return newObj;
};

export { getOpenId, callAfterOpenId, stringJoin, deepCopy };
