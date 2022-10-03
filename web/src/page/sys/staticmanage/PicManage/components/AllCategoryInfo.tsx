import React from 'react';
import { Card, List } from 'antd';
const AllCategoryInfo = ({ categoryData }) => {
  console.log(categoryData);
  return (
    <Card title='详细信息' size='small'>
      <List
        size='small'
        itemLayout='horizontal'
        dataSource={[
          {
            title: ' 总图片数量',
            description: 'numPicture'
          },
          {
            title: '总图片大小',
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

export default AllCategoryInfo;
