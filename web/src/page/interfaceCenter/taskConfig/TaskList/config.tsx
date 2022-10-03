import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import {
  ActiveBlue,
  AddBlue,
  BatchBlue,
  EditBlue,
  DeleteRed
} from '@/components/el/ElIcon';
import { ElEditTableColumns } from '@/components/el/ElEditTable';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '任务名称',
    align: 'center',
    dataIndex: 'name'
  },
  // {
  //   title: '任务来源',
  //   align: 'center',
  //   dataIndex: 'code'
  // },
  // {
  //   title: '任务目标',
  //   align: 'center',
  //   dataIndex: 'code'
  // },
  {
    title: '同步频率',
    align: 'center',
    dataIndex: 'syncCron'
  },
  {
    title: '同步策略',
    align: 'center',
    dataIndex: 'syncStrategyName'
  },
  // {
  //   title: '外部请求地址',
  //   align: 'center',
  //   dataIndex: 'code'
  // },
  {
    title: '同步状态',
    align: 'center',
    dataIndex: 'syncStatusName'
  },
  {
    title: '上次运行',
    align: 'center',
    dataIndex: 'lastFiredTime'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '任务名称',
      name: 'name',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '任务名称'
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleCreate,
  handleEdit,
  startTask,
  startTaskOnce,
  startLoading,
  triggerLoading
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
      text: '启动',
      key: 'start',
      icon: <BatchBlue />,
      disabled: false,
      hidden: false,
      minSelection: 1,
      needConfirm: true,
      confirmText: '是否确定要启动?',
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => startTask(selectedRowKeys)
    },
    {
      text: '执行一次',
      key: 'trigger',
      icon: <ActiveBlue />,
      disabled: false,
      hidden: false,
      // needConfirm: true,
      // confirmText: '是否确定要执行一次?',
      minSelection: 1,
      maxSelection: 1,
      location: 'left',
      handleClick: ({ selectedRowKeys }) => startTaskOnce(selectedRowKeys)
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
