import React from 'react';
import {
  getMetadataList,
  getColumnById,
  batchSave,
  getSchemaList,
  getTableList,
  getFieldList,
  updateColumn
} from './service';
import {
  getTableSearchFormItems,
  getTableColumns,
  getActionButtons,
  getEditForm,
  getConfigEditForm
} from './config';
import { FormInstance, Modal } from 'antd';
import { ElForm, ElSearchTable, ElNotification, ElCard } from '@/components/el';
import { isEmpty } from 'ramda';
interface State {
  dataPermissionVisible: boolean;
  formRef: FormInstance;
  formData: object;
  tableRef: any;
  dataSetList: Array<any>;
  tableList: Array<any>;
  fieldList: Array<any>;
  dataPermissionEditLoading: boolean;
  dataPermissionSaveLoading: boolean;
  action: string;
  selectedTableLoading: boolean;
  selectedSchemaLoading: boolean;
  getSchemaLoading: boolean;
  fieldUdcType: string;
  configFormRef: FormInstance;
  configFormData: object;
}
class DataPermission extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      dataPermissionVisible: false,
      formRef: null,
      formData: {},
      configFormData: {},
      tableRef: null,
      dataSetList: [],
      tableList: [],
      fieldList: [],
      dataPermissionEditLoading: false,
      dataPermissionSaveLoading: false,
      action: '',
      selectedTableLoading: false,
      selectedSchemaLoading: false,
      getSchemaLoading: false,
      fieldUdcType: '',
      configFormRef: null
    };
  }
  componentDidMount() {
    this.getSchemaList();
  }

  onFieldUdcTypeChange = (fieldUdcType) => {
    this.setState({
      fieldUdcType
    });
  };
  onSchemaChange = (schema) => {
    this.getTablesBySchema(schema);
  };
  onTableChange = async (tableRecord) => {
    this.getFieldsByTable(tableRecord);
  };
  getSchemaList = async () => {
    this.setState({
      getSchemaLoading: true
    });
    const res = await getSchemaList();
    if (res.success) {
      this.setState({
        dataSetList: res.data._2.map((v) => {
          return {
            id: v,
            label: v,
            value: v
          };
        })
      });
    }
    this.setState({
      getSchemaLoading: false
    });
  };
  getTablesBySchema = async (schema) => {
    this.setState({
      selectedSchemaLoading: true
    });
    const res = await getTableList(schema);
    if (res.success) {
      this.setState({
        tableList: res.data._2.map((v) => {
          return {
            id: v.tableName,
            label: v.tableName,
            value: v.tableName
          };
        })
      });
    }
    this.setState({
      selectedSchemaLoading: false
    });
  };
  getFieldsByTable = async (tableRecord) => {
    const data = this.state.formRef?.getFieldValue('schema');
    if (data) {
      this.setState({
        selectedTableLoading: true
      });
      const res = await getFieldList(data, tableRecord.value);
      if (res.success) {
        this.setState({
          fieldList: res.data._2.map((v) => {
            return {
              id: v.columnName,
              label: v.columnName,
              value: JSON.stringify(v)
            };
          })
        });
      }
      this.setState({
        selectedTableLoading: false
      });
    }
  };
  handleCreate = () => {
    this.setState({
      dataPermissionVisible: true,
      formData: {},
      configFormData: {},
      action: '新增',
      fieldUdcType: ''
    });
  };
  handleEdit = async (selectedRowKeys: any, selectedRows: any) => {
    this.setState({
      dataPermissionEditLoading: true
    });
    const res = await getColumnById(selectedRowKeys[0]);
    if (res.success) {
      this.setState({
        dataPermissionVisible: true,
        fieldUdcType: res.data.fieldUdcType,
        formData: {
          ...selectedRows[0],
          ...res.data
        },
        configFormData: {
          ...res.data
        },
        action: '编辑'
      });
    }
    this.setState({
      dataPermissionEditLoading: false
    });
  };
  closeModal = () => {
    this.setState({
      dataPermissionVisible: false
    });
    const { formRef, tableRef } = this.state;
    if (formRef) {
      formRef.resetFields();
    }
    if (tableRef) {
      tableRef.getTableData();
    }
  };
  handleSave = async () => {
    const { formRef, formData, tableRef, configFormRef } = this.state;
    if (formRef) {
      let formDatas = await formRef.validateFields();
      let configFormDatas = configFormRef
        ? await configFormRef.validateFields()
        : {};
      let data: any = {};
      if (this.state.action === '新增') {
        data = {
          defaultValue: formDatas.defaultValue,
          tableName: formDatas.schema,
          tableCode: formDatas.tableCode?.value,
          fieldCode: formDatas.fieldCode?.label,
          fieldCaption: formDatas.fieldCaption,
          fieldUdcType: formDatas.fieldUdcType,
          fieldType: formDatas.fieldType,
          domainCode: formDatas.domainCode,
          ...formData
        };
      } else {
        data = {
          fieldCode: formDatas.fieldCode,
          fieldCaption: formDatas.fieldCaption,
          fieldUdcType: formDatas.fieldUdcType,
          fieldType: formDatas.fieldType,
          domainCode: formDatas.domainCode,
          ...formData
        };
      }
      if (this.state.fieldUdcType === 'UDC') {
        data = {
          ...data,
          udcDomainCode: configFormDatas.udcDomainCode,
          udcCode: configFormDatas.udcCode
        };
      }
      if (
        this.state.fieldUdcType === 'INT' ||
        this.state.fieldUdcType === 'LINT'
      ) {
        data = {
          ...data,
          fieldLength: configFormDatas.fieldLength,
          fieldPrecision: configFormDatas.fieldPrecision
        };
      }
      this.setState({
        dataPermissionSaveLoading: true
      });
      let res: any;
      if (this.state.action === '新增') {
        res = await batchSave(data);
      } else {
        res = await updateColumn(data);
      }
      if (res.success) {
        ElNotification({
          type: 'success',
          message: this.state.action === '新增' ? '新增成功' : '更新成功'
        });
        this.setState(
          {
            dataPermissionVisible: false,
            dataPermissionSaveLoading: false
          },
          () => {
            this.state.formRef && this.state.formRef.resetFields();
            tableRef && tableRef.getTableData();
          }
        );
      } else {
        ElNotification({
          type: 'error',
          message: res.msg
        });
      }
    }
  };

  render() {
    return (
      <>
        <Modal
          width='1000px'
          destroyOnClose={false}
          visible={this.state.dataPermissionVisible}
          okText='保存'
          title={`业务数据字段${this.state.action}`}
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          okButtonProps={{
            disabled: this.state.dataPermissionSaveLoading,
            loading: this.state.dataPermissionSaveLoading
          }}
        >
          <ElForm
            formProps={getEditForm({
              action: this.state.action,
              dataSetList: this.state.dataSetList,
              tableList: this.state.tableList,
              fieldList: this.state.fieldList,
              formData: this.state.formData,
              getSchemaLoading: this.state.getSchemaLoading,
              selectedTableLoading: this.state.selectedTableLoading,
              selectedSchemaLoading: this.state.selectedSchemaLoading,
              onFieldUdcTypeChange: this.onFieldUdcTypeChange,
              onSchemaChange: this.onSchemaChange,
              onTableChange: this.onTableChange
            })}
            data={this.state.formData}
            onRef={(formRef) => this.setState({ formRef })}
          />
          {this.state.fieldUdcType && (
            <ElCard title='逻辑字段类型配置项'>
              <ElForm
                formProps={getConfigEditForm({
                  fieldUdcType: this.state.fieldUdcType
                })}
                data={this.state.configFormData}
                onRef={(configFormRef) => this.setState({ configFormRef })}
              />
            </ElCard>
          )}
        </Modal>
        <ElSearchTable
          tableId='sys_dataPermissions'
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
            dataPermissionEditLoading: this.state.dataPermissionEditLoading
          })}
          searchFormProps={getTableSearchFormItems}
          tableProxy={{
            request: (paramData) => {
              return getMetadataList(paramData);
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
export default DataPermission;
