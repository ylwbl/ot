import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import GridItemBox from '../GridItemBox';
import { strings } from '@/utils';
import ComMap from '@/ComMap';
import { Row, Col, Input } from 'antd';
import cls from 'classnames';
import RowCol from '../RowCol';
import { clearScreenDown } from 'readline';
import { clone } from 'ramda';
import comRender from '../ComRender';
const ReactGridLayout = WidthProvider(RGL);
const comMap = new ComMap();
interface Props {
  // config: any;
  // setConfig: Function;
  setSelectedBlock: Function;
  selectedBlock?: any;
  config: any;
  setConfig: Function;
  setActiveComCode: Function;
  setLoading: Function;
  setShortestWay: Function;
}
interface State {}

class PageEditor extends React.Component<Props, State> {
  static defaultProps = {
    className: 'layout',
    items: 20,
    rowHeight: 30,
    // onLayoutChange: function () {},
    cols: 12
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  handleStart = (e) => {
    console.log(e);
  };
  handleDrag = (e) => {
    console.log(e);
  };
  handleStop = (e) => {
    console.log(e);
  };
  onDrop = (layout, layoutItem, _event, type, parentI) => {
    console.log(layout, layoutItem);
    if (type === 'page') {
      const code = _event.dataTransfer.getData('code');
      const comInfo = comMap.getWithLayout(code, layout, layoutItem);
      if (comInfo) {
        const config = this.props.config;
        config.children = config.children.concat(comInfo.layout);
        this.props.setConfig && this.props.setConfig(clone(config));
      } else {
        // 弹窗提醒未找到对应组件信息
      }
    } else {
      if (type === 'container') {
        const code = _event.dataTransfer.getData('code');
        const comInfo = comMap.getWithLayout(code, layout, layoutItem);
        if (comInfo) {
          if (comInfo.type === 'container') {
            // 警告容器内不能再拖入容器
          } else {
            // 这里更新config
            // 首先找到对应的容器 一定程度上先更新引用后深拷贝简化操作步骤
            const config = this.props.config;
            const parentContainer = config.children.find(
              (v) => v.i === parentI
            );
            parentContainer.children = parentContainer.children.concat(
              comInfo.layout
            );
            this.props.setConfig && this.props.setConfig(clone(config));
          }
        } else {
          // 弹窗提醒未找到对应组件信息
        }
      }
    }
  };
  onLayoutChange(layout, type) {
    console.log(layout);
    // this.props.onLayoutChange && this.props.onLayoutChange(layout);
  }
  layoutRender = () => {
    return (
      <div
        className={cls('unSelected-container', 'editor-container', {
          'selected-container': this.props.selectedBlock === this.props.config.i
        })}
      >
        <ReactGridLayout
          {...this.props}
          className='layout'
          cols={24}
          rowHeight={15}
          height='100%'
          width='100%'
          isDraggable={this.props.selectedBlock === this.props.config.i}
          isDroppable={this.props.selectedBlock === this.props.config.i}
          isResizable={false}
          onDrop={(layout, layoutItem, _event) =>
            this.onDrop(
              layout,
              layoutItem,
              _event,
              'page',
              'this.props.config.i'
            )
          }
          layout={this.props.config.children}
          onLayoutChange={(layout) => this.onLayoutChange(layout, 'page')}
        >
          {this.props.config.children.map((v, i) => {
            if (v.type === 'container') {
              return (
                <div
                  key={v.i}
                  className={cls('unSelected-container', {
                    'selected-container': this.props.selectedBlock === v.i
                  })}
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    this.props.setSelectedBlock(v.i);
                    this.props.setActiveComCode('container');
                    this.props.setShortestWay([i]);
                  }}
                >
                  <ReactGridLayout
                    {...this.props}
                    className='layout'
                    cols={24}
                    rowHeight={15}
                    height='100%'
                    width='100%'
                    isDraggable={this.props.selectedBlock === v.i}
                    isDroppable={this.props.selectedBlock === v.i}
                    isResizable={false}
                    onDrop={(layout, layoutItem, _event) =>
                      this.onDrop(layout, layoutItem, _event, v.type, v.i)
                    }
                    layout={v.children}
                    onLayoutChange={(layout) =>
                      this.onLayoutChange(layout, 'container')
                    }
                  >
                    {v.children &&
                      Array.isArray(v.children) &&
                      v.children.map((t, index) => {
                        return (
                          <div
                            key={t.i}
                            className={cls('unSelected-container', {
                              'selected-container':
                                this.props.selectedBlock === t.i
                            })}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            onDoubleClick={(e) => {
                              e.stopPropagation();
                              this.props.setSelectedBlock(t.i);
                              this.props.setActiveComCode(t.component);
                              this.props.setShortestWay([i, index]);
                            }}
                          >
                            {comRender(t)}
                          </div>
                        );
                      })}
                  </ReactGridLayout>
                </div>
              );
            } else {
              return (
                <div
                  key={v.i}
                  className={cls('unSelected-container', {
                    'selected-container': this.props.selectedBlock === v.i
                  })}
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    this.props.setSelectedBlock(v.i);
                    this.props.setActiveComCode(v.component);
                  }}
                >
                  {comRender(v)}
                </div>
              );
            }
          })}
        </ReactGridLayout>
      </div>
    );
  };
  render() {
    return <>{this.layoutRender()}</>;
  }
}
export default PageEditor;
