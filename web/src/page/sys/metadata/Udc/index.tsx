import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { getUdcList, createUdc, updateUdc, deleteUdcBatch } from './service';
import { FormInstance, Modal } from 'antd';
import { isEmpty } from 'ramda';
interface State {
  udcVisible: boolean;
  formRef: FormInstance;
  formData: object;
  udcSaveLoading: boolean;
  tableRef: any;
  action: string;
  deleteLoading: boolean;
}
class Udc extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      udcVisible: false,
      formRef: null,
      formData: {},
      udcSaveLoading: false,
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
        udcSaveLoading: true
      });
      if (!isEmpty(formData)) {
        data = { ...formData, ...data };
      }
      let res;
      if (data.id) {
        res = await updateUdc(data);
      } else {
        res = await createUdc(data);
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
        udcSaveLoading: false,
        udcVisible: false
      });
      this.state.tableRef.getTableData();
    }
  };
  handleDelete = async (selectedRowKeys) => {
    this.setState({
      deleteLoading: true
    });
    const res = await deleteUdcBatch(selectedRowKeys);
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
        deleteLoading: false
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
            deleteLoading: this.state.deleteLoading
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
export default Udc;
