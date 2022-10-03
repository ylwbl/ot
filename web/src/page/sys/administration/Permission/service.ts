import request from '@/utils/request';

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
 * getMenuById
 * @param id 
 * @returns 
 */
export const getMenuById = (id) => {
  return request(`/yst-system/sys/permissions/${id}`, {
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
 * createMenu
 * @param data 
 * @returns 
 */
export const createMenu = (data) => {
  return request(`/yst-system/sys/permissions/newmenu`, {
    method: 'post',
    query: data
  });
};

/**
 * createAction
 * @param data 
 * @returns 
 */
export const createAction = (data) => {
  return request(`/yst-system/sys/permissions/newaction`, {
    method: 'post',
    query: data
  });
};

/**
 * updateMenuOrAction
 * @param data 
 * @returns 
 */
export const updateMenuOrAction = (data) => {
  return request(`/yst-system/sys/permissions`, {
    method: 'put',
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
 * deleteMenuOne
 * @param id 
 * @returns 
 */
export const deleteMenuOne = (id) => {
  return request(`/yst-system/sys/permissions/menu/remove/${id}`, {
    method: 'delete'
  });
};

/**
 * deleteActions
 * @param ids 
 * @returns 
 */
export const deleteActions = (ids) => {
  return request(`/yst-system/sys/permissions/action/remove/batch`, {
    method: 'delete',
    query: ids
  });
};
