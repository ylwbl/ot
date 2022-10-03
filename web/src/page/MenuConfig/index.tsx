import React from 'react';
import {
  ElRowContainer,
  ElForm,
  ElNotification,
  ElSearchTree,
  ElCard
} from '@/components/el';
import { getActionButtons, getMenuEditForm } from './config';
import { getMenuTree, getMenuById } from './service';
import { Row, Col, FormInstance, Modal, Skeleton } from 'antd';

import { isEmpty } from 'ramda';
import EventLine from './components/EventLine';
import EventLog from './components/EventLog';
import './style.less';
interface State {
  menuVisible: boolean;
  menuEditButtonLoading: boolean;
  menuSaveButtonLoading: boolean;
  actionVisible: boolean;
  actionSaveButtonLoading: boolean;
  menuFormRef: FormInstance;
  actionFormRef: FormInstance;
  tempMenuRecord: object;
  tempActionRecord: object;
  dataIndex: number;
  treeData: any;
  selectedNode: any;
  selectedKeys: any[];
  treeLoading: boolean;
  menuList: Array<any>;
  treeTraggerLoading: boolean;
  // expandedKeys: Array<any>;
  // searchValue: string;
  deleteMenuOneLoading: boolean;
  deleteActionLoading: boolean;
}
class MenuConfig extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      menuEditButtonLoading: false,
      menuSaveButtonLoading: false,
      actionVisible: false,
      actionSaveButtonLoading: false,
      menuFormRef: null,
      actionFormRef: null,
      tempMenuRecord: { isHidden: false, sortNo: 0 },
      tempActionRecord: { isHidden: false, sortNo: 0 },
      dataIndex: 0,
      treeData: [],
      selectedNode: {},
      selectedKeys: [],
      treeLoading: false,
      menuList: [],
      treeTraggerLoading: false,
      // expandedKeys: [],
      // searchValue: '',
      deleteMenuOneLoading: false,
      deleteActionLoading: false
    };
  }
  componentDidMount() {
    this.getMenuTree();
  }
  /**
   * 获取菜单树
   */
  getMenuTree = async () => {
    const { dataIndex } = this.state;
    this.setState({
      treeLoading: true
    });
    const res = await getMenuTree();
    if (res.success) {
      this.setState(
        {
          treeData: res.data,
          dataIndex: dataIndex + 1
        },
        () => {
          this.generateList(res.data);
        }
      );
    }
    this.setState({
      treeLoading: false
    });
  };
  generateList = (arr: Array<any>) => {
    let dataList = [];
    const generate = (data) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title } = node;
        dataList.push({ key, title: title });
        if (node.children) {
          generate(node.children);
        }
      }
    };
    generate(arr);
    this.setState({
      menuList: dataList
    });
  };
  /**
   * 点击菜单新增
   */
  handleMenuCreate = () => {
    const { menuFormRef, selectedNode } = this.state;
    this.setState(
      {
        menuVisible: true,
        tempMenuRecord: {
          parentId: !isEmpty(selectedNode) ? selectedNode.key : 0,
          isHidden: false,
          sortNo: 0
        }
      },
      () => {
        menuFormRef.setFieldsValue(this.state.tempMenuRecord);
      }
    );
  };
  /**
   * 点击菜单保存
   */
  handleMenuEdit = async () => {
    const { menuFormRef, selectedNode } = this.state;
    this.setState({
      menuEditButtonLoading: true
    });
    const res = await getMenuById(selectedNode.key);
    if (res.success && menuFormRef) {
      this.setState(
        {
          menuVisible: true,
          tempMenuRecord: res.data
        },
        () => {
          menuFormRef.setFieldsValue(res.data);
        }
      );
    }
    this.setState({
      menuEditButtonLoading: false
    });
  };

  handleTreeSelect = async (selectedKeys, e) => {
    this.setState({
      selectedKeys
    });
    // 这里
    this.setState({
      treeTraggerLoading: true
    });
    setTimeout(() => {
      if (e.selected) {
        this.setState({
          selectedNode: e.selectedNodes[0]
        });
      } else {
        this.setState({
          selectedNode: {}
        });
      }
      this.setState({
        treeTraggerLoading: false
      });
    }, 1000);
  };

  /**
   * 菜单保存
   */
  handleMenuSave = async () => {
    const { menuFormRef, tempMenuRecord } = this.state;
    if (menuFormRef) {
      let data = await menuFormRef.validateFields();
      if (!isEmpty(tempMenuRecord)) {
        data = { ...tempMenuRecord, ...data };
      }
      this.setState({
        menuSaveButtonLoading: true
      });
      let res;
    }
  };

  handleActionSave = async () => {
    const { actionFormRef, tempActionRecord } = this.state;
    if (actionFormRef) {
      let data = await actionFormRef.validateFields();
      if (!isEmpty(tempActionRecord)) {
        data = { ...tempActionRecord, ...data };
      }
      let res;
      this.setState({
        actionSaveButtonLoading: true
      });
      // if (data.id) {
      //   res = await updateMenuOrAction(data);
      // } else {
      //   res = await createAction(data);
      // }
      // if (res.success) {
      //   ElNotification({
      //     type: 'success',
      //     message: '保存成功'
      //   });
      //   this.state.actionFormRef.resetFields();
      //   this.setState(
      //     {
      //       actionSaveButtonLoading: false,
      //       actionVisible: false,
      //       tempActionRecord: { isHidden: false, sortNo: 0 }
      //     },
      //     () => {
      //       this.getTableData(this.state.selectedNode.key);
      //     }
      //   );
      // } else {
      //   ElNotification({
      //     type: 'error',
      //     message: res.msg
      //   });
      //   this.setState({
      //     actionSaveButtonLoading: false
      //   });
      // }
    }
  };

  handleDeleteMenuOne = async () => {
    // const res = await deleteMenuOne(this.state.selectedNode.key);
    // if (res.success) {
    //   ElNotification({
    //     type: 'success',
    //     message: '删除成功'
    //   });
    //   this.getMenuTree();
    // }
  };
  handleDeleteActions = async (selectedRowkeys) => {
    // const res = await deleteActions(selectedRowkeys);
    // if (res.success) {
    //   ElNotification({
    //     type: 'success',
    //     message: '删除成功'
    //   });
    //   this.getTableData(this.state.selectedNode.key);
    // } else {
    //   ElNotification({
    //     type: 'error',
    //     message: res.msg
    //   });
    // }
  };
  render() {
    const { dataIndex, selectedNode } = this.state;
    return (
      <>
        <ElRowContainer
          needBackButton={false}
          position='top'
          blocks={getActionButtons({
            handleMenuCreate: this.handleMenuCreate,
            handleMenuEdit: this.handleMenuEdit,
            handleDeleteMenuOne: this.handleDeleteMenuOne,
            deleteMenuOneLoading: this.state.deleteMenuOneLoading,
            selectedNode: this.state.selectedNode,
            menuEditButtonLoading: this.state.menuEditButtonLoading
          })}
        />
        <Row className='el-permission-row'>
          <Col span={6} className='el-permission-col'>
            <ElSearchTree
              height={500}
              virtual={false}
              dataIndex={dataIndex}
              selectedKeys={this.state.selectedKeys}
              treeData={this.state.treeData}
              onSelect={this.handleTreeSelect}
            />
          </Col>
          <Col span={18}>
            <Skeleton loading={this.state.treeTraggerLoading}>
              {isEmpty(this.state.selectedNode) ? (
                <div className='empty'>
                  <h3 className='description'>暂未选择任何菜单</h3>
                </div>
              ) : (
                <>
                  {/**
                   * 这里是到具体功能这一层的菜单展示的详情
                   */}
                  <ElForm
                    formProps={getMenuEditForm(selectedNode)}
                    onRef={(actionFormRef) => this.setState({ actionFormRef })}
                  />
                  <ElCard title='配置切换历史'>
                    <EventLine />
                  </ElCard>
                  <ElCard title='操作日志'>
                    <EventLog />
                  </ElCard>
                  <ElForm
                    formProps={getMenuEditForm(selectedNode)}
                    onRef={(actionFormRef) => this.setState({ actionFormRef })}
                  />
                  <ElCard title='操作日志'>
                    <EventLog />
                  </ElCard>
                </>
              )}
            </Skeleton>
          </Col>
        </Row>
      </>
    );
  }
}
export default MenuConfig;
