### 整合Taro+Dva.js 
公司新启动一个小程序项目，由于不想使用小程序原生开发，于是找到了京东的Taro，并加入了dva.js <br> 
项目描述：该项目整合了Taro+Dva.js。也避免以后开发新开发小程序的时候再重新集成dva,相当于一个已经集成dva的taro脚手架。<br>
Taro版本：2.0

#### 安装tarojs/cli
参照Taro官网,建议安装2.2.6版本的taro/cli，3.0版本刚出，有不稳定性，同时在做项目的时候3.0还没出。<br>
```javascript
npm install -g @tarojs/cli
```
或
```javascript
yarn global add @tarojs/cli
```
#### 安装依赖
因为这个项目我是先在原生小程序里的先创建了个模板，然后用Taro自带的小程序转Taro工具转成Taro的，所有目录里会有 `taroConvert`这层目录，这个目录里是由原生小程序转化为Taro后的代码，之后用Taro开发全部在这个目录里进行，安装依赖也进入这个目录。
```javascript
cd taroConvert
npm install
```
### 启动编译小程序
```javascript
npm run dev:weapp
```
在mac环境下跑可能会遇见跑失败的情况，注意运行是会显示的Taro版本（有个外星人图标，版本号就在外星人图标后面，很明显），如果是3.0版本的，建议安装2.6.2版本，（其他2.0版本没尝试过。2.0的应都可以）。<br>
如果是 `command not found:trao` 运行：
```javascript
sudo npm i -g @tarojs/cli@2.2.6 --unsafe-perm=true --allow-root
```
升级3.0版本Taro后续有空了会研究升级。

### 用小程序导入dist目录，即可在微信开发者工具看到运行效果

#### 其他
因为这个壳子是为了给公司项目搭建的，里面也封装好了一些基本的东西，比如已经封装了request请求。加入了Eslint规范。加入了`WxValidate`表单验证，示例详见`register.js`。示例包含了请求和 另外结合公司实际业务封装了地区选择组件。全局字段的设置与获取。快速生成模板。模板文件为`template，js` 使用：`npm run tem comName`，运行后会在`page`目录下生成一个名为comName的文件夹包含了page，css,service,model。同时model目录下的`index.js`也会把刚才创建的model引入，避免手动引入的麻烦。表单验证提交和request请求发送在`login`和`register`页面做了比较详细的书写。由于没有做mock，实际使用时，按照代码描述把注释掉的代码放出来即可。 

##### 有待完善的地方大家可以指出
