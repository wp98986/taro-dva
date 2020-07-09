// eslint-disable-next-line no-empty-label
import 'taro-ui/dist/style/index.scss';
import '@tarojs/async-await';
import Taro from '@tarojs/taro';
import withWeapp from '@tarojs/with-weapp';
import { Provider } from '@tarojs/redux';

import dva from '@/utils/dva';
import action from '@/utils/action';
import { getOpenId } from '@/utils/wxutils';
import { setGlobalData } from '@/global';

import models from './model';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    dispatch(action('sys/error', e));
  },
});
const store = dvaApp.getStore();

@withWeapp({
  getCurrentInfo() {
    dvaApp.dispatch({
      type: 'globalModel/getUserData',
      callback: (result) => {
        const { data } = result;
        if (data) {
          Taro.setStorageSync('userType', 'designer');
          Taro.setStorageSync('isAuto', true);
          // this.globalData.currentInfo = data;
          setGlobalData('currentInfo', data);
        } else {
          Taro.setStorageSync('userType', 'visitor');
          // this.globalData.currentInfo = undefined;
          setGlobalData('currentInfo', undefined);
        }
      },
    });
  },

  getOpenIdFun() {
    // 登录
    Taro.login({
      success: (res) => {
        const queryParam = { code: res.code };
        dvaApp.dispatch({
          type: 'globalModel/appletopenid',
          payload: queryParam,
          callback: (result) => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            const { data: { code, openId } = {} } = result;
            if (code === '203') {
              Taro.setStorageSync('openId', openId);
              this.getCurrentInfo();
            }
          },
        });
      },
    });

    // 获取用户信息
    // Taro.getSetting({
    //   success: (res) => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       Taro.getUserInfo({
    //         success: (userRes) => {
    //           console.log(userRes);
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo;
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res);
    //           }
    //         },
    //       });
    //     }
    //   },
    // });
  },

  onLaunch: function() {
    const openId = getOpenId();
    if (!openId) {
      this.getOpenIdFun();
    } else {
      this.getCurrentInfo();
    }
    // 展示本地存储能力
    const logs = Taro.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    Taro.setStorageSync('logs', logs);
  },

  globalData: {
    userInfo: null,
  },
})
class App extends Taro.Component {
  // componentDidMount() {
  //   dvaApp.dispatch({ type: 'sys/test' });
  // }

  config = {
    pages: [
      'pages/homepage/homepage',
      'pages/order/orderlist',
      'pages/my/my',
      'pages/my/myinfo',
      'pages/login/login',
      'pages/register/register',
      'pages/register/registerSuccess',
      'pages/store/storeadd',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '店惠',
      navigationBarTextStyle: 'black',
      backgroundColor: '#000',
    },
    style: 'v2',
    sitemapLocation: 'sitemap.json',
    tabBar: {
      list: [
        {
          pagePath: 'pages/homepage/homepage',
          text: '活动',
        },
        {
          pagePath: 'pages/order/orderlist',
          text: '订单',
        },
        {
          pagePath: 'pages/my/my',
          text: '我的',
        },
      ],
      backgroundColor: '#fff',
      color: '#7F8389',
      selectedColor: '#C3151B',
    },
  };

  render() {
    return <Provider store={store} />;
  }
} //app.js

export default App;
Taro.render(<App />, document.getElementById('app'));
