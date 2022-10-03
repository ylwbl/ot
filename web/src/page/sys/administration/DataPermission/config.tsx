import React from 'react';
import {
  ActionButtonProps,
  ElSearchTableColumns
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { Switch } from 'antd';
import {
  AddBlue,
  EditBlue,
  RefreshBlue,
  ActiveBlue
} from '@/components/el/ElIcon';
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '字段编码',
    align: 'center',
    dataIndex: 'fieldCode'
  },
  {
    title: '字段描述',
    align: 'center',
    dataIndex: 'fieldCaption'
  },
  {
    title: '物理字段类型',
    // width: 100,
    align: 'center',
    dataIndex: 'fieldType'
  },
  {
    title: '逻辑字段类型',
    // width: 100,
    align: 'center',
    dataIndex: 'fieldUdcType'
  },
  {
    title: '是否必填',
    // width: 100,
    align: 'center',
    dataIndex: 'isRequired'
  },

  {
    title: 'udc领域码',
    // width: 100,
    align: 'center',
    dataIndex: 'udcDomainCode'
  },
  {
    title: 'udc码',
    // width: 100,
    align: 'center',
    dataIndex: 'udcCode'
  },
  {
    title: 'udc描述',
    // width: 100,
    align: 'center',
    dataIndex: 'udcDesc'
  },
  {
    title: '字段长度',
    // width: 100,
    align: 'center',
    dataIndex: 'fieldLength'
  },
  {
    title: '字段精度',
    // width: 100,
    align: 'center',
    dataIndex: 'fieldPrecision'
  },
  {
    title: '最大长度',
    // width: 100,
    align: 'center',
    dataIndex: 'maxLength'
  },
  {
    title: '最小长度',
    // width: 100,
    align: 'center',
    dataIndex: 'minLength'
  },
  {
    title: '移动端页面元素类型',
    // width: 100,
    align: 'center',
    dataIndex: 'mobileElement'
  },
  {
    title: '移动端页面标签',
    // width: 100,
    align: 'center',
    dataIndex: 'mobileLabel'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '字段编码',
      name: 'fieldCode',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '字段编码'
        }
      }
    },
    {
      title: '逻辑字段类型',
      name: 'fieldUdcType',
      span: 6,
      formOption: {
        type: '$udc',
        props: {
          placeholder: '逻辑字段类型',
          prefixStr: '/yst-system',
          domain: 'META',
          udc: 'FLDTYPE'
        }
      }
    }
    // {
    //   title: '逻辑类型',
    //   name: 'fieldUdcType',
    //   span: 6,
    //   formOption: {
    //     type: '$udc',
    //     props: {
    //       placeholder: '逻辑类型',
    //       prefixStr: '/yst-system',
    //       domain: 'META',
    //       udc: 'FLDTYPE'
    //     }
    //   }
    // }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  dataPermissionEditLoading
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
      disabled: dataPermissionEditLoading,
      loading: dataPermissionEditLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      authCode: 'edit',
      location: 'left',
      handleClick: ({ selectedRowKeys, selectedRows }) =>
        handleEdit(selectedRowKeys, selectedRows)
    }
  ];
};
const getEditForm = ({
  action,
  dataSetList,
  tableList,
  fieldList,
  formData,
  getSchemaLoading,
  selectedTableLoading,
  selectedSchemaLoading,
  onFieldUdcTypeChange,
  onSchemaChange,
  onTableChange
}): ElFormProps => {
  if (action === '新增') {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      items: [
        {
          title: '数据库',
          name: 'schema',
          span: 24,
          rules: [
            {
              required: true,
              message: '请选择数据库!'
            }
          ],
          formOption: {
            type: '$select',
            props: {
              options: dataSetList,
              onSelectChange: onSchemaChange,
              disabled: getSchemaLoading,
              placeholder: '数据库'
            }
          }
        },
        {
          title: '物理表',
          name: 'tableCode',
          span: 24,
          rules: [
            {
              required: true,
              message: '请选择物理表!'
            }
          ],
          formOption: {
            type: '$select',
            props: {
              options: tableList,
              disabled: selectedSchemaLoading,
              placeholder: '请先选择数据库',
              onSelectChange: onTableChange,
              selectRecord: true
            }
          }
        },
        {
          title: '字段名',
          name: 'fieldCode',
          span: 24,
          rules: [
            {
              required: true,
              message: '请选择字段名!'
            }
          ],
          formOption: {
            type: '$select',
            props: {
              options: fieldList,
              disabled: selectedTableLoading,
              placeholder: '请先选择物理表',
              selectRecord: true
            }
          }
        },
        {
          title: '字段描述',
          name: 'fieldCaption',
          span: 24,
          formOption: {
            type: '$input',
            props: {
              placeholder: '字段描述'
            }
          }
        },
        {
          title: '字段默认值',
          name: 'defaultValue',
          span: 24,
          formOption: {
            type: '$input',
            props: {
              placeholder: '字段默认值'
            }
          }
        },
        {
          title: '所属领域',
          name: 'domainCode',
          span: 24,
          rules: [
            {
              required: true,
              message: '请选择所属领域!'
            }
          ],
          formOption: {
            type: '$udc',
            props: {
              placeholder: '所属领域',
              prefixStr: '/yst-system',
              domain: 'COM',
              udc: 'DOMAIN'
            }
          }
        },
        {
          title: '物理字段类型',
          name: 'fieldType',
          span: 24,
          // rules: [
          //   {
          //     required: true,
          //     message: '请输入手机号码!'
          //   }
          // ],
          formOption: {
            type: '$input',
            props: {
              placeholder: '物理字段类型'
            }
          }
        },
        {
          title: '逻辑字段类型',
          name: 'fieldUdcType',
          span: 24,
          rules: [
            {
              required: true,
              message: '请选择逻辑字段类型!'
            }
          ],
          formOption: {
            type: '$udc',
            props: {
              placeholder: '逻辑字段类型',
              prefixStr: '/yst-system',
              domain: 'META',
              udc: 'FLDTYPE',
              onSelectChange: onFieldUdcTypeChange
            }
          }
        }
      ]
    };
  } else {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      items: [
        {
          title: '字段名',
          name: 'fieldCode',
          span: 24,
          rules: [
            {
              required: true,
              message: '请输入字段名!'
            }
          ],
          formOption: {
            type: '$input',
            props: {
              placeholder: '字段名',
              disabled: true
            }
          }
        },
        {
          title: '字段描述',
          name: 'fieldCaption',
          span: 24,
          formOption: {
            type: '$input',
            props: {
              placeholder: '字段描述'
            }
          }
        },
        {
          title: '字段默认值',
          name: 'defaultValue',
          span: 24,
          formOption: {
            type: '$input',
            props: {
              placeholder: '字段默认值'
            }
          }
        },
        {
          title: '所属领域',
          name: 'domainCode',
          span: 24,
          rules: [
            {
              required: true,
              message: '请选择所属领域!'
            }
          ],
          formOption: {
            type: '$udc',
            props: {
              placeholder: '所属领域',
              prefixStr: '/yst-system',
              domain: 'COM',
              udc: 'DOMAIN'
            }
          }
        },
        {
          title: '物理字段类型',
          name: 'fieldType',
          span: 24,
          formOption: {
            type: '$input',
            props: {
              placeholder: '物理字段类型'
            }
          }
        },
        {
          title: '逻辑字段类型',
          name: 'fieldUdcType',
          span: 24,
          rules: [
            {
              required: true,
              message: '请选择逻辑字段类型!'
            }
          ],
          formOption: {
            type: '$udc',
            props: {
              placeholder: '逻辑字段类型',
              prefixStr: '/yst-system',
              domain: 'META',
              udc: 'FLDTYPE',
              onSelectChange: onFieldUdcTypeChange
            }
          }
        }
      ]
    };
  }
};
const getConfigEditForm = ({ fieldUdcType }): ElFormProps => {
  let fieldUdcTypeElement = [];
  if (fieldUdcType === 'UDC') {
    fieldUdcTypeElement = [
      {
        title: 'udc领域码',
        name: 'udcDomainCode',
        span: 12,
        formOption: {
          type: '$input',
          props: {
            placeholder: 'udc领域码'
          }
        }
      },
      {
        title: 'udc编码',
        name: 'udcCode',
        span: 12,
        formOption: {
          type: '$input',
          props: {
            placeholder: 'udc编码'
          }
        }
      }
    ];
  } else if (fieldUdcType === 'INT' || fieldUdcType === 'LINT') {
    fieldUdcTypeElement = [
      {
        title: '字段长度',
        name: 'fieldLength',
        span: 12,
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '字段长度'
          }
        }
      },
      {
        title: '字段精度',
        name: 'fieldPrecision',
        span: 12,
        formOption: {
          type: '$input',
          props: {
            placeholder: '字段精度'
          }
        }
      }
    ];
  }
  return {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    items: [...fieldUdcTypeElement]
  };
};
export {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm,
  getConfigEditForm
};
