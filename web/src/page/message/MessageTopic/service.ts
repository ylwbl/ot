import request from '@/utils/request';
export const getUdcList = (data) => {
  return request('/coordinator/el-mms-service/api/ms/msTopic/search', {
    method: 'post',
    query: data
  });
};

export const searchUdcById = (id) => {
  return request(`/coordinator/el-mms-service/api/ms/msTopic/findIdOne/${id}`, {
    method: 'get'
  });
};

export const createUdc = (data) => {
  return request('/coordinator/el-mms-service/api/ms/msTopic/createOne', {
    method: 'post',
    query: data
  });
};
export const updateUdc = (data) => {
  return request('/coordinator/el-mms-service/api/ms/msTopic/update', {
    method: 'put',
    query: data
  });
};
