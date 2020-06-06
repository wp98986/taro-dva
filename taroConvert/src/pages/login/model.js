import * as loginApi from './service';

export default {
  namespace: 'login',
  state: {},

  effects: {
    *loginHandle({ payload, callback }, { call }) {
      const response = yield call(loginApi.login, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
