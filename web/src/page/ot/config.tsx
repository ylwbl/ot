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
    dataIndex: 'name'
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
      key: 'copy',
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
        title: '测试用例名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入测试用例名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '测试用例名称'
          }
        }
      },
      {
        title: '测试用例JSON',
        name: 'schema',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入测试用例JSON!'
          }
        ],
        formOption: {
          type: '$json',
          props: {
            placeholder: '测试用例JSON'
          }
        }
      },
    ]
  };
};
export {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm
};
