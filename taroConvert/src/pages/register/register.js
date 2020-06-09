import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import styles from './index.module.scss';

@connect(({ register }) => ({
  ...register,
}))
export default class Register extends Component {
  config = {
    navigationBarTitleText: '账户注册',
  };

  componentDidMount = () => {};

  render() {
    return <View className={styles.registerPage}>register</View>;
  }
}
