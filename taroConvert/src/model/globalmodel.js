import * as globalAPI from '../service/globalAPI';

export default {
  namespace: 'globalModel',
  state: { list: [] },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveMore(state, { payload: list }) {
      return { ...state, list: [...state.list, ...list] };
    },
  },
  effects: {
    *appletopenid({ payload, callback }, { call }) {
      const response = yield call(globalAPI.getOpenId, payload);
      if (callback) callback(response);
    },

    *getUserData({ payload, callback }, { call }) {
      const response = yield call(globalAPI.userInfo, payload);
      if (callback) callback(response);
    },
  },
};
