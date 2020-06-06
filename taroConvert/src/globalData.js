const globalData = {};
function setGlobalData(key, val) {
  globalData[key] = val;
}
function getGlobalData(key) {
  if (!key) return globalData;
  return globalData[key];
}

export { setGlobalData, getGlobalData };
