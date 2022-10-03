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
const getTableColumns = (): Array<ElSearchTableColumns> => [

  {
    title: '文件原始名称',
    align: 'center',
    dataIndex: 'fileInfo',
    render: (value, record) => {
      return value?.originalName;
    }
  },
  {
    title: '总记录数',
    align: 'center',
    dataIndex: 'numTotal'
  },
  {
    title: '成功数量',
    align: 'center',
    dataIndex: 'numSuc'
  },
  {
    title: '处理状态',
    align: 'center',
    dataIndex: 'status',
    render: (value, record) => {
      const { finish, failReason } = record;
      if (finish) {
        return '成功';
      } else if (failReason) {
        return failReason;
      } else {
        return '处理中';
      }
    }
  },
  {
    title: '操作时间',
    align: 'center',
    dataIndex: 'time',
    render: (value, record) => {
      return `${record.timeImport} - ${record.timeFinish}`;
    }
  },
  {
    title: '操作人',
    align: 'center',
    dataIndex: 'userName'
  },
  // {
  //   title: '模板分类',
  //   align: 'center',
  //   dataIndex: 'categoryName'
  // },
  // {
  //   title: '模板名称',
  //   align: 'center',
  //   dataIndex: 'name'
  // },
  // {
  //   title: '模板编码',
  //   // width: 100,
  //   align: 'center',
  //   dataIndex: 'code'
  // },
  // {
  //   title: '导入数据限制',
  //   // width: 100,
  //   align: 'center',
  //   dataIndex: 'dataLimitPer'
  // },
  // {
  //   title: '并发导入阈值',
  //   // width: 100,
  //   align: 'center',
  //   dataIndex: 'asyncThreshold'
  // },
  // {
  //   title: '并发数量限制',
  //   // width: 100,
  //   align: 'center',
  //   dataIndex: 'concurrentLimit'
  // },
  // {
  //   title: '模板类型',
  //   // width: 100,
  //   align: 'center',
  //   dataIndex: 'export',
  //   render: (value) => {
  //     return `${value ? '导出' : '导入'}模板`;
  //   }
  // },
  // {
  //   title: '模板文件',
  //   dataIndex: 'fileCode',
  //   render: (value, record) => {
  //     return (
  //       <a
  //         download={record.fileName}
  //         href={`/coordinator/el-fsm-service/api/tmpl/file?fileCode=${value}`}
  //       >
  //         {record.fileName}
  //       </a>
  //     );
  //   }
  // }
];

const getTableSearchFormItems: ElFormProps = {
  items: [
    {
      title: '关键词',
      name: 'keyword',
      span: 6,
      formOption: {
        type: '$input',
        props: {
          placeholder: '请输入关键词'
        }
      }
    }
  ]
};

export {
  getTableSearchFormItems,
  getTableColumns,
};
