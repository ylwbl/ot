import request from '@/utils/request';

/**
 * @name getUdcList
 * @param data 
 * @returns 
 */
export const getList = (data) => {
  return request('/api/testcasedetail/search', {
    method: 'post',
    query: data
  });
};

/**
 * searchUdcById
 * @param id 
 * @returns 
 */
export const searchUdcById = (id) => {
  return request(`/yst-system/sys/codes/${id}`, {
    method: 'get'
  });
};

/**
 * createUdc
 * @param data 
 * @returns 
 */
export const save = (data) => {
  return request('/api/testcase', {
    method: 'post',
    query: data
  });
};

/**
 * updateUdc
 * @param data 
 * @returns 
 */
export const updateUdc = (data) => {
  return request('/yst-system/sys/codes', {
    method: 'put',
    query: data
  });
};

/**
 * deleteUdcBatch
 * @param data 
 * @returns 
 */
export const deleteUdcBatch = (data) => {
  return request('/yst-system/sys/codes/idinbatch', {
    method: 'delete',
    query: data
  });
};
