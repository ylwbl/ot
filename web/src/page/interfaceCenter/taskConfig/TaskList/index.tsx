import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getTestColumns,
  getTestButtons
} from './config';
import { getTaskList, startTask, startTaskOnce } from './service';
import {
  ElNotification,
  ElSearchTable,
  ElCard,
  ElEditTable
} from '@/components/el';
import { Modal, Input, Alert } from 'antd';
interface State {
  tableRef: any;
  startLoading: boolean;
  triggerLoading: boolean;
  selectedTask: string;
  visible: boolean;
  editTableRef: any;
  bodyTestParam: string;
}
class TaskList extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      startLoading: false,
      triggerLoading: false,
      selectedTask: '',
      visible: false,
      editTableRef: null,
      bodyTestParam: ''
    };
  }
  handleCreate = () => {
    this.props.history.push('/interface/taskconfig/nodeList/new');
  };
  handleEdit = (selectedRowKeys: any) => {
    this.props.history.push(
      `/interface/taskconfig/nodeList/${selectedRowKeys[0]}`
    );
  };
  startTask = async (selectedRowKeys) => {
    this.setState({
      startLoading: true
    });
    const res = await startTask(selectedRowKeys[0]);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '启动成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      startLoading: false
    });
  };
  startTaskOnce = (selectedRowKeys) => {
    this.setState({
      selectedTask: selectedRowKeys[0],
      visible: true
    });
  };
  handleStartTaskOnce = async () => {
    this.setState({
      triggerLoading: true
    });
    const { editTableRef } = this.state;
    editTableRef.quitEditState(async () => {
      const resp = await editTableRef.validateTableRows();
      if (resp.success) {
        const res = await startTaskOnce(
          this.state.selectedTask,
          resp.data,
          this.state.bodyTestParam
        );
        if (res.success) {
          ElNotification({
            type: 'success',
            message: '执行成功'
          });
        } else {
          ElNotification({
            type: 'error',
            message: res.msg
          });
        }
        this.setState({
          triggerLoading: false
        });
      }
    });
  };
  onClose = () => {
    this.state.editTableRef && this.state.editTableRef.clearRows();
    this.setState({
      visible: false
    });
  };
  addRow = (type: string) => {
    this.state.editTableRef && this.state.editTableRef.addRow({});
  };
  deleteRow = (type: string, selectedRowKeys) => {
    this.state.editTableRef &&
      this.state.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  };
  onBodyTestParamChange = (e) => {
    this.setState({
      bodyTestParam: e.target.value
    });
  };
  render() {
    return (
      <>
        <Modal
          visible={this.state.visible}
          title='测试接口'
          width='1000px'
          onOk={this.handleStartTaskOnce}
          onCancel={this.onClose}
        >
          <Alert
            message='两者选一即可,都填写情况下以body参数为准'
            type='info'
          />
          <ElCard title='body参数'>
            <Input.TextArea
              maxLength={4096}
              value={this.state.bodyTestParam}
              onChange={this.onBodyTestParamChange}
            ></Input.TextArea>
          </ElCard>
          <ElCard title='form参数'>
            <ElEditTable
              actionButtons={getTestButtons({
                addRow: this.addRow,
                deleteRow: this.deleteRow
              })}
              tableId='interface-testInfo-edittable'
              onRef={(editTableRef) => {
                this.setState({
                  editTableRef
                });
              }}
              columns={getTestColumns()}
            />
          </ElCard>
        </Modal>
        <ElSearchTable
          tableId='sys_interfaceCenter_taskList'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            startTask: this.startTask,
            startTaskOnce: this.startTaskOnce,
            startLoading: this.state.startLoading,
            triggerLoading: this.state.triggerLoading
          })}
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getTaskList(paramData);
            },
            successCallBack: (tableRef) => {
              // this.setState({
              //   tableRef
              // });
            },
            errCallBack: () => {
              console.log('err');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },

            autoLoad: true
          }}
        />
      </>
    );
  }
}
export default TaskList;
