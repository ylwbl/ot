import React, { useState } from 'react';
import {
  Button,
  Input,
  Tabs,
  Tooltip,
  Row,
  Col,
  Card,
  Collapse,
  Modal
} from 'antd';
const { Panel } = Collapse;
import ComCard from '../ComCard';
import ComMap from '@/ComMap';
import { ElCard, ElForm } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { Refresh, Delete, Eye, Save } from '@el-components/el-icons';
const comMap = new ComMap();
import './style.less';
import { clone } from 'ramda';
const { TabPane } = Tabs;

import {
  getPageBtnConfig,
  getCmptBtnConfig,
  getComEditor,
  getSaveFormConfig,
  getPublishFormConfig
} from './config';

/**
 * 生成按钮组
 * @param buttonConfig
 * @returns
 */
function buttonGroupRender(buttonConfig: Array<any>) {
  return (
    <Row gutter={5} className='button-group'>
      {buttonConfig.map((item) => {
        const { id, danger, icon, onClick, info, disabled, loading } = item;
        return (
          <Col
            span={12}
            // xs={24}
            className='button-group-cell'
            key={id}
          >
            <Tooltip overlay={info} mouseEnterDelay={1}>
              <Button
                type='default'
                size='small'
                icon={icon}
                disabled={disabled}
                loading={loading}
                onClick={onClick}
                // ghost
                block
                className='button-group-btn'
              />
            </Tooltip>
          </Col>
        );
      })}
    </Row>
  );
}

interface Props {
  selectedBlock: string;
  activeComCode: string;
  setActiveComCode: Function;
  config: any;
  setConfig: Function;
  history: any;
  moveStack: Function;
  pushStack: Function;
  setLoading: Function;
  way: Array<any>;
}
interface State {
  leftDisabled: boolean;
  rightDisabled: boolean;
  formRef: any;
  comInfo: any;
  activeComCode: string;
  saveVisible: boolean;
  publishVisible: boolean;
}
//属性区
class PropsPanel extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      formRef: null,
      leftDisabled: true,
      rightDisabled: true,
      activeComCode: 'page',
      comInfo: {
        name: '页面容器'
      },
      saveVisible: false,
      publishVisible: false
    };
  }
  componentDidMount() {}
  static getDerivedStateFromProps(nextProps, prevState) {
    // 这里获取对应的activeComCode的组件信息并设置
    // 这里需要从config中拿出当前的配置,并显示在表单内
    if (
      nextProps.activeComCode &&
      nextProps.activeComCode !== prevState.activeComCode
    ) {
      return {
        //
        comInfo: comMap.getPureInfo(nextProps.activeComCode)
      };
    }
    return null;
  }
  componentDidUpdate(nextProps) {
    if (nextProps.selectedBlock !== this.props.selectedBlock) {
      this.state.formRef && this.state.formRef.resetFields();
    }
  }
  changeStack = (offset: number) => {
    const result = this.props.moveStack(offset);
    if (result.success) {
      this.setState({
        leftDisabled: result.isFirst,
        rightDisabled: result.isLast
      });
      console.log(result.data);
      this.props.setConfig(result.data);
    }
  };
  pushStack = (config) => {
    const result = this.props.pushStack(config);
    console.log(result);
    if (result.success) {
      this.setState({
        leftDisabled: result.isFirst,
        rightDisabled: result.isLast
      });
    }
  };
  getComProps = () => {
    console.log(this.getActiveConfig());
    return this.getActiveConfig();
  };
  getActiveConfig = () => {
    let config = this.props.config;
    this.props.way.forEach((v) => {
      config = config.children[v];
    });
    return config;
  };
  setSaveVisible = (saveVisible: boolean) => {
    this.setState({
      saveVisible
    });
  };
  setPublishVisible = (publishVisible: boolean) => {
    this.setState({
      publishVisible
    });
  };
  render() {
    return (
      <>
        <Modal
          visible={this.state.saveVisible}
          onCancel={() => {
            this.setSaveVisible(false);
          }}
        >
          <ElCard>
            <ElForm formProps={getSaveFormConfig()}></ElForm>
          </ElCard>
        </Modal>
        <Modal
          visible={this.state.publishVisible}
          onCancel={() => {
            this.setPublishVisible(false);
          }}
        >
          <ElCard>
            <ElForm formProps={getSaveFormConfig()}></ElForm>
          </ElCard>
        </Modal>
        <div className='propsPanel propsPanel-operation'>
          {buttonGroupRender(
            getPageBtnConfig({
              selectedBlock: this.props.selectedBlock,
              config: this.props.config,
              setConfig: this.props.setConfig,
              formRef: this.state.formRef,
              history: this.props.history,
              changeStack: this.changeStack,
              pushStack: this.pushStack,
              leftDisabled: this.state.leftDisabled,
              rightDisabled: this.state.rightDisabled,
              getActiveConfig: this.getActiveConfig,
              setSaveVisible: this.setSaveVisible,
              setPublishVisible: this.setPublishVisible
            })
          )}
        </div>
        <div className='propsPanel propsPanel-prop'>
          <Card
            title={`${this.state.comInfo.name || 'x'} - ${
              this.props.selectedBlock
            }`}
            size='small'
          >
            <Collapse
              className='propsPanel-prop-collapse'
              defaultActiveKey='1'
              expandIconPosition='right'
              ghost
            >
              <Panel className='propsPanel-prop-panel' header='属性' key='1'>
                <ElForm
                  data={this.getComProps()}
                  formProps={getComEditor(this.state.comInfo)}
                  onRef={(formRef) => {
                    this.setState({
                      formRef
                    });
                  }}
                />
              </Panel>
              <Panel className='propsPanel-prop-panel' header='操作' key='2'>
                {buttonGroupRender(
                  getCmptBtnConfig(
                    this.props.selectedBlock,
                    this.props.config,
                    this.props.setConfig
                  )
                )}
              </Panel>
            </Collapse>
          </Card>
        </div>
      </>
    );
  }
}

export default PropsPanel;
