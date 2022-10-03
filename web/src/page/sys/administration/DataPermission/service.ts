import request from '@/utils/request';

/**
 * getUserList
 * @param data
 * @returns
 */
export const getMetadataList = (data) => {
  return request('/yst-metadata/meta/columns/q', {
    method: 'post',
    query: data
  });
};

/**
 * getUserById
 * @param id
 * @returns
 */
export const getColumnById = (id) => {
  return request(`/yst-metadata/meta/columns/${id}`, {
    method: 'get'
  });
};

/**
 * batchSave
 * @param data
 * @returns
 */
export const batchSave = (data) => {
  return request('/yst-metadata/meta/columns/whole', {
    method: 'post',
    query: data
  });
};

/**
 * updateColumn
 * @param data
 * @returns
 */
export const updateColumn = (data) => {
  return request('/yst-metadata/meta/columns/update', {
    method: 'put',
    query: data
  });
};

/**
 * getSchemaList
 * @returns
 */
export const getSchemaList = () => {
  return request('/yst-infoschema/infoschema/tables/q/allschema', {
    method: 'post',
    query: {}
  });
};

/**
 * getTableList
 * @returns
 */
export const getTableList = (schema: string) => {
  return request(`/yst-infoschema/infoschema/tables/q/${schema}`, {
    method: 'post',
    query: {}
  });
};

/**
 * getFieldList
 * @returns
 */
export const getFieldList = (schema: string, table: string) => {
  return request(`/yst-infoschema/infoschema/columns/q/${schema}/${table}`, {
    method: 'post',
    query: {}
  });
};
