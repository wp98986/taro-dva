import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { getGlobalData } from '@/global';
import { AtIcon, AtAvatar } from 'taro-ui';

import styles from './my.module.scss';

@connect(({ feeds }) => ({
  ...feeds,
}))
class myinfo extends Taro.Component {
  constructor() {
    super(...arguments);
    const currentInfo = getGlobalData('currentInfo');
    this.state = {
      currentInfo,
    };
  }

  config = {
    backgroundColor: '#000',
    navigationBarTitleText: '个人信息',
  };

  pathToAddStore() {
    Taro.navigateTo({
      url: '/pages/store/storeadd',
    });
  }

  renderInfo() {
    const { currentInfo = {} } = this.state;
    const { org: { name: orgName } = {}, user: { headImg } = {} } = currentInfo;

    return (
      <View className={styles.myInfoCard}>
        <View className={styles.myInfoOrgName}>
          <AtAvatar
            className={styles.myInfoOrgIcon}
            size='small'
            image={headImg}
          />
          {orgName}
        </View>
        <View>
          <View className={styles.viewItem}>
            <View className={styles.viewItemLabel}>所在省市区</View>
            <View className={styles.viewItemText}>广东省佛山市顺德区</View>
          </View>
          <View className={styles.viewItem}>
            <View className={styles.viewItemLabel}>联系人</View>
            <View className={styles.viewItemText}>dddd</View>
          </View>
          <View className={styles.viewItem}>
            <View className={styles.viewItemLabel}>手机号</View>
            <View className={styles.viewItemText}>12333</View>
          </View>
          <View className={styles.viewItem}>
            <View className={styles.viewItemLabel}>门店数</View>
            <View className={styles.viewItemText}>12333</View>
            <View className={styles.viewItemIcon}>
              <AtIcon value='add' size={12} onClick={this.pathToAddStore} />
            </View>
          </View>
          <View className={styles.viewItem}>
            <View className={styles.viewItemLabel}>店员数</View>
            <View className={styles.viewItemText}>12333</View>
            <View className={styles.viewItemIcon}>
              <AtIcon value='add' size={12} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return <View className={styles.myInfo}>{this.renderInfo()}</View>;
  }
}

export default myinfo;
