/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run tep test');
  process.exit(0);
}

// 页面模版
const indexTep = `import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import styles from './index.module.scss';

@connect(({${dirName}}) => ({
  ...${dirName},
}))
export default class ${titleCase(dirName)} extends Component {
  config = {
    navigationBarTitleText: '${dirName}',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className={styles.${dirName}Page}>
        ${dirName}
      </View>
    )
  }
}
`;

// scss文件模版
const scssTep = `.${dirName}Page {
}
`;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';

export default {
  namespace: '${dirName}',
  state: {

  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(${dirName}Api.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
`;

// service页面模版
const serviceTep = `import Request from '@/utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};
`;

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`${dirName}.js`, indexTep);
fs.writeFileSync('index.module.scss', scssTep);
fs.writeFileSync('model.js', modelTep);
fs.writeFileSync('service.js', serviceTep);

// eslint-disable-next-line no-console
console.log(`模版${dirName}已创建,请手动增加models`);

const modelStr = `import ${dirName}  from '@/pages/${dirName}/model';`;
const data = fs.readFileSync('../../model/index.js', 'utf8').split('\n');
data.splice(0, 0, modelStr); // 引入新的model
const datalast = data[data.length - 2];
const lastIndex = datalast.lastIndexOf(']');
const newdataLast =
  datalast.slice(0, lastIndex) + `,${dirName}` + datalast.slice(lastIndex);
data[data.length - 2] = newdataLast; // 再原export的基础上，export出新引入的model
fs.writeFileSync('../../model/index.js', data.join('\n'), 'utf8');

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] =
      array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

process.exit(0);
