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
  ActiveBlue
} from '@/components/el/ElIcon';
import { isEmpty } from 'ramda';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '角色名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '角色代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '角色启用状态',
    // width: 100,
    align: 'center',
    dataIndex: 'enabled',
    render: (value: boolean, record: any) => {
      return value ? '启用' : '停用';
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '角色名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '角色名称'
        }
      }
    },
    {
      title: '角色代码',
      name: 'code',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '角色代码'
        }
      }
    },
    {
      title: '角色启用状态',
      name: 'enabled',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          options: [
            {
              id: 'active',
              label: '启用',
              value: true
            },
            {
              id: 'close',
              label: '停用',
              value: false
            },
            {
              id: 'all',
              label: '全部',
              value: ''
            }
          ],
          placeholder: '角色启用状态'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  roletriggerLoading,
  triggerActive
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
    },
    {
      text: '批量启用',
      key: 'triggerActive',
      icon: <ActiveBlue />,
      disabled: roletriggerLoading,
      loading: roletriggerLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        triggerActive(selectedRowKeys, true)
    },
    {
      text: '批量禁用',
      key: 'triggerDisabled',
      icon: <ActiveBlue />,
      disabled: roletriggerLoading,
      loading: roletriggerLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        triggerActive(selectedRowKeys, false)
    }
  ];
};
const getEditForm = (isEdit): ElFormProps => {
  return {
    labelCol: {
      span: 6
    },
    items: [
      {
        title: '角色代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入用户姓名!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '角色代码',
            disabled: isEdit
          }
        }
      },
      {
        title: '角色名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入用户姓名!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '角色名称'
          }
        }
      },
      {
        title: '角色启用状态',
        name: 'enabled',
        span: 24,
        formOption: {
          type: '$switch',
          props: {
            placeholder: '角色启用状态'
          }
        }
      }
    ]
  };
};

export {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
};
