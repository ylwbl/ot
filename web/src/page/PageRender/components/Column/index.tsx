import React from 'react';
import { Col } from 'antd';

interface Props {
  span?: any;
  height?: number;
  children?: any;
}
class Column extends React.Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Col
        span={this.props.span || 24}
        style={{ height: `${30 * this.props.height}px` }}
      >
        {this.props.children}
      </Col>
    );
  }
}
export default Column;
