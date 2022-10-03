import React from 'react';
import {
  getEditForm,
  getBaseEditForm,
  getActionButtons,
  getDealMenuAction
} from './config';
import {
  getMenuTree,
  triggerRoleActive,
  saveDataRole,
  getDataById
} from './service';
import { FormInstance, Row, Col, Spin } from 'antd';
import {
  ElForm,
  ElNotification,
  ElCard,
  ElRowContainer
} from '@/components/el';
import { SearchTree } from '@/components/el/ItemComponent';
import { isEmpty } from 'ramda';
import './style.less';
interface State {
  formRef: FormInstance;
  advanceFormRef: FormInstance;
  baseFormRef: FormInstance;
  formData: any;
  baseFormData: any;
  advanceFormData: any;
  selectedNode: any;
  treeData: Array<any>;
  selectedKeys: any;
  saveRoleLoading: boolean;
  roletriggerLoading: boolean;
  isEdit: boolean;
  treeDataIndex: number;
  sysDataRoleAdvancedAuth: any[];
  pageLoading: boolean;
}
class DataRoleDetail extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      formRef: null,
      baseFormRef: null,
      advanceFormRef: null,
      formData: {},
      baseFormData: {},
      advanceFormData: {},
      selectedNode: {},
      treeData: [],
      selectedKeys: [],
      saveRoleLoading: false,
      roletriggerLoading: false,
      isEdit: false,
      treeDataIndex: 0,
      sysDataRoleAdvancedAuth: [],
      pageLoading: false
    };
  }
  async componentDidMount() {
    await this.getMenuTree();
    await this.initFormData();
  }
  setStateAsync(state) {
    return new Promise((resolve: any) => {
      this.setState(state, resolve);
    });
  }
  initFormData = async () => {
    if (!this.props.match.params.id) {
      this.setState({
        formData: {
          enabled: true,
          advancedEnable: false
        },
        baseFormData: {
          buCustomize: [],
          empAuthEnable: false,
          empCustomizeEnable: false,
          empCustomize: [],
          buAuthEnable: false,
          buCustomizeEnable: false,
          ouAuthEnable: false,
          ouCustomize: []
        }
      });
    } else {
      const res = await getDataById(this.props.match.params.id);
      if (res.success) {
        this.setState({
          formData: {
            id: res.data.id,
            code: res.data.code,
            name: res.data.name,
            enabled: res.data.enabled,
            advancedEnable: res.data.advancedEnable
          },
          baseFormData: this.handleDataTransfer(res.data.sysDataRoleBasicAuth, true),
          sysDataRoleAdvancedAuth: res.data.sysDataRoleAdvancedAuth
        });
      }
    }
    this.setState({
      pageLoading: false
    });
  };
  getMenuTree = async () => {
    this.setState({
      pageLoading: true
    });
    const res = await getMenuTree();
    if (res.success) {
      this.setState({
        treeData: res.data,
        treeDataIndex: this.state.treeDataIndex + 1
      });
    }
  };
  handleSave = async () => {
    await this.tempSave();
    const { baseFormRef, formRef } = this.state;
    const roleData = formRef ? await formRef.validateFields() : {};
    const baseData = baseFormRef ? baseFormRef.getFieldsValue() : {};
    const saveData = {
      id: this.props.match.params.id || null,
      ...roleData,
      sysDataRoleBasicAuth: this.handleFormTransfer(baseData, true),
      sysDataRoleAdvancedAuth: roleData.advancedEnable
        ? this.state.sysDataRoleAdvancedAuth
        : null
    };
    const res = await saveDataRole(this.cleanData(saveData));
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '保存成功'
      });
      if (!this.props.match.params.id) {
        this.props.store.MultiTabMobx.closeCurrentToPath(
          `/sys/administration/dataroledetail/edit/${res.data}`
        );
      }
      // this.props.store.MultiTabMobx.closeCurrentToPath(
      //   '/sys/administration/datarole'
      // );
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  cleanData = (data) => {
    if (!data.advancedEnable) {
      delete data.sysDataRoleAdvancedAuth;
    } else {
      data.sysDataRoleAdvancedAuth =
        data.sysDataRoleAdvancedAuth &&
          Array.isArray(data.sysDataRoleAdvancedAuth)
          ? data.sysDataRoleAdvancedAuth
            .filter((v) => {
              if (v.isPermitAll || v.empAuthEnable || v.buAuthEnable || v.ouAuthEnable) {
                return v;
              }
            })
            .map((v) => {
              if (!v.empAuthEnable) {
                delete v.empCustomize;
                v.empAuthScope = '';
              }
              if (!v.buAuthEnable) {
                delete v.buCustomize;
                v.buAuthScope = '';
              }
              if (!v.ouAuthEnable) {
                delete v.ouCustomize;
              }
              return v;
            })
          : [];
    }
    if (data.sysDataRoleBasicAuth) {
      if (!data.sysDataRoleBasicAuth.buAuthEnable) {
        delete data.sysDataRoleBasicAuth.buCustomize;
        data.sysDataRoleBasicAuth.buAuthScope = '';
      }
      if (!data.sysDataRoleBasicAuth.empAuthEnable) {
        delete data.sysDataRoleBasicAuth.empCustomize;
        data.sysDataRoleBasicAuth.empAuthScope = '';
      }
      if (!data.sysDataRoleBasicAuth.ouAuthEnable) {
        delete data.sysDataRoleBasicAuth.ouCustomize;
      }
    }
    return data;
  };
  handleTreeSelect = async (selectedKeys, e) => {
    this.setState({
      selectedKeys
    });
    if (!isEmpty(this.state.selectedNode)) {
      await this.tempSave();
    }
    if (e.selected) {
      this.state.advanceFormRef && this.state.advanceFormRef.resetFields();
      const selectedData = this.findAdvanceData(e.node.key);
      if (selectedData) {
        this.setState({
          selectedNode: e.node,
          advanceFormData: this.handleDataTransfer(selectedData, false)
        });
      } else {
        this.setState({
          selectedNode: e.node,
          advanceFormData: {
            buCustomize: [],
            empAuthEnable: false,
            empCustomizeEnable: false,
            empCustomize: [],
            buAuthEnable: false,
            buCustomizeEnable: false,
            ouAuthEnable: false,
            ouCustomize: [],
            permissionId: e.node.key,
            permissionCode: e.node.code
          }
        });
      }
    } else {
      this.setState({
        advanceFormData: {},
        selectedNode: {}
      });
    }
  };
  handleDataTransfer = (data, isBasic) => {
    const newData = {
      buAuthEnable: data.buAuthEnable,
      buCustomizeEnable: data.buCustomizeEnable,
      buAuthScope: data.buAuthScope,
      buCustomize: data.buCustomize
        ? data.buCustomize.map((v) => {
          return {
            id: v.secId,
            buName: v.secName,
            buCode: v.secCode
          };
        })
        : null,
      empAuthEnable: data.empAuthEnable,
      empCustomizeEnable: data.empCustomizeEnable,
      empAuthScope: data.empAuthScope,
      empCustomize: data.empCustomize
        ? data.empCustomize.map((v) => {
          return {
            id: v.secId,
            empName: v.secName,
            empCode: v.secCode
          };
        })
        : null,
      ouAuthEnable: data.ouAuthEnable,
      ouCustomize: data.ouCustomize
        ? data.ouCustomize.map((v) => {
          return {
            id: v.secId,
            ouName: v.secName,
            ouCode: v.secCode
          };
        })
        : null,
      isBasic: isBasic,
      isPermitAll: data.isPermitAll,
      permissionId: data.permissionId,
      permissionCode: data.permissionCode
    };
    return newData;
  };
  handleFormTransfer = (data, isBasic) => {
    const newData = {
      buAuthEnable: data.buAuthEnable,
      buCustomizeEnable: data.buCustomizeEnable,
      buAuthScope: data.buAuthScope,
      buCustomize: data.buCustomize
        ? data.buCustomize.map((v) => {
          return {
            secId: v.id,
            secName: v.buName,
            secCode: v.buCode
          };
        })
        : null,
      empAuthEnable: data.empAuthEnable,
      empCustomizeEnable: data.empCustomizeEnable,
      empAuthScope: data.empAuthScope,
      empCustomize: data.empCustomize
        ? data.empCustomize.map((v) => {
          return {
            secId: v.id,
            secName: v.empName,
            secCode: v.secCode
          };
        })
        : null,
      ouAuthEnable: data.ouAuthEnable,
      ouCustomize: data.ouCustomize
        ? data.ouCustomize.map((v) => {
          return {
            secId: v.id,
            secName: v.ouName,
            secCode: v.ouCode
          };
        })
        : null,
      isBasic: isBasic,
      isPermitAll: data.isPermitAll,
      permissionId: data.permissionId,
      permissionCode: data.permissionCode
    };
    return newData;
  };
  handleAdvanceDataSave = (data) => {
    const isExist = this.state.sysDataRoleAdvancedAuth.find(
      (v) => v.permissionId === data.permissionId
    );
    if (isExist) {
      return this.setStateAsync({
        sysDataRoleAdvancedAuth: this.state.sysDataRoleAdvancedAuth.map((v) => {
          if (v.permissionId === data.permissionId) {
            return {
              ...v,
              ...data
            };
          } else {
            return v;
          }
        })
      });
    } else {
      return this.setStateAsync({
        sysDataRoleAdvancedAuth: [...this.state.sysDataRoleAdvancedAuth, data]
      });
    }
  };
  findAdvanceData = (key) => {
    return this.state.sysDataRoleAdvancedAuth.find(
      (v) => v.permissionId === key
    );
  };
  triggerActive = async (selectedRowKeys) => {
    this.setState({
      roletriggerLoading: true
    });
    const res = await triggerRoleActive(selectedRowKeys[0]);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '切换成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      roletriggerLoading: false
    });
  };
  onCheckboxChange = (
    type: 'base' | 'advance',
    changeObj:
      | 'isPermitAll'
      | 'empAuthEnable'
      | 'buAuthEnable'
      | 'ouAuthEnable'
      | 'buCustomizeEnable'
      | 'empCustomizeEnable',
    checked: boolean
  ) => {
    if (type === 'base') {
      const data = this.state.baseFormData;
      data[changeObj] = checked;
      this.setState({
        baseFormData: data
      });
    } else {
      const data = this.state.advanceFormData;
      data[changeObj] = checked;
      this.setState({
        advanceFormData: data
      });
    }
  };
  tempSave = () => {
    const { advanceFormRef } = this.state;
    const data = advanceFormRef ? advanceFormRef.getFieldsValue() : null;
    if (!isEmpty(data)) {
      return this.handleAdvanceDataSave(
        this.handleFormTransfer(
          { ...this.state.advanceFormData, ...data },
          false
        )
      );
    }
  };
  render() {
    return (
      <>
        <Spin spinning={this.state.pageLoading}>
          <ElRowContainer
            blocks={getActionButtons({
              handleSave: this.handleSave
            })}
            position='top'
          />
          <ElCard title='数据角色信息'>
            <ElForm
              formProps={getEditForm(this.state.isEdit)}
              data={this.state.formData}
              onRef={(formRef) => this.setState({ formRef })}
            />
          </ElCard>
          <ElCard title='基础数据授权'>
            <ElForm
              formProps={getBaseEditForm({
                onCheckboxChange: this.onCheckboxChange,
                type: 'base',
                data: this.state.baseFormData
              })}
              data={this.state.baseFormData}
              onRef={(baseFormRef) => this.setState({ baseFormRef })}
            />
          </ElCard>
          <ElCard title='高级数据授权'>
            {true && (
              <Row>
                <Col span={5}>
                  <SearchTree
                    height={500}
                    virtual={false}
                    dataIndex={this.state.treeDataIndex}
                    selectedKeys={this.state.selectedKeys}
                    treeData={this.state.treeData}
                    onSelect={this.handleTreeSelect}
                  />
                </Col>
                <Col span={19} className='inbox-container'>
                  <ElForm
                    formProps={getBaseEditForm({
                      onCheckboxChange: this.onCheckboxChange,
                      type: 'advance',
                      data: this.state.advanceFormData
                    })}
                    data={this.state.advanceFormData}
                    onRef={(advanceFormRef) =>
                      this.setState({ advanceFormRef })
                    }
                  />
                </Col>
              </Row>
            )}
          </ElCard>
        </Spin>
      </>
    );
  }
}
export default DataRoleDetail;
