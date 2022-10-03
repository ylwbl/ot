import { ElFormProps } from '@/components/el/ElForm';
import { httpGroupSelect, accountSelect } from './service';
import { AddBlue, DeleteRed, SaveWhite } from '@/components/el/ElIcon';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { ElEditTableColumns } from '@/components/el/ElEditTable';
const getResponseEditForm = (): ElFormProps => {
  return {
    labelCol: {
      span: 2
    },
    wrapperCol: {
      span: 20
    },
    items: [
      {
        title: '返回类型',
        name: 'responseType',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择返回类型!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            placeholder: '返回类型',
            options: [
              {
                label: 'JSON',
                value: 'JSON'
              },
              {
                label: 'XML',
                value: 'XML'
              }
            ],
            rowKey: 'value'
          }
        }
      },
      {
        title: '返回数据路径',
        name: 'responseDataPath',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '使用JsonPath表达式'
          }
        }
      },
      {
        title: '返回值参数',
        name: 'responseJson',
        span: 24,
        formOption: {
          type: '$textArea',
          props: {
            placeholder: '返回值参数',
            maxLength: 4096,
            autoSize: true
          }
        }
      }
    ]
  };
};
const getEditForm = ({ onSelectChange, authMethod }): ElFormProps => {
  return {
    labelCol: {
      span: 6
    },
    items: [
      {
        title: '接口分组',
        name: 'groupId',
        span: 6,
        rules: [
          {
            required: true,
            message: '请选择接口分组!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            placeholder: '接口分组',
            request: httpGroupSelect,
            rowKey: 'value'
          }
        }
      },
      {
        title: '接口代码',
        name: 'code',
        span: 6,
        rules: [
          {
            required: true,
            message: '请输入接口代码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '接口代码'
          }
        }
      },
      {
        title: '接口名称',
        name: 'name',
        span: 6,
        rules: [
          {
            required: true,
            message: '请输入接口名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '接口名称'
          }
        }
      },
      {
        title: '请求方式',
        name: 'requestMethod',
        span: 6,
        rules: [
          {
            required: true,
            message: '请选择请求方式!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            placeholder: '请求方式',
            options: [
              {
                id: 'POST',
                label: 'POST',
                value: 'POST'
              },
              {
                id: 'GET',
                label: 'GET',
                value: 'GET'
              }
            ]
          }
        }
      },
      {
        title: '接口地址',
        name: 'url',
        span: 6,
        rules: [
          {
            required: true,
            message: '请输入接口地址!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '接口地址(以http://或https://开头)'
          }
        }
      },
      {
        title: '认证方式',
        name: 'authMethod',
        span: 6,
        rules: [
          {
            required: true,
            message: '请选择认证方式!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            onSelectChange: onSelectChange,
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
      (authMethod === 'BASIC' || authMethod === 'OAUTH2') && {
        title: '验证账户',
        name: 'authId',
        span: 6,
        formOption: {
          type: '$select',
          props: {
            placeholder: '验证账户',
            request: accountSelect,
            rowKey: 'value'
          }
        }
      }
    ]
  };
};
const getActionButtons = ({ handleSave }): Array<ActionButtonProps> => {
  return [
    {
      text: '保存',
      key: 'save',
      icon: <SaveWhite />,
      disabled: false,
      hidden: false,
      location: 'left',
      // needConfirm: true,
      // confirmText:
      //   '在保存的过程中将会清除不会生效的数据,请检查配置过程中的相关开关是否打开。',
      handleClick: () => {
        handleSave();
      }
    }
  ];
};
const getFormColumns: () => Array<ElEditTableColumns> = () => {
  return [
    {
      title: '参数名',
      width: 100,
      dataIndex: 'paramName',
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'paramName'
        };
      }
    },
    {
      title: '参数类型',
      width: 100,
      dataIndex: 'paramType',
      editable: true,
      rule: {
        required: true
      },
      field: (text) => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'paramType'
        };
      }
    },
    {
      title: '参数描述',
      width: 100,
      dataIndex: 'paramDesc',
      editable: true,
      //   rule: {
      //     required: true
      //   },
      field: (text) => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'paramDesc'
        };
      }
    }
  ];
};
const getHeadColumns: () => Array<ElEditTableColumns> = () => {
  return [
    {
      title: '参数名',
      width: 100,
      dataIndex: 'paramName',
      editable: true,
      rule: {
        required: true
      },
      field: () => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'paramName'
        };
      }
    },
    {
      title: '参数值',
      width: 100,
      dataIndex: 'paramValue',
      editable: true,
      rule: {
        required: true
      },
      field: (text) => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'paramValue'
        };
      }
    },
    {
      title: '参数描述',
      width: 100,
      dataIndex: 'paramDesc',
      editable: true,
      //   rule: {
      //     required: true
      //   },
      field: (text) => {
        return {
          formOption: {
            type: '$input',
            props: {}
          },
          name: 'paramDesc'
        };
      }
    }
  ];
};
const getHeadButtons = ({ addRow, deleteRow }): Array<ActionButtonProps> => {
  return [
    {
      key: 'add',
      text: '新增',
      location: 'left',
      icon: <AddBlue />,
      handleClick: () => {
        addRow('head');
      }
    },
    {
      key: 'delete',
      text: '删除',
      icon: <DeleteRed />,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => {
        deleteRow('head', selectedRowKeys);
      }
    }
  ];
};
const getFormButtons = ({ addRow, deleteRow }): Array<ActionButtonProps> => [
  {
    key: 'add',
    text: '新增',
    location: 'left',
    icon: <AddBlue />,
    handleClick: () => {
      addRow('form');
    }
  },
  {
    key: 'delete',
    text: '删除',
    icon: <DeleteRed />,
    location: 'left',
    handleClick: ({ selectedRowKeys }) => {
      deleteRow('form', selectedRowKeys);
    }
  }
];
export {
  getEditForm,
  getActionButtons,
  getFormColumns,
  getHeadColumns,
  getHeadButtons,
  getFormButtons,
  getResponseEditForm
};
