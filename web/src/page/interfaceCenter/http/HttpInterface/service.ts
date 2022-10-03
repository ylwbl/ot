import request from '@/utils/request';
export const getHttpList = (data) => {
  return request('/sync-svr/http/search', {
    method: 'post',
    query: data
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
export const testInterface = (id, tableData, bodyParam) => {
  return request(`/sync-svr/http/${id}/trigger`, {
    method: 'post',
    query: {
      keyValueList: tableData,
      jsonBody: bodyParam
    }
  });
};
