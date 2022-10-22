import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons
} from './config';
import { ElSearchTable, ElNotification } from '@/components/el';
import { getUdcList } from './service';
import { FormInstance, Modal } from 'antd';
interface State {
  udcVisible: boolean;
  formRef: FormInstance;
  formData: object;
  udcSaveLoading: boolean;
  tableRef: any;
  action: string;
  deleteLoading: boolean;
  copyLoading: boolean;
}
class Dashboard extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      udcVisible: false,
      formRef: null,
      formData: {},
      udcSaveLoading: false,
      deleteLoading: false,
      tableRef: null,
      action: '',
      copyLoading: false,
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleCreate = () => {
    this.setState({
      udcVisible: true,
      formData: {
        hdFlag: false
      },
      action: '新增'
    });
  };
  handleEdit = (selectedRows: any) => {
    this.setState({
      udcVisible: true,
      formData: selectedRows[0],
      action: '编辑'
    });
  };
  handleDelete = () =>  {

  }
  handleCopy = () => {

  }
  render() {
    return (
      <>
        <ElSearchTable
          tableId='sys_udc'
          onRef={(tableRef) => {
            this.setState({
              tableRef
            });
          }}
          columns={getTableColumns()}
          pageSize={20}
          actionButtons={getActionButtons({
            handleCreate: this.handleCreate,
            handleEdit: this.handleEdit,
            handleDelete: this.handleDelete,
            deleteLoading: this.state.deleteLoading,
            handleCopy: this.handleCopy,
            copyLoading: this.state.copyLoading
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getUdcList(paramData);
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
export default Dashboard;
