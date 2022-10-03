import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { SaveWhite } from '@/components/el/ElIcon';
import { isEmpty } from 'ramda';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '角色名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '角色代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '角色启用状态',
    // width: 100,
    align: 'center',
    dataIndex: 'enabled',
    render: (value: boolean, record: any) => {
      return value ? '启用' : '停用';
    }
  }
];

const getDealMenuAction = ({
  tempSave,
  selectedNode
}): Array<ActionButtonProps> => {
  return [
    {
      text: '暂存',
      key: 'tempSave',
      icon: <SaveWhite />,
      disabled: isEmpty(selectedNode),
      hidden: false,
      location: 'left',
      handleClick: () => {
        tempSave();
      }
    }
  ];
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
      needConfirm: true,
      confirmText:
        '在保存的过程中将会清除不会生效的数据,请检查配置过程中的相关开关是否打开。',
      handleClick: () => {
        handleSave();
      }
    }
  ];
};
const getBaseEditForm = ({ onCheckboxChange, type, data }): ElFormProps => {
  return {
    items: [
      {
        title: '全部数据',
        name: 'isPermitAll',
        span: 6,
        formOption: {
          type: '$check-switch',
          props: {
            onCheckboxChange: (checked) => {
              onCheckboxChange(type, 'isPermitAll', checked);
            }
          }
        }
      },
      {
        name: 'noData',
        span: 18,
        formOption: {
          render: () => {
            return <></>;
          }
        }
      },
      {
        title: '人员数据',
        name: 'empAuthEnable',
        span: 6,
        formOption: {
          type: '$check-switch',
          props: {
            disabled: data.isPermitAll,
            onCheckboxChange: (checked) => {
              onCheckboxChange(type, 'empAuthEnable', checked);
            }
          }
        }
      },
      {
        name: 'empAuthScope',
        span: 6,
        formOption: {
          type: '$select',
          props: {
            disabled: !data.empAuthEnable,
            options: [
              {
                id: 'ALL',
                label: '全部',
                value: 'ALL'
              },
              {
                id: 'SELF',
                label: '本人数据',
                value: 'SELF'
              },
              {
                id: 'SELF_CHILDES',
                label: '本人及下级数据',
                value: 'SELF_CHILDES'
              }
            ],
            placeholder: '可见数据类型'
          }
        }
      },
      {
        title: '自定义人员',
        name: 'empCustomizeEnable',
        span: 6,
        formOption: {
          type: '$check-switch',
          props: {
            disabled: !data.empAuthEnable,
            onCheckboxChange: (checked) => {
              onCheckboxChange(type, 'empCustomizeEnable', checked);
            }
          }
        }
      },
      {
        name: 'empCustomize',
        span: 6,
        formOption: {
          type: '$emp-popup',
          props: {
            multiple: true,
            showSuffix: true,
            placeholder: '自定义人员列表,可多选',
            disabled: !data.empCustomizeEnable
          }
        }
      },
      {
        title: '组织数据',
        name: 'buAuthEnable',
        span: 6,
        formOption: {
          type: '$check-switch',
          props: {
            disabled: data.isPermitAll,
            onCheckboxChange: (checked) => {
              onCheckboxChange(type, 'buAuthEnable', checked);
            }
          }
        }
      },
      {
        name: 'buAuthScope',
        span: 6,
        formOption: {
          type: '$select',
          props: {
            disabled: !data.buAuthEnable,
            options: [
              {
                id: 'ALL',
                label: '全部',
                value: 'ALL'
              },
              {
                id: 'SELF',
                label: '本级组织',
                value: 'SELF'
              },
              {
                id: 'SELF_CHILDES',
                label: '本级及下级组织',
                value: 'SELF_CHILDES'
              }
            ],
            placeholder: '可见数据类型'
          }
        }
      },
      {
        title: '自定义组织',
        name: 'buCustomizeEnable',
        span: 6,
        formOption: {
          type: '$check-switch',
          props: {
            disabled: !data.buAuthEnable,
            onCheckboxChange: (checked) => {
              onCheckboxChange(type, 'buCustomizeEnable', checked);
            }
          }
        }
      },
      {
        name: 'buCustomize',
        span: 6,
        formOption: {
          type: '$bu-popup',
          props: {
            disabled: !data.buCustomizeEnable,
            showSuffix: true,
            multiple: true,
            placeholder: '自定义组织列表,可多选'
          }
        }
      },
      {
        title: '公司数据',
        name: 'ouAuthEnable',
        span: 6,
        formOption: {
          type: '$check-switch',
          props: {
            disabled: data.isPermitAll,
            onCheckboxChange: (checked) => {
              onCheckboxChange(type, 'ouAuthEnable', checked);
            }
          }
        }
      },
      {
        name: 'ouCustomize',
        span: 6,
        formOption: {
          type: '$ou-popup',
          props: {
            disabled: !data.ouAuthEnable,
            showSuffix: true,
            multiple: true,
            placeholder: '自定义公司列表,可多选'
          }
        },
        // rules: [
        //   {
        //     validator: (rule, value) => {
        //       return new Promise((resolve, reject) => {
        //         if (value?.length) {
        //           resolve(null);
        //         } else {
        //           reject('不能为空')
        //         }
        //       });
        //     }
        //   }
        // ]
      },
    ]
  };
};

const getEditForm = (isEdit): ElFormProps => {
  return {
    labelCol: {
      span: 8
    },
    items: [
      {
        title: '角色代码',
        name: 'code',
        span: 6,
        rules: [
          {
            required: true,
            message: '请输入用户姓名!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '角色代码',
            disabled: isEdit
          }
        }
      },
      {
        title: '角色名称',
        name: 'name',
        span: 6,
        rules: [
          {
            required: true,
            message: '请输入用户姓名!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '角色名称'
          }
        }
      },
      {
        title: '角色启用状态',
        name: 'enabled',
        span: 6,
        formOption: {
          type: '$switch',
          props: {
            placeholder: '角色启用状态'
          }
        }
      },
      {
        title: '是否启用高级授权',
        name: 'advancedEnable',
        span: 6,
        formOption: {
          // render: () => {
          //   return <Checkbox>启用高级授权</Checkbox>;
          // },
          type: '$switch'
        }
      }
    ]
  };
};

export { getActionButtons, getEditForm, getBaseEditForm, getDealMenuAction };
