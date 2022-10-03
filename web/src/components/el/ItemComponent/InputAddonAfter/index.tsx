import React from 'react';
import { Input, message, Select } from 'antd';
import { path } from 'ramda';
import requests from '@/utils/request';

/**
 * InputAddonAfter
 * @description 输入框后缀组件
 */


const { Option } = Select;

interface State {
  loading: boolean;
  addonAfter: any;
  selectedValue: any;
}
interface Props {
  value?: any;
  onChange?: Function;
  disabled?: boolean;
  prefixStr?: string;
  domain?: string;
  udc?: string;
  data?: string;
  defaultAfterValue?: string;
  transfer?: TransferProps;
  placeholder?: string;
}
interface TransferProps {
  value: string;
  lable: string;
}
const defaultTransfer: TransferProps = {
  value: 'udcVal',
  lable: 'valDesc'
};
class InputAddonAfter extends React.Component<Props, State> {
  static defaultProps = {
    disabled: false,
    domain: '',
    udc: '',
    data: 'data',
    transfer: defaultTransfer,
    prefixStr: '/yst-b2c'
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      addonAfter: '',
      selectedValue: {
        value: '',
        afterValue: this.props.defaultAfterValue
      }
    };
  }
  componentDidMount() {
    if (this.props.domain && this.props.udc) {
      this.loadData();
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { value } = props;
    const { selectedValue } = state;
    if (value && value !== selectedValue) {
      return {
        selectedValue: value
      };
    } else {
      return null;
    }
  }
  loadData = async () => {
    const { lable, value } = this.props.transfer;
    this.setState({
      loading: true
    });
    const res = await requests(
      `${this.props.prefixStr}/sys/codes/combo/${this.props.domain}/${this.props.udc}`,
      { method: 'get' }
    );
    this.setState({
      loading: false
    });
    if (res.success) {
      const data = path(this.props.data.split('.'), res);
      const selectAfter = Array.isArray(data) && (
        <Select
          onChange={this.onChange}
          defaultValue={this.props.defaultAfterValue}
          className='select-after'
          disabled={this.props.disabled}
        >
          {data.map((v) => {
            return (
              <Option key={v[value]} value={v[value]}>
                {v[lable]}
              </Option>
            );
          })}
        </Select>
      );
      this.setState({ addonAfter: selectAfter });
    } else {
      message.error(res.msg);
    }
  };
  onChange = (e) => {
    const { onChange } = this.props;
    let selectedValue = { ...this.state.selectedValue };
    if (typeof e === 'string') {
      selectedValue.afterValue = e;
    } else {
      selectedValue.value = e.target.value;
    }
    if (onChange) {
      onChange(selectedValue);
    }
  };
  render() {
    const { disabled } = this.props;
    const { selectedValue } = this.state;
    return (
      <Input
        onChange={this.onChange}
        placeholder={this.props.placeholder || '请输入'}
        value={selectedValue.value}
        addonAfter={this.state.addonAfter}
        disabled={disabled}
      />
    );
  }
}
export default InputAddonAfter;
