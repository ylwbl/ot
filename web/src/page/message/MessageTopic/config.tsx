import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '主题编码',
    align: 'center',
    dataIndex: 'topicCode'
  },
  {
    title: '主题名称',
    align: 'center',
    dataIndex: 'topicName'
  },
  {
    title: '项目标识',
    align: 'center',
    dataIndex: 'project'
  },
  {
    title: '业务标识',
    // width: 100,
    align: 'center',
    dataIndex: 'business'
  },
  {
    title: '业务单号标识',
    // width: 100,
    align: 'center',
    dataIndex: 'docCode'
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
      title: '主题名称',
      name: 'topicName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '主题名称'
        }
      }
    },
    {
      title: '项目标识',
      name: 'project',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '项目标识'
        }
      }
    },
    {
      title: '业务标识',
      name: 'business',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '业务标识'
        }
      }
    },
    {
      title: '业务单号标识',
      name: 'docCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '业务单号标识'
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
        title: '主题名称',
        name: 'topicName',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入主题名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '主题名称'
          }
        }
      },
      {
        title: '项目标识',
        name: 'project',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入项目标识!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '项目标识'
          }
        }
      },
      {
        title: '业务标识',
        name: 'business',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入业务标识!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '业务标识'
          }
        }
      },
      {
        title: '业务单号标识',
        name: 'docCode',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '业务单号标识'
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
