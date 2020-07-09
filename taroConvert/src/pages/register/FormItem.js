import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

export default class FormItem extends Component {
  componentDidMount = () => {};

  render() {
    const { label, children } = this.props;
    return (
      <View className={styles.registerFormItem}>
        <View className={styles.registerFormLabel}>{label}</View>
        {children}
      </View>
    );
  }
}
