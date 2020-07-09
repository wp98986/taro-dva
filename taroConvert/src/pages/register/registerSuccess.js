import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import styles from './index.module.scss';

export default class Register extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      timeText: 5,
    };
  }

  config = {
    navigationBarTitleText: '账户注册',
  };

  componentDidShow = () => {
    this.loadInterval();
  };

  loadInterval() {
    const timer = setInterval(() => {
      let { timeText } = this.state;
      timeText -= 1;

      this.setState({
        timeText,
      });
      if (timeText <= 0) {
        // 自动登录成功后跳转至首页
        Taro.reLaunch({
          // 由于小程序不能从普通页面跳转到tabbar页面。所以用reLaunch，关闭所有页面，重新打开首页
          url: '/pages/homepage/homepage',
        });
        clearInterval(timer);
      }
    }, 1000);
  }

  render() {
    const { timeText } = this.state;
    return (
      <View className={styles.registerPage}>
        <View>ICON</View>
        <View className={styles.registerSuccessTitle}>注册成功</View>
        <View className={styles.registerSuccessText}>
          恭喜您已成功获得“XX”账号
        </View>
        <View className={styles.registerSuccessPath}>
          <Text className={styles.registerSuccessTimer}>
            {timeText && `0${timeText}`}s
          </Text>
          后会自动跳转到首页
        </View>
      </View>
    );
  }
}
