/*
**
全局变量 内部字段自行打印查看,
本类只提供设置和获取全局变量字段的方法
**
*/
const globalData = {};
function setGlobalData(key, val) {
  globalData[key] = val;
}
function getGlobalData(key) {
  if (!key) return globalData;
  return globalData[key];
}

export { setGlobalData, getGlobalData };
