import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import {
  AddBlue,
  EditBlue,
  BindBlue,
  ActiveBlue,
  SaveWhite
} from '@/components/el/ElIcon';
import { Radio, List } from 'antd';
import { getAuthList, getHttpList, getSDKList, getBridgeList } from './service';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '节点名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '父节点名称',
    align: 'center',
    dataIndex: 'parentName'
  },
  {
    title: '分支标识码',
    align: 'center',
    dataIndex: 'branchingIdentifier'
  },
  {
    title: '节点描述',
    align: 'center',
    dataIndex: 'description'
  },
  {
    title: '接口类型',
    align: 'center',
    dataIndex: 'syncTerminal'
  },
  {
    title: '验证账户',
    align: 'center',
    dataIndex: 'authName'
  },
  {
    title: '访问接口',
    align: 'center',
    dataIndex: 'destinationIdentifierName'
  },
  {
    title: '访问方式',
    align: 'center',
    dataIndex: 'accessTypeName'
  }
];

const getActionButtons = ({
  handleCreate,
  handleEdit
}): Array<ActionButtonProps> => {
  return [
    {
      text: '新增',
      key: 'create',
      icon: <AddBlue />,
      disabled: false,
      hidden: false,
      location: 'left',
      handleClick: handleCreate
    },
    {
      text: '编辑',
      key: 'edit',
      icon: <EditBlue />,
      disabled: false,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRows }) => handleEdit(selectedRows)
    }
    // {
    //   text: '批量启用',
    //   key: 'triggerActive',
    //   icon: <ActiveBlue />,
    //   disabled: roletriggerLoading,
    //   loading: roletriggerLoading,
    //   hidden: false,
    //   minSelection: 1,
    //   maxSelection: 1,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys, selectedRows }) =>
    //     triggerActive(selectedRowKeys, true)
    // },
    // {
    //   text: '批量禁用',
    //   key: 'triggerDisabled',
    //   icon: <ActiveBlue />,
    //   disabled: roletriggerLoading,
    //   loading: roletriggerLoading,
    //   hidden: false,
    //   minSelection: 1,
    //   maxSelection: 1,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys, selectedRows }) =>
    //     triggerActive(selectedRowKeys, false)
    // }
  ];
};
const getTaskEditForm = (isEdit): ElFormProps => {
  return {
    labelCol: {
      span: 6
    },
    items: [
      {
        title: '任务名称',
        name: 'name',
        span: 8,
        rules: [
          {
            required: true,
            message: '请输入任务名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '任务名称'
          }
        }
      },
      {
        title: '同步频率',
        name: 'syncCron',
        span: 8,
        rules: [
          {
            required: true,
            message: '请输入同步频率!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '同步频率'
          }
        }
      },
      {
        title: '同步策略',
        name: 'syncStrategy',
        span: 8,
        formOption: {
          type: '$select',
          props: {
            placeholder: '同步策略',
            options: [
              {
                label: '错误后停止',
                value: 'ERROP_STOP',
                id: 'ERROP_STOP'
              },
              {
                label: '错误后继续',
                value: 'ERROP_CONTINUE',
                id: 'ERROP_CONTINUE'
              }
            ]
          }
        }
      }
    ]
  };
};
const getNodeEditForm = ({
  getNodesSelect,
  syncTerminal,
  onSyncTerminalChange
}): ElFormProps => {
  return {
    labelCol: {
      span: 6
    },
    items: [
      {
        title: '节点名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入节点名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '节点名称'
          }
        }
      },

      {
        title: '父节点',
        name: 'parentNodes',
        span: 24,
        formOption: {
          type: '$select',
          props: {
            options: getNodesSelect(),
            multiple: true,
            placeholder: '父节点'
          }
        }
      },
      {
        title: '节点描述',
        name: 'description',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '节点描述'
          }
        }
      },
      {
        title: '验证账户',
        name: 'authId',
        span: 24,
        formOption: {
          type: '$select',
          props: {
            request: getAuthList,
            rowKey: 'value',
            placeholder: '验证账户',
            selectRecord: true
          }
        }
      },
      {
        title: '分支标识码',
        name: 'branchingIdentifier',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '分支标识码'
          }
        }
      },
      {
        title: '接口类型',
        name: 'syncTerminal',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择接口类型!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            onSelectChange: onSyncTerminalChange,
            options: [
              {
                label: 'SDK',
                value: 'SDK',
                id: 'SDK'
              },
              {
                label: 'HTTP',
                value: 'HTTP',
                id: 'HTTP'
              },
              {
                label: 'BRIDGE',
                value: 'BRIDGE',
                id: 'BRIDGE'
              }
            ],
            placeholder: '接口类型'
          }
        }
      },
      {
        title: '访问接口',
        name: 'destinationIdentifier',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择访问接口!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            request: syncTerminal === 'SDK' ? getSDKList : syncTerminal === 'HTTP' ? getHttpList : getBridgeList,
            rowKey: 'value',
            selectRecord: true,
            placeholder: '访问接口'
          }
        }
      },
      {
        title: '访问方式',
        name: 'accessType',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择访问方式!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            options: [
              {
                label: '获取数据',
                value: 'true',
                id: 'FETCH'
              },
              {
                label: '推送数据',
                value: 'false',
                id: 'PULL'
              }
            ],
            selectRecord: true,
            placeholder: '访问方式'
          }
        }
      }
    ]
  };
};
const getContainerButtons = ({
  handleTaskSave,
  saveLoading
}): Array<ActionButtonProps> => {
  return [
    {
      text: '保存',
      key: 'save',
      loading: saveLoading,
      icon: <SaveWhite />,
      disabled: saveLoading,
      hidden: false,
      location: 'left',
      // needConfirm: true,
      // confirmText:
      //   '在保存的过程中将会清除不会生效的数据,请检查配置过程中的相关开关是否打开。',
      handleClick: () => {
        handleTaskSave();
      }
    }
  ];
};
export {
  getTableColumns,
  getActionButtons,
  getTaskEditForm,
  getContainerButtons,
  getNodeEditForm
};
