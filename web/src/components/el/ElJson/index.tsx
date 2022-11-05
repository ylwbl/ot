import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import { Input } from 'antd';
import { clone } from 'ramda';
interface Props {
  value: any;
  onChange: Function;
}
interface State {}
const { TextArea } = Input;
class JsonView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  parseJSONSafely = (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      //返回默认对象，或根据用例返回null。
      return {};
    }
  };
  onJsonChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };
  render() {
    const json = this.props.value?.length
      ? this.parseJSONSafely(this.props.value)
      : {  };
    return (
      <div>
        <TextArea value={this.props.value} onChange={this.onJsonChange} />
        <ReactJson src={json} />
      </div>
    );
  }
}

export default JsonView;
