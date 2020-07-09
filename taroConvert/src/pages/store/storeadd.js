import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import WxValidate from '@/utils/WxValidate';
import { AtForm, AtInput, AtButton, AtMessage } from 'taro-ui';
import styles from './index.module.scss';

@connect(({ store }) => ({
  ...store,
}))
class storeadd extends Component {
  config = {
    navigationBarTitleText: '门店新增',
  };

  componentDidShow = () => {
    this.initValidate();
  };

  initValidate() {
    let rules = {
      value: {
        required: true,
      },
    };

    let message = {
      value: {
        required: '请填写账号',
      },
    };
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  }

  onSubmit(e) {
    const formValue = e[0].detail.value;
    if (!this.WxValidate.checkForm(formValue)) {
      const error = this.WxValidate.errorList[0];
      Taro.atMessage({
        message: `${error.msg}`,
        type: 'error',
      });
      return false;
    }
  }

  renderStoreForm() {
    return (
      <AtForm
        className={styles.storeAddForm}
        onSubmit={this.onSubmit.bind(this)}
        // onReset={this.onReset.bind(this)}
      >
        <AtInput
          className={styles.storeAddFormItem}
          name='value'
          title='门店名称'
          type='text'
          placeholder='请填写门店名称'
          required
          border={false}
          // value={this.state.value}
          // onChange={this.handleChange.bind(this, 'value')}
        />
        <AtInput
          className={styles.storeAddFormItem}
          name='value2'
          title='门店名称2s'
          type='text'
          border={false}
          placeholder='请填写门店名称2'
          required
          // value={this.state.value}
          // onChange={this.handleChange.bind(this, 'value')}
        />
        <AtButton formType='submit'>提交</AtButton>
      </AtForm>
    );
  }

  render() {
    return (
      <View className={styles.storeAddPage}>
        <AtMessage />
        {this.renderStoreForm()}
      </View>
    );
  }
}

export default storeadd;
