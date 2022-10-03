import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, DeleteRed, EditBlue } from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '分组名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '分组代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '图标',
    align: 'center',
    dataIndex: 'icon'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '分组名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '分组名称'
        }
      }
    },
    {
      title: '分组代码',
      name: 'code',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '分组代码'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  deleteGroup,
  deleteLoading
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
      text: '删除',
      key: 'delete',
      icon: <DeleteRed />,
      loading: deleteLoading,
      hidden: false,
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      needConfirm: true,
      confirmText: '是否确定要删除?',
      handleClick: ({ selectedRowKeys }) => deleteGroup(selectedRowKeys)
    }
  ];
};
const getEditForm = ({ isEdit }): ElFormProps => {
  return {
    labelCol: {
      span: 6
    },
    items: [
      {
        title: '分组代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入分组代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: isEdit,
            placeholder: '分组代码'
          }
        }
      },
      {
        title: '分组名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入分组名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '分组名称'
          }
        }
      },
      {
        title: '图标',
        name: 'icon',
        span: 24,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入图标!'
        //   }
        // ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '图标'
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
