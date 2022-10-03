import React from 'react';
import { AutoComplete } from 'antd';
import request from '@/utils/request';
import './index.less'

/**
 * Autocomplete
 * @description 自动完成组件
 */

export interface TransferProps {
  value: string;
  label: string;
}
interface Props {
  requestUrl: string;
  requestMethod: string;
  placeholder: string;
  onChange?: Function;
  transfer?: TransferProps;
}

interface State {
  value: string;
  options: Array<any>;
}

class Autocomplete extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      options: []
    };
  }
  componentDidMount() {
    if (this.props.requestUrl && this.props.requestMethod) {
      this.getList();
    }
  }
  getList = async () => {
    const { requestUrl, requestMethod, transfer } = this.props;
    let res = await request(requestUrl, {
      method: requestMethod
    });
    if (res.success) {
      let options = [];
      options = res.data.map((val) => {
        return {
          label: val[transfer.label],
          value: val[transfer.value]
        }
      })
      this.setState({ options })
    }
  };
  onSearch = (value: string) => {
    const { options } = this.state;
    this.setState({
      options: options.filter(v => {
        if (this.props.transfer) {
          if (
            v[this.props.transfer.label].indexOf(value) > -1 ||
            v[this.props.transfer.value].indexOf(value) > -1
          ) {
            return v;
          }
        } else {
          if (
            v["value"].indexOf(value) > -1 ||
            v["label"].indexOf(value) > -1
          ) {
            return v;
          }
        }
      })
    })
  };
  onSelect = (val: string, options: object) => {
    this.setState({
      value: options['label']
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(options);
      }
    })
  }
  onChange = (data: string) => {
    this.setState({
      value: data
    }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          label: data,
          value: '',
        });
      }
    })
  };


  render() {
    const { placeholder } = this.props;
    const { value, options } = this.state;
    return (
      <AutoComplete
        className='myAutoComplete'
        value={value}
        options={options}
        style={{ width: '100%' }}
        onSelect={this.onSelect}
        onSearch={this.onSearch}
        onChange={this.onChange}
        placeholder={placeholder || '请输入'}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    );
  }
}

export default Autocomplete;
