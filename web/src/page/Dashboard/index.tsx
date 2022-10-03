import React from 'react';
import { Row, Col, Spin } from 'antd';
import { Menu } from '@el-components/el-icons';
import SiderTab, { Tab } from './components/SiderTab';
import './style.less';
import { Text } from '@/components/el/ItemComponent';
import JsonView from './components/JsonView';
import OutLine from './components/OutLine';
import ComponentPanel from './components/ComponentPanel';
import PageEditor from './components/PageEditor';
import PropsPanel from './components/PropsPanel';
import cls from 'classnames';
import { strings } from '@/utils';
import SaveStack from './utils/SaveStack';
import Version from './components/Version';

interface Props {
  history: any;
}
interface State {
  activedTabCode: string;
  config: any;
  selectedBlock: any;
  activeComCode: string;
  saveStack: SaveStack;
  loading: boolean;
  way: Array<any>;
}
const tabs: Array<Tab> = [
  {
    title: '大纲',
    code: 'outline',
    icon: <Menu />
  },

  {
    title: '组件',
    code: 'component',
    icon: <Menu />
  },
  {
    title: '代码',
    code: 'code',
    icon: <Menu />
  },
  {
    title: '版本',
    code: 'version',
    icon: <Menu />
  },
  {
    title: '模型',
    code: 'modal',
    icon: <Menu />
  }
];
export default class Dashboard extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const pageGuid = strings.getGuId();
    this.state = {
      activedTabCode: 'outline',
      config: {
        type: 'page',
        name: 'page',
        i: pageGuid,
        children: [
          {
            i: 'form',
            x: 0,
            y: 0,
            w: 24,
            h: 6,
            type: 'container',
            name: '容器1',
            component: 'form',
            children: [
              {
                i: 'aa',
                x: 0,
                y: 0,
                w: 6,
                h: 2,
                type: 'component',
                name: '输入框1',
                component: 'input'
              },
              {
                i: 'bb',
                x: 6,
                y: 0,
                w: 6,
                h: 2,
                type: 'component',
                name: '输入框2',
                component: 'input'
              },
              {
                i: 'cc',
                x: 12,
                y: 0,
                w: 6,
                h: 2,
                type: 'component',
                name: '输入框3',
                component: 'input'
              },
              {
                i: 'dd',
                x: 18,
                y: 0,
                w: 6,
                h: 2,
                type: 'component',
                name: '输入框4',
                component: 'input'
              }
            ]
          }
        ]
      },
      selectedBlock: pageGuid,
      activeComCode: 'page',
      saveStack: null,
      loading: false,
      way: []
    };
  }
  componentDidMount() {
    this.initSaveStack(this.state.config);
  }
  initSaveStack = (initVersion) => {
    this.setState({
      saveStack: new SaveStack(initVersion, 10)
    });
  };
  moveStack = (offset: number) => {
    return this.state.saveStack.move(offset);
  };
  pushStack = (config) => {
    return this.state.saveStack.push(config);
  };
  setLoading = (loading: boolean) => {
    this.setState({
      loading
    });
  };
  onTabChange = (v: Tab) => {
    this.setState({
      activedTabCode: v.code
    });
  };
  setActiveComCode = (activeComCode, async: boolean = true) => {
    if (async) {
      this.setState({
        activeComCode
      });
    } else {
      return new Promise((resolve) => {
        this.setState(
          {
            activeComCode
          },
          () => {
            resolve(1);
          }
        );
      });
    }
  };
  setConfig = (config, async: boolean = true) => {
    if (async) {
      this.setState(
        {
          config
        },
        () => {}
      );
    } else {
      return new Promise((resolve) => {
        this.setState(
          {
            config
          },
          () => {
            resolve(1);
          }
        );
      });
    }
  };
  getConfig = () => {
    return this.state.config;
  };
  setSelectedBlock = (selectedBlock, async: boolean = true) => {
    if (async) {
      this.setState({
        selectedBlock
      });
    } else {
      return new Promise((resolve) => {
        this.setState(
          {
            selectedBlock
          },
          () => {
            resolve(1);
          }
        );
      });
    }
  };
  setShortestWay = (way) => {
    this.setState({
      way
    });
  };
  checkoutVersion = (code) => {};
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <button
          onClick={() => {
            this.props.history.push('/pageRender/1/1');
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            this.props.history.push('/pageRender/1/2');
          }}
        >
          2
        </button>
        <div className='page-config'>
          <Row className='page-config-container'>
            <Col span={5} className='page-sider'>
              <div className='sider-toolbar'>
                <SiderTab tabs={tabs} onTabChange={this.onTabChange} />
              </div>
              <div className='sider-panel'>
                {/**这里的切换考虑需要加入动画  todo */}
                {this.state.activedTabCode === 'component' && (
                  <ComponentPanel />
                )}
                {this.state.activedTabCode === 'code' && (
                  <JsonView config={this.state.config} />
                )}
                {this.state.activedTabCode === 'outline' && (
                  <OutLine
                    config={this.state.config}
                    setActiveComCode={this.setActiveComCode}
                    setSelectedBlock={this.setSelectedBlock}
                  />
                )}
                {this.state.activedTabCode === 'version' && <Version />}
              </div>
            </Col>
            <Col
              span={14}
              onClick={(e) => {
                e.stopPropagation();
                this.setSelectedBlock(this.state.config.i);
                this.setActiveComCode('page');
                this.setShortestWay([]);
              }}
              className={cls('page-editor', 'unSelected-container', {
                'selected-container':
                  this.state.selectedBlock === this.state.config.i
              })}
            >
              <PageEditor
                setSelectedBlock={this.setSelectedBlock}
                setActiveComCode={this.setActiveComCode}
                selectedBlock={this.state.selectedBlock}
                config={this.state.config}
                setConfig={this.setConfig}
                setLoading={this.setLoading}
                setShortestWay={this.setShortestWay}
              />
            </Col>
            <Col span={5} className='props-editor'>
              <PropsPanel
                way={this.state.way}
                selectedBlock={this.state.selectedBlock}
                activeComCode={this.state.activeComCode}
                setActiveComCode={this.setActiveComCode}
                config={this.state.config}
                setConfig={this.setConfig}
                history={this.props.history}
                setLoading={this.setLoading}
                moveStack={this.moveStack}
                pushStack={this.pushStack}
              />
              {/* {this.state.config.map((v) => {
              return <Text value={v.value} key={v.value} />;
            })} */}
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}
