import PropTypes from 'prop-types';
import Taro, { Component } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import cityData from '@/utils/city-data';
import { stringJoin, deepCopy } from '@/utils/wxutils';

import styles from './index.module.scss';

export default class Register extends Component {
  static propTypes = {
    onGetArea: PropTypes.func.isRequired,
  };

  constructor() {
    super(...arguments);

    const selectorValue = [0, 0, 0];
    const range = this.reCalculateAreaData(selectorValue);
    const selectorRealValue = deepCopy(selectorValue);
    this.state = {
      rangeData: range,
      selectorValue,
      selectorRealValue,
      selectText: '请选择',
    };
  }

  reCalculateAreaData(selectorValue) {
    const range = [];
    let temp = [];
    for (let i = 0; i < cityData.length; i++) {
      temp.push(cityData[i].name);
    }
    range.push(temp);
    temp = [];
    for (let i = 0; i < cityData[selectorValue[0]].city.length; i++) {
      temp.push(cityData[selectorValue[0]].city[i].name);
    }
    range.push(temp);
    temp = [];
    for (
      let i = 0;
      i < cityData[selectorValue[0]].city[selectorValue[1]].district.length;
      i++
    ) {
      temp.push(cityData[selectorValue[0]].city[selectorValue[1]].district[i]);
    }
    range.push(temp);
    return range;
  }

  onColumnChange(e) {
    const { rangeData: rangeTemp, selectorValue: valueTemp } = this.state;
    let column = e.detail.column; // 列
    let row = e.detail.value; // 行
    valueTemp[column] = row;
    // eslint-disable-next-line default-case
    switch (column) {
      case 0: // 改变省级
        let cityTemp = [];
        let districtTemp = [];
        for (let i = 0; i < cityData[row].city.length; i++) {
          cityTemp.push(cityData[row].city[i].name); // 第二列市： 取当前省对应的全部市级
        }
        for (let i = 0; i < cityData[row].city[0].district.length; i++) {
          districtTemp.push(
            cityData[row].city[0].district[i] // 第三列区：默认第一个市的全部县区
          );
        }
        valueTemp[1] = 0; // 改变省的时候，讲市区值置为第一个市的第一个区
        valueTemp[2] = 0;
        rangeTemp[1] = cityTemp; // 省改变的时候重新给第二列市赋值
        rangeTemp[2] = districtTemp; // 省改变的时候重新给第三列区县赋值
        break;
      case 1: // 改变市级
        let districtTemp2 = [];
        for (
          let i = 0;
          i < cityData[valueTemp[0]].city[row].district.length;
          i++
        ) {
          districtTemp2.push(cityData[valueTemp[0]].city[row].district[i]);
        }
        valueTemp[2] = 0;
        rangeTemp[2] = districtTemp2;
        break;
      case 2: // 改变区县
        break;
    }

    this.setState({
      rangeData: rangeTemp,
      selectorValue: valueTemp,
    });
  }

  handlePickerChange(e) {
    // 点击确定
    const { onGetArea } = this.props;
    const { rangeData } = this.state;
    const value = e.target.value;
    const provinceText = rangeData[0][value[0]];
    const cityText = rangeData[1][value[1]];
    const districtText = rangeData[2][value[2]];
    const selectText = stringJoin('-', provinceText, cityText, districtText);
    const areaArr = [];
    if (provinceText) areaArr.push(provinceText);
    if (cityText) areaArr.push(cityText);
    if (districtText) areaArr.push(districtText);
    if (onGetArea) onGetArea(areaArr);
    const selectorRealValue = deepCopy(value);
    this.setState({
      selectorValue: value,
      selectText,
      selectorRealValue,
    });
  }

  resSetPicker() {
    // 点击取消或者关闭遮罩时重置定位到已选择省市区
    const { selectorRealValue } = this.state;
    const selectorValue = deepCopy(selectorRealValue);
    const range = this.reCalculateAreaData(selectorValue);
    this.setState({
      selectorValue,
      rangeData: range,
    });
  }

  render() {
    const { rangeData, selectorValue, selectText } = this.state;
    const { name } = this.props;
    return (
      <View className={styles.pickerView}>
        <Picker
          mode='multiSelector'
          range={rangeData}
          value={selectorValue}
          onChange={this.handlePickerChange}
          onCancel={this.resSetPicker}
          onColumnChange={this.onColumnChange}
          name={name}
        >
          <View
            className={
              selectText === '请选择'
                ? styles.pickerNoVlaue
                : styles.pickerVlaue
            }
          >
            {selectText}
          </View>
        </Picker>
      </View>
    );
  }
}
