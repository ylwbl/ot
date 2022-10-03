import React from 'react';
import {
  getTableColumns,
  getActionButtons,
  getTaskEditForm,
  getContainerButtons,
  getNodeEditForm
} from './config';
import { saveTask, getTaskById } from './service';
import { FormInstance, Modal, Spin } from 'antd';
import {
  ElForm,
  ElSearchTable,
  ElNotification,
  ElRowContainer,
  ElCard
} from '@/components/el';
import { isEmpty } from 'ramda';

interface State {
  visible: boolean;
  formRef: FormInstance;
  formData: any;
  tableRef: any;
  saveLoading: boolean;
  isEdit: boolean;
  dataSource: Array<any>;
  basicFormRef: any;
  basicFormData: any;
  syncTerminal: string;
  pageLoading: boolean;
}
class TaskNode extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formRef: null,
      formData: {},
      tableRef: null,
      saveLoading: false,
      isEdit: false,
      dataSource: [],
      basicFormRef: null,
      basicFormData: {},
      syncTerminal: '',
      pageLoading: false
    };
  }
  componentDidMount() {
    // console.log(this.props.store.MultiTabMobx.closeCurrentToPath('/interface/taskconfig/taskList'));
    this.getTaskById();
  }
  getTaskById = async () => {
    if (this.props.match.params.id !== 'new') {
      this.setState({
        pageLoading: true
      });
      const res = await getTaskById(this.props.match.params.id);
      if (res.success) {
        this.setState({
          basicFormData: res.data,
          dataSource: res.data.nodeList
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        pageLoading: false
      });
    }
  };
  randomId = () => {
    var t = '1234567890',
      a = t.length,
      n = '';
    for (let i = 0; i < 18; i++) {
      n += t.charAt(Math.floor(Math.random() * a));
    }
    return n;
  };
  handleCreate = () => {
    this.setState({
      visible: true,
      formData: {},
      isEdit: false
    });
  };
  handleEdit = (selectedRows: any) => {
    this.state.formRef.resetFields();
    console.log(selectedRows);
    this.setState({
      visible: true,
      formData: {
        ...selectedRows[0]
      },
      isEdit: true
    });
  };
  getNodesSelect = () => {
    return this.state.dataSource.map((v) => {
      return {
        label: v.name,
        value: v.id,
        id: v.id
      };
    });
  };
  getParentName = (nodeIdList) => {
    const nodes = this.getNodesSelect();
    if (!nodeIdList || nodeIdList.length === 0) {
      return '/';
    }
    return nodes
      .filter((v) => nodeIdList.includes(v.value))
      .map((j) => j.label)
      .toString();
  };
  closeModal = () => {
    this.setState(
      {
        visible: false
      },
      () => {
        this.state.formRef.resetFields();
        this.state.tableRef.getTableData();
      }
    );
  };
  handleTaskSave = async () => {
    const { basicFormRef, tableRef, basicFormData } = this.state;
    const tableData = tableRef && tableRef.getRows();
    const formData = basicFormRef ? await basicFormRef.validateFields() : {};
    const saveData = {
      ...basicFormData,
      ...formData,
      nodeList: tableData
    };
    this.setState({
      saveLoading: true
    });
    const res = await saveTask(saveData);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '保存成功'
      });
      this.props.store.MultiTabMobx.closeCurrentToPath(
        '/interface/taskconfig/taskList'
      );
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      saveLoading: false
    });
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      if (!isEmpty(formData)) {
        data = {
          ...formData,
          ...data
        };
      }
      const isExist =
        data.id && this.state.dataSource.some((v) => data.id === v.id);
      if (isExist) {
        formRef.resetFields();
        this.setState({
          formData: {},
          visible: false,
          dataSource: this.state.dataSource.map((v) => {
            if (v.id === data.id) {
              return {
                ...v,
                ...data,
                parentNodes: data.parentNodes || [],
                accessTypeName: data.accessType?.label,
                accessType: data.accessType?.value,
                authName: data.authId?.label,
                authId: data.authId?.value,
                destinationIdentifier: data.destinationIdentifier?.value,
                destinationIdentifierName: data.destinationIdentifier?.label,
                parentName: this.getParentName(data.parentNodes)
              };
            } else {
              return v;
            }
          })
        });
      } else {
        formRef.resetFields();
        this.setState({
          formData: {},
          visible: false,
          dataSource: this.state.dataSource.concat({
            ...data,
            id: this.randomId(),
            parentNodes: data.parentNodes || [],
            accessTypeName: data.accessType?.label,
            accessType: data.accessType?.value,
            authName: data.authId?.label,
            authId: data.authId?.value,
            destinationIdentifier: data.destinationIdentifier?.value,
            destinationIdentifierName: data.destinationIdentifier?.label,
            parentName: this.getParentName(data.parentNodes)
          })
        });
      }
    }
  };
  onSyncTerminalChange = (value) => {
    this.setState({
      syncTerminal: value
    });
  };
  render() {
    return (
      <Spin spinning={this.state.pageLoading}>
        <Modal
          destroyOnClose={false}
          visible={this.state.visible}
          title='DAG任务节点维护'
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          // width='1200px'
          okText='保存'
        >
          <ElForm
            formProps={getNodeEditForm({
              getNodesSelect: this.getNodesSelect,
              syncTerminal: this.state.syncTerminal,
              onSyncTerminalChange: this.onSyncTerminalChange
            })}
            data={this.state.formData}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElRowContainer
          blocks={getContainerButtons({
            handleTaskSave: this.handleTaskSave,
            saveLoading: this.state.saveLoading
          })}
          position='top'
        />
        <ElCard title='基础信息'>
          <ElForm
            formProps={getTaskEditForm(this.state.isEdit)}
            data={this.state.basicFormData}
            onRef={(basicFormRef) => this.setState({ basicFormRef })}
          />
        </ElCard>
        <ElCard title='节点信息'>
          <ElSearchTable
            tableId='sys_interfaceCenter_nodeList'
            columns={getTableColumns()}
            actionButtons={getActionButtons({
              handleCreate: this.handleCreate,
              handleEdit: this.handleEdit
            })}
            onRef={(tableRef) => {
              this.setState({
                tableRef
              });
            }}
            mode={{
              proxy: false,
              search: false,
              action: true,
              pagination: false,
              descriptions: false,
              tabs: false
            }}
            pageSize={this.state.dataSource.length}
            dataSource={this.state.dataSource}
          />
        </ElCard>
      </Spin>
    );
  }
}
export default TaskNode;
