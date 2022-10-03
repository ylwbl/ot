import React from 'react';
import { Button, ButtonProps, Modal } from 'antd';
import AuthWrapper from '@/layout/AuthWrapper';
import cls from 'classnames';
import request from '@/utils/request';
import './style.less';

/**
 * Props
 * @param  
  text?: string; 按钮文字
  disabled?: boolean; 禁启用
  hidden?: boolean; 显隐藏
  key?: string; 键
  handleClick?: Function; 单击事件
  needConfirm?: boolean; 是否需要二次确认
  confirmText?: string; 二次确认文本
  authCode?: string; 权限码
 */
interface Props extends ButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key?: string;
  handleClick?: Function;
  needConfirm?: boolean;
  confirmText?: string;
  api?: string;
  action?: {
    getAllData: () => any;
    [props: string]: Function;
  };
}
const { confirm } = Modal;

/**
 * ElButton
 * @description 按钮组件
 * @param props
 * @returns
 */
const ElButton = (props: Props) => {
  const {
    text,
    key,
    disabled,
    handleClick,
    className,
    needConfirm,
    confirmText,
    icon,
    children,
    api,
    action,
    ...rest
  } = props;
  return;
  const apiClick = async () => {
    // 这里需要通过外部传入的func  获取页面上的数据进行提交
    const data = getData();
    const res = await request(api, {
      method: 'post',
      data
    });
    if (res.success) {
      // do sth
    }
  };
  const getData = () => {
    if (action) {
      return action.getAllData();
    }
    return {};
  };
  <Button
    {...rest}
    key={key}
    disabled={disabled}
    icon={icon}
    className={cls('action-button', className)}
    onClick={() => {
      handleClick ? handleClick() : api ? apiClick() : null;
    }}
  >
    {text || children}
  </Button>;
};
export default ElButton;
