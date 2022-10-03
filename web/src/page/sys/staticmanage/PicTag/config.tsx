import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, DeleteRed, EditBlue } from '@/components/el/ElIcon';
import { Tag } from 'antd';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '标签代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '标签名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '标签预览',
    align: 'center',
    dataIndex: 'colorHex',
    render: (value, record) => {
      return <Tag color={value}>{record.name}</Tag>;
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '标签代码',
      name: 'code',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '标签代码'
        }
      }
    },
    {
      title: '标签名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '标签名称'
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
      maxSelection: 1,
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
        title: '标签代码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入标签代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '标签代码'
          }
        }
      },
      {
        title: '标签名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入标签名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '标签名称'
          }
        }
      },
      {
        title: '标签颜色',
        name: 'colorHex',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择标签颜色!'
          }
        ],
        formOption: {
          type: '$color-picker',
          props: {
            placeholder: '标签颜色'
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
