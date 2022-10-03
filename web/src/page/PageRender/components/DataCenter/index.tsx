import React from 'react';
import { setupEvent, dispatchEvent } from '@/core/eventbus';
import eventbus from '../../utils/eventbus';
interface DataEvent {
  type: string;   // 事件类型
  code: string;   // 数据分部代码
  data: any;      // 此次事件传递的数据
}
interface Props {
  api: string;
}
class DataCenter extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        demo1: '123'
      }
    };
  }
  componentDidMount() {
    this.initDataChangedListener();
    setTimeout(() => {
      // 获取数据
      this.distributeData();
      this.distributeAction();
    }, 2000);
  }
  componentWillUnmount() {
    this.removeDataChangedListener();
  }
  orderToChange = (code, data) => {
    // 这个方法暴露给每一个数据分发组件,让数据分发组件有能力调用并更新其他的数据分发组件
    // 此方法需要在数据分发组件进行封装后传入,防止组件滥用
    dispatchEvent(
      setupEvent('data_distribute', {
        code,
        data
      })
    );
  }
  getAllData = () => {
    return this.state.data;
  }
  distributeData = () => {
    // 分发数据
    eventbus.dispatch('data_distribute', { data: this.state.data })
    // dispatchEvent(
    //   setupEvent('data_distribute', {
    //     data: this.state.data
    //   })
    // );
  };
  distributeAction = () => {
    eventbus.dispatch('action_distribute', { getAllData: this.getAllData })
  }
  initDataChangedListener = () => {
    eventbus.addListener('distribute_data_changed', 'center', this.dealChangedData)
    // window.addEventListener('distribute_data_changed', this.dealChangedData);
  };
  removeDataChangedListener = () => {
    eventbus.removeListener('distribute_data_changed', 'center')
  };
  dealChangedData = (data) => {
    // 这里用来改变总数据中心中的数据
  }

  render() {
    return this.props.children;
  }
}

export default DataCenter;
