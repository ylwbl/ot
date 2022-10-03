import request from '@/utils/request';

export const getMenuTree = () => {
  return request('/yst-system/sys/permissions/menutree', {
    method: 'get'
  });
};
export const triggerRoleActive = (id) => {
  return request(`/yst-system/sys/roles/${id}`, {
    method: 'put'
  });
};
export const saveDataRole = (data) => {
  return request(`/yst-system/sys/data/roles/save`, {
    method: 'post',
    query: data
  });
};
export const getDataById = (id) => {
  return request(`/yst-system/sys/data/roles/details/${id}`, {
    method: 'get'
  });
};
