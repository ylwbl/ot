import React from 'react';
import { setupEvent, dispatchEvent } from '@/core/eventbus';
import eventbus from '../../utils/eventbus';

interface Props {
  children?: any;
  code: any;
  useAction?: boolean;
}
interface State {
  data: any;
  action: {
    getAllData: () => any;
    [props: string]: Function;
  };
}
class DataDistribution extends React.Component<Props, State> {
  static defaultProps = {
    useAction: false
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      action: null
    };
  }
  componentDidMount() {
    this.initListener();
  }
  componentWillUnmount() {
    this.removeListener();
  }
  initListener = () => {
    const { useAction } = this.props;
    useAction && this.initActionListener();
    this.initDataListener();
  };
  removeListener = () => {
    const { useAction } = this.props;
    useAction && this.removeActionListener();
    this.removeDataListener();
  };
  initDataListener = () => {
    eventbus.addListener(
      'data_distribute',
      this.props.code,
      this.getDistributeData
    );
    // window.addEventListener('data_distribute', this.getDistributeData);
  };
  removeDataListener = () => {
    eventbus.removeListener('data_distribute', this.props.code);
  };
  initActionListener = () => {
    eventbus.addListener(
      'action_distribute',
      this.props.code,
      this.getDistributeAction
    );
  };
  removeActionListener = () => {
    eventbus.removeListener('action_distribute', this.props.code);
  };
  setDistributeData = (value) => {
    eventbus.dispatch('distribute_data_changed', {
      data: value
    });
    // dispatchEvent(
    //   setupEvent('distributionDataChanged', {
    //     data: value
    //   })
    // );
  };
  getDistributeData = (e) => {
    const data = e.data[this.props.code];
    if (data) {
      this.setState({
        data
      });
    }
  };
  getDistributeAction = (action) => {
    console.log(action);
    this.setState({
      action
    });
  };
  onChange = (data) => {
    this.setState(
      {
        data
      },
      () => {
        eventbus.dispatch('distribute_data_changed', data);
      }
    );
  };
  orderDataChange = (
    code: string,
    type: 'overwrite' | 'blend' = 'overwrite',
    data
  ) => {};
  render() {
    // 这里通过hoc方式注入分发的数据,以及改变数据的方法,数据永远从数据中心自上而下流入组件
    return React.cloneElement(this.props.children, {
      data: this.state.data,
      onChange: this.onChange,
      action: this.state.action
    });
  }
}

export default DataDistribution;
