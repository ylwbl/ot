import React from 'react';
import DataDistribution from './components/DataDistribution';
import { Row, Col } from 'antd';
import Input from '@/components/lowCode/Input';
import DataCenter from './components/DataCenter';
import ComMap from '../../ComMap';
import Column from './components/Column';
import './style.less';
// const DemoText = ({ distributionData }: any) => {
//   return <span>{distributionData}</span>;
// };
class DemoText extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: '1234'
    };
  }

  render() {
    return <span>{this.props.distributeData}</span>;
  }
}
const comMap = new ComMap();
class PageRender extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'page',
        name: 'page',
        i: '123',
        children: [
          {
            i: 'form',
            x: 0,
            y: 0,
            w: 24,
            h: 6,
            type: 'container',
            component: 'form',
            children: [
              {
                i: 'aa',
                x: 0,
                y: 0,
                w: 6,
                h: 2,
                type: 'component',
                component: 'input'
              },
              {
                i: 'bb',
                x: 6,
                y: 0,
                w: 6,
                h: 2,
                type: 'component',
                component: 'input'
              },
              {
                i: 'cc',
                x: 12,
                y: 0,
                w: 6,
                h: 2,
                type: 'component',
                component: 'input'
              },
              {
                i: 'dd',
                x: 18,
                y: 0,
                w: 6,
                h: 2,
                type: 'component',
                component: 'input'
              }
            ]
          }
        ]
      }
    };
  }
  componentDidMount() {
    // this.initConfig();
    console.log(111);
  }
  initConfig() {
    this.setState({});
  }
  childrenRender(children) {
    if (!children) {
      return <>loading</>;
    }
    if (!Array.isArray(children)) {
      return undefined;
    }
    return children.map((v) => {
      if (v.type === 'container') {
        return (
          <Column span={v.w} height={v.h} key='container'>
            <Row gutter={[16, 16]}>{this.childrenRender(v.children)}</Row>
          </Column>
        );
      } else {
        return (
          <Column span={v.w} height={v.h} key={v.i}>
            <DataDistribution code={v.code} useAction={true}>
              {this.componentRender(v)}
            </DataDistribution>
          </Column>
        );
      }
    });
  }
  componentRender = (v) => {
    const comInfo = comMap.getPureInfo(v.component);
    return comInfo.component || <span>未找到{comInfo.name}组件</span>;
  };
  render() {
    return (
      <DataCenter api={this.state.config?.api}>
        <div className='page'>
          <Row gutter={[16, 16]}>
            {this.childrenRender(this.state.config.children)}
          </Row>
        </div>
      </DataCenter>
    );
  }
}

export default PageRender;
