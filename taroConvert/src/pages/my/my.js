import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import withWeapp from '@tarojs/with-weapp';
import { AtIcon, AtAvatar, AtList, AtListItem } from 'taro-ui';
import { getGlobalData } from '@/global';

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

  pathToMyView = () => {
    Taro.navigateTo({
      url: '/pages/my/myinfo',
    });
  };

  renderHeader() {
    const currentInfo = getGlobalData('currentInfo') || {};
    const {
      name: userName,
      user: { headImg } = {},
      org: { name: orgName } = {},
    } = currentInfo;
    return (
      <View className={styles.userHead} onClick={this.pathToMyView}>
        <View className={styles.userHeadContent}>
          <AtAvatar image={headImg} />
          <View className={styles.userHeadName}>
            <View>{userName}</View>
            <View className={styles.orgName}>{orgName}</View>
          </View>
        </View>
        <AtIcon value='chevron-right' />
      </View>
    );
  }

  renderListItem() {
    return (
      <AtList>
        <AtListItem
          title='友商列表'
          arrow='right'
          extraText='15'
          onClick={this.handleClick}
        />
        <AtListItem
          title='联盟列表'
          arrow='right'
          extraText='11'
          onClick={this.handleClick}
        />
        <AtListItem
          title='门店列表'
          arrow='right'
          extraText='11'
          onClick={this.handleClick}
        />
        <AtListItem
          title='店员列表'
          arrow='right'
          extraText='11'
          onClick={this.handleClick}
        />
      </AtList>
    );
  }

  render() {
    return (
      <View className={styles.myPage}>
        {this.renderHeader()}
        <View>钱包</View>
        {this.renderListItem()}
      </View>
    );
  }
} // pages/my/my.js

export default _C;
