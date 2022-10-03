import request from '@/utils/request';

/**
 * getUserList
 * @param data 
 * @returns 
 */
export const getUserList = (data) => {
  return request('/yst-system/sys/users/paging', {
    method: 'post',
    query: data
  });
};

/**
 * getUserById
 * @param id 
 * @returns 
 */
export const getUserById = (id) => {
  return request(`/yst-system/sys/users/details/${id}`, {
    method: 'get'
  });
};

/**
 * createUser
 * @param data 
 * @returns 
 */
export const createUser = (data) => {
  return request('/yst-system/sys/users', {
    method: 'post',
    query: data
  });
};

/**
 * updateUser
 * @param data 
 * @returns 
 */
export const updateUser = (data) => {
  return request('/yst-system/sys/users', {
    method: 'put',
    query: data
  });
};

/**
 * getAllRoleList
 * @returns 
 */
export const getAllRoleList = () => {
  return request('/yst-system/sys/roles/all', {
    method: 'get'
  });
};

/**
 * triggerUserActive
 * @param id 
 * @returns 
 */
export const triggerUserActive = (id) => {
  return request(`/yst-system/sys/users/${id}`, {
    method: 'put'
  });
};

/**
 * triggerUserActiveBatch
 * @param ids 
 * @param active 
 * @returns 
 */
export const triggerUserActiveBatch = (ids, active) => {
  return request(`/yst-system/sys/users/${active}`, {
    method: 'put',
    query: ids
  });
};

/**
 * changePassword
 * @param userId 
 * @param password 
 * @returns 
 */
export const changePassword = (userId) => {
  return request(`/yst-system/sys/users/reset/pwd/${userId}`, {
    method: 'put'
  });
};

/**
 * getDataRoles
 * @returns 
 */
export const getDataRoles = () => {
  return request('/yst-system/sys/data/roles/select', {
    method: 'get'
  });
};

/**
 * getWorkflowRoles
 * @returns 
 */
export const getWorkflowRoles = () => {
  return request('/yst-system/sys/flow/roles/select', {
    method: 'get'
  });
};
