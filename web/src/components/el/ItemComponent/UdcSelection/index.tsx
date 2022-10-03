import React from 'react';
import { Select, message } from 'antd';
import { path } from 'ramda';
import requests from '@/utils/request';

/**
 * UdcSelection
 * @description udc下拉选择器
 */

export interface TransferProps {
  value: string;
  lable: string;
}
interface Props {
  domain?: string;
  udc?: string;
  data?: string;
  disabledValue?: Array<string>;
  filterValue?: Array<string>;
  disabled?: boolean;
  multiple?: boolean;
  value?: any;
  allowClear: boolean;
  onChange?: Function;
  transfer?: TransferProps;
  placeholder?: string;
  selectRecord?: boolean;
  prefixStr?: string;
  onSelectChange?: Function;
  onFocusCallback?: Function;
}
interface State {
  dataSource: Array<any>;
  loading: boolean;
  selectedValue: any;
}

// default transfer settings
const defaultTransfer: TransferProps = {
  value: 'udcVal',
  lable: 'valDesc'
};

// todo UdcSelection
class UdcSelection extends React.Component<Props, State> {
  static defaultProps = {
    disabledValue: [],
    filterValue: [],
    disabled: false,
    domain: '',
    udc: '',
    data: 'data',
    multiple: false,
    allowClear: true,
    transfer: defaultTransfer,
    selectRecord: false,
    prefixStr: '/yst-b2c'
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
      selectedValue: ''
    };
  }
  static getDerivedStateFromProps(
    { value, selectRecord, transfer, multiple },
    { selectedValue }
  ) {
    // console.log(value, selectRecord, transfer);
    if (selectRecord) {
      let newValue;
      // if (multiple) {
      //   newValue = value && value.map((item) => item[transfer.value]);
      // } else {
      //   newValue = value && value[transfer.value];
      // }
      if (multiple) {
        newValue =
          value &&
          value.map((item) => {
            if (typeof value === 'string') {
              return item;
            } else {
              return item[transfer.value];
            }
          });
      } else {
        if (!!value) {
          if (typeof value === 'string') {
            newValue = value;
          } else {
            newValue = value && value[transfer.value];
          }
        }
      }
      if (newValue !== selectedValue) {
        return {
          selectedValue: newValue
        };
      }
      return null;
    } else {
      if (value !== selectedValue) {
        return {
          selectedValue: value
        };
      }
      return null;
    }
  }
  componentDidMount() {
    if (this.props.domain && this.props.udc) {
      this.loadData();
    }
  }
  loadData = async () => {
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
      this.setState({
        dataSource: path(this.props.data.split('.'), res)
      });
    } else {
      message.error(res.msg);
    }
  };
  onFocusFn() {
    if (this.props.onFocusCallback) {
      this.props.onFocusCallback();
    }
  }
  onChange = (value) => {
    if (this.props.selectRecord) {
      let record;
      if (this.props.multiple) {
        record = this.state.dataSource.filter(
          (item) => value.indexOf(item[this.props.transfer.value]) !== -1
        );
      } else {
        record = this.state.dataSource.find(
          (item) => item[this.props.transfer.value] === value
        );
      }
      if (this.props.onChange) {
        this.props.onChange(record);
      }
      this.props.onSelectChange && this.props.onSelectChange(record);
    } else {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
      this.props.onSelectChange && this.props.onSelectChange(value);
    }
  };
  render() {
    const { lable, value } = this.props.transfer;
    return (
      <Select
        showArrow
        mode={this.props.multiple ? 'multiple' : null}
        disabled={this.state.loading || this.props.disabled}
        value={this.state.selectedValue}
        onChange={this.onChange}
        allowClear={this.props.allowClear}
        showSearch
        maxTagCount='responsive'
        placeholder={this.props.placeholder || '请选择'}
        onFocus={() => this.onFocusFn()}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {Array.isArray(this.state.dataSource) &&
          this.state.dataSource
            .filter(
              (item) => this.props.filterValue.indexOf(item[value]) === -1
            )
            .map((v) => {
              return (
                <Select.Option
                  key={v[value]}
                  value={v[value]}
                  disabled={this.props.disabledValue.indexOf(v[value]) > -1}
                >
                  {v[lable]}
                </Select.Option>
              );
            })}
      </Select>
    );
  }
}
export default UdcSelection;
