import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { getAccountList, saveAccount } from './service';
import { FormInstance, Modal } from 'antd';
import { ElSearchTable, ElNotification, ElForm } from '@/components/el';
import { isEmpty } from 'ramda';
interface State {
  tableRef: any;
  formRef: any;
  visible: boolean;
  isEdit: boolean;
  saveLoading: boolean;
  formData: any;
}
class Account extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      visible: false,
      formRef: null,
      isEdit: false,
      saveLoading: false,
      formData: {}
    };
  }
  handleCreate = () => {
    this.setState({
      visible: true,
      formData: {},
      isEdit: false
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      visible: true,
      formData: selectedRows[0],
      isEdit: true
    });
  };
  closeModal = () => {
    this.setState(
      {
        visible: false
      },
      () => {
        this.state.formRef.resetFields();
        this.state.tableRef.getTableData();
      }
    );
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        saveLoading: true
      });
      if (!isEmpty(formData)) {
        data = {
          ...formData,
          ...data
        };
      }
      const res = await saveAccount(data);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
        this.state.formRef.resetFields();
        this.setState(
          {
            formData: {},
            visible: false
          },
          () => {
            this.state.tableRef.getTableData();
          }
        );
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        saveLoading: false
      });
    }
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.visible}
          title='验证账号维护'
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          // width='1200px'
          okText='保存'
          okButtonProps={{
            disabled: this.state.saveLoading,
            loading: this.state.saveLoading
          }}
        >
          <ElForm
            formProps={getEditForm(this.state.isEdit)}
            data={this.state.formData}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='sys_interfaceCenter_account'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit
          })}
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getAccountList(paramData);
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
export default Account;
