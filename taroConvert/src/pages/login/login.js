import Taro, { Component } from '@tarojs/taro';
import { View, Input, Form, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtMessage } from 'taro-ui';

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
    const { dispatch } = this.props;
    const { userName, userPwd } = e.detail.value;
    const queryParam = { userName, userPwd };
    dispatch({
      type: 'login/loginHandle',
      payload: queryParam,
      callback: (res) => {
        const {
          data: { code, message },
        } = res;
        if (code === '203') {
          //
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
          type='text'
          placeholder='请输入账号'
        />
        <Input
          className={styles.loginInput}
          placeholderClass={styles.placeholderColor}
          name='userPwd'
          title='文本'
          type='password'
          placeholder='请输登录密码'
        />
        <View className={styles.loginForgetPwd}>忘记密码？</View>
        <Button FormType='submit' className={styles.loginBtn}>
          登录
        </Button>
        <View className={styles.loginRegister}>新账户注册</View>
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
