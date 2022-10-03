import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm,
  getModalTableColumns,
  getTableActionButtons
} from './config';
import {
  getRoleList,
  createRole,
  updateRole,
  getMenuTree,
  getActionByMenuId,
  getMenuCheck,
  triggerRoleActive,
  updateActionByRoleIdAndMenuId,
  getActionByRoleIdAndMenuId
} from './service';
import { FormInstance, Modal, Row, Col, Tree } from 'antd';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import { isEmpty } from 'ramda';

interface State {
  roleVisible: boolean;
  formRef: FormInstance;
  formData: any;
  tableRef: any;
  actionDataSource: any[];
  selectedNode: any;
  actionBindButtonLoading: boolean;
  modalTableRef: any;
  treeData: Array<any>;
  menuCheck: Array<string>;
  checkedKeys: Array<string>;
  selectedKeys: any;
  actionCheck: Array<string>;
  saveRoleLoading: boolean;
  roletriggerLoading: boolean;
  isEdit: boolean;
  leafNodes: any[];
  halfCheckedKeys: any[];
}
class Role extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      roleVisible: false,
      formRef: null,
      formData: { enabled: false, permIds: [] },
      tableRef: null,
      actionDataSource: [],
      selectedNode: {},
      actionBindButtonLoading: false,
      modalTableRef: null,
      treeData: [],
      menuCheck: [],
      checkedKeys: [],
      selectedKeys: [],
      actionCheck: [],
      saveRoleLoading: false,
      roletriggerLoading: false,
      isEdit: false,
      leafNodes: [],
      halfCheckedKeys: []
    };
  }
  componentDidMount() {
    this.getMenuTree();
  }
  getMenuTree = async () => {
    const res = await getMenuTree();
    if (res.success) {
      let leafNodes = this.generate(res.data);
      this.setState({
        leafNodes,
        treeData: res.data
      });
    }
  };
  generate = (arr) => {
    let leafNodes = [];
    function generatePerm(perm) {
      perm.forEach((v) => {
        if (v.children && Array.isArray(v.children)) {
          generatePerm(v.children);
        } else {
          leafNodes.push(v.key);
        }
      });
    }
    generatePerm(arr);
    return leafNodes;
  };
  handleCreate = () => {
    this.setState({
      roleVisible: true,
      formData: { enabled: false, permIds: [] },
      isEdit: false,
      selectedKeys: [],
      halfCheckedKeys: [],
      checkedKeys: []
    });
  };
  handleEdit = (selectedRows: any) => {
    if (selectedRows[0].code === 'ADMIN') {
      return ElNotification({ type: 'warning', message: '此角色不支持修改' });
    }
    this.setState(
      {
        roleVisible: true,
        formData: selectedRows[0],
        isEdit: true
      },
      () => {
        this.getMenuCheck(this.state.formData.id);
      }
    );
  };
  getMenuCheck = async (id) => {
    const menuCheckRes = await getMenuCheck(id);
    if (menuCheckRes.success) {
      this.setState({
        menuCheck: menuCheckRes.data,
        checkedKeys: menuCheckRes.data.filter((v) =>
          this.state.leafNodes.includes(v)
        ),
        halfCheckedKeys: menuCheckRes.data.filter(
          (v) => !this.state.leafNodes.includes(v)
        )
      });
    }
  };
  getActionCheck = async (roleId, menuId) => {
    const actionCheckRes = await getActionByRoleIdAndMenuId(roleId, menuId);
    if (actionCheckRes.success) {
      const { modalTableRef } = this.state;
      modalTableRef.setSelectionData({
        selectedRowKeys: actionCheckRes.data.map((v) => v.id),
        selectedRows: modalTableRef
          .getRows()
          .filter((v) => actionCheckRes.data.some((j) => j.id === v.id)),
        length: actionCheckRes.data.length
      });
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
          ...data,
          permIds: [...this.state.checkedKeys, ...this.state.halfCheckedKeys]
        };
      }
      let res;
      if (data.id) {
        res = await updateRole(data);
      } else {
        res = await createRole(data);
      }
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
        this.setState(
          {
            formData: {
              ...data,
              id: res.data === 1 ? formData.id : res.data
            }
          },
          () => {
            this.getMenuCheck(this.state.formData.id);
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
  handleActionBind = async (selectedRowKeys) => {
    const { selectedNode, formData } = this.state;
    this.setState({
      actionBindButtonLoading: true
    });
    const res = await updateActionByRoleIdAndMenuId(
      formData.id,
      selectedNode.key,
      selectedRowKeys
    );
    if (res) {
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
      actionBindButtonLoading: false
    });
  };
  handleTreeSelect = (selectedKeys, e) => {
    if (e.selected) {
      const { menuCheck, halfCheckedKeys } = this.state;
      if (
        menuCheck.includes(e.selectedNodes[0].key) ||
        halfCheckedKeys.includes(e.selectedNodes[0].key)
      ) {
        this.setState(
          {
            selectedNode: e.selectedNodes[0],
            selectedKeys
          },
          () => {
            this.getTableData(this.state.selectedNode.key);
          }
        );
      } else {
        this.setState({
          selectedKeys: []
        });
        ElNotification({
          type: 'warning',
          message: '请先保存角色与菜单的绑定关系,在进行菜单与能力的绑定'
        });
      }
    } else {
      this.setState({
        selectedNode: {},
        selectedKeys: [],
        actionDataSource: []
      });
    }
  };
  getTableData = async (key) => {
    const { modalTableRef } = this.state;
    this.state.modalTableRef.setLoading(true);
    const res = await getActionByMenuId(key);
    await this.getActionCheck(
      this.state.formData.id,
      this.state.selectedNode.key
    );
    if (res.success) {
      this.setState({
        actionDataSource: res.data
      });
    }
    modalTableRef.setLoading(false);
  };
  handleTreeCheck = (checkedKeys, info) => {
    this.setState({
      checkedKeys,
      halfCheckedKeys: info.halfCheckedKeys
    });
  };
  triggerActive = async (selectedRowKeys, selectedRows, enabled: boolean) => {
    if (selectedRows[0].code === 'ADMIN') {
      return ElNotification({ type: 'warning', message: '此角色不支持修改' });
    }
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
          title='角色维护'
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          width='1200px'
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
          {this.state.formData.id && (
            <Row>
              <Col span={7}>
                <Tree
                  checkable
                  selectedKeys={this.state.selectedKeys}
                  checkedKeys={this.state.checkedKeys}
                  treeData={this.state.treeData}
                  onCheck={this.handleTreeCheck}
                  onSelect={this.handleTreeSelect}
                />
              </Col>
              <Col span={17}>
                <ElSearchTable
                  tableId='sys_role'
                  dataSource={this.state.actionDataSource}
                  onRef={(modalTableRef) => {
                    this.setState({
                      modalTableRef
                    });
                  }}
                  mode={{
                    proxy: false,
                    search: false,
                    action: true,
                    pagination: false
                  }}
                  columns={getModalTableColumns()}
                  pageSize={20}
                  actionButtons={getTableActionButtons({
                    handleActionBind: this.handleActionBind,
                    selectedNode: this.state.selectedNode,
                    actionBindButtonLoading: this.state.actionBindButtonLoading
                  })}
                />
              </Col>
            </Row>
          )}
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
export default Role;
