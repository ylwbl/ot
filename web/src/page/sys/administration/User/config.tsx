import React from 'react';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { Switch } from 'antd';
import { getDataRoles, getWorkflowRoles } from './service';
import {
  AddBlue,
  EditBlue,
  RefreshBlue,
  ActiveBlue
} from '@/components/el/ElIcon';
const getTableColumns = ({
  onActiveChange,
  triggerLoading
}): Array<ElSearchTableColumns> => [
    {
      title: '是否启用',
      // width: 100,
      align: 'center',
      dataIndex: 'enabled',
      render: (value, record) => {
        return (
          <Switch
            checked={value}
            loading={triggerLoading}
            onChange={(value, e) => {
              onActiveChange(value, record, e);
            }}
          />
        );
      }
    },
    {
      title: '用户账号',
      align: 'center',
      dataIndex: 'username'
    },
    {
      title: '用户姓名',
      align: 'center',
      dataIndex: 'firstName'
    },
    {
      title: '用户别名',
      // width: 100,
      align: 'center',
      dataIndex: 'lastName'
    },
    {
      title: '手机号码',
      // width: 100,
      align: 'center',
      dataIndex: 'mobile'
    },
    {
      title: '电子邮箱',
      // width: 100,
      align: 'center',
      dataIndex: 'email'
    },
    {
      title: '应用角色',
      // width: 100,
      align: 'center',
      dataIndex: 'roleNames'
    },
    {
      title: '数据角色',
      // width: 100,
      align: 'center',
      dataIndex: 'dataRoleNames'
    },
    {
      title: '流程角色',
      // width: 100,
      align: 'center',
      dataIndex: 'flowRoleNames'
    }
  ];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '用户账号',
      name: 'username',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '用户账号'
        }
      }
    },
    {
      title: '用户姓名',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '用户姓名'
        }
      }
    },
    {
      title: '手机号码',
      name: 'mobile',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '手机号码'
        }
      }
    },
    {
      title: '是否启用',
      name: 'enabled',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          placeholder: '是否启用',
          options: [
            { id: 'true', label: '启用', value: true },
            { id: 'false', label: '停用', value: false },
            { id: 'all', label: '全部', value: '' }
          ]
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  userEditLoading,
  triggerActive,
  usertriggerLoading,
  resetLoading,
  resetPassword
}): Array<ActionButtonProps> => {
  return [
    {
      text: '新增',
      key: 'create',
      icon: <AddBlue />,
      disabled: false,
      hidden: false,
      authCode: 'create',
      location: 'left',
      handleClick: handleCreate
    },
    {
      text: '编辑',
      key: 'edit',
      icon: <EditBlue />,
      disabled: userEditLoading,
      loading: userEditLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      authCode: 'edit',
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleEdit(selectedRowKeys, selectedRows)
    },
    {
      text: '切换启用',
      key: 'triggerActive',
      icon: <ActiveBlue />,
      disabled: usertriggerLoading,
      loading: usertriggerLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => triggerActive(selectedRowKeys)
    },
    {
      text: '重置密码',
      key: 'reset',
      icon: <RefreshBlue />,
      disabled: resetLoading,
      loading: resetLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => resetPassword(selectedRowKeys)
    }
  ];
};
const getEditForm = ({ roleList, formData }): ElFormProps => {
  return {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    items: [
      {
        title: '用户账号',
        name: 'username',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入用户账号!'
          },
          {
            validator: (rule, value) => {
              return new Promise((resolve, reject) => {
                const reg = / /g;
                if (reg.test(value)) {
                  reject('用户账号不能输入空格');
                } else {
                  resolve(null);
                }
              })
            }
          },
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '用户账号'
          }
        }
      },
      {
        title: '用户姓名',
        name: 'firstName',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入用户姓名!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '用户姓名'
          }
        }
      },
      {
        title: '用户别名',
        name: 'lastName',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '用户别名'
          }
        }
      },
      {
        title: '手机号码',
        name: 'mobile',
        span: 24,
        validateFirst: true,
        rules: [
          {
            required: true,
            message: '请输入手机号码!'
          },
          {
            validator: (rule, value) => {
              return new Promise((ressole, reject) => {
                const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                if (reg.test(value)) {
                  ressole(null);
                } else {
                  reject('您输入的手机号有误');
                }
              })
            }
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '手机号码',
            addonBefore: '+86'
          }
        }
      },
      {
        title: '电子邮箱',
        name: 'email',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '电子邮箱'
          }
        },
        rules: [
          {
            validator: (rule, value) => {
              return new Promise((ressole, reject) => {
                if (value) {
                  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                  if (reg.test(value)) {
                    ressole(null);
                  } else {
                    reject('您输入的电子邮箱有误');
                  }
                } else {
                  // value为空直接通过
                  ressole(null);
                }

              })
            }
          }
        ],
      },
      {
        title: '公司名称',
        name: 'ou',
        span: 24,
        formOption: {
          type: '$ou-popup',
          props: {
            multiple: false,
            placeholder: '公司名称'
          },
        }
      },
      {
        title: '应用角色',
        name: 'roleIds',
        span: 24,
        formOption: {
          type: '$select',
          props: {
            placeholder: '应用角色',
            options: roleList,
            multiple: true
          }
        }
      },
      {
        title: '数据角色',
        name: 'dataRoleIds',
        span: 24,
        formOption: {
          type: '$select',
          props: {
            placeholder: '数据角色',
            request: getDataRoles,
            transfer: {
              label: 'name',
              value: 'id'
            },
            multiple: true
          }
        }
      },
      {
        title: '流程角色',
        name: 'flowRoleIds',
        span: 24,
        formOption: {
          type: '$select',
          props: {
            placeholder: '流程角色',
            request: getWorkflowRoles,
            transfer: {
              label: 'name',
              value: 'id'
            },
            multiple: true
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
