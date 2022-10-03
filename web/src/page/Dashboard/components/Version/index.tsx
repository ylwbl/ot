import React from 'react';
import { Timeline, Dropdown, Menu } from 'antd';
import './style.less';

const menu = (code, isNow) => {
  return (
    <Menu>
      {!isNow && (
        <Menu.Item
          key='checkout'
          onClick={(e) => {
            console.log(code);
            console.log(e);
          }}
        >
          切换到此版本
        </Menu.Item>
      )}
    </Menu>
  );
};
class Version extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       activeVersionCode: ''
  //     };
  //   }
  render() {
    return (
      <div>
        <Timeline>
          <Timeline.Item color='blue'>
            <Dropdown overlay={menu('create', false)} trigger={['contextMenu']}>
              <div className='version-card'>
                <p>xxx</p>
                <p>2015-09-01 12:00:00</p>
                <p>创建初始版本1.0.0</p>
              </div>
            </Dropdown>
          </Timeline.Item>
          <Timeline.Item color='green'>
            <Dropdown overlay={menu('create', true)} trigger={['contextMenu']}>
              <div className='version-card'>
                <p>xxx</p>
                <p>2015-09-01 12:00:01</p>
                <p>添加了xxxx功能</p>
              </div>
            </Dropdown>
          </Timeline.Item>
        </Timeline>
      </div>
    );
  }
}
export default Version;
