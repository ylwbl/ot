import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import {
  AddBlue,
  DeleteRed,
  EditBlue,
  ActiveBlue
} from '@/components/el/ElIcon';
import { getTemplateCategoryList } from './service';
import { udcLocal } from '@/utils/utils';
const { template_export } = udcLocal;
const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '模板分类',
    align: 'center',
    dataIndex: 'categoryName'
  },
  {
    title: '模板名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '模板编码',
    // width: 100,
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '导入数据限制',
    // width: 100,
    align: 'center',
    dataIndex: 'dataLimitPer'
  },
  {
    title: '并发导入阈值',
    // width: 100,
    align: 'center',
    dataIndex: 'asyncThreshold'
  },
  {
    title: '并发数量限制',
    // width: 100,
    align: 'center',
    dataIndex: 'concurrentLimit'
  },
  {
    title: '模板类型',
    // width: 100,
    align: 'center',
    dataIndex: 'export',
    render: (value) => {
      return template_export.getLabel(value);
    }
  },
  {
    title: '模板文件',
    dataIndex: 'fileCode',
    render: (value, record) => {
      return (
        <a
          download={record.fileName}
          href={`/coordinator/el-fsm-service/api/tmpl/file?fileCode=${value}`}
        >
          {record.fileName}
        </a>
      );
    }
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '模板分类',
      name: 'categoryId',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          request: getTemplateCategoryList,
          transfer: { label: 'name', value: 'id' },
          placeholder: '模板分类'
        }
      }
    },
    {
      title: '模板类型',
      name: 'export',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          placeholder: '请选择',
          options: template_export.data
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  triggerActive,
  deleteLoading,
  handleDelete,
  triggerLoading,
  editLoading,
  handleExport
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
      disabled: editLoading,
      loading: editLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => handleEdit(selectedRowKeys)
    },
    {
      text: '切换启用',
      key: 'active',
      icon: <ActiveBlue />,
      disabled: triggerLoading,
      loading: triggerLoading,
      hidden: false,
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => triggerActive(selectedRowKeys)
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
    },
    // {
    //   text: '导出',
    //   key: 'export',
    //   icon: <DeleteRed />,
    //   // disabled: deleteLoading,
    //   hidden: false,
    //   // minSelection: 1,
    //   // loading: deleteLoading,
    //   // needConfirm: true,
    //   // maxSelection: 1,
    //   location: 'left',
    //   handleClick: ({ selectedRowKeys }) => handleExport(selectedRowKeys)
    // },
  ];
};
const getEditForm = ({ formData }): ElFormProps => {
  return {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    items: [
      {
        title: '模板分类',
        name: 'categoryId',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入模板分类!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            request: getTemplateCategoryList,
            transfer: { label: 'name', value: 'id' },
            placeholder: '模板分类'
          }
        }
      },
      {
        title: '模板名称',
        name: 'name',
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
            placeholder: '模板名称'
          }
        }
      },
      {
        title: '模板编码',
        name: 'code',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入模板编码!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            disabled: formData.id,
            placeholder: '模板编码'
          }
        }
      },
      {
        title: '导入数据限制',
        name: 'dataLimitPer',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入导入数据限制!'
          }
        ],
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '导入数据限制'
          }
        }
      },
      {
        title: '并发导入阈值',
        name: 'asyncThreshold',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入并发导入阈值!'
          }
        ],
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '并发导入阈值'
          }
        }
      },
      {
        title: '并发数量限制',
        name: 'concurrentLimit',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入并发数量限制!'
          }
        ],
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '并发数量限制'
          }
        }
      },
      {
        title: '模板类型',
        name: 'export',
        span: 24,
        formOption: {
          type: '$select',
          props: {
            placeholder: '请选择模板类型',
            options: template_export.data
          }
        },
        rules: [
          {
            required: true,
            message: '请选择模板类型!'
          }
        ],
      },
      {
        title: '头部所占行数',
        name: 'headRow',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入头部所占行数!'
          }
        ],
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '头部以下都是数据部分'
          }
        }
      },
      {
        title: '数据字段所在行',
        name: 'fieldTypeRow',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入数据字段所在行!'
          }
        ],
        formOption: {
          type: '$inputNumber',
          props: {
            placeholder: '请输入数据字段所在行'
          }
        }
      },
      {
        title: '文件上传',
        name: 'fileCode',
        span: 24,
        formOption: {
          type: '$template-upload',
          props: {
            placeholder: '文件上传'
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
