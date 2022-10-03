import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '客户端ID',
    align: 'center',
    width: 100,
    dataIndex: 'clientId'
  },
  {
    title: '授权资源',
    align: 'center',
    dataIndex: 'resourceIds'
  },
  {
    title: '客户端秘钥',
    // width: 100,
    align: 'center',
    dataIndex: 'clientSecret'
  },
  {
    title: '授权范围',
    // width: 100,
    align: 'center',
    dataIndex: 'scope'
  },

  {
    title: '授权类型',
    // width: 100,
    align: 'center',
    dataIndex: 'authorizedGrantTypes'
  },
  {
    title: '回调地址',
    width: 300,
    align: 'center',
    dataIndex: 'webServerRedirectUri'
  },
  {
    title: '授权角色',
    // width: 100,
    align: 'center',
    dataIndex: 'authorities'
  },
  {
    title: '令牌有效期(秒)',
    width: 100,
    align: 'center',
    dataIndex: 'accessTokenValidity'
  },
  {
    title: '刷新令牌有效期(秒)',
    width: 100,
    align: 'center',
    dataIndex: 'refreshTokenValidity'
  },
  {
    title: '附加信息',
    // width: 100,
    align: 'center',
    dataIndex: 'additionalInformation'
  },
  {
    title: '自动授权',
    // width: 100,
    align: 'center',
    dataIndex: 'autoApprove'
  }
  // {
  //   title: 'hdFlag',
  //   // width: 100,
  //   align: 'center',
  //   dataIndex: 'hdFlag',
  //   render: (value: boolean) => {
  //     return value ? '是' : '否';
  //   }
  // }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '客户端ID',
      name: 'clientId',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '客户端ID'
        }
      }
    },
    {
      title: '授权范围',
      name: 'scope',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '授权范围'
        }
      }
    },
    {
      title: '授权类型',
      name: 'authorizedGrantTypes',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '授权类型'
        }
      }
    },
    {
      title: '授权资源',
      name: 'resourceIds',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '授权资源'
        }
      }
    },
    {
      title: '回调地址',
      name: 'webServerRedirectUri',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '回调地址'
        }
      }
    },
    {
      title: '授权角色',
      name: 'authorities',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '授权角色'
        }
      }
    },
    {
      title: '附加信息',
      name: 'additionalInformation',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '附加信息'
        }
      }
    },
    {
      title: '自动授权',
      name: 'autoApprove',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '自动授权'
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
        title: '客户端ID',
        name: 'clientId',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入客户端ID!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.clientId,
            placeholder: '客户端ID'
          }
        }
      },
      {
        title: '授权资源',
        name: 'resourceIds',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '授权资源'
          }
        }
      },
      {
        title: '客户端秘钥',
        name: 'clientSecret',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入客户端秘钥!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '客户端秘钥'
          }
        }
      },
      {
        title: '授权范围',
        name: 'scope',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '授权范围'
          }
        }
      },
      {
        title: '授权类型',
        name: 'authorizedGrantTypes',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '授权类型'
          }
        }
      },
      {
        title: '回调地址',
        name: 'webServerRedirectUri',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '授权码模式的回调地址'
          }
        }
      },
      {
        title: '授权角色',
        name: 'authorities',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '授权角色'
          }
        }
      },
      {
        title: '令牌有效期',
        name: 'accessTokenValidity',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '令牌有效期'
          }
        }
      },
      {
        title: '刷新令牌有效期',
        name: 'refreshTokenValidity',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '刷新令牌有效期'
          }
        }
      },
      {
        title: '附加信息',
        name: 'additionalInformation',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '附加信息'
          }
        }
      },
      {
        title: '自动授权',
        name: 'autoapprove',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '自动授权'
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
