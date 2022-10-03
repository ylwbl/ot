import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons
} from './config';
import { getRoleList, triggerRoleActive } from './service';
import { FormInstance } from 'antd';
import { ElSearchTable, ElNotification } from '@/components/el';

interface State {
  roleVisible: boolean;
  formRef: FormInstance;
  formData: any;
  tableRef: any;
  modalTableRef: any;
  saveRoleLoading: boolean;
  roletriggerLoading: boolean;
  isEdit: boolean;
}
class Role extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      roleVisible: false,
      formRef: null,
      formData: { enabled: false, permIds: [] },
      tableRef: null,
      modalTableRef: null,
      saveRoleLoading: false,
      roletriggerLoading: false,
      isEdit: false
    };
  }
  handleCreate = (selectedRowKeys) => {
    this.props.push(`/sys/administration/dataroledetail/new`);
  };
  handleEdit = (selectedRows: any) => {
    if (selectedRows[0].code === 'ADMIN') {
      ElNotification({
        type: 'warning',
        message: '此角色不支持编辑'
      });
    } else {
      this.props.push(
        `/sys/administration/dataroledetail/edit/${selectedRows[0].id}`
      );
    }
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
export default Role;
