import request from '@/utils/request';

/**
 * getList
 * @param data 
 * @param albumId 
 * @returns 
 */
export const getList = (data, albumId?) => {
  if (albumId) {
    return request(
      `/coordinator/el-fsm-service/api/gallery/picture/${albumId}/search`,
      {
        method: 'post',
        query: data
      }
    );
  } else {
    return request(`/coordinator/el-fsm-service/api/gallery/picture/search`, {
      method: 'post',
      query: data
    });
  }
};

/**
 * searchById
 * @param id 
 * @returns 
 */
export const searchById = (id) => {
  return request(`/coordinator/el-fsm-service/api/gallery/picture/${id}`, {
    method: 'get'
  });
};

/**
 * create
 * @param data 
 * @returns 
 */
export const create = (data) => {
  return request('/coordinator/el-fsm-service/api/gallery/album', {
    method: 'post',
    query: data
  });
};

/**
 * update
 * @param data 
 * @returns 
 */
export const update = (data) => {
  return request('/coordinator/el-fsm-service/api/gallery/album/{id}', {
    method: 'put',
    query: data
  });
};

/**
 * deleteOne
 * @param id 
 * @returns 
 */
export const deleteOne = (id) => {
  return request(`/coordinator/el-fsm-service/api/gallery/album/${id}`, {
    method: 'delete'
  });
};

/**
 * 获取分类列表
 * @name getCategoryList
 * @returns 
 */
export const getCategoryList = () => {
  return request(`/coordinator/el-fsm-service/api/gallery/album/query`, {
    method: 'post'
  });
};

/**
 * @name createCategory
 * @param data 
 * @returns 
 */
export const createCategory = (data) => {
  return request('/coordinator/el-fsm-service/api/gallery/album', {
    method: 'post',
    query: data
  });
};

/**
 * updateCategory
 * @param data 
 * @returns 
 */
export const updateCategory = (data) => {
  return request(`/coordinator/el-fsm-service/api/gallery/album/${data.id}`, {
    method: 'put',
    query: data
  });
};

/**
 * getCategoryById
 * @param id 
 * @returns 
 */
export const getCategoryById = (id) => {
  return request(`/coordinator/el-fsm-service/api/gallery/album/${id}`, {
    method: 'get'
  });
};

/**
 * deleteCategoryById
 * @param id 
 * @returns 
 */
export const deleteCategoryById = (id) => {
  return request(`/coordinator/el-fsm-service/api/gallery/album/${id}`, {
    method: 'delete'
  });
};

/**
 * 获取详情的信息
 * @name getDetailInfo
 * @param type 
 * @param data 
 * @returns 
 */
export const getDetailInfo = (type: 'all' | 'category' | 'pic', data) => {
  if (type === 'all' || type === 'category') {
    return getCategoryById(data.category);
  } else {
    return searchById(data.pic);
  }
};

/**
 * 获取标签的list
 * @name getTagList
 * @returns 
 */
export const getTagList = () => {
  return request(`/coordinator/el-fsm-service/api/gallery/label/query`, {
    method: 'get'
  });
};

/**
 * 保存图片信息
 * @name savePicInfos
 * @param data 
 * @returns 
 */
export const savePicInfos = (data) => {
  return request('/coordinator/el-fsm-service/api/gallery/picture', {
    method: 'post',
    query: data
  });
};

/**
 * 修改图片信息
 * @name updatePicInfos
 * @param data 
 * @param albumId 
 * @returns 
 */
export const updatePicInfos = (data, albumId) => {
  return request(`/coordinator/el-fsm-service/api/gallery/picture/${albumId}`, {
    method: 'put',
    query: data
  });
};

/**
 * 查看图片详细信息
 * @name getPicInfoById
 * @param id 
 * @returns 
 */
export const getPicInfoById = (id) => {
  return request(`/coordinator/el-fsm-service/api/gallery/picture/${id}`, {
    method: 'get'
  });
};

/**
 * 批量改变图片分类
 * @name changeCategory
 * @param data 
 * @param albumId 
 * @returns 
 */
export const changeCategory = (data, albumId) => {
  return request(
    `/coordinator/el-fsm-service/api/gallery/picture/album/${albumId}`,
    {
      method: 'PATCH',
      query: data
    }
  );
};

/**
 * 批量删除图片
 * @name deletePics
 * @param data 
 * @returns 
 */
export const deletePics = (data) => {
  return request(`/coordinator/el-fsm-service/api/gallery/picture/delete`, {
    method: 'delete',
    query: data
  });
};
