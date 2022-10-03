import React from 'react';
import { Select } from 'antd';
import { omit, path } from 'ramda';

/**
 * Selection
 * @description 下拉选择组件
 */

interface Props {
  rowKey?: string;
  request?: any;
  options?: Array<any>;
  data?: string;
  disabledValue?: Array<string>;
  disabled?: boolean;
  transfer?: {
    label: string;
    value: string;
  };
  value?: any;
  onChange?: Function;
  onSelectChange?: Function;
  allowClear?: boolean;
  placeholder?: string;
  multiple?: boolean;
  selectRecord?: boolean;
}
interface State {
  dataSource: Array<any>;
  loading: boolean;
  selectedValue: any;
}

class Selection extends React.Component<Props, State> {
  static defaultProps = {
    rowKey: 'id',
    showSearch: true,
    disabledValue: [],
    data: 'data',
    disabled: false,
    allowClear: true,
    multiple: false,
    selectRecord: false,
    transfer: {
      label: 'label',
      value: 'value'
    },
    request: () => {
      return Promise.resolve({
        data: []
      });
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
      selectedValue: undefined
    };
  }
  static getDerivedStateFromProps(
    { value, selectRecord, transfer, multiple },
    { selectedValue }
  ) {
    if (selectRecord) {
      let newValue;
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
    this.loadData();
  }
  componentDidUpdate(preProps) {
    if (
      preProps.request !== this.props.request ||
      JSON.stringify(preProps.options) !== JSON.stringify(this.props.options)
    ) {
      this.loadData();
    }
  }
  loadData = async () => {
    // 如果直接传入数据源,就不再走请求了
    if (Array.isArray(this.props.options)) {
      this.setState({ dataSource: this.props.options });
    } else {
      this.setState({
        loading: true
      });
      const res = await this.props.request();
      this.setState({
        loading: false
      });
      if (res?.success) {
        this.setState({
          dataSource: Array.from(path(this.props.data.split('.'), res))
        });
      }
    }
  };
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
    return (
      <Select
        showArrow
        {...omit(
          [
            'disabledValue',
            'selectRecord',
            'request',
            'multiple',
            'rowKey',
            'onSelectChange',
            'prefixStr'
          ],
          this.props
        )}
        disabled={this.state.loading || this.props.disabled}
        maxTagCount={2}
        maxTagTextLength={5}
        mode={this.props.multiple ? 'multiple' : null}
        optionFilterProp={'label'}
        value={this.state.selectedValue}
        onChange={this.onChange}
      >
        {Array.isArray(this.state.dataSource) &&
          this.state.dataSource.map((v) => {
            return (
              <Select.Option
                key={v[this.props.rowKey]}
                value={v[this.props.transfer.value]}
                label={v[this.props.transfer.label]}
                disabled={
                  this.props.disabledValue.indexOf(
                    v[this.props.transfer.value]
                  ) > -1
                }
              >
                {v[this.props.transfer.label]}
              </Select.Option>
            );
          })}
      </Select>
    );
  }
}
export default Selection;
