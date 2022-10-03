import React from 'react';
import { Tree, Modal, Spin } from 'antd';
import { ElForm, ElNotification } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import {
  getCategoryList,
  getCategoryById,
  deleteCategoryById,
  createCategory,
  updateCategory
} from '../service';
import { isEmpty } from 'ramda';
import {
  DeleteRed,
  EditBlue,
  AddBlue,
  LoadingBlack
} from '@/components/el/ElIcon';
interface State {
  categoryList: any[];
  formRef: any;
  visible: boolean;
  saveLoading: boolean;
  formData: any;
  editLoading: boolean;
  deleteLoading: boolean;
  expandedKeys: Array<string>;
  selectedKeys: Array<string>;
  loading: boolean;
}
interface Props {
  setSelectedData: Function;
  tableRef: any;
}
const getEditForm = ({ formData }): ElFormProps => {
  return {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    items: [
      {
        title: '分类代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入分类代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '分类代码',
            disabled: formData.id
          }
        }
      },
      {
        title: '分类名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入分类名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '分类名称'
          }
        }
      },
      {
        title: '分类描述',
        name: 'description',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '分类描述'
          }
        }
      }
    ]
  };
};
class CategoryTree extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      formRef: null,
      visible: false,
      saveLoading: false,
      formData: {},
      editLoading: false,
      deleteLoading: false,
      expandedKeys: [],
      selectedKeys: [],
      loading: false
    };
  }
  componentDidMount() {
    this.getCategoryList();
    this.resetSelectedCategory();
  }
  resetSelectedCategory = () => {
    const { setSelectedData } = this.props;
    setSelectedData('all', { category: '0', pic: '0', data: {} });
    this.setState({
      selectedKeys: ['0']
    });
  };
  getCategoryList = async () => {
    this.setState({
      loading: true
    });
    const res = await getCategoryList();
    if (res.success) {
      this.setState({
        expandedKeys: ['0'],
        categoryList: [
          {
            key: '0',
            label: '全部分类',
            children: res.data.map((v) => {
              return {
                key: v.id,
                label: v.name
              };
            })
          }
        ]
      });
    }
    this.setState({
      loading: false
    });
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        saveLoading: true
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
      this.setState(
        {
          saveLoading: false,
          visible: false
        },
        () => {
          this.state.formRef.resetFields();
        }
      );
      const { setSelectedData } = this.props;
      setSelectedData('all', { category: '0', pic: '0', data: {} });
      this.getCategoryList();
    }
  };
  closeModal = () => {
    this.setState({
      visible: false
    });
  };
  editCategory = async (id: string) => {
    this.setState({
      editLoading: true
    });
    const res = await getCategoryById(id);
    if (res.success) {
      this.setState({
        formData: res.data,
        visible: true
      });
    }
    this.setState({
      editLoading: false
    });
  };
  deleteCategoryById = async (id: string) => {
    this.setState({
      deleteLoading: true
    });
    const res = await deleteCategoryById(id);
    if (res.success) {
      this.getCategoryList();
    }
    this.setState({
      deleteLoading: false
    });
  };
  onTreeNodeSelect = async (selectedKeys, e) => {
    const { tableRef } = this.props;
    console.log(e);
    if (e.selected) {
      const { setSelectedData } = this.props;
      await setSelectedData(e.node.key === '0' ? 'all' : 'category', {
        category: e.node.key
      });
      tableRef && tableRef.getTableData();
      this.setState({
        selectedKeys
      });
    } else {
      // 如果是取消选中的操作,那很明显之前是进行了选中的操作的,需要判断当前的type,如果type是category那就重置为所有分类被选中,不是就不动
      const { setSelectedData } = this.props;
      await setSelectedData('all', {
        category: '0'
      });
      tableRef && tableRef.getTableData();
      this.setState({
        selectedKeys: ['0']
      });
    }
  };
  render() {
    return (
      <>
        <Modal
          visible={this.state.visible}
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
            formProps={getEditForm({ formData: this.state.formData })}
            onRef={(formRef) => this.setState({ formRef })}
            data={this.state.formData}
          />
        </Modal>
        <Spin spinning={this.state.loading}>
          <Tree
            height={900}
            virtual={false}
            expandedKeys={this.state.expandedKeys}
            selectedKeys={this.state.selectedKeys}
            treeData={this.state.categoryList}
            onSelect={this.onTreeNodeSelect}
            titleRender={(data: any) => {
              return (
                <div className='category-tree-item'>
                  {data.label}
                  {data.key === '0' ? (
                    <span className='category-icon'>
                      <AddBlue
                        onClick={() => {
                          this.setState({
                            visible: true
                          });
                        }}
                      />
                    </span>
                  ) : (
                    <span className='category-icon'>
                      {this.state.editLoading || this.state.deleteLoading ? (
                        <LoadingBlack />
                      ) : (
                        <EditBlue
                          onClick={() => {
                            this.editCategory(data.key);
                          }}
                        />
                      )}
                      {this.state.editLoading || this.state.deleteLoading ? (
                        <LoadingBlack />
                      ) : (
                        <DeleteRed
                          style={{ marginLeft: '5px' }}
                          onClick={() => {
                            this.deleteCategoryById(data.key);
                          }}
                        />
                      )}
                    </span>
                  )}
                </div>
              );
            }}
          />
        </Spin>
      </>
    );
  }
}
export default CategoryTree;
