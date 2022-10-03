import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '模板编码',
    align: 'center',
    dataIndex: 'templateCode'
  },
  {
    title: '模板名称',
    // width: 100,
    align: 'center',
    dataIndex: 'templateName'
  },
  {
    title: '模板内容',
    align: 'center',
    dataIndex: 'templateContent'
  },
  {
    title: '备注',
    // width: 100,
    align: 'center',
    dataIndex: 'remark'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '模板编码',
      name: 'templateCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '模板编码'
        }
      }
    },
    {
      title: '模板内容',
      name: 'templateContent',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '模板内容'
        }
      }
    },
    {
      title: '模板名称',
      name: 'templateName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '模板名称'
        }
      }
    }
  ]
};
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
    }
  ];
};
const getEditForm = ({ formData }): ElFormProps => {
  return {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    items: [
      {
        title: '模板名称',
        name: 'templateName',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入模板名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '模板名称'
          }
        }
      },
      {
        title: '模板内容',
        name: 'templateContent',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入模板内容!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '模板内容'
          }
        }
      },
      {
        title: '消息主题',
        name: 'topicCode',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择消息主题!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '消息主题'
          }
        }
      },
      {
        title: '备注',
        name: 'remark',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '备注'
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
