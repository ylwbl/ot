import React from 'react';
import {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  getAllRoleList,
  triggerUserActive,
  changePassword
} from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { FormInstance, Modal } from 'antd';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { isEmpty } from 'ramda';
interface State {
  userVisible: boolean;
  formRef: FormInstance;
  formData: object;
  tableRef: any;
  roleList: Array<any>;
  userEditLoading: boolean;
  userSaveLoading: boolean;
  usertriggerLoading: boolean;
  resetLoading: boolean;
  triggerLoading: boolean;
  action: string;
}
class User extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      userVisible: false,
      formRef: null,
      formData: { password: '123456' },
      tableRef: null,
      roleList: [],
      userEditLoading: false,
      userSaveLoading: false,
      usertriggerLoading: false,
      resetLoading: false,
      triggerLoading: false,
      action: ''
    };
  }
  componentDidMount() {
    this.getAllRoleList();
  }
  getAllRoleList = async () => {
    const res = await getAllRoleList();
    if (res.success) {
      this.setState({
        roleList: res.data.map((v) => {
          return {
            key: v.id,
            label: v.name,
            value: v.id
          };
        })
      });
    }
  };
  handleCreate = () => {
    this.setState({
      userVisible: true,
      formData: { password: '123456' },
      action: '新增'
    });
  };
  handleEdit = async (selectedRowKeys: any, selectedRows: any) => {
    this.setState({
      userEditLoading: true
    });
    const res = await getUserById(selectedRowKeys[0]);
    if (res.success) {
      const { ouId, buId, ouName, ouCode } = res.data;
      this.setState({
        userVisible: true,
        formData: {
          ...selectedRows[0],
          ...res.data,
          ou: {
            id: ouId, buId, ouName, ouCode
          }
        },
        action: '编辑'
      });
    }
    this.setState({
      userEditLoading: false
    });
  };
  closeModal = () => {
    this.setState({
      userVisible: false
    });
    const { formRef, tableRef } = this.state;
    if (formRef) {
      formRef.resetFields();
    }
    if (tableRef) {
      tableRef.getTableData();
    }
  };
  handleSave = async () => {
    const { formRef, formData, tableRef } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        userSaveLoading: true
      });
      if (!isEmpty(formData)) {
        const { ou } = data;
        data = {
          ...formData,
          ...data,
          ouCode: data.ou?.ouCode || null,
          ouId: data.ou?.id || null,
          buId: data.ou?.buId || null,
          ouName: data.ou?.ouName || null
        };
        delete data.ou;
      }
      let res;
      if (data.id) {
        res = await updateUser(data);
      } else {
        res = await createUser(data);
      }
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
        this.setState(
          {
            userVisible: false,
          },
          () => {
            this.state.formRef && this.state.formRef.resetFields();
            tableRef && tableRef.getTableData();
          }
        );
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        userSaveLoading: false
      });
    }
  };
  triggerActive = async (selectedRowKeys) => {
    this.setState({
      usertriggerLoading: true
    });
    const res = await triggerUserActive(selectedRowKeys[0]);
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
      usertriggerLoading: false
    });
  };
  resetPassword = async (selectedRowKeys) => {
    this.setState({
      resetLoading: true
    });
    const res = await changePassword(selectedRowKeys[0]);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '重置成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      resetLoading: false
    });
  };
  onActiveChange = async (value, record, e) => {
    e.stopPropagation();
    const { tableRef } = this.state;
    tableRef &&
      tableRef.updateRowByRowKey(record.id, { ...record, enabled: value });
    const res = await triggerUserActive(record.id);
    if (res.success) {
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
      tableRef &&
        tableRef.updateRowByRowKey(record.id, { ...record, enabled: !value });
    }
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.userVisible}
          okText='保存'
          title={`用户${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          okButtonProps={{
            disabled: this.state.userSaveLoading,
            loading: this.state.userSaveLoading
          }}
        >
          <ElForm
            formProps={getEditForm({
              roleList: this.state.roleList,
              formData: this.state.formData
            })}
            data={this.state.formData}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='sys_user'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          columns={getTableColumns({
            onActiveChange: this.onActiveChange,
            triggerLoading: this.state.triggerLoading
          })}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            userEditLoading: this.state.userEditLoading,
            usertriggerLoading: this.state.usertriggerLoading,
            triggerActive: this.triggerActive,
            resetLoading: this.state.resetLoading,
            resetPassword: this.resetPassword
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getUserList(paramData);
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
export default User;
