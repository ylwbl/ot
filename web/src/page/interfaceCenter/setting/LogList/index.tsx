import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons
} from './config';
import { getLogList, clearLog } from './service';
import { ElNotification, ElSearchTable } from '@/components/el';
interface State {
  tableRef: any;
  clearLoading: boolean;
}
class LogList extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      tableRef: null,
      clearLoading: false
    };
  }
  handleClear = async () => {
    this.setState({
      clearLoading: true
    });
    const res = await clearLog();
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '清空成功'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      clearLoading: false
    });
  };

  render() {
    return (
      <>
        <ElSearchTable
          tableId='sys_interfaceCenter_logList'
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleClear: this.handleClear,
            clearLoading: this.state.clearLoading
          })}
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getLogList(paramData);
            },
            successCallBack: (tableRef) => {
              // this.setState({
              //   tableRef
              // });
            },
            errCallBack: () => {
              console.log('err');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },

            autoLoad: true
          }}
        />
      </>
    );
  }
}
export default LogList;
