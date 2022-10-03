import request from '@/utils/request';
/**
 * getRoleList
 * @param data 
 * @returns 
 */
export const getRoleList = (data) => {
  return request('/yst-system/sys/roles/q', {
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
 * getActionByMenuId
 * @param id 
 * @returns 
 */
export const getActionByMenuId = (id) => {
  return request(`/yst-system/sys/permissions/actionsbymenu/${id}`, {
    method: 'get'
  });
};

/**
 * createRole
 * @param data 
 * @returns 
 */
export const createRole = (data) => {
  return request('/yst-system/sys/roles', {
    method: 'post',
    query: data
  });
};

/**
 * updateRole
 * @param data 
 * @returns 
 */
export const updateRole = (data) => {
  return request('/yst-system/sys/roles', {
    method: 'put',
    query: data
  });
};

/**
 * getMenuTree
 * @returns 
 */
export const getMenuTree = () => {
  return request('/yst-system/sys/permissions/menutree', {
    method: 'get'
  });
};

/**
 * getMenuCheck
 * @param id 
 * @returns 
 */
export const getMenuCheck = (id) => {
  return request(`/yst-system/sys/roles/${id}/menuids`, {
    method: 'get'
  });
};

/**
 * getActionCheck
 * @param id 
 * @returns 
 */
export const getActionCheck = (id) => {
  return request(`/yst-system/sys/roles/${id}/actionids`, {
    method: 'get'
  });
};

/**
 * getActionByRoleIdAndMenuId
 * @param roleId 
 * @param menuId 
 * @returns 
 */
export const getActionByRoleIdAndMenuId = (roleId, menuId) => {
  return request(`/yst-system/sys/roles/${roleId}/menus/${menuId}`, {
    method: 'get'
  });
};

/**
 * updateActionByRoleIdAndMenuId
 * @param roleId 
 * @param menuId 
 * @param data 
 * @returns 
 */
export const updateActionByRoleIdAndMenuId = (roleId, menuId, data) => {
  return request(`/yst-system/sys/roles/${roleId}/menus/${menuId}`, {
    method: 'post',
    query: data
  });
};

/**
 * triggerRoleActive
 * @param data 
 * @returns 
 */
export const triggerRoleActive = (data) => {
  return request(`/yst-system/sys/roles/status/switch/batch`, {
    method: 'post',
    query: data
  });
};
