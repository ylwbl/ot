import request from '@/utils/request';
export const getGroupList = (data) => {
  return request('/sync-svr/httpGroup/search', {
    method: 'post',
    query: data
  });
};

export const saveGroup = (data) => {
  return request('/sync-svr/httpGroup', {
    method: 'post',
    query: data
  });
};

export const deleteGroup = (id) => {
  return request(`/sync-svr/httpGroup/${id}`, {
    method: 'delete'
  });
};
