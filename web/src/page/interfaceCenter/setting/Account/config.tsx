import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: 'appKey',
    align: 'center',
    dataIndex: 'appKey'
  },
  {
    title: 'appSecret',
    align: 'center',
    dataIndex: 'appSecret'
  },
  {
    title: '认证方式',
    align: 'center',
    dataIndex: 'authMethod'
  },
  {
    title: '品牌编码',
    align: 'center',
    dataIndex: 'buCode'
  },
  {
    title: '是否加密',
    align: 'center',
    dataIndex: 'isEncrypt',
    render: (value) => {
      return value ? '是' : '否';
    }
  },
  {
    title: '加密方式',
    align: 'center',
    dataIndex: 'encryptMethod'
  },
  {
    title: '用户名',
    align: 'center',
    dataIndex: 'username'
  },
  {
    title: '密码',
    align: 'center',
    dataIndex: 'password'
  },
  {
    title: '平台编码',
    align: 'center',
    dataIndex: 'platFormCode'
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '品牌编码',
      name: 'buCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '品牌编码'
        }
      }
    },
    {
      title: '平台编码',
      name: 'platFormCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '平台编码'
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
        title: 'appKey',
        name: 'appKey',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: 'appKey',
            disabled: isEdit
          }
        }
      },
      {
        title: 'appSecret',
        name: 'appSecret',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: 'appSecret'
          }
        }
      },
      {
        title: '认证方式',
        name: 'authMethod',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择认证方式!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            placeholder: '认证方式',
            options: [
              {
                id: 'NONE',
                label: 'NONE',
                value: 'NONE'
              },
              {
                id: 'BASIC',
                label: 'BASIC',
                value: 'BASIC'
              },
              {
                id: 'OAUTH2',
                label: 'OAUTH2',
                value: 'OAUTH2'
              }
            ]
          }
        }
      },

      {
        title: '品牌编码',
        name: 'buCode',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '品牌编码'
          }
        }
      },
      {
        title: '是否加密',
        name: 'isEncrypt',
        span: 24,
        formOption: {
          type: '$switch',
          props: {
            placeholder: '是否加密'
          }
        }
      },
      {
        title: '加密方式',
        name: 'encryptMethod',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '加密方式'
          }
        }
      },
      {
        title: '用户名',
        name: 'username',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '用户名'
          }
        }
      },
      {
        title: '密码',
        name: 'password',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '密码'
          }
        }
      },
      {
        title: '平台编码',
        name: 'platFormCode',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入平台编码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '平台编码'
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
