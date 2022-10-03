import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm,
  getCategoryEditForm
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import {
  getList,
  getDetailInfo,
  savePicInfos,
  getPicInfoById,
  changeCategory,
  updatePicInfos,
  deletePics
} from './service';
import { FormInstance, Modal, Row, Col } from 'antd';
import CategoryTree from './components/CategoryTree';
import './style.less';
import CategroyInfo from './components/CategroyInfo';
import PicInfo from './components/PicInfo';
import AllCategoryInfo from './components/AllCategoryInfo';
interface State {
  visible: boolean;
  formRef: FormInstance;
  formData: any;
  saveLoading: boolean;
  tableRef: any;
  action: string;
  deleteLoading: boolean;
  selectedData: {
    type: 'pic' | 'category' | 'all';
    category?: any;
    pic?: any;
    data: any;
  };
  editLoading: boolean;
  changeLoading: boolean;
  categoryFormRef: any;
  categoryVisible: boolean;
  changeCategoryPicIds: Array<any>;
}
class PicCategory extends React.Component<any, State> {
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
      selectedData: { type: 'all', category: '0', pic: '0', data: {} },
      editLoading: false,
      changeLoading: false,
      categoryFormRef: null,
      categoryVisible: false,
      changeCategoryPicIds: []
    };
  }
  setSelectedData = async (type: 'pic' | 'category' | 'all', data) => {
    const res = await getDetailInfo(type, data);
    return this.setStateAsync({
      selectedData: {
        ...this.state.selectedData,
        type,
        ...data,
        data: res.success ? res.data : data.data ? data.data : {}
      }
    });
  };
  setStateAsync(state) {
    return new Promise((resolve: any) => {
      this.setState(state, resolve);
    });
  }
  handleCreate = () => {
    this.setState({
      visible: true,
      formData: {
        labels: [],
        albumId: '',
        description: '',
        fileCodes: []
      },
      action: '新增'
    });
  };
  handleEdit = async (selectedRowKeys: any) => {
    this.setState({
      editLoading: true
    });
    const res = await getPicInfoById(selectedRowKeys[0]);
    if (res.success) {
      let newData = res.data;
      newData.fileCodes = [newData.fileInfo];
      newData.labels = newData.labels.map((v) => {
        return {
          key: v.id,
          label: v.name,
          value: v.id
        };
      });
      this.setState({
        visible: true,
        formData: newData,
        action: '编辑'
      });
    }
    this.setState({ editLoading: false });
  };
  closeModal = () => {
    this.setState({
      visible: false
    });
    const { formRef, tableRef } = this.state;
    formRef && formRef.resetFields();
    tableRef && tableRef.getTableData();
  };
  closeCategoryModal = () => {
    this.setState({
      categoryVisible: false
    });
    const { categoryFormRef, tableRef } = this.state;
    categoryFormRef && categoryFormRef.resetFields();
    tableRef && tableRef.getTableData();
  };
  handleDelete = async (selectedRowKeys) => {
    this.setState({
      deleteLoading: true
    });
    const res = await deletePics(selectedRowKeys);
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
    this.state.tableRef.getTableData();
    this.setState({
      deleteLoading: false
    });
  };
  renderDetail = (selectedData) => {
    if (!selectedData.type) {
      return null;
    } else if (selectedData.type === 'pic') {
      return <PicInfo picData={this.state.selectedData} />;
    } else if (selectedData.type === 'category') {
      return <CategroyInfo categoryData={this.state.selectedData} />;
    } else {
      return <AllCategoryInfo categoryData={this.state.selectedData} />;
    }
  };
  onTableRowClick = (record) => {
    this.setSelectedData('pic', { pic: record.id, data: record });
  };
  handlePicsSave = async () => {
    // const res = await savePicInfos({});
    const { formData } = this.state;
    if (formData.id) {
      const { formRef } = this.state;
      let newData = formRef ? await formRef.validateFields() : {};
      // newData.albumId = newData.albumId;
      newData.labelIds = newData.labels.map((v) => v.value);
      // newData.description = newData.description;
      const res = await updatePicInfos(newData, formData.id);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '更新成功'
        });
        this.setState({
          visible: false
        });
      }
    } else {
      const { formRef } = this.state;
      let newData = formRef ? await formRef.validateFields() : {};
      newData.labelIds = newData.labels.map((v) => v.value);
      newData.fileCodes = newData.fileCodes.map((v) => v.fileCode);
      const data = { ...formData, ...newData };
      const res = await savePicInfos(data);
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
        this.setState({
          visible: false
        });
      }
    }
    const { tableRef } = this.state;
    tableRef && tableRef.getTableData();
    // this.setSelectedData('all', { category: '0', pic: '0', data: {} });
  };
  changeCategory = (selectedRowKeys) => {
    this.state.categoryFormRef.resetFields();
    this.setState({
      categoryVisible: true,
      changeCategoryPicIds: selectedRowKeys
    });
  };
  changePicsCategory = async () => {
    const data = await this.state.categoryFormRef.getFieldsValue();
    const res = await changeCategory(
      this.state.changeCategoryPicIds,
      data.albumId
    );
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '更新成功'
      });
      this.setState({
        categoryVisible: false
      });
      const { tableRef } = this.state;
      tableRef && tableRef.getTableData();
    }
  };
  render() {
    return (
      <Row className='pic-manage'>
        <Col span={4}>
          <CategoryTree
            setSelectedData={this.setSelectedData}
            tableRef={this.state.tableRef}
          />
        </Col>
        <Col span={16}>
          <Modal
            destroyOnClose={false}
            visible={this.state.categoryVisible}
            title={`请选择图片分类`}
            onCancel={this.closeCategoryModal}
            onOk={this.changePicsCategory}
            okText='确定'
            forceRender={true}
            okButtonProps={{
              disabled: this.state.changeLoading,
              loading: this.state.changeLoading
            }}
          >
            <ElForm
              formProps={getCategoryEditForm()}
              onRef={(categoryFormRef) => this.setState({ categoryFormRef })}
            />
          </Modal>
          <Modal
            destroyOnClose={false}
            visible={this.state.visible}
            title={`图片${this.state.action}`}
            onCancel={this.closeModal}
            width='1200px'
            onOk={this.handlePicsSave}
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
            scroll={{ y: 900 }}
            tableId='sys_staticmanage_picmanage'
            onRef={(tableRef) => {
              this.setState({
                tableRef
              });
            }}
            rowKey='id'
            columns={getTableColumns()}
            pageSize={20}
            actionButtons={getActionButtons({
              handleCreate: this.handleCreate,
              handleEdit: this.handleEdit,
              handleDelete: this.handleDelete,
              deleteLoading: this.state.deleteLoading,
              editLoading: this.state.editLoading,
              changeCategory: this.changeCategory
            })}
            onTableRowClick={this.onTableRowClick}
            searchFormProps={getTableSearchFormItems}
            tableProxy={{
              request: (paramData) => {
                return getList(paramData, this.state.selectedData.category);
              },
              props: {
                success: 'success',
                result: 'data.records',
                total: 'data.total'
              },

              autoLoad: true
            }}
          />
        </Col>

        <Col span={4} style={{ height: 900, overflowY: 'scroll' }}>
          {this.renderDetail(this.state.selectedData)}
        </Col>
      </Row>
    );
  }
}
export default PicCategory;
