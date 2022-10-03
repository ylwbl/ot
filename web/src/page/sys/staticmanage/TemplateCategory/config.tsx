import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, DeleteRed, EditBlue } from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '分类代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '分类名称',
    align: 'center',
    dataIndex: 'name'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '分类代码',
      name: 'code',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '分类代码'
        }
      }
    },
    {
      title: '分类名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '分类名称'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  deleteLoading,
  handleDelete
}): Array<ActionButtonProps> => {
  return [
    {
      text: '新增',
      key: 'create',
      icon: <AddBlue />,
      disabled: false,
      hidden: false,
      location: 'left',
      handleClick: () => handleCreate()
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
      disabled: deleteLoading,
      hidden: false,
      minSelection: 1,
      loading: deleteLoading,
      needConfirm: true,
      // maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => handleDelete(selectedRowKeys)
    }
  ];
};
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
            disabled: formData.id,
            placeholder: '分类代码'
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
