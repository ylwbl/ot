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
  GenerateBlue
} from '@/components/el/ElIcon';
import { ElEditTableColumns } from '@/components/el/ElEditTable';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '分组名称',
    align: 'center',
    dataIndex: 'groupName'
  },
  {
    title: '接口代码',
    align: 'center',
    dataIndex: 'code'
  },
  {
    title: '接口名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '请求方式',
    align: 'center',
    dataIndex: 'requestMethod'
  },
  {
    title: '接口地址',
    align: 'center',
    dataIndex: 'url'
  },
  {
    title: '认证方式',
    align: 'center',
    dataIndex: 'authMethod'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '分组名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '分组名称'
        }
      }
    },
    {
      title: '分组代码',
      name: 'code',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '分组代码'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  deleteHttp,
  deleteLoading,
  testInterface
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
      handleClick: ({ selectedRowKeys }) => handleEdit(selectedRowKeys)
    },
    {
      text: '删除',
      key: 'delete',
      icon: <DeleteRed />,
      loading: deleteLoading,
      hidden: false,
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      needConfirm: true,
      confirmText: '是否确定要删除?',
      handleClick: ({ selectedRowKeys }) => deleteHttp(selectedRowKeys)
    },
    {
      text: '测试接口',
      key: 'test',
      icon: <GenerateBlue />,
      hidden: false,
      location: 'left',
      minSelection: 1,
      maxSelection: 1,
      handleClick: ({ selectedRowKeys }) => testInterface(selectedRowKeys)
    }
  ];
};
const getTestColumns: () => Array<ElEditTableColumns> = () => {
  return [
    {
      title: '参数名',
      width: 100,
      dataIndex: 'key',
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
          name: 'key'
        };
      }
    },
    {
      title: '参数值',
      width: 100,
      dataIndex: 'value',
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
          name: 'value'
        };
      }
    }
  ];
};
const getTestButtons = ({ addRow, deleteRow }): Array<ActionButtonProps> => {
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
        deleteRow(selectedRowKeys);
      }
    }
  ];
};
export {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getTestColumns,
  getTestButtons
};
