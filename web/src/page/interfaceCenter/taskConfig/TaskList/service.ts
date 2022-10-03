import request from '@/utils/request';
export const getTaskList = (data) => {
  return request('/sync-svr/task/taskDAGList', {
    method: 'post',
    query: data
  });
};

export const startTask = (id) => {
  return request(`/sync-svr/task/start/${id}`, {
    method: 'post'
  });
};
export const startTaskOnce = (id, tableData, bodyParam) => {
  return request(`/sync-svr/task/trigger/${id}`, {
    method: 'post',
    query: {
      keyValueList: tableData,
      jsonBody: bodyParam
    }
  });
};
