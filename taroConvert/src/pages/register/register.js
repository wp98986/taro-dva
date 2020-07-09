import Taro, { Component } from '@tarojs/taro';
import { View, Input, Form, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import WxValidate from '@/utils/WxValidate';
import { AtMessage } from 'taro-ui';
import AreaSelect from '@/components/AreaSelect';

import FormItem from './FormItem';
import styles from './index.module.scss';

@connect(({ register }) => ({
  ...register,
}))
export default class Register extends Component {
  componentDidShow = () => {
    this.initValidate();
  };

  config = {
    navigationBarTitleText: '账户注册',
  };

  initValidate() {
    let rules = {
      orgName: {
        required: true,
      },
      area: {
        required: true,
      },
      name: {
        required: true,
      },
      contactMobile: {
        required: true,
        tel: true,
      },
      vercode: {
        required: true,
      },
      pwd: {
        required: true,
        minlength: 8,
      },
      pwd2: {
        required: true,
        minlength: 8,
        equalTo: 'pwd',
      },
    };
    let message = {
      orgName: {
        required: '请填写企业名称',
      },
      area: {
        required: '请选择地区',
      },
      name: {
        required: '请输入联系人姓名',
      },
      contactMobile: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
      },
      vercode: {
        required: '请输入验证码',
      },
      pwd: {
        required: '请输入密码',
        minlength: '密码至少8位',
      },
      pwd2: {
        required: '请重复输入密码',
        minlength: '密码至少8位',
        equalTo: '两次密码不一致',
      },
    };
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  }

  setAreaHandle = (value) => {
    this.setState({
      area: value,
    });
  };

  onSubmit(e) {
    const { area } = this.state;
    const formValue = e.detail.value;
    formValue.area = area;
    // 表单校验
    if (!this.WxValidate.checkForm(formValue)) {
      const error = this.WxValidate.errorList[0];
      Taro.atMessage({
        message: `${error.msg}`,
        type: 'error',
      });
      return false;
    }
    // 正式使用时恢复本段注释
    // const { dispatch } = this.props;
    // const { userName, userPwd } = formValue;
    // const queryParam = { ...formValue };
    // console.log(queryParam);

    // dispatch({
    //   type: 'register/registerdemo',
    //   payload: queryParam,
    //   callback: (res) => {
    //     const {
    //       data: { code, message },
    //     } = res;
    //     if (code === '203') {
    // 注册成功
    Taro.navigateTo({
      url: '/pages/register/registerSuccess',
    });
    //     } else {
    //       Taro.atMessage({
    //         message,
    //         type: 'error',
    //       });
    //     }
    //   },
    // });
  }

  renderRegisterForm() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <FormItem label='企业名称'>
          <Input
            className={styles.registerInput}
            placeholderClass={styles.placeholderColor}
            name='orgName'
            placeholder='请输入企业名称'
          />
        </FormItem>
        <FormItem label='所在省市区'>
          <AreaSelect name='area' onGetArea={this.setAreaHandle} />
        </FormItem>
        <FormItem label='联系人'>
          <Input
            className={styles.registerInput}
            placeholderClass={styles.placeholderColor}
            name='name'
            placeholder='请输入联系人'
          />
        </FormItem>
        <FormItem label='手机号'>
          <View className={styles.mobilePhneContainer}>
            <Input
              className={styles.mobilePhneInput}
              placeholderClass={styles.placeholderColor}
              name='contactMobile'
              placeholder='请输入手机号'
              type='number'
            />
            <Button className={styles.verificationBtn}>获取验证码</Button>
          </View>
        </FormItem>
        <FormItem label='验证码'>
          <Input
            className={styles.registerInput}
            placeholderClass={styles.placeholderColor}
            name='vercode'
            placeholder='请输入获取的6位验证码'
            type='number'
          />
        </FormItem>
        <FormItem label='设置密码'>
          <Input
            className={styles.registerInput}
            placeholderClass={styles.placeholderColor}
            name='pwd'
            placeholder='请设置登录密码'
            password
          />
        </FormItem>
        <FormItem label='确认密码'>
          <Input
            className={styles.registerInput}
            placeholderClass={styles.placeholderColor}
            name='pwd2'
            placeholder='重复输入登录密码'
            password
          />
        </FormItem>

        <Button FormType='submit' className={styles.registerBtn}>
          提交注册
        </Button>
      </Form>
    );
  }

  render() {
    return (
      <View className={styles.registerPage}>
        <AtMessage />
        {this.renderRegisterForm()}
      </View>
    );
  }
}
