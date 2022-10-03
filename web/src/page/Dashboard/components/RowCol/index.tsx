import React from 'react';
import { Row, Col } from 'antd';
class RowCol extends React.Component<any> {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.layout);
    return (
      <Row>
        {this.props.layout.map((v) => {
          return (
            <Col span={v.w} key={v.i} style={{ height: v.h * 30 }}>
              1
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default RowCol;
