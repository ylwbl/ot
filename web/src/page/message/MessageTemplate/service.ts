import request from '@/utils/request';
export const getUdcList = (data) => {
  return request('/coordinator/el-mms-service/api/ms/msTemplate/search', {
    method: 'post',
    query: data
  });
};

export const searchUdcById = (id) => {
  return request(
    `/coordinator/el-mms-service/api/ms/msTemplate/findIdOne/${id}`,
    {
      method: 'get'
    }
  );
};

export const createUdc = (data) => {
  return request('/coordinator/el-mms-service/api/ms/msTemplate/createOne', {
    method: 'post',
    query: data
  });
};
export const updateUdc = (data) => {
  return request('/coordinator/el-mms-service/api/ms/msTemplate/update', {
    method: 'put',
    query: data
  });
};
