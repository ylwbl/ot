import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import {
  getTemplateList,
  createTemplate,
  updateTemplate,
  triggerActive,
  searchTemplateById
} from './service';
import { FormInstance, Modal } from 'antd';
import { isEmpty } from 'ramda';

import TemplateLog from './Log';
interface State {
  visible: boolean;
  formRef: FormInstance;
  formData: object;
  saveLoading: boolean;
  tableRef: any;
  action: string;
  deleteLoading: boolean;
  triggerLoading: boolean;
  editLoading: boolean;
  selectedTemplateId: any;
  submitIndex: number;
}
class TemplateManage extends React.Component<any, State> {
  exportRef = null;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formRef: null,
      formData: {},
      saveLoading: false,
      deleteLoading: false,
      tableRef: null,
      action: '',
      triggerLoading: false,
      editLoading: false,
      selectedTemplateId: null,
      submitIndex: 0
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
  handleEdit = async (selectedRowKeys: any) => {
    this.setState({
      editLoading: true
    });
    const res = await searchTemplateById(selectedRowKeys[0]);
    if (res.success) {
      this.setState({
        visible: true,
        formData: {
          ...res.data,
          fileCode: res.data.fileInfo || []
        },
        action: '编辑'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      editLoading: false
    });
  };
  closeModal = () => {
    this.setState({
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
        saveLoading: true
      });
      if (!isEmpty(formData)) {
        data = {
          ...formData,
          ...data,
          fileCode: data.fileCode.fileCode,
          fileName: data.fileCode.originalName
        };
      }
      let res;
      if (data.id) {
        res = await updateTemplate(data);
      } else {
        res = await createTemplate(data);
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
        saveLoading: false,
        visible: false
      });
      this.state.tableRef.getTableData();
    }
  };
  handleDelete = async (selectedRowKeys) => {
    this.setState({
      deleteLoading: true
    });
    // const res = await deleteUdcBatch(selectedRowKeys);
    // if (res.success) {
    //   ElNotification({
    //     type: 'success',
    //     message: '删除成功'
    //   });
    // } else {
    //   ElNotification({
    //     type: 'error',
    //     message: res.msg
    //   });
    // }
    this.setState({
      deleteLoading: true
    });
  };
  triggerActive = async (selectedRowKeys) => {
    this.setState({
      triggerLoading: true
    });
    const res = await triggerActive(selectedRowKeys[0]);
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
      triggerLoading: false
    });
  };

  handleExport = () => {
    this.exportRef.openModal();
  }

  setTabs = () => {
    const { selectedTemplateId, submitIndex } = this.state;
    return [
      {
        name: '操作记录',
        key: '1',
        render: () => (
          <TemplateLog
            submitIndex={submitIndex}
            templateId={selectedTemplateId}
          />
        )
      }
    ]
  }

  render() {
    const { submitIndex } = this.state;
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.visible}
          title={`模板${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          okText='保存'
          forceRender={true}
          okButtonProps={{
            disabled: this.state.saveLoading,
            loading: this.state.saveLoading
          }}
        >
          <ElForm
            data={this.state.formData}
            formProps={getEditForm({ formData: this.state.formData })}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <ElSearchTable
          tableId='sys_template_manage'
          mode={{
            proxy: true,
            search: true,
            action: true,
            pagination: true,
            descriptions: true,
            tabs: true
          }}
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
            triggerActive: this.triggerActive,
            deleteLoading: this.state.deleteLoading,
            triggerLoading: this.state.triggerLoading,
            editLoading: this.state.editLoading,
            handleExport: this.handleExport
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getTemplateList(paramData);
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          tabs={{
            defaultActiveKey: '1',
            tabs: this.setTabs()
          }}
          onTableRowClick={(record, index) => {
            this.setState({
              selectedTemplateId: record.id,
              submitIndex: submitIndex + 1
            });
          }}
        />
      </>
    );
  }
}
export default TemplateManage;
