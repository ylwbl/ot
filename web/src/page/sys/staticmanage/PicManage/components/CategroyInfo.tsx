import React from 'react';
import { Card, List } from 'antd';
const CategoryInfo = ({ categoryData }) => {
  return (
    <Card title='详细信息' size='small'>
      <List
        size='small'
        itemLayout='horizontal'
        dataSource={[
          {
            title: '分类代码',
            description: 'code'
          },
          {
            title: '分类名称',
            description: 'name'
          },
          {
            title: '分类描述',
            description: 'description'
          },
          {
            title: '图片数量',
            description: 'numPicture'
          },
          {
            title: '图片大小',
            description: 'sizeName'
          }
        ]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={categoryData.data[item.description]}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CategoryInfo;
