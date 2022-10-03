import request from '@/utils/request';
export const getMenuTree = () => {
  // return request('/coordinator/el-mms-service/api/ms/msTopic/search', {
  //   method: 'post',
  //   query: data
  // });
  return Promise.resolve({
    success: true,
    data: [
      {
        key: 'asd',
        title: 'asd',
        value: 'asd',
        children: [
          {
            key: 'asdf',
            title: 'asdf',
            value: 'asdf',
            children: [
              {
                key: 'asdfg',
                title: 'asdfg',
                value: 'asdfg'
              }
            ]
          }
        ]
      }
    ]
  })
};
export const getMenuById = (key) => {
  // return request('/coordinator/el-mms-service/api/ms/msTopic/search', {
  //   method: 'post',
  //   query: data
  // });
  return Promise.resolve({
    success: true,
    data: {
      id: '123-456-789',
      pId: '',
      key: 'key1',
      name: 'name1',
      pattern: '/'
    }
  })
};
