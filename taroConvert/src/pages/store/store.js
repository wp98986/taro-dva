import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import styles from './index.module.scss';

@connect(({ store }) => ({
  ...store,
}))
export default class Store extends Component {
  config = {
    navigationBarTitleText: 'store',
  };

  componentDidMount = () => {};

  render() {
    return <View className={styles.storePage}>store</View>;
  }
}
