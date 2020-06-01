import Taro from "@tarojs/taro";
import withWeapp from "@tarojs/with-weapp";
import { Provider } from "@tarojs/mobx";

import counterStore from "./store/counter";

import "./app.scss";

const AppState = {
  counterStore,
};

@withWeapp({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = Taro.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    Taro.setStorageSync("logs", logs);

    // 登录
    Taro.login({
      success: () => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
    // 获取用户信息
    Taro.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          Taro.getUserInfo({
            success: () => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
  globalData: {
    userInfo: null,
  },
})
class App extends Taro.Component {
  config = {
    pages: [
      "pages/homepage/homepage",
      "pages/storeview/storelist",
      "pages/my/my",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
    },
    style: "v2",
    sitemapLocation: "sitemap.json",
    tabBar: {
      list: [
        {
          pagePath: "pages/homepage/homepage",
          text: "首页",
        },
        {
          pagePath: "pages/storeview/storelist",
          text: "整装",
        },
        {
          pagePath: "pages/my/my",
          text: "我的",
        },
      ],
      backgroundColor: "#fff",
      color: "#7F8389",
      selectedColor: "#C3151B",
    },
  };

  render() {
    return <Provider store={AppState} />;
  }
} //app.js

export default App;
Taro.render(<App />, document.getElementById("app"));
