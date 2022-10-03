import request from '@/utils/request';

/**
 * @name getTemplateList
 * @param data 
 * @returns 
 */
export const getTemplateList = (data) => {
  return request('/coordinator/el-fsm-service/api/tmpl/search', {
    method: 'post',
    query: data
  });
};

/**
 * @name getTemplateCategoryList
 * @returns 
 */
export const getTemplateCategoryList = () => {
  return request(`/coordinator/el-fsm-service/api/tmpl/category/query`, {
    method: 'get'
  });
};

/**
 * @name searchTemplateById
 * @param id 
 * @returns 
 */
export const searchTemplateById = (id) => {
  return request(`/coordinator/el-fsm-service/api/tmpl/${id}`, {
    method: 'get'
  });
};

/**
 * @name createTemplate
 * @param data 
 * @returns 
 */
export const createTemplate = (data) => {
  return request('/coordinator/el-fsm-service/api/tmpl', {
    method: 'post',
    query: data
  });
};

/**
 * @name updateTemplate
 * @param data 
 * @returns 
 */
export const updateTemplate = (data) => {
  return request(`/coordinator/el-fsm-service/api/tmpl/${data.id}`, {
    method: 'put',
    query: data
  });
};

/**
 * @name deleteTemplate
 * @param id 
 * @returns 
 */
export const deleteTemplate = (id) => {
  return request(`/coordinator/el-fsm-service/api/tmpl/${id}`, {
    method: 'delete'
  });
};

/**
 * @name triggerActive
 * @param id 
 * @returns 
 */
export const triggerActive = (id) => {
  return request(`/coordinator/el-fsm-service/api/tmpl/${id}/enabled`, {
    method: 'PATCH'
  });
};
