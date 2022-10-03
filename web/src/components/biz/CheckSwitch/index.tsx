import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
const CheckSwitch = (props: any) => {
  const onChange = (e) => {
    props.onChange && props.onChange(e.target.checked);
    props.onCheckboxChange && props.onCheckboxChange(e.target.checked);
  };
  return (
    <AntdCheckbox
      disabled={props.disabled}
      checked={props.value}
      onChange={onChange}
    />
  );
};
export default CheckSwitch;
