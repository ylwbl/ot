import React from 'react';
import { Spin } from 'antd';
import './styles.less';

/**
 * @interface Props
 * @param spinning?: boolean;
 * @param children: React.ReactNode;
 */
interface Props {
  spinning?: boolean;
  children: React.ReactNode;
}

/**
 * @name ElPage
 * @description 页面组件
 */
// todo
class ElPage extends React.Component<Props, {}> {
  static defaultProps = {
    spinning: false
  };
  render() {
    return (
      <Spin spinning={this.props.spinning} wrapperClassName='elPage'>
        {this.props.children}
      </Spin>
    );
  }
}
export default ElPage;
