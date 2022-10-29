import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElSearchTable, ElNotification, ElForm } from '@/components/el';
import { getUdcList } from './service';
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
      copyLoading: false,
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleCreate = () => {
    this.setState({
      visiible: true,
      formData: {
        hdFlag: false
      },
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
  handleDelete = () =>  {

  }
  handleCopy = () => {

  }
  closeModal = () => {
    this.setState({
      visiible: false
    });
    const { formRef } = this.state;
    formRef && formRef.resetFields();
  }
  handleSave = () => {

  }
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
          tableId='sys_udc'
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
              return getUdcList(paramData);
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
export default Dashboard;
