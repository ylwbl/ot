import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, DeleteRed, EditBlue, ShelvesCyan } from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '测试用例名称',
    // width: 100,
    align: 'center',
    dataIndex: 'valDesc'
  },
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  deleteLoading,
  handleDelete,
  copyLoading,
  handleCopy
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
    },
    {
      text: '复制',
      key: 'delete',
      icon: <ShelvesCyan />,
      disabled: copyLoading,
      hidden: false,
      minSelection: 1,
      loading: deleteLoading,
      needConfirm: true,
      // maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => handleCopy(selectedRowKeys)
    }
  ];
};
const getEditForm = ({ formData }): ElFormProps => {
  return {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    items: [
      {
        title: '产品代码',
        name: 'domainCode',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入产品代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '产品代码'
          }
        }
      },
      {
        title: '用户定义码',
        name: 'udcCode',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入用户定义码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '用户定义码'
          }
        }
      },
      {
        title: '定义码名称',
        name: 'udcName',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入定义码名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '定义码名称'
          }
        }
      },
      {
        title: '自定义代码',
        name: 'udcVal',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入自定义代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '自定义代码'
          }
        }
      },
      {
        title: '说明',
        name: 'valDesc',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入说明!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '说明'
          }
        }
      },
      {
        title: '硬编码',
        name: 'hdFlag',
        span: 24,
        formOption: {
          type: '$switch',
          props: {
            placeholder: '是否硬编码'
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
