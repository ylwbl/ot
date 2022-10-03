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
  messageTopicVisible: boolean;
  formRef: FormInstance;
  formData: object;
  messageTopicSaveLoading: boolean;
  tableRef: any;
  action: string;
}
class MessageTopic extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      messageTopicVisible: false,
      formRef: null,
      formData: {},
      messageTopicSaveLoading: false,
      tableRef: null,
      action: ''
    };
  }
  handleCreate = () => {
    this.setState({
      messageTopicVisible: true,
      formData: {},
      action: '新增'
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      messageTopicVisible: true,
      formData: selectedRows[0],
      action: '编辑'
    });
  };
  closeModal = () => {
    this.setState({
      messageTopicVisible: false
    });
    const { formRef } = this.state;
    formRef && formRef.resetFields();
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      this.setState({
        messageTopicSaveLoading: true
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
        messageTopicSaveLoading: false,
        messageTopicVisible: false
      });
      this.state.tableRef.getTableData();
    }
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.messageTopicVisible}
          title={`udc${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          okText='保存'
          forceRender={true}
          okButtonProps={{
            disabled: this.state.messageTopicSaveLoading,
            loading: this.state.messageTopicSaveLoading
          }}
        >
          <ElForm
            data={this.state.formData}
            formProps={getEditForm({ formData: this.state.formData })}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='message_topic'
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
export default MessageTopic;
