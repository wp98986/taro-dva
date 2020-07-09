import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
// import { getGlobalData } from '@/global';

import styles from './Test.module.scss';

// @withWeapp({
//   /**
//    * 页面的初始数据
//    */
//   data: {},

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function() {},

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {},

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function() {},

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {},

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {},

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {},

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {},

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {},
// })

@connect(({ feeds }) => ({
  ...feeds,
}))
class _C extends Taro.Component {
  componentDidMount = () => {
    // 未登录则重定向到登陆页
    const hasLogin = Taro.getStorageSync('hasLogin');
    if (!hasLogin) {
      Taro.redirectTo({
        url: '/pages/login/login',
      });
    }
  };

  render() {
    return (
      <View>
        <Text className={styles.aaa}>pages/homepag334444</Text>
      </View>
    );
  }
} // pages/homepage/homepage.js

export default _C;
