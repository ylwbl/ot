import request from '@/utils/request';
export const getLogList = (data) => {
  return request('/sync-svr/log/search', {
    method: 'post',
    query: data
  });
};

export const clearLog = () => {
  return request(`/sync-svr/log/deleteAll`, {
    method: 'delete'
  });
};
