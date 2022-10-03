import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { getClientList, createClient, updateClient } from './service';
import { FormInstance, Modal } from 'antd';
import { isEmpty } from 'ramda';
interface State {
  visible: boolean;
  formRef: FormInstance;
  formData: object;
  loading: boolean;
  tableRef: any;
  action: string;
}
class OAuth2 extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formRef: null,
      formData: {},
      loading: false,
      tableRef: null,
      action: ''
    };
  }
  handleCreate = () => {
    this.setState({
      visible: true,
      formData: {
        hdFlag: false
      },
      action: '新增'
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      visible: true,
      formData: selectedRows[0],
      action: '编辑'
    });
  };
  closeModal = () => {
    this.setState({
      formData: {},
      visible: false
    });
    const { formRef } = this.state;
    formRef && formRef.resetFields();
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        loading: true
      });
      if (!isEmpty(formData)) {
        data = { ...formData, ...data };
      }
      let res;
      if (data.id) {
        res = await updateClient(data);
      } else {
        res = await createClient(data);
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
        loading: false,
        visible: false
      });
      this.state.tableRef.getTableData();
    }
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.visible}
          title={`udc${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          okText='保存'
          forceRender={true}
          okButtonProps={{
            disabled: this.state.loading,
            loading: this.state.loading
          }}
        >
          <ElForm
            data={this.state.formData}
            formProps={getEditForm({ formData: this.state.formData })}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          scroll={{ x: 4000 }}
          tableId='sys_manage_oauth2'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          rowKey='clientId'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getClientList(paramData);
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
export default OAuth2;
