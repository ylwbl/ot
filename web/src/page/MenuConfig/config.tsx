import React from 'react';
import { ElContainerProps } from '@/components/el/ElRowContainer';
import {
  AddWhite,
  EditWhite,
  DeleteRed,
  DeleteWhite
} from '@/components/el/ElIcon';
import { ElFormProps } from '@/components/el/ElForm';
import { isEmpty } from 'ramda';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { AddBlue, EditBlue } from '@/components/el/ElIcon';


const getActionButtons = ({
  handleMenuCreate,
  handleMenuEdit,
  handleDeleteMenuOne,
  deleteMenuOneLoading,
  selectedNode,
  menuEditButtonLoading
}): Array<ElContainerProps> => {
  return [
    {
      text: '新增',
      key: 'create',
      icon: <AddWhite />,
      disabled: false,
      hidden: false,
      type: 'primary',
      handleClick: handleMenuCreate
    },
    {
      text: '保存',
      key: 'save',
      icon: <AddWhite />,
      disabled: false,
      hidden: false,
      type: 'primary',
      handleClick: handleMenuCreate
    },
    {
      text: '删除',
      key: 'edit',
      icon: <DeleteWhite />,
      loading: deleteMenuOneLoading,
      disabled: isEmpty(selectedNode) || deleteMenuOneLoading,
      hidden: false,
      needConfirm: true,
      confirmText: '你确定要删除吗?',
      danger: true,
      type: 'primary',
      handleClick: handleDeleteMenuOne
    },
    {
      text: '变更配置',
      key: 'change',
      icon: <AddWhite />,
      disabled: false,
      hidden: false,
      type: 'primary',
      handleClick: handleMenuCreate
    }
  ];
};
const getMenuEditForm = (selectedNode): ElFormProps => {
  return {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
    items: [
      {
        title: '上级菜单',
        name: 'pMenu',
        span: 24,
        formOption: {
          type: '$text',
          // props: {
          //   placeholder: '应用代码'
          // }
        }
      },
      {
        title: '菜单名称',
        name: 'title',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入菜单名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '菜单名称'
          }
        }
      },
      {
        title: '菜单路由',
        name: 'path',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入菜单路由!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '菜单路由'
          }
        }
      },
      {
        title: '隐藏',
        name: 'hidden',
        span: 24,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入菜单路由!'
        //   }
        // ],
        formOption: {
          type: '$switch',
          props: {
            placeholder: '菜单路由'
          }
        }
      }
    ]
  };
};

const getMenuLogTableForm: ElFormProps = {
  items: [
    {
      title: '类别名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '类别名称'
        }
      }
    },
    {
      title: '类别描述',
      name: 'describe',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '类别描述'
        }
      }
    },
  ]
};
const getMenuLogTableColumns = (): Array<ElSearchTableColumns> => [
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
export {
  getActionButtons,
  getMenuEditForm,
  getMenuLogTableForm,
  getMenuLogTableColumns
};
