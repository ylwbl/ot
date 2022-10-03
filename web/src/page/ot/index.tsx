import React from 'react';
import { Row, Col, Spin, Button } from 'antd';
import {JsonView, CommandList} from './components';

import cls from 'classnames';


interface Props {
  history: any;
}
interface State {
  loading: boolean;
  config: any;
  commandList: any[];
}
export default class Dashboard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      config: {
        aaa:1,
        bbb:2
      },
      commandList: []
    };
  }
  componentDidMount() {
  }
  
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <div className='page-config'>
          <Row className='page-config-container'>
            <Col span={5} className='page-sider'>
              <JsonView config={this.state.config}/>
            </Col>
            <Col
              span={14}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
                <Button type='primary'>新增命令</Button>
                <CommandList config={this.state.config} data={this.state.commandList}/>
            </Col>
            <Col span={5} className='props-editor'>
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}
