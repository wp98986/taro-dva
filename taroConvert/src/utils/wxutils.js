import '@tarojs/async-await';
import Taro from '@tarojs/taro';

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

export default {
  getOpenId,
  callAfterOpenId,
};
