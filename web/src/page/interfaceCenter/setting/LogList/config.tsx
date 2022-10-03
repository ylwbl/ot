import React from 'react';
import {
  ElSearchTableColumns,
  ActionButtonProps
} from '@/components/el/ElSearchTable';
import { ElFormProps } from '@/components/el/ElForm';
import { DeleteRed } from '@/components/el/ElIcon';

const getTableColumns = (): Array<ElSearchTableColumns> => [
  {
    title: '任务名称',
    align: 'center',
    dataIndex: 'taskName'
  },
  {
    title: '开始时间',
    align: 'center',
    dataIndex: 'startTime'
  },
  {
    title: '结束时间',
    align: 'center',
    dataIndex: 'endTime'
  },
  {
    title: '本次预计更新数量',
    align: 'center',
    dataIndex: 'totalNum'
  },
  {
    title: '成功数量',
    align: 'center',
    dataIndex: 'successNum'
  },
  // {
  //   title: '外部请求地址',
  //   align: 'center',
  //   dataIndex: 'code'
  // },
  {
    title: '失败数量',
    align: 'center',
    dataIndex: 'failureNum'
  },
  {
    title: '同步状态',
    align: 'center',
    dataIndex: 'syncResult'
  },
  {
    title: '异常',
    align: 'center',
    dataIndex: 'exception'
  }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '任务名称',
      name: 'taskName',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '任务名称'
        }
      }
    },
    {
      title: '任务名称',
      name: 'syncResult',
      span: 6,
      formOption: {
        type: '$select',
        props: {
          placeholder: '任务名称',
          options: [
            {
              label: '成功',
              value: 'SUCCESS',
              id: 'SUCCESS'
            },
            {
              label: '部分成功',
              value: 'PARTIAL_SUCCESS',
              id: 'PARTIAL_SUCCESS'
            },
            {
              label: '失败',
              value: 'FAILURE',
              id: 'FAILURE'
            },
            {
              label: '中断',
              value: 'INTERRUPT',
              id: 'INTERRUPT'
            }
          ]
        }
      }
    }
  ]
};
const getActionButtons = ({
  handleClear,
  clearLoading
}): Array<ActionButtonProps> => {
  return [
    {
      text: '清空日志',
      key: 'clear',
      icon: <DeleteRed />,
      disabled: false,
      hidden: false,
      loading: clearLoading,
      needConfirm: true,
      confirmText: '确定要清空日志吗?',
      location: 'left',
      handleClick: handleClear
    }
  ];
};

export { getTableSearchFormItems, getTableColumns, getActionButtons };
