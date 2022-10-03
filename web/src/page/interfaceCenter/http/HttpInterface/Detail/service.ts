import request from '@/utils/request';
export const httpGroupSelect = () => {
  return request('/sync-svr/select/httpGroup', {
    method: 'get'
  });
};
export const accountSelect = () => {
  return request('/sync-svr/select/syncAuth', {
    method: 'get'
  });
};

export const saveHttp = (data) => {
  return request('/sync-svr/http', {
    method: 'post',
    query: data
  });
};

export const deleteHttp = (id) => {
  return request(`/sync-svr/http/${id}`, {
    method: 'delete'
  });
};
export const getHttpById = (id) => {
  return request(`/sync-svr/http/${id}`, {
    method: 'get'
  });
};
