import request from '@/utils/request';

/**
 * getRoleList
 * @param data 
 * @returns 
 */
export const getRoleList = (data) => {
  return request('/yst-system/sys/data/roles/paging', {
    method: 'post',
    query: data
  });
};

/**
 * getMenuOrActionById
 * @param id 
 * @returns 
 */
export const getMenuOrActionById = (id) => {
  return request(`/yst-system/sys/permissions/actionsbymenu/${id}`, {
    method: 'get'
  });
};

/**
 * triggerRoleActive
 * @param data 
 * @returns 
 */
export const triggerRoleActive = (data) => {
  return request(`/yst-system/sys/data/roles/status/switch/batch`, {
    method: 'post',
    query: data
  });
};
