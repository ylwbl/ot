import request from '@/utils/request';

/**
 * @name getList
 * @param data 
 * @returns 
 */
export const getList = (data) => {
  return request('/yst-system/sys/settings/q', {
    method: 'post',
    query: data
  });
};

/**
 * @name searchById
 * @param id 
 * @returns 
 */
export const searchById = (id) => {
  return request(`/yst-system/sys/settings/byid/${id}`, {
    method: 'get'
  });
};

/**
 * @name create
 * @param data 
 * @returns 
 */
export const create = (data) => {
  return request('/yst-system/sys/settings', {
    method: 'post',
    query: data
  });
};

/**
 * @name update
 * @param data 
 * @returns 
 */
export const update = (data) => {
  return request('/yst-system/sys/settings', {
    method: 'put',
    query: data
  });
};

/**
 * @name deleteBatch
 * @param data 
 * @returns 
 */
export const deleteBatch = (data) => {
  return request('/yst-system/sys/settings/byids', {
    method: 'delete',
    query: data
  });
};
