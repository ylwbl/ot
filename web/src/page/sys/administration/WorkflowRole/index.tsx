import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { getRoleList, saveRole, triggerRoleActive } from './service';
import { FormInstance, Modal } from 'antd';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { isEmpty } from 'ramda';

interface State {
  roleVisible: boolean;
  formRef: FormInstance;
  formData: any;
  tableRef: any;
  saveRoleLoading: boolean;
  roletriggerLoading: boolean;
  isEdit: boolean;
}
class WorkflowRole extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      roleVisible: false,
      formRef: null,
      formData: { enabled: false },
      tableRef: null,
      saveRoleLoading: false,
      roletriggerLoading: false,
      isEdit: false
    };
  }
  handleCreate = () => {
    this.setState({
      roleVisible: true,
      formData: { enabled: false, permIds: [] },
      isEdit: false
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      roleVisible: true,
      formData: selectedRows[0],
      isEdit: true
    });
  };

  closeModal = () => {
    this.setState(
      {
        roleVisible: false
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
        saveRoleLoading: true
      });
      if (!isEmpty(formData)) {
        data = {
          ...formData,
          ...data
        };
      }
      const res = await saveRole(data);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
        this.state.formRef.resetFields();
        this.setState(
          {
            formData: {
              enabled: false
            },
            roleVisible: false
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
        saveRoleLoading: false
      });
    }
  };
  triggerActive = async (selectedRowKeys, enabled: boolean) => {
    this.setState({
      roletriggerLoading: true
    });
    const res = await triggerRoleActive({
      ids: selectedRowKeys,
      enabled
    });
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '切换成功'
      });
      const { tableRef } = this.state;
      tableRef.getTableData();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      roletriggerLoading: false
    });
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.roleVisible}
          title='流程角色维护'
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          // width='1200px'
          okText='保存'
          okButtonProps={{
            disabled: this.state.saveRoleLoading,
            loading: this.state.saveRoleLoading
          }}
        >
          <ElForm
            formProps={getEditForm(this.state.isEdit)}
            data={this.state.formData}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='sys_role_list'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            roletriggerLoading: this.state.roletriggerLoading,
            triggerActive: this.triggerActive
          })}
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getRoleList(paramData);
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
export default WorkflowRole;
