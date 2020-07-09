import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import withWeapp from '@tarojs/with-weapp';

import styles from './my.module.scss';

@withWeapp({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
})
class _C extends Taro.Component {
  config = {};

  render() {
    return (
      <View className={styles.myPage}>
        <Text>pages/myinfo</Text>
      </View>
    );
  }
} // pages/my/my.js

export default _C;
