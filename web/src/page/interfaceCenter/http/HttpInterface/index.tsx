import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getTestColumns,
  getTestButtons
} from './config';
import { getHttpList, deleteHttp, testInterface } from './service';
import {
  ElSearchTable,
  ElNotification,
  ElCard,
  ElEditTable
} from '@/components/el';
import { Modal, Alert, Input } from 'antd';
interface State {
  tableRef: any;
  deleteLoading: boolean;
  editTableRef: any;
  testLoading: boolean;
  selectedInterface: string;
  visible: boolean;
  bodyTestParam: string;
}
class HttpInterface extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      deleteLoading: false,
      editTableRef: null,
      testLoading: false,
      selectedInterface: '',
      visible: false,
      bodyTestParam: ''
    };
  }
  testInterface = async (selectedRowKeys) => {
    this.setState({
      selectedInterface: selectedRowKeys[0],
      visible: true
    });
  };
  handleTestInterface = async () => {
    const { editTableRef, selectedInterface } = this.state;
    if (editTableRef) {
      editTableRef.quitEditState(async () => {
        const resp = await editTableRef.validateTableRows();
        if (resp.success) {
          const tableData = resp.data;
          const res = await testInterface(
            selectedInterface,
            tableData,
            this.state.bodyTestParam
          );
          if (res.success) {
            ElNotification({
              type: 'success',
              message: '测试通过'
            });
          } else {
            ElNotification({
              type: 'error',
              message: res.msg
            });
          }
        } else {
          ElNotification({
            type: 'error',
            message: '参数校验未通过'
          });
        }
      });
    }
  };
  handleCreate = () => {
    this.props.history.push('/interface/http/httpDetail/new');
  };
  handleEdit = (selectedRowKeys: any) => {
    this.props.history.push(`/interface/http/httpDetail/${selectedRowKeys[0]}`);
  };

  deleteHttp = async (selectedRowKeys) => {
    const res = await deleteHttp(selectedRowKeys[0]);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '删除成功!'
      });
      this.state.tableRef && this.state.tableRef.getTableData();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  addRow = (type: string) => {
    this.state.editTableRef && this.state.editTableRef.addRow({});
  };
  deleteRow = (type: string, selectedRowKeys) => {
    this.state.editTableRef &&
      this.state.editTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  };
  onClose = () => {
    this.state.editTableRef && this.state.editTableRef.clearRows();
    this.setState({
      visible: false
    });
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
          onOk={this.handleTestInterface}
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
          <ElCard title='测试信息'>
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
          tableId='sys_interfaceCenter_httpGroup'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            deleteHttp: this.deleteHttp,
            deleteLoading: this.state.deleteLoading,
            testInterface: this.testInterface
          })}
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getHttpList(paramData);
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
export default HttpInterface;
