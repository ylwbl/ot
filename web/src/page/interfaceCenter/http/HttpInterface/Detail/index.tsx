import * as React from 'react';
import { Component } from 'react';
import {
  ElForm,
  ElEditTable,
  ElRowContainer,
  ElCard,
  ElNotification
} from '@/components/el';
import {
  getEditForm,
  getActionButtons,
  getFormColumns,
  getHeadColumns,
  getHeadButtons,
  getFormButtons,
  getResponseEditForm
} from './config';
import { Spin, Input, FormInstance } from 'antd';
import { saveHttp, getHttpById } from './service';
interface State {
  pageLoading: boolean;
  authMethod: string;
  headTableRef: any;
  formTableRef: any;
  bodyParam: string;
  responseFormRef: FormInstance;
  basicFormRef: FormInstance;
  headDataSource: Array<any>;
  formDataSource: Array<any>;
  basicFormData: any;
  responseFormData: any;
}
class HttpDetail extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: false,
      authMethod: '',
      headTableRef: null,
      formTableRef: null,
      bodyParam: '',
      responseFormRef: null,
      basicFormRef: null,
      headDataSource: [],
      formDataSource: [],
      basicFormData: {},
      responseFormData: {}
    };
  }
  componentDidMount() {
    this.getHttpById();
  }
  getHttpById = async () => {
    if (this.props.match.params.id !== 'new') {
      this.setState({ pageLoading: true });
      const res = await getHttpById(this.props.match.params.id);
      if (res.success) {
        this.setState({
          basicFormData: res.data,
          responseFormData: res.data,
          headDataSource: res.data.headParams,
          formDataSource: res.data.formParams,
          bodyParam: res.data.bodyParam
        });
      }
      this.setState({ pageLoading: false });
    }
  };
  handleSave = async () => {
    const {
      headTableRef,
      formTableRef,
      responseFormRef,
      basicFormRef,
      basicFormData,
      responseFormData
    } = this.state;
    if (formTableRef && headTableRef && basicFormRef && responseFormRef) {
      const baseData = await basicFormRef.validateFields();
      const responseData = await responseFormRef.validateFields();
      headTableRef.quitEditState(() => {
        formTableRef.quitEditState(async () => {
          const headParam = await headTableRef.validateTableRows();
          const formParam = await formTableRef.validateTableRows();
          if (headParam.success && formParam.success) {
            const data = {
              ...basicFormData,
              ...responseFormData,
              ...baseData,
              ...responseData,
              headParams: headParam.data
                ? headParam.data.map((v) => {
                    return { ...v, resRespType: 'request' };
                  })
                : [],
              formParams: formParam.data
                ? formParam.data.map((v) => {
                    return { ...v, resRespType: 'request' };
                  })
                : [],
              bodyParam: this.state.bodyParam
            };
            const res = await saveHttp(data);
            if (res.success) {
              ElNotification({
                type: 'success',
                message: '保存成功'
              });
              this.props.store.MultiTabMobx.closeCurrentToPath(
                '/interface/http/httpInterface'
              );
            } else {
              ElNotification({
                type: 'error',
                message: res.msg
              });
            }
          } else {
            ElNotification({
              type: 'error',
              message: '参数校验未通过'
            });
          }
        });
      });
    }
  };
  onSelectChange = (value) => {
    this.setState({
      authMethod: value
    });
  };
  addRow = (type: string) => {
    if (type === 'form') {
      this.state.formTableRef && this.state.formTableRef.addRow({});
    } else {
      this.state.headTableRef && this.state.headTableRef.addRow({});
    }
  };
  deleteRow = (type: string, selectedRowKeys) => {
    if (type === 'form') {
      this.state.formTableRef &&
        this.state.formTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
    } else {
      this.state.headTableRef &&
        this.state.headTableRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
    }
  };
  onBodyParamChange = (e) => {
    this.setState({
      bodyParam: e.target.value
    });
  };
  render() {
    return (
      <Spin spinning={this.state.pageLoading}>
        <ElRowContainer
          blocks={getActionButtons({
            handleSave: this.handleSave
          })}
          position='top'
        />
        <ElCard title='基础信息'>
          <ElForm
            data={this.state.basicFormData}
            onRef={(basicFormRef) => {
              this.setState({
                basicFormRef
              });
            }}
            formProps={getEditForm({
              onSelectChange: this.onSelectChange,
              authMethod: this.state.authMethod
            })}
          />
        </ElCard>
        <ElCard title='HEAD参数'>
          <ElEditTable
            tableId='head-edittable'
            columns={getHeadColumns()}
            dataSource={this.state.headDataSource}
            onRef={(headTableRef) => {
              this.setState({
                headTableRef
              });
            }}
            actionButtons={getHeadButtons({
              addRow: this.addRow,
              deleteRow: this.deleteRow
            })}
          />
        </ElCard>
        <ElCard title='表单参数'>
          <ElEditTable
            tableId='form-edittable'
            columns={getFormColumns()}
            dataSource={this.state.formDataSource}
            onRef={(formTableRef) => {
              this.setState({
                formTableRef
              });
            }}
            actionButtons={getFormButtons({
              addRow: this.addRow,
              deleteRow: this.deleteRow
            })}
          />
        </ElCard>
        <ElCard title='body参数'>
          <Input.TextArea
            value={this.state.bodyParam}
            onChange={this.onBodyParamChange}
          ></Input.TextArea>
        </ElCard>
        <ElCard title='返回值'>
          <ElForm
            data={this.state.responseFormData}
            onRef={(responseFormRef) => {
              this.setState({
                responseFormRef
              });
            }}
            formProps={getResponseEditForm()}
          />
        </ElCard>
      </Spin>
    );
  }
}
export default HttpDetail;
