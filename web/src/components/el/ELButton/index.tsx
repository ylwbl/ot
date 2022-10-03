import React from 'react';
import { Button, ButtonProps, Modal } from 'antd';
import AuthWrapper from '@/layout/AuthWrapper';
import cls from 'classnames';
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
  authCode?: string;
  needAuth?: boolean;
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
    authCode,
    icon,
    needAuth,
    children,
    ...rest
  } = props;
  return needAuth ? (
    <AuthWrapper authCode={authCode}>
      <Button
        {...rest}
        key={key}
        disabled={disabled}
        icon={icon}
        className={cls('action-button', className)}
        onClick={() =>
          needConfirm
            ? confirm({
                content: confirmText,
                onOk: () => {
                  handleClick && handleClick();
                },
                onCancel: () => {}
              })
            : handleClick && handleClick()
        }
      >
        {text || children}
      </Button>
    </AuthWrapper>
  ) : (
    <Button
      {...rest}
      key={key}
      disabled={disabled}
      icon={icon}
      className={cls('action-button', className)}
      onClick={() => {
        handleClick && handleClick();
      }}
    >
      {text || children}
    </Button>
  );
};
export default ElButton;
