import React from 'react';
import { InputNumber, Form } from 'antd';
import { ColProps } from 'antd';
import { omit } from 'ramda';

/**
 * RangeNumber
 * @description 数字范围组件
 */

interface Props {
  value?: [number, number];
  onChange?: Function;
  label?: [string, string];
  placeholder?: [string, string];
  name?: [string, string];
  ruleFrom?: any;
  ruleTo?: any;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  extraProps?: any;
}

interface State { }
class RangeNumber extends React.Component<Props, State> {
  static defaultProps = {
    label: ['', ''],
    placeholder: ['从', '到'],
    name: ['from', 'to']
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Form.Item
          name={this.props.name[0]}
          labelCol={this.props.labelCol}
          wrapperCol={this.props.wrapperCol}
          label={this.props.label[0]}
          rules={this.props.ruleFrom}
          style={{
            width: '45%',
            display: 'inline-flex'
          }}
        >
          <InputNumber
            {...this.props.extraProps}
            style={{ width: '100%', display: 'inline-block' }}
            {...omit(
              ['label', 'value', 'onChange', 'name', 'ruleFrom', 'ruleTo'],
              this.props
            )}
            placeholder={this.props.placeholder[0]}
            autoComplete='off'
          />
        </Form.Item>
        <span
          style={{
            display: 'inline-block',
            width: '10%',
            textAlign: 'center',
            marginTop: '3px'
            // fontSize: '16px'
          }}
          role='img'
        >
          <svg
            viewBox='0 0 1024 1024'
            focusable='false'
            data-icon='swap-right'
            width='1em'
            height='1em'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z'></path>
          </svg>
        </span>
        <Form.Item
          name={this.props.name[1]}
          labelCol={this.props.labelCol}
          wrapperCol={this.props.wrapperCol}
          label={this.props.label[1]}
          rules={this.props.ruleTo}
          style={{ width: '45%', display: 'inline-flex' }}
        >
          <InputNumber
            {...this.props.extraProps}
            style={{ width: '100%', display: 'inline-block' }}
            {...omit(
              ['label', 'value', 'onChange', 'name', 'ruleFrom', 'ruleTo'],
              this.props
            )}
            placeholder={this.props.placeholder[1]}
            autoComplete='off'
          />
        </Form.Item>
      </>
    );
  }
}
export default RangeNumber;
