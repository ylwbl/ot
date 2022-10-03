import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { getList, create, update, deleteOne } from './service';
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
class PicTag extends React.Component<any, State> {
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
    this.state.formRef && this.state.formRef.resetFields();
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
    const res = await deleteOne(selectedRowKeys[0]);
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
    this.state.tableRef && this.state.tableRef.getTableData();
    this.setState({
      deleteLoading: false
    });
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.udcVisible}
          title={`标签${this.state.action}`}
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
          tableId='sys_template_category'
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
export default PicTag;
