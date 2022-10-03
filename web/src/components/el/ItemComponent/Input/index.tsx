import React from 'react';
import { Input as AntdInput, InputProps } from 'antd';
import { omit, trim } from 'ramda';

/**
 * Input
 * @description 输入框组件
 */

interface Props extends InputProps {
  value?: any;
  onChange?: any;
  trimed?: boolean;
}

const Input = (props: Props) => {
  const onChange = (e) => {
    const { onChange } = props;
    if (onChange) {
      onChange(e.target.value);
    }
  };
  const onBlur = () => {
    const { onChange, trimed = true } = props;
    if (onChange) {
      if (trimed && props.value && /(^\s*)|(\s*$)/g.test(props.value)) {
        onChange(trim(props.value));
      }
    }
  };
  return (
    <AntdInput
      {...omit(['trimed'], props)}
      value={props.value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};
export default Input;
