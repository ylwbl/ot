import React from 'react';
import ReactJson from 'react-json-view';
import { List } from 'antd';
interface Props {
  config: any;
  data: any;
}
function JsonView({ config, data }: Props) {
  return (
    <div>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <div>{{item}}</div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default JsonView;
