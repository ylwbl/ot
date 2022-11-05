import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElSearchTable, ElNotification, ElForm } from '@/components/el';
import { getList, save } from './service';
import { FormInstance, Modal } from 'antd';
interface State {
  visiible: boolean;
  formRef: FormInstance;
  formData: object;
  udcSaveLoading: boolean;
  tableRef: any;
  action: string;
  deleteLoading: boolean;
  copyLoading: boolean;
}
class Dashboard extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      visiible: false,
      formRef: null,
      formData: {},
      udcSaveLoading: false,
      deleteLoading: false,
      tableRef: null,
      action: '',
      copyLoading: false
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleCreate = () => {
    this.setState({
      visiible: true,
      formData: {},
      action: '新增'
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      visiible: true,
      formData: selectedRows[0],
      action: '编辑'
    });
  };
  handleDelete = () => {};
  handleCopy = () => {};
  closeModal = () => {
    this.setState({
      visiible: false
    });
    const { formRef } = this.state;
    formRef && formRef.resetFields();
  };
  handleSave = async () => {
    const data = await this.state.formRef.validateFields();
    const res = await save(data);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '保存成功'
      });
      this.props.history.push(`/dashboard/${res.data}`);
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    console.log(res);
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.visiible}
          title={`udc${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          okText='保存'
          forceRender={true}
          okButtonProps={{
            disabled: this.state.udcSaveLoading,
            loading: this.state.udcSaveLoading
          }}
        >
          <ElForm
            data={this.state.formData}
            formProps={getEditForm({ formData: this.state.formData })}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='ot'
          rowKey='_id'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            handleDelete: this.handleDelete,
            deleteLoading: this.state.deleteLoading,
            handleCopy: this.handleCopy,
            copyLoading: this.state.copyLoading
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getList(paramData);
            },
            props: {
              success: 'success',
              result: 'data.result',
              total: 'data.total'
            },

            autoLoad: true
          }}
        />
      </>
    );
  }
}
export default Dashboard;
