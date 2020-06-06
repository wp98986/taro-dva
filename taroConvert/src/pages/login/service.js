import Request from '@/utils/request';

const login = (param = {}) => {
  const queryParam = JSON.stringify(param);
  return Request(
    {
      url: 'site/login',
      method: 'POST',
      param: { queryParam },
    },
    true
  );
};

const API = {
  login,
};

module.exports = API;
