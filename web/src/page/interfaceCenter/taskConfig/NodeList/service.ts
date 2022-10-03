import request from '@/utils/request';
export const getTaskList = (data) => {
  return request('/yst-system/sys/flow/roles/paging', {
    method: 'post',
    query: data
  });
};

export const saveTask = (data) => {
  return request('/sync-svr/task/taskDAG', {
    method: 'post',
    query: data
  });
};

export const getAuthList = () => {
  return request(`/sync-svr/select/syncAuth`, {
    method: 'get'
  });
};
export const getHttpList = () => {
  return request(`/sync-svr/select/http`, {
    method: 'get'
  });
};
export const getSDKList = () => {
  return request('/sync-svr/select/sdkService', {
    method: 'get'
  });
};
export const getBridgeList = () => {
  return request('/sync-svr/select/bridge', {
    method: 'get'
  });
};
export const getTaskById = (id) => {
  return request(`/sync-svr/task/taskDAG?id=${id}`, {
    method: 'get'
  });
};
