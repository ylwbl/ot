import React from 'react';
import { ElContainerProps } from '@/components/el/ElRowContainer';
import {
  AddWhite,
  EditWhite,
  DeleteRed,
  DeleteWhite
} from '@/components/el/ElIcon';
import { ElFormProps } from '@/components/el/ElForm';
import { isEmpty } from 'ramda';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '操作代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '操作名称',
    // width: 100,
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '操作路由',
    // width: 100,
    align: 'center',
    dataIndex: 'pattern'
  },
  {
    title: '操作类型',
    // width: 100,
    align: 'center',
    dataIndex: 'httpMethod'
  }
  // {
  //   title: '排列序号',
  //   // width: 100,
  //   align: 'center',
  //   dataIndex: 'sortNo'
  // }
];

const getTableActionButtons = ({
  handleActionCreate,
  handleActionEdit,
  selectedNode,
  handleDeleteActions,
  deleteActionLoading
}): Array<ActionButtonProps> => {
  return [
    {
      text: '新增操作',
      key: 'create',
      icon: <AddBlue />,
      disabled: isEmpty(selectedNode),
      hidden: false,
      location: 'left',
      handleClick: handleActionCreate
    },
    {
      text: '编辑操作',
      key: 'edit',
      icon: <EditBlue />,
      disabled: isEmpty(selectedNode),
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRows }) => handleActionEdit(selectedRows)
    },
    {
      text: '删除操作',
      key: 'delete',
      icon: <DeleteRed />,
      disabled: isEmpty(selectedNode) || deleteActionLoading,
      loading: deleteActionLoading,
      hidden: false,
      needConfirm: true,
      confirmText: '你确定要删除吗?',
      minSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => handleDeleteActions(selectedRowKeys)
    }
  ];
};
const getActionButtons = ({
  handleMenuCreate,
  handleMenuEdit,
  handleDeleteMenuOne,
  deleteMenuOneLoading,
  selectedNode,
  menuEditButtonLoading
}): Array<ElContainerProps> => {
  return [
    {
      text: '新增应用',
      key: 'create',
      icon: <AddWhite />,
      disabled: false,
      hidden: false,
      type: 'primary',
      handleClick: handleMenuCreate
    },
    {
      text: '编辑应用',
      key: 'edit',
      icon: <EditWhite />,
      loading: menuEditButtonLoading,
      disabled: isEmpty(selectedNode) || menuEditButtonLoading,
      hidden: false,
      type: 'primary',
      handleClick: handleMenuEdit
    },
    {
      text: '删除应用',
      key: 'edit',
      icon: <DeleteWhite />,
      loading: deleteMenuOneLoading,
      disabled: isEmpty(selectedNode) || deleteMenuOneLoading,
      hidden: false,
      needConfirm: true,
      confirmText: '你确定要删除吗?',
      danger: true,
      type: 'primary',
      handleClick: handleDeleteMenuOne
    }
  ];
};
const getMenuEditForm = (): ElFormProps => {
  return {
    items: [
      {
        title: '应用代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入应用代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '应用代码'
          }
        }
      },
      {
        title: '应用名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入应用名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '应用名称'
          }
        }
      },
      {
        title: '应用路由',
        name: 'pattern',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入应用路由!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '应用路由'
          }
        }
      }
    ]
  };
};
const getActionEditForm = (isEdit): ElFormProps => {
  return {
    items: [
      {
        title: '操作代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入操作代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '操作代码'
          }
        }
      },
      {
        title: '操作名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入操作名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '操作名称'
          }
        }
      },
      {
        title: '操作路由',
        name: 'pattern',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '操作路由'
          }
        }
      },
      {
        title: '操作类型',
        name: 'httpMethod',
        span: 24,
        formOption: {
          type: '$udc',
          props: {
            placeholder: '操作类型',
            prefixStr: '/yst-system',
            domain: 'COM',
            udc: 'METH_HTTP'
          }
        }
      }
    ]
  };
};
export {
  getTableColumns,
  getTableActionButtons,
  getActionButtons,
  getActionEditForm,
  getMenuEditForm
};
