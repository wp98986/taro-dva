import Taro, { Component } from '@tarojs/taro';
import { View, Input, Form, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import WxValidate from '@/utils/WxValidate';
import { AtMessage } from 'taro-ui';
import { setGlobalData } from '@/global';

import styles from './login.module.scss';

@connect(({ login }) => ({
  ...login,
}))
export default class Login extends Component {
  componentDidMount = () => {};
  config = {
    navigationBarTitleText: '登录',
  };

  componentDidShow = () => {
    Taro.hideHomeButton();
    this.initValidate();
  };

  initValidate() {
    let rules = {
      userName: {
        required: true,
      },
      userPwd: {
        required: true,
      },
    };

    let message = {
      userName: {
        required: '请填写账号',
      },
      userPwd: {
        required: '请填写密码',
      },
    };
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  }

  pathToRegister = () => {
    Taro.navigateTo({
      url: '/pages/register/register',
    });
  };

  renderTopText() {
    return (
      <View className={styles.loginTextContent}>
        <View>嗨~</View>
        <View>欢迎回来</View>
      </View>
    );
  }

  onSubmit(e) {
    const formValue = e.detail.value;
    if (!this.WxValidate.checkForm(formValue)) {
      const error = this.WxValidate.errorList[0];
      Taro.atMessage({
        message: `${error.msg}`,
        type: 'error',
      });
      return false;
    }
    const { dispatch } = this.props;
    const { userName, userPwd } = formValue;
    const queryParam = { userName, userPwd };
    dispatch({
      type: 'login/loginHandle',
      payload: queryParam,
      callback: (res) => {
        const {
          data: { code, message },
        } = res;
        if (code === '203') {
          // 获取个人信息
          dispatch({
            type: 'globalModel/getUserData',
            callback: (result) => {
              const { data } = result;
              if (data) {
                Taro.setStorageSync('userType', 'designer');
                Taro.setStorageSync('isAuto', true);
                setGlobalData('currentInfo', data);
              } else {
                Taro.setStorageSync('userType', 'visitor');
                setGlobalData('currentInfo', undefined);
              }
            },
          });
          Taro.reLaunch({
            url: '/pages/homepage/homepage',
          });
        } else {
          Taro.atMessage({
            message,
            type: 'error',
          });
        }
      },
    });
  }

  renderLoginForm() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Input
          className={styles.loginInput}
          placeholderClass={styles.placeholderColor}
          name='userName'
          placeholder='请输入账号'
          required
        />
        <Input
          className={styles.loginInput}
          placeholderClass={styles.placeholderColor}
          name='userPwd'
          type='password'
          placeholder='请输登录密码'
        />
        <View className={styles.loginForgetPwd}>忘记密码？</View>
        <Button FormType='submit' className={styles.loginBtn}>
          登录
        </Button>
        <View className={styles.loginRegister} onClick={this.pathToRegister}>
          新账户注册
        </View>
      </Form>
    );
  }

  render() {
    return (
      <View className={styles.loginPage}>
        <AtMessage />
        {this.renderTopText()}
        {this.renderLoginForm()}
      </View>
    );
  }
}
