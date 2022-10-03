//下一编号规则明细页
import React from 'react';
import { ElFormItemProps } from '@/components/el/ElForm';
import { ActionButtonProps } from '@/components/el/ElSearchTable';
import { SaveBlue } from '@/components/el/ElIcon';

const getFormItems = (isEdit): Array<ElFormItemProps> => [
  {
    title: '下一编号代码',
    name: 'code',
    span: 24,
    rules: [
      { required: true, message: '请输入下一编号代码' },
      {
        pattern: /^[^\s]*$/,
        message: '禁止输入空格'
      }
    ],
    formOption: {
      type: '$input',
      props: { disabled: isEdit == 'create' ? false : true }
    }
  },
  {
    title: '下一编号名称',
    name: 'name',
    span: 24,
    rules: [
      { required: true, message: '请输入下一编号名称' },
      {
        pattern: /^[^\s]*$/,
        message: '禁止输入空格'
      }
    ],
    formOption: { type: '$input', props: {} }
  },
  {
    title: '下一编号分类',
    name: 'numberClass',
    span: 24,
    rules: [
      { required: true, message: '请输入下一编号分类' },
      {
        pattern: /^[^\s]*$/,
        message: '禁止输入空格'
      }
    ],
    formOption: {
      type: '$udc',
      props: {
        placeholder: '下一编号分类',
        prefixStr: '/yst-system',
        domain: 'COM',
        udc: 'DOMAIN'
      }
    }
  },
  {
    title: '下一编号步长',
    name: 'step',
    span: 24,
    rules: [
      { required: true, message: '请输入下一编号步长' },
      {
        pattern: /^[^\s]*$/,
        message: '禁止输入空格'
      }
    ],
    formOption: {
      type: '$inputNumber',
      props: { min: 0, max: 9999999, style: { width: '100%' } }
    }
  },
  {
    title: '下一编号取值',
    name: 'nextNumber',
    span: 24,
    rules: [
      { required: true, message: '请输入下一编号取值' },
      {
        pattern: /^[^\s]*$/,
        message: '禁止输入空格'
      }
    ],
    formOption: {
      type: '$inputNumber',
      props: { min: 0, max: 9999999, style: { width: '100%' } }
    }
  },
  {
    title: '下一编号周期',
    name: 'nnPeriod',
    span: 24,
    formOption: {
      type: '$udc',
      props: {
        disabled: isEdit == 'create' ? false : true,
        placeholder: '选择',
        prefixStr: '/yst-system',
        domain: 'SYS',
        udc: 'NNPERIOD'
      }
    }
  }
];

//pageHeader buttons
const getActionButtons = (save): Array<ActionButtonProps> => [
  {
    text: '保存',
    key: 'save',
    handleClick: save,
    icon: <SaveBlue />,
    location: 'left'
  }
];

export { getFormItems, getActionButtons };
