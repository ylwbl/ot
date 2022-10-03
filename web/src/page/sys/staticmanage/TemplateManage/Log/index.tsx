import React from 'react';
import {
  getTableSearchFormItems,
  getTableColumns,
} from './config';
import { ElForm, ElSearchTable, ElNotification } from '@/components/el';
import ElExport from '@/components/el/ElExport';
import {
  fetchList,
  createTemplate,
  updateTemplate,
  triggerActive,
  searchTemplateById
} from './service';
import { FormInstance, Empty } from 'antd';
import { isEmpty } from 'ramda';

interface Props {
  templateId: any;
  submitIndex: number;
}

interface State {
  visible: boolean;
  formRef: FormInstance;
  formData: object;
  saveLoading: boolean;
  tableRef: any;
  action: string;
  deleteLoading: boolean;
  triggerLoading: boolean;
  editLoading: boolean;
}
class TemplateLog extends React.Component<Props, State> {
  // static defaultProps = {
  //   match: {
  //     id: null
  //   }
  // }
  exportRef = null;
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formRef: null,
      formData: {},
      saveLoading: false,
      deleteLoading: false,
      tableRef: null,
      action: '',
      triggerLoading: false,
      editLoading: false
    };
  }
  handleCreate = () => {
    this.setState({
      visible: true,
      formData: {
        hdFlag: false
      },
      action: '新增'
    });
  };
  handleEdit = async (selectedRowKeys: any) => {
    this.setState({
      editLoading: true
    });
    const res = await searchTemplateById(selectedRowKeys[0]);
    if (res.success) {
      this.setState({
        visible: true,
        formData: {
          ...res.data,
          fileCode: res.data.fileInfo || []
        },
        action: '编辑'
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      editLoading: false
    });
  };
  closeModal = () => {
    this.setState({
      visible: false
    });
    const { formRef } = this.state;
    formRef && formRef.resetFields();
  };
  handleSave = async () => {
    const { formRef, formData } = this.state;
    if (formRef) {
      let data = await formRef.validateFields();
      this.setState({
        saveLoading: true
      });
      if (!isEmpty(formData)) {
        data = {
          ...formData,
          ...data,
          fileCode: data.fileCode.fileCode,
          fileName: data.fileCode.originalName
        };
      }
      let res;
      if (data.id) {
        res = await updateTemplate(data);
      } else {
        res = await createTemplate(data);
      }
      if (res.success) {
        ElNotification({
          type: 'success',
          message: '保存成功'
        });
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
      this.setState({
        saveLoading: false,
        visible: false
      });
      this.state.tableRef.getTableData();
    }
  };
  handleDelete = async (selectedRowKeys) => {
    this.setState({
      deleteLoading: true
    });
    // const res = await deleteUdcBatch(selectedRowKeys);
    // if (res.success) {
    //   ElNotification({
    //     type: 'success',
    //     message: '删除成功'
    //   });
    // } else {
    //   ElNotification({
    //     type: 'error',
    //     message: res.msg
    //   });
    // }
    this.setState({
      deleteLoading: true
    });
  };
  triggerActive = async (selectedRowKeys) => {
    this.setState({
      triggerLoading: true
    });
    const res = await triggerActive(selectedRowKeys[0]);
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '切换成功'
      });
      const { tableRef } = this.state;
      tableRef.getTableData();
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
    }
    this.setState({
      triggerLoading: false
    });
  };

  handleExport = () => {
    this.exportRef.openModal();
  }


  render() {
    const { templateId, submitIndex } = this.props;
    return (
      <>
        {
          templateId ?
            <ElSearchTable
              key={submitIndex}
              tableId='sys_template_log'
              onRef={(tableRef) => {
                this.setState({
                  tableRef
                });
              }}
              columns={getTableColumns()}
              pageSize={5}
              searchFormProps={getTableSearchFormItems}
              tableProxy={{
                request: (paramData) => {
                  return fetchList(templateId, paramData);
                },
                props: {
                  success: 'success',
                  result: 'data.records',
                  total: 'data.total'
                },
                autoLoad: true,
              }}
              rowSelection={null}
            /> :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='请选择一个模板' />
        }

      </>
    );
  }
}
export default TemplateLog;
