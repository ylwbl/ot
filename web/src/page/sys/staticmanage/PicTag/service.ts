import request from '@/utils/request';
export const getList = (data) => {
  return request('/coordinator/el-fsm-service/api/gallery/label/search', {
    method: 'post',
    query: data
  });
};

export const searchById = (id) => {
  return request(`/coordinator/el-fsm-service/api/gallery/label/${id}`, {
    method: 'get'
  });
};

export const create = (data) => {
  return request('/coordinator/el-fsm-service/api/gallery/label', {
    method: 'post',
    query: data
  });
};
export const update = (data) => {
  return request(`/coordinator/el-fsm-service/api/gallery/label/${data.id}`, {
    method: 'PATCH',
    query: data
  });
};
export const deleteOne = (id) => {
  return request(`/coordinator/el-fsm-service/api/gallery/label/${id}`, {
    method: 'delete'
  });
};
