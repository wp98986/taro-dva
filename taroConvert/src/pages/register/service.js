import Request from '@/utils/request';

const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

const demo2 = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export { demo, demo2 };
