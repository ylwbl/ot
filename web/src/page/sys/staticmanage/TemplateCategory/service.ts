import request from '@/utils/request';
export const getTemplateCategoryList = (data) => {
  return request('/coordinator/el-fsm-service/api/tmpl/category/search', {
    method: 'post',
    query: data
  });
};

export const searchCategoryById = (id) => {
  return request(`/yst-system/sys/codes/${id}`, {
    method: 'get'
  });
};

export const createCategory = (data) => {
  return request('/coordinator/el-fsm-service/api/tmpl/category', {
    method: 'post',
    query: data
  });
};
export const updateCategory = (data) => {
  return request(`/coordinator/el-fsm-service/api/tmpl/category/${data.id}`, {
    method: 'put',
    query: data
  });
};
export const deleteCategoryBatch = (data) => {
  return request('/coordinator/el-fsm-service/api/tmpl/category/batch', {
    method: 'delete',
    query: data
  });
};
