import request from '@/utils/request';
export const getCurrentUserMenu = () => {
  return request('/yst-system/sys/users/current/menus', {
    method: 'get'
  });
};
export const getCurrentUserAction = () => {
  return request('/yst-system/sys/users/current/actions', {
    method: 'get'
  });
};
export const getCurrentUserCurrentPageAction = (menuId) => {
  return request(`/yst-system/sys/users/current/menus/${menuId}`, {
    method: 'get'
  });
};
export const changePassword = (data) => {
  return request('/yst-system/sys/users/changep', {
    method: 'put',
    query: data
  });
};
