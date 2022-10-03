import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { getList, create, update, deleteBatch } from './service';
import { FormInstance, Modal } from 'antd';
import { isEmpty } from 'ramda';
interface State {
  udcVisible: boolean;
  formRef: FormInstance;
  formData: object;
  saveLoading: boolean;
  tableRef: any;
  action: string;
  deleteLoading: boolean;
}
class Setting extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      udcVisible: false,
      formRef: null,
      formData: {},
      saveLoading: false,
      deleteLoading: false,
      tableRef: null,
      action: ''
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleCreate = () => {
    this.setState({
      udcVisible: true,
      formData: {
        hdFlag: false
      },
      action: '新增'
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      udcVisible: true,
      formData: selectedRows[0],
      action: '编辑'
    });
  };
  closeModal = () => {
    this.setState({
      udcVisible: false
    });
    const { formRef } = this.state;
    formRef && formRef.resetFields();
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        saveLoading: true
      });
      if (!isEmpty(formData)) {
        data = { ...formData, ...data };
      }
      let res;
      if (data.id) {
        res = await update(data);
      } else {
        res = await create(data);
      }
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        saveLoading: false,
        udcVisible: false
      });
      this.state.tableRef.getTableData();
    }
  };
  handleDelete = async (selectedRowKeys) => {
    this.setState({
      deleteLoading: true
    });
    const res = await deleteBatch(selectedRowKeys);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '删除成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState(
      {
        deleteLoading: true
      },
      () => {
        this.state.tableRef.getTableData();
      }
    );
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.udcVisible}
          title={`系统设置${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          okText='保存'
          forceRender={true}
          okButtonProps={{
            disabled: this.state.saveLoading,
            loading: this.state.saveLoading
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
            deleteLoading: this.state.deleteLoading
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getList(paramData);
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
export default Setting;
