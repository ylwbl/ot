import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, DeleteRed, EditBlue } from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '设置项编号',
    align: 'center',
    dataIndex: 'settingNo'
  },
  {
    title: '设置项名称',
    align: 'center',
    dataIndex: 'settingName'
  },
  {
    title: '设置项说明',
    // width: 100,
    align: 'center',
    dataIndex: 'settingDesc'
  },
  {
    title: '设置值',
    // width: 100,
    align: 'center',
    dataIndex: 'settingVal'
  },
  {
    title: '默认值',
    // width: 100,
    align: 'center',
    dataIndex: 'defVal'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '设置项编号',
      name: 'settingNo',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '设置项编号'
        }
      }
    },
    {
      title: '设置项名称',
      name: 'settingName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '设置项名称'
        }
      }
    },
    {
      title: '设置项说明',
      name: 'settingDesc',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '设置项说明'
        }
      }
    },
    {
      title: '设置值',
      name: 'settingVal',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '设置值'
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
        title: '设置项编号',
        name: 'settingNo',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入设置项编号!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '设置项编号'
          }
        }
      },
      {
        title: '设置项名称',
        name: 'settingName',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入设置项名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '设置项名称'
          }
        }
      },
      {
        title: '设置项说明',
        name: 'settingDesc',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入设置项说明!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '设置项说明'
          }
        }
      },
      {
        title: '设置值',
        name: 'settingVal',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '设置值'
          }
        }
      },
      {
        title: '默认值',
        name: 'defVal',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '默认值'
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
