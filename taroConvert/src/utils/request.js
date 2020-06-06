import Taro from '@tarojs/taro';

const baseUrl = 'https://esale.ufu100.com/';

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url;
};

// 封装请求
export default function request(opt, showLoading, ...others) {
  const openId = Taro.getStorageSync('openId');
  if (showLoading) {
    Taro.showLoading({
      title: '加载中,请稍后...',
    });
  }
  const { param = {}, url } = opt;
  return Taro.request({
    ...opt,
    url: getUrl(url),
    data: { ...param, openId },
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
    },
    ...others,
  }).then((res) => {
    let { statusCode, data } = res;
    if (showLoading) {
      Taro.hideLoading();
    }
    if (statusCode >= 200 && statusCode < 300) {
      return data;
    } else if (statusCode >= 400 && statusCode < 500) {
      const { data: { errorMessage = '400错误' } = {} } = res;
      Taro.showToast({
        title: errorMessage,
        duration: 2000,
        icon: 'none',
      });
    } else {
      Taro.showToast({
        title: '系统错误',
        duration: 2000,
        icon: 'none',
      });
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
}
