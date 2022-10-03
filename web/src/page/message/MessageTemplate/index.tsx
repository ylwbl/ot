import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { getUdcList, createUdc, updateUdc } from './service';
import { FormInstance, Modal } from 'antd';
import { isEmpty } from 'ramda';
interface State {
  messageTemplateVisible: boolean;
  formRef: FormInstance;
  formData: object;
  messageTemplateSaveLoading: boolean;
  tableRef: any;
  action: string;
}
class MessageTemplate extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      messageTemplateVisible: false,
      formRef: null,
      formData: {},
      messageTemplateSaveLoading: false,
      tableRef: null,
      action: ''
    };
  }
  handleCreate = () => {
    this.setState({
      messageTemplateVisible: true,
      formData: {},
      action: '新增'
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      messageTemplateVisible: true,
      formData: selectedRows[0],
      action: '编辑'
    });
  };
  closeModal = () => {
    this.setState({
      messageTemplateVisible: false
    });
    const { formRef } = this.state;
    formRef && formRef.resetFields();
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      this.setState({
        messageTemplateSaveLoading: true
      });
      let data = await formRef.validateFields();
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
        messageTemplateSaveLoading: false,
        messageTemplateVisible: false
      });
      this.state.tableRef.getTableData();
    }
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.messageTemplateVisible}
          title={`udc${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          okText='保存'
          forceRender={true}
          okButtonProps={{
            disabled: this.state.messageTemplateSaveLoading,
            loading: this.state.messageTemplateSaveLoading
          }}
        >
          <ElForm
            data={this.state.formData}
            formProps={getEditForm({ formData: this.state.formData })}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='message_template'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit
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
export default MessageTemplate;
