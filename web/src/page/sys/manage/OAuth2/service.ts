import request from '@/utils/request';

/**
 * @name getClientList
 * @param data 
 * @returns 
 */
export const getClientList = (data) => {
  return request('/auth/oauth2/details/q', {
    method: 'post',
    query: data
  });
};

/**
 * @name searchClientById
 * @param id 
 * @returns 
 */
export const searchClientById = (id) => {
  return request(`/auth/oauth2/details/${id}`, {
    method: 'get'
  });
};

/**
 * @name createClient
 * @param data 
 * @returns 
 */
export const createClient = (data) => {
  return request('/auth/oauth2/details', {
    method: 'post',
    query: data
  });
};

/**
 * @name updateClient
 * @param data 
 * @returns 
 */
export const updateClient = (data) => {
  return request('/auth/oauth2/details', {
    method: 'put',
    query: data
  });
};

/**
 * @name deleteClient
 * @param id 
 * @returns 
 */
export const deleteClient = (id) => {
  return request(`/auth/oauth2/details/${id}`, {
    method: 'delete'
  });
};
