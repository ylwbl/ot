import request from '@/utils/request';

/**
 * getRoleList
 * @param data 
 * @returns 
 */
export const getRoleList = (data) => {
  return request('/yst-system/sys/flow/roles/paging', {
    method: 'post',
    query: data
  });
};

/**
 * saveRole
 * @param data 
 * @returns 
 */
export const saveRole = (data) => {
  return request('/yst-system/sys/flow/roles/save', {
    method: 'post',
    query: data
  });
};

/**
 * @name triggerRoleActive
 * @param data
 * @returns 
 */
export const triggerRoleActive = (data) => {
  return request(`/yst-system/sys/flow/roles/status/switch/batch`, {
    method: 'post',
    query: data
  });
};
