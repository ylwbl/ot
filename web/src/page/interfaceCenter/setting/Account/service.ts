import request from '@/utils/request';
export const getAccountList = (data) => {
  return request('/sync-svr/auth/list', {
    method: 'post',
    query: data
  });
};

export const saveAccount = (data) => {
  return request('/sync-svr/auth', {
    method: 'post',
    query: data
  });
};

// export const deleteAccount = (id) => {
//   return request(`/sync-svr/http/${id}`, {
//     method: 'delete'
//   });
// };
