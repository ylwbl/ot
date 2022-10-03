import React from 'react';
import { Form, Tooltip } from 'antd';
import { omit } from 'ramda';
import formRender from '../utils';
import { ElFormItemProps } from '../index';
const ElFormItem = (props: ElFormItemProps) => {
  const { id, title, name, className, form, valuePropName } = props;
  return (
    <Form.Item
      label={title}
      name={name}
      key={name || id}
      valuePropName={valuePropName}
      className={className}
      {...omit(['formOption', 'form'], props)}
    >
      {formRender(props, form)}
    </Form.Item>
  );
};
export default ElFormItem;
