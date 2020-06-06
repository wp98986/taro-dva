import Request from '@/utils/request';

const getOpenId = (param = {}) => {
  const queryParam = JSON.stringify(param);
  return Request(
    {
      url: 'site/wx/appletopenid',
      method: 'GET',
      param: { queryParam },
    },
    true
  );
};

const userInfo = (param = {}) => {
  return Request(
    {
      url: 'site/staff/currentinfo',
      method: 'GET',
      param,
    },
    true
  );
};

const API = {
  getOpenId,
  userInfo,
};

module.exports = API;
