import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { getGroupList, saveGroup, deleteGroup } from './service';
import { FormInstance, Modal } from 'antd';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { isEmpty } from 'ramda';

interface State {
  groupVisible: boolean;
  formRef: FormInstance;
  formData: any;
  tableRef: any;
  saveLoading: boolean;
  deleteLoading: boolean;
  isEdit: boolean;
}
class HttpGroup extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      groupVisible: false,
      formRef: null,
      formData: {},
      tableRef: null,
      saveLoading: false,
      deleteLoading: false,
      isEdit: false
    };
  }
  handleCreate = () => {
    this.setState({
      groupVisible: true,
      formData: {},
      isEdit: false
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      groupVisible: true,
      formData: selectedRows[0],
      isEdit: true
    });
  };

  closeModal = () => {
    this.setState(
      {
        groupVisible: false
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
      const res = await saveGroup(data);
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
            groupVisible: false
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
  deleteGroup = async (selectedRowKeys) => {
    const res = await deleteGroup(selectedRowKeys[0]);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '删除成功!'
      });
      this.state.tableRef && this.state.tableRef.getTableData();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.groupVisible}
          title='http组维护'
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
            formProps={getEditForm({ isEdit: this.state.isEdit })}
            data={this.state.formData}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='sys_interfaceCenter_httpGroup'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            deleteGroup: this.deleteGroup,
            deleteLoading: this.state.deleteLoading
          })}
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getGroupList(paramData);
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
export default HttpGroup;
