import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import {
  getTemplateCategoryList,
  createCategory,
  updateCategory,
  deleteCategoryBatch
} from './service';
import { FormInstance, Modal } from 'antd';
import { isEmpty } from 'ramda';
interface State {
  categoryVisible: boolean;
  formRef: FormInstance;
  formData: object;
  categorySaveLoading: boolean;
  tableRef: any;
  action: string;
  deleteLoading: boolean;
}
class TemplateCategory extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      categoryVisible: false,
      formRef: null,
      formData: {},
      categorySaveLoading: false,
      deleteLoading: false,
      tableRef: null,
      action: ''
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleCreate = () => {
    this.setState({
      categoryVisible: true,
      formData: {
        hdFlag: false
      },
      action: '新增'
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      categoryVisible: true,
      formData: selectedRows[0],
      action: '编辑'
    });
  };
  closeModal = () => {
    this.setState({
      categoryVisible: false
    });
    const { formRef } = this.state;
    formRef && formRef.resetFields();
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        categorySaveLoading: true
      });
      if (!isEmpty(formData)) {
        data = { ...formData, ...data };
      }
      let res;
      if (data.id) {
        res = await updateCategory(data);
      } else {
        res = await createCategory(data);
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
        categorySaveLoading: false,
        categoryVisible: false
      });
      this.state.tableRef && this.state.tableRef.getTableData();
    }
  };
  handleDelete = async (selectedRowKeys) => {
    this.setState({
      deleteLoading: true
    });
    const res = await deleteCategoryBatch(selectedRowKeys);
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
    this.setState({
      deleteLoading: false
    });
    this.state.tableRef && this.state.tableRef.getTableData();
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.categoryVisible}
          title={`模板分类${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          okText='保存'
          forceRender={true}
          okButtonProps={{
            disabled: this.state.categorySaveLoading,
            loading: this.state.categorySaveLoading
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
              return getTemplateCategoryList(paramData);
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
export default TemplateCategory;
