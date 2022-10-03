import React from 'react';
import { Table, Button, Dropdown, Menu, Modal, Statistic } from 'antd';
import { FormInstance } from 'antd/lib/form';
import SearchForm from './components/SearchForm';
import {
  AddWhite,
  RefreshBlack,
  SearchWhite,
  DownBlack
} from '@/components/el/ElIcon';
import { path } from 'ramda';
import './style.less';
import { ColumnType, TableProps } from 'antd/lib/table';
import { ButtonProps } from 'antd/lib/button';
import { ElFormProps } from '@/components/el/ElForm';
import { ExpandableConfig } from 'antd/lib/table/interface';
import MenuItem from 'antd/lib/menu/MenuItem';
import ElTab, { ElTabProps } from '../ElTab';
import ToolBar from './components/ToolBar';
import SearchFormConfig from './components/SearchFormConfig';
import { clone } from 'ramda';
import AuthWrapper from '@/layout/AuthWrapper';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
const { confirm } = Modal;
import { sum, average, count, max, min } from './summary';
import { omit } from 'ramda';
import cls from 'classnames';

/**
 * # ElSearchTable 使用文档

注意: ElSearchTable 是基于 antd table 的再次封装,通常情况下,antd 的原本的属性和方法都可以使用

## 1.tableProps

| 属性               | 类型                                                                         | 解释                                                                                                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rowKey             | string                                                                       | 不传入的情况下默认为 id,表格行的唯一标识                                                                                                                                                                       |
| rowSelectionConfig | {type：‘radio’ \| ‘checkbox’，fixed: boolean， onChange，disabledRowIds: []} | 不传入情况下不会出现表格选中列,radio 为单选,checkbox 为多选,fixed 为 true 时,选中列会固定在左侧，同时 onChange 事件会触发,当传入 disabledRowIds 时,如果 record 的 rowkey 和表格中某一项相等,则禁用该行的选择器 |
| defaultSearchData  | {}                                                                           | 表格默认的查询条件,传入后会设置进搜索表单                                                                                                                                                                      |
| dataSource         | Array<object>                                                                | 表格的数据,当传入 tableProxy 时,此项不会起效                                                                                                                                                                   |
| tableProxy         | object 见下                                                                  | 数据代理                                                                                                                                                                                                       |
| actionButtons      | Array<object>见下                                                            | 事件按钮列表                                                                                                                                                                                                   |
| pageSize           | number                                                                       | 每页表格显示的行数                                                                                                                                                                                             |
| columns            | Array<object>见下                                                            | 表格列配置 目前与原文档一致                                                                                                                                                                                    |
| searchFormProps    | {items: Array<searchFormItemProps>}见 ElForm 使用文档                        | 表格查询表单配置                                                                                                                                                                                               |
| descriptions       | Function => JSX.ELEMENT                                                      | 返回表格事件按钮下方任意渲染的元素                                                                                                                                                                             |
| mode               | {proxy: boolean, search: boolean, action: boolean, pagination: boolean}      | 精简模式,是否隐藏搜索表格的某一块元素                                                                                                                                                                          |
| onRef              | Function                                                                     | (ref) => {}，获取表格实例的方法                                                                                                                                                                                |
| onTableRowClick    | Function                                                                     | 表格点击事件                                                                                                                                                                                                   |
| tabs               | ElTabProps                                                                   | 表格的 tabs 配置                                                                                                                                                                                               |

### 1.tableProxy

| 属性            | 类型                                             | 解释                                                       |
| :-------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| request         | () => Promise                                    | 返回后端请求                                               |
| errCallBack     | Function                                         | 请求失败的回调                                             |
| successCallBack | Function(tableRef)                               | 请求成功的回调                                             |
| props           | {result: string, total: string, success: string} | 在请求返回的 response 里面请求数据,数据总量,是否成功的键名 |

### 2.actionButtons

| text         | string                 | 按钮文字     |
| ------------ | ---------------------- | ------------ |
| disabled     | boolean                | 是否禁用     |
| 属性         | 类型                   | 解释         |
| hidden       | boolean                | 是否隐藏     |
| key          | string                 | 唯一标识     |
| handleClick  | Function(selectedData) | 点击事件     |
| icon         | JSX.ELEMENT            | 按钮图标     |
| overLay      | Array<actionButtons>   | 下拉按钮组   |
| minSelection | number                 | 最小选中数   |
| maxSelection | number                 | 最大选中数   |
| needConfirm  | boolean                | 是否需要确认 |
| confirmText  | string                 | 确认框文字   |

###

 */
const dataSourceAdaptor = (dataSource) => {
  if (dataSource) {
    if (Array.isArray(dataSource)) {
      return dataSource;
    } else {
      return [];
    }
  } else {
    return [];
  }
}

interface Props extends TableProps<any> {
  tableId?: string;
  rowKey: string;
  mode?: {
    proxy?: boolean;
    search?: boolean;
    action?: boolean;
    pagination?: boolean;
    descriptions?: boolean;
    tabs?: boolean;
  };
  rowSelectionConfig?: {
    type: 'radio' | 'checkbox';
    fixed: boolean;
    onChange?: Function;
    disabledRowIds?: Array<unknown>;
    selectedRowKeys?: Array<string>;
    columnWidth?: number | string;
  };
  columns: Array<ElSearchTableColumns>;
  dataSource?: Array<any>;
  tableProxy?: TableProxy;
  actionButtons?: Array<ActionButtonProps>;
  actionButtonsExtraRender?: Function;
  descriptions?: Function;
  pageSize?: number;
  searchFormProps?: ElFormProps;
  onRef?: Function;
  expandable?: ExpandableConfig<any>;
  tabs?: ElTabProps;
  onTableRowClick?: Function;
  onResetButtonClick?: Function;
  defaultSearchData?: object;
  summarySetup?: Array<SummarySetupProps>;
}

interface TableProxy {
  autoLoad?: boolean;
  request?: Function;
  errCallBack?: Function;
  successCallBack?: Function;
  props?: {
    result: string;
    total: string;
    success: string;
  };
  buttons?: Array<ProxyButtonProps>;
}
interface ProxyButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
}
interface ActionButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
  location?: 'left' | 'right';
  minSelection?: number;
  maxSelection?: number;
  needConfirm?: boolean;
  confirmText?: string;
  authCode?: string;
  overLay?: Array<{
    key: string;
    text?: string;
    disabled?: boolean;
    icon?: any;
    hidden?: boolean;
    handleClick: Function;
    minSelection?: number;
    maxSelection?: number;
  }>;
}
// interface SummaryProps {
//   type: Array<'max' | 'min' | 'sum' | 'average' | 'count' | string>;
//   target: 'auto' | 'manual';
// }
// interface SummarySetupProps {
//   code: string;
//   name: string;
//   func: Function;
// }
interface SummaryProps {
  [type: string]: {
    //'max' | 'min' | 'sum' | 'average' | 'count' | string
    func?: Function;
    target?: 'auto' | 'manual';
    render?: Function;
    cellProps?: any;
  };
}
interface SummarySetupProps {
  type: 'max' | 'min' | 'sum' | 'average' | 'count' | string;
  name: string;
  emptyText: string;
  func: Function;
  target: 'auto' | 'manual';
  props?: {};
  render?: Function;
  cellProps?: any;
}
interface ElSearchTableColumns extends ColumnType<any> {
  dataIndex: string;
  summary?: SummaryProps;
}
interface SearchFormOption {
  name: string;
  isSelected: boolean;
  isDefault: boolean;
  include: Array<{
    label: string;
    value: string;
  }>;
  formData: any;
}
interface State {
  dataSource: Array<any>;
  tableLoading: boolean;
  oldDataSource: Array<any>;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  };
  searchFormProps: ElFormProps;
  columns: Array<ElSearchTableColumns>;
  formData: {};
  tempRecord: object;
  formRef: FormInstance;
  selectionData: SelectionDataProps;
  searchFormOptions: Array<SearchFormOption>;
  searchFormConfigRef: any;
}
interface SelectionDataProps {
  selectedRowKeys: Array<any>;
  selectedRows: Array<any>;
  length: number;
}
// todo searchTable
class ElSearchTable extends React.Component<Props, State> {
  static defaultProps = {
    rowKey: 'id',
    mode: {
      proxy: true,
      search: true,
      action: true,
      pagination: true,
      descriptions: true,
      tabs: false
    },
    columns: [],
    actionButtons: [],
    pageSize: 10,
    rowSelectionConfig: {
      type: 'checkbox',
      fixed: true,
      disabledRowIds: []
    },
    tableProxy: {
      autoLoad: true,
      props: {
        result: 'data.result',
        total: 'data.total',
        success: 'success'
      }
    },
    dataSource: [],
    defaultSearchData: {}
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      dataSource: [],
      oldDataSource: [],
      tableLoading: false,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 0
      },
      searchFormProps: null,
      formData: {},
      columns: [],
      tempRecord: {},
      formRef: null,
      selectionData: {
        selectedRows: [],
        selectedRowKeys: [],
        length: 0
      },
      searchFormOptions: [],
      searchFormConfigRef: null
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { dataSource, searchFormProps } = props;
    const { oldDataSource } = state;
    const _dataSource = dataSourceAdaptor(dataSource);
    if (JSON.stringify(dataSource) !== JSON.stringify(oldDataSource)) {
      const newDataSource = _dataSource.slice(
        props.pageSize * (state.pagination.current - 1),
        props.pageSize * state.pagination.current
      );
      return {
        oldDataSource: _dataSource,
        dataSource: newDataSource,
        selectionData: {
          selectedRowKeys: state.selectionData.selectedRowKeys,
          selectedRows: newDataSource.filter((v) =>
            state.selectionData.selectedRowKeys.includes(v[props.rowKey])
          ),
          length: state.selectionData.selectedRowKeys.length
        },
        pagination: {
          total: _dataSource.length,
          current: state.pagination.current,
          pageSize: state.pageSize ? state.pageSize : props.pageSize
        }
      };
    }
    return null;
  }
  async componentDidMount() {
    // 初始化筛选器
    await this.initSearchFormOptions();
    const { columns, onRef, searchFormProps, pageSize } = this.props;
    this.setState(
      {
        columns,
        searchFormProps,
        pagination: {
          total: 0,
          current: 1,
          pageSize: pageSize
        }
      },
      () => {
        this.props.tableProxy &&
          this.props.tableProxy.autoLoad &&
          this.getTableData();
      }
    );
    if (onRef) {
      onRef({
        setCurrentColumns: this.setColumns,
        getCurrentColumns: this.getColumns,
        getTableData: this.getTableData,
        refreshData: this.refreshData,
        resetForm: this.resetForm,
        setSearchFormData: this.setSearchFormData,
        getSearchFormData: this.getSearchFormData,
        getSelectionData: this.getSelectionData,
        setSelectionData: this.setSelectionData,
        clearSelectionData: this.clearSelectionData,
        getFormRef: this.getFormRef,
        getRows: this.getRows,
        setLoading: this.setLoading,
        getRowByRowKey: this.getRowByRowKey,
        updateRowByRowKey: this.updateRowByRowKey
      });
    }
    // 是否允许自动请求数据

    // window.addEventListener('resize', this.onWindowResize);
  }
  componentWillUnmount() {
    // window.removeEventListener('resize', this.onWindowResize);
    this.saveFormDataInFormOption();
  }

  setStateAsync(state) {
    return new Promise((resolve: any) => {
      this.setState(state, resolve);
    });
  }

  // 初始化自定义筛选器
  initSearchFormOptions = async () => {
    // 获取默认的筛选器
    let defaultConfig = [
      {
        name: '默认',
        isDefault: true,
        isSelected: false,
        include:
          this.props.searchFormProps &&
          this.props.searchFormProps.items &&
          this.props.searchFormProps.items.map((v) => {
            return {
              label: v.title,
              value: v.name
            };
          }),
        formData: {}
      }
    ];
    // 从localStorage中获取自定义筛选器设置
    const { tableId } = this.props;
    const storageConfig = JSON.parse(
      localStorage.getItem(`${tableId}_searchFormOptions`)
    );
    let config: Array<SearchFormOption> =
      storageConfig && Array.isArray(storageConfig) ? storageConfig : [];
    // 查询配置列表中是否有isSelect为true且只有一个
    const filterResult = config.filter((v) => v.isSelected);
    if (filterResult.length === 0) {
      defaultConfig[0].isSelected = true;
    } else if (filterResult.length !== 1) {
      const firstIndex = config.findIndex((v) => v.isSelected);
      config = config.map((v, i) => {
        if (i === firstIndex) {
          return v;
        }
        return { ...v, isSelected: false };
      });
    }
    config = defaultConfig.concat(config);
    // 此处的config即是可以直接使用的searchFormOptions
    await this.setStateAsync({
      searchFormOptions: config
    });
    const selectedOption = config.find((v) => v.isSelected);
    selectedOption &&
      this.state.formRef &&
      this.state.formRef.setFieldsValue(selectedOption.formData);
  };
  saveFormDataInFormOption = () => {
    const newOptions = this.getSearchFormOptions().map((v) => {
      if (v.isSelected) {
        return {
          ...v,
          formData: this.state.formRef
            ? this.state.formRef.getFieldsValue()
            : {}
        };
      }
      return { ...v };
    });
    const { tableId } = this.props;
    localStorage.setItem(
      `${tableId}_searchFormOptions`,
      JSON.stringify(newOptions.filter((v) => !v.isDefault))
    );
  };
  openSearchFormOptions = (formData?) => {
    const { searchFormConfigRef } = this.state;
    if (searchFormConfigRef) {
      const data = formData ? formData : { include: [], name: '' };
      searchFormConfigRef.setModalVisible(true, data);
    }
  };
  resetSearchFormOptions = () => {
    this.setState(
      {
        searchFormOptions: this.state.searchFormOptions.map((v) => {
          if (v.isDefault) {
            return { ...v, isSelected: true };
          }
          return { ...v, isSelected: false };
        })
      },
      () => {
        this.state.formRef.resetFields();
      }
    );
  };

  setSearchFormOptions = (options: Array<SearchFormOption>) => {
    this.setState(
      {
        searchFormOptions: options
      },
      () => {
        const { tableId } = this.props;
        localStorage.setItem(
          `${tableId}_searchFormOptions`,
          JSON.stringify(options.filter((v) => !v.isDefault))
        );
      }
    );
  };
  setSearchFormOptionSelected = (name: string) => {
    const newOptions = this.getSearchFormOptions().map((v) => {
      if (v.name === name) {
        return { ...v, isSelected: true };
      }
      if (v.isSelected) {
        return {
          ...v,
          formData: this.state.formRef.getFieldsValue(),
          isSelected: false
        };
      }
      return { ...v, isSelected: false };
    });

    this.setState(
      {
        searchFormOptions: newOptions
      },
      () => {
        this.state.formRef.resetFields();
        const selectedOption = this.state.searchFormOptions.find(
          (v) => v.isSelected
        );
        selectedOption &&
          this.state.formRef.setFieldsValue(selectedOption.formData);
        const { tableId } = this.props;
        localStorage.setItem(
          `${tableId}_searchFormOptions`,
          JSON.stringify(newOptions.filter((v) => !v.isDefault))
        );
      }
    );
  };
  deleteSearchFormOption = (name: string) => {
    const newOptions = this.getSearchFormOptions().filter(
      (v) => v.name !== name
    );
    this.setState(
      {
        searchFormOptions: newOptions
      },
      () => {
        const { tableId } = this.props;
        localStorage.setItem(
          `${tableId}_searchFormOptions`,
          JSON.stringify(newOptions.filter((v) => !v.isDefault))
        );
      }
    );
  };
  getSearchFormOptions = () => {
    return this.state.searchFormOptions;
  };

  getTableData = async (defaultParams?: object) => {
    // 如果需要数据代理
    if (this.props.tableProxy && this.props.tableProxy.request) {
      this.setState({
        tableLoading: true
      });
      const formData = this.state.formRef
        ? this.state.formRef.getFieldsValue()
        : {
          ...this.props.defaultSearchData
        };
      let paramData = {
        ...formData,
        size: this.state.pagination.pageSize,
        current: this.state.pagination.current,
        ...defaultParams
      };
      if (JSON.stringify(formData) !== JSON.stringify(this.state.formData)) {
        paramData.current = 1;
      }
      this.saveFormDataInFormOption();
      const res = await this.props.tableProxy.request(paramData);
      if (path(this.props.tableProxy.props.success.split('.'), res)) {
        // 请求成功
        this.setState(
          {
            // total: this.props.tableProxy.props.total.indexOf('.')
            dataSource: dataSourceAdaptor(path(
              this.props.tableProxy.props.result.split('.'),
              res
            )),
            pagination: {
              total: path(this.props.tableProxy.props.total.split('.'), res),
              pageSize: this.state.pagination.pageSize,
              current: paramData.current
            },
            formData
          },
          () => {
            if (this.props.tableProxy.successCallBack) {
              const tableRef = {
                query: this.getTableData,
                dataSource: this.state.dataSource
              };
              this.props.tableProxy.successCallBack(tableRef, res);
            }
          }
        );
      } else {
        // this.setState(
        //   {
        //     dataSource: []
        //   },
        //   () => {
        // 请求失败
        if (this.props.tableProxy.errCallBack) {
          this.props.tableProxy.errCallBack(res);
        }
        //   }
        // );
      }
      this.setState({
        tableLoading: false
      });
    } else {
      // 如果没用数据代理
      const _dataSource = dataSourceAdaptor(this.props.dataSource);
      const total = _dataSource.length;
      this.setState({
        pagination: {
          total,
          pageSize: this.state.pagination.pageSize,
          current: this.state.pagination.current
        },
        dataSource:
          total && this.props.mode.pagination
            ? _dataSource.slice(
              this.state.pagination.pageSize *
              (this.state.pagination.current - 1),
              this.state.pagination.pageSize * this.state.pagination.current
            )
            : _dataSource
      });
    }
    // 触发getTableData必将改变dataSource，所以需要重置selectionData
    this.clearSelectionData();
  };
  onRef = (formRef) => {
    this.setState(
      {
        formRef
      },
      () => {
        this.state.formRef.setFieldsValue(this.props.defaultSearchData);
      }
    );
  };
  onPaginationChange = (page: number, pageSize?: number) => {
    this.setState(
      {
        pagination: {
          current: page,
          total: this.state.pagination.total,
          pageSize: pageSize || this.state.pagination.pageSize
        }
      },
      () => {
        this.getTableData();
      }
    );
  };
  onSelectionChange = (selectedRowKeys, selectedRows) => {
    const selectionData = {
      selectedRowKeys,
      selectedRows,
      length: selectedRowKeys.length
    };
    this.setState(
      {
        selectionData
      },
      () => {
        if (this.props.rowSelectionConfig.onChange) {
          this.props.rowSelectionConfig.onChange(selectionData);
        }
      }
    );
  };
  setColumns = (newColumns: Array<ElSearchTableColumns>) => {
    this.setState({
      columns: newColumns
    });
    return newColumns;
  };
  getColumns = () => {
    return this.state.columns;
  };
  refreshData = (callBack?: Function) => {
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          current: 1
        }
      },
      () => {
        if (callBack) {
          callBack();
        } else {
          this.getTableData();
        }
      }
    );
  };
  onRowClick = (record: any, index: number) => {
    //如果通过disabledRowIds禁掉数据选择后应直接返回
    if (
      this.props.rowSelectionConfig?.disabledRowIds &&
        Array.isArray(this.props.rowSelectionConfig.disabledRowIds)
        ? this.props.rowSelectionConfig.disabledRowIds.some(
          (item) => record[this.props.rowKey] === item
        )
        : false
    ) {
      return;
    }
    const { selectionData } = this.state;
    const { rowKey } = this.props;
    selectionData.selectedRowKeys = [record[rowKey]];
    selectionData.selectedRows = [record];
    selectionData.length = 1;
    this.setState(
      {
        tempRecord: record,
        selectionData: clone(selectionData)
      },
      () => {
        if (this.props.rowSelectionConfig?.onChange) {
          this.props.rowSelectionConfig.onChange(selectionData);
        }
      }
    );
  };
  resetForm = (callBack?: Function) => {
    this.state.formRef.resetFields();
    if (callBack) {
      callBack();
    }
  };
  setSearchFormData = (data) => {
    this.state.formRef.setFieldsValue(data);
  };
  getSearchFormData = () => {
    return this.state.formRef.getFieldsValue();
  };
  getSelectionData = () => {
    return this.state.selectionData;
  };
  setSelectionData = (data) => {
    return this.setState({
      selectionData: data
    });
  };
  clearSelectionData = () => {
    return this.setState({
      selectionData: {
        selectedRowKeys: [],
        selectedRows: [],
        length: 0
      }
    });
  };
  getFormRef = () => {
    return this.state.formRef;
  };
  getRows = () => {
    return this.state.dataSource;
  };
  setLoading = (loading: boolean) => {
    this.setState({
      tableLoading: loading
    });
  };
  getRowByRowKey = (rowKey: string) => {
    return this.state.dataSource.find((v) => v[this.props.rowKey] === rowKey);
  };
  updateRowByRowKey = (rowKey: string, data) => {
    this.setState({
      dataSource: this.state.dataSource.map((v) => {
        if (v[this.props.rowKey] === rowKey) {
          return data;
        }
        return v;
      })
    });
  };
  // 筛选器方法
  setSearchFormProps = (searchFormProps: ElFormProps, callBack?: Function) => {
    this.setState(
      {
        searchFormProps
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };
  tableCheckboxOnClick = (record) => {
    if (
      this.props.rowSelectionConfig?.disabledRowIds &&
        Array.isArray(this.props.rowSelectionConfig.disabledRowIds)
        ? this.props.rowSelectionConfig.disabledRowIds.some(
          (item) => record[this.props.rowKey] === item
        )
        : false
    ) {
      return;
    }
    const { selectionData } = this.state;
    const { rowKey } = this.props;
    if (selectionData.selectedRowKeys.includes(record[rowKey])) {
      //
      const filterSelectedRows = selectionData.selectedRows.filter(
        (v) => v[rowKey] !== record[rowKey]
      );
      const filterSelectedRowKeys = filterSelectedRows.map((v) => v[rowKey]);
      const newSelectionData = {
        selectedRows: filterSelectedRows,
        selectedRowKeys: filterSelectedRowKeys,
        length: selectionData.length - 1
      };
      this.setState(
        {
          selectionData: newSelectionData
        },
        () => {
          return () => {
            if (this.props.rowSelectionConfig?.onChange) {
              this.props.rowSelectionConfig.onChange(newSelectionData);
            }
          };
        }
      );
    } else {
      const newSelectionData = {
        selectedRows: [...selectionData.selectedRows, record],
        selectedRowKeys: [...selectionData.selectedRowKeys, record[rowKey]],
        length: selectionData.length + 1
      };
      this.setState(
        {
          selectionData: newSelectionData
        },
        () => {
          if (this.props.rowSelectionConfig?.onChange) {
            this.props.rowSelectionConfig.onChange(newSelectionData);
          }
        }
      );
    }
  };

  renderSummary = (
    pageData,
    columns: Array<ElSearchTableColumns>,
    selectionData: SelectionDataProps
  ) => {
    let types: Array<SummarySetupProps> = [
      {
        type: 'sum',
        name: '总和',
        func: sum,
        target: 'auto',
        emptyText: '-',
        props: {}
      },
      {
        type: 'average',
        name: '平均',
        func: average,
        target: 'auto',
        emptyText: '-',
        props: {}
      },
      {
        type: 'count',
        name: '计数',
        func: count,
        target: 'auto',
        emptyText: '-',
        props: {}
      },
      {
        type: 'max',
        name: '最大',
        func: max,
        target: 'auto',
        emptyText: '-',
        props: {}
      },
      {
        type: 'min',
        name: '最小',
        func: min,
        target: 'auto',
        emptyText: '-',
        props: {}
      }
    ];
    const { summarySetup } = this.props;
    if (summarySetup) {
      types = types.concat(summarySetup);
    }
    //这里应该加上table.summary
    return (
      <>
        {this.state.dataSource.length !== 0
          ? types.map((v) => {
            return this.renderSummaryRow(
              v.type,
              v.name,
              v.func,
              v.target,
              v.emptyText,
              v.props,
              v.render,
              v.cellProps,
              columns,
              pageData,
              selectionData
            );
          })
          : null}
      </>
    );
  };
  renderSummaryRow = (
    type: string,
    name: string,
    fuc: Function,
    target: 'auto' | 'manual',
    emptyText: string,
    props: any,
    render,
    cellProps: any,
    columns: Array<ElSearchTableColumns>,
    pageData: any[],
    selectionData: SelectionDataProps
  ) => {
    const shouldRender = columns.find(
      (v) => v.summary && Object.keys(v.summary).includes(type)
    );
    if (!shouldRender) {
      return null;
    }
    const rowColumns = columns.map((v, i) => {
      if (v.summary && Object.keys(v.summary).includes(type)) {
        return (
          <Table.Summary.Cell
            index={i + 1}
            key={type + v.dataIndex}
            className={'summary-cell ' + v.className ? v.className : ''}
            {...omit(['className', 'title', 'dataIndex', 'summary'], v)}
          >
            {this.renderSummaryCell(
              this.summaryComputed(
                v.summary[type].target || target,
                v.dataIndex,
                v.summary[type].func || fuc,
                pageData,
                selectionData
              ),
              v.summary[type].render || render,
              v.summary[type].cellProps || cellProps || { precision: 2 }
            )}
          </Table.Summary.Cell>
        );
      } else {
        return (
          <Table.Summary.Cell
            index={i + 1}
            key={`empty${v.dataIndex}${type}`}
            className='summary-cell-empty'
            {...omit(['className', 'title', 'dataIndex', 'summary'], v)}
          >
            {emptyText}
          </Table.Summary.Cell>
        );
      }
    });
    // .filter((v) => !!v);
    return (
      <Table.Summary.Row key={'summary-row-' + type} {...props}>
        <Table.Summary.Cell index={0} key={'summary-index-' + type}>
          {name}
        </Table.Summary.Cell>
        {rowColumns}
      </Table.Summary.Row>
    );
  };
  renderSummaryCell = (
    num: number | string,
    render: Function,
    cellProps: any
  ) => {
    if (render) {
      return render(num);
    } else {
      return <Statistic value={num} {...cellProps} />;
    }
  };
  summaryComputed = (
    target: 'manual' | 'auto',
    dataIndex: string,
    func: Function,
    pageData: any[],
    selectionData: SelectionDataProps
  ): string => {
    if (target === 'manual') {
      return func(selectionData.selectedRows, dataIndex);
    } else {
      return func(pageData, dataIndex);
    }
  };
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        {this.props.mode.proxy && (
          <div className='elSearchTable-proxyButton-container'>
            {this.props.tableId && (
              <SearchFormConfig
                searchFormProps={this.state.searchFormProps}
                setSearchFormProps={this.setSearchFormProps}
                searchFormOptions={this.state.searchFormOptions}
                setSearchFormOptions={this.setSearchFormOptions}
                onRef={(searchFormConfigRef) => {
                  this.setState({
                    searchFormConfigRef
                  });
                }}
              />
            )}
            <Button
              icon={<SearchWhite />}
              type='primary'
              className='proxy-button-left'
              onClick={() => {
                this.refreshData();
              }}
            >
              查询
            </Button>
            <Button
              icon={<RefreshBlack />}
              className='proxy-button-left'
              onClick={() => this.resetForm(this.props.onResetButtonClick)}
            >
              重置
            </Button>
            {this.props.tableId && (
              <>
                <Button
                  className={cls('proxy-button-left', 'screening-button')}
                  onClick={this.resetSearchFormOptions}
                >
                  默认筛选
                </Button>
                {this.state.searchFormOptions
                  .filter((v) => !v.isDefault)
                  .map((v) => {
                    return (
                      <Dropdown.Button
                        key={v.name}
                        type={v.isSelected ? 'primary' : 'dashed'}
                        overlay={
                          <Menu>
                            <Menu.Item
                              key={`${v.name}_edit`}
                              onClick={() => {
                                this.openSearchFormOptions(v);
                              }}
                            >
                              编辑
                            </Menu.Item>
                            <Menu.Item
                              key={`${v.name}_delete`}
                              onClick={() =>
                                this.deleteSearchFormOption(v.name)
                              }
                            >
                              删除
                            </Menu.Item>
                          </Menu>
                        }
                        className={cls('proxy-button-left', 'buttonIsSelected')}
                        onClick={() => this.setSearchFormOptionSelected(v.name)}
                      >
                        {v.name}
                      </Dropdown.Button>
                    );
                  })}
                <Button
                  icon={<AddWhite />}
                  className='proxy-button-right proxy-button screening-button'
                  onClick={() => this.openSearchFormOptions()}
                >
                  添加筛选器
                </Button>
              </>
            )}
          </div>
        )}
        {this.props.mode.search && (
          <div className='elSearchTable-queryForm-container'>
            <SearchForm
              onRef={this.onRef}
              submitForm={this.getTableData}
              searchFormProps={this.state.searchFormProps}
              searchFormOptions={this.state.searchFormOptions}
            />
          </div>
        )}
        {this.props.mode.action && (
          <div className='elSearchTable-actionButton-container'>
            <div className='elSearchTable-actionButton-container-left'>
              {this.props.actionButtonsExtraRender &&
                this.props.actionButtonsExtraRender()}
              {Array.isArray(this.props.actionButtons) &&
                this.props.actionButtons
                  .filter(
                    (v) => (v.location && v.location !== 'right') || !v.location
                  )
                  .map((v) => {
                    const {
                      text,
                      key,
                      disabled,
                      hidden,
                      handleClick,
                      icon,
                      overLay,
                      minSelection = 0,
                      maxSelection = 0,
                      needConfirm = false,
                      confirmText = '您确定吗?',
                      authCode
                    } = v;
                    return overLay ? (
                      <AuthWrapper authCode={authCode} key={v.key}>
                        <Dropdown
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                              v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          overlay={
                            <Menu>
                              {overLay && Array.isArray(overLay) ? (
                                overLay.map((value) => {
                                  return (
                                    <MenuItem
                                      key={value.key}
                                      disabled={
                                        disabled ||
                                        (minSelection !== 0 &&
                                          this.state.selectionData.length <
                                          v.minSelection) ||
                                        (maxSelection !== 0 &&
                                          this.state.selectionData.length >
                                          v.maxSelection)
                                      }
                                      icon={value.icon}
                                      onClick={() => {
                                        if (value.handleClick) {
                                          value.handleClick(
                                            this.state.selectionData,
                                            this.state.formRef &&
                                            this.state.formRef.getFieldsValue(),
                                            this.state.pagination
                                          );
                                        }
                                      }}
                                    // className={'action-button'}
                                    >
                                      {value.text}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </Menu>
                          }
                        >
                          <Button
                            key={key}
                            disabled={
                              disabled ||
                              (minSelection !== 0 &&
                                this.state.selectionData.length <
                                v.minSelection) ||
                              (maxSelection !== 0 &&
                                this.state.selectionData.length >
                                v.maxSelection)
                            }
                            icon={icon}
                            onClick={() => {
                              if (handleClick) {
                                handleClick(
                                  this.state.selectionData,
                                  this.state.formRef &&
                                  this.state.formRef.getFieldsValue(),
                                  this.state.pagination
                                );
                              }
                            }}
                            className={'action-button'}
                          >
                            {text}
                            <DownBlack />
                          </Button>
                        </Dropdown>
                      </AuthWrapper>
                    ) : needConfirm ? (
                      <AuthWrapper authCode={authCode} key={v.key}>
                        <Button
                          key={key}
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                              v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          hidden={hidden}
                          icon={icon}
                          className='action-button'
                          onClick={() =>
                            confirm({
                              content: confirmText,
                              cancelText: '取消',
                              okText: '确认',
                              onOk: () => {
                                handleClick(
                                  this.state.selectionData,
                                  this.state.formRef &&
                                  this.state.formRef.getFieldsValue(),
                                  this.state.pagination
                                );
                              },
                              onCancel: () => { }
                            })
                          }
                        >
                          {text}
                        </Button>
                      </AuthWrapper>
                    ) : (
                      <AuthWrapper authCode={authCode} key={v.key}>
                        <Button
                          key={key}
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                              v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          hidden={hidden}
                          icon={icon}
                          onClick={() => {
                            if (handleClick) {
                              handleClick(
                                this.state.selectionData,
                                this.state.formRef &&
                                this.state.formRef.getFieldsValue(),
                                this.state.pagination
                              );
                            }
                          }}
                          className='action-button'
                        >
                          {text}
                        </Button>
                      </AuthWrapper>
                    );
                  })}
            </div>
            <div className='elSearchTable-actionButton-container-right'>
              {Array.isArray(this.props.actionButtons) &&
                this.props.actionButtons
                  .filter(
                    (v) => (v.location && v.location !== 'left') || !v.location
                  )
                  .map((v) => {
                    const {
                      text,
                      key,
                      disabled,
                      hidden,
                      handleClick,
                      icon,
                      overLay,
                      minSelection = 0,
                      maxSelection = 0,
                      needConfirm = false,
                      confirmText = '您确定吗?',
                      authCode
                    } = v;
                    return overLay ? (
                      <AuthWrapper authCode={authCode} key={key}>
                        <Dropdown
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                              v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          overlay={
                            <Menu>
                              {overLay && Array.isArray(overLay) ? (
                                overLay.map((value) => {
                                  return (
                                    <MenuItem
                                      key={value.key}
                                      disabled={
                                        disabled ||
                                        (minSelection !== 0 &&
                                          this.state.selectionData.length <
                                          v.minSelection) ||
                                        (maxSelection !== 0 &&
                                          this.state.selectionData.length >
                                          v.maxSelection)
                                      }
                                      icon={value.icon}
                                      onClick={() => {
                                        if (value.handleClick) {
                                          value.handleClick(
                                            this.state.selectionData,
                                            this.state.formRef &&
                                            this.state.formRef.getFieldsValue(),
                                            this.state.pagination
                                          );
                                        }
                                      }}
                                    // className={'action-button'}
                                    >
                                      {value.text}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </Menu>
                          }
                        >
                          <Button
                            key={key}
                            disabled={
                              disabled ||
                              (minSelection !== 0 &&
                                this.state.selectionData.length <
                                v.minSelection) ||
                              (maxSelection !== 0 &&
                                this.state.selectionData.length >
                                v.maxSelection)
                            }
                            icon={icon}
                            onClick={() => {
                              if (handleClick) {
                                handleClick(
                                  this.state.selectionData,
                                  this.state.formRef &&
                                  this.state.formRef.getFieldsValue(),
                                  this.state.pagination
                                );
                              }
                            }}
                            className='action-button'
                          >
                            {text}
                            <DownBlack />
                          </Button>
                        </Dropdown>
                      </AuthWrapper>
                    ) : needConfirm ? (
                      <AuthWrapper authCode={authCode} key={key}>
                        <Button
                          key={key}
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                              v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          hidden={hidden}
                          icon={icon}
                          className='action-button'
                          onClick={() =>
                            confirm({
                              content: confirmText,
                              cancelText: '取消',
                              okText: '确认',
                              onOk: () => {
                                handleClick(
                                  this.state.selectionData,
                                  this.state.formRef &&
                                  this.state.formRef.getFieldsValue(),
                                  this.state.pagination
                                );
                              },
                              onCancel: () => { }
                            })
                          }
                        >
                          {text}
                        </Button>
                      </AuthWrapper>
                    ) : (
                      <AuthWrapper authCode={authCode} key={key}>
                        <Button
                          key={key}
                          disabled={
                            disabled ||
                            (minSelection !== 0 &&
                              this.state.selectionData.length <
                              v.minSelection) ||
                            (maxSelection !== 0 &&
                              this.state.selectionData.length > v.maxSelection)
                          }
                          hidden={hidden}
                          icon={icon}
                          onClick={() => {
                            if (handleClick) {
                              handleClick(
                                this.state.selectionData,
                                this.state.formRef &&
                                this.state.formRef.getFieldsValue(),
                                this.state.pagination
                              );
                            }
                          }}
                          className='action-button'
                        >
                          {text}
                        </Button>
                      </AuthWrapper>
                    );
                  })}
            </div>
          </div>
        )}
        {this.props.mode.descriptions && (
          <div className='elSearchTable-description-container'>
            {this.props.descriptions && this.props.descriptions()}
          </div>
        )}
        <div className='elSearchTable-container'>
          <Table
            bordered
            summary={(pageData) =>
              this.renderSummary(
                pageData,
                this.state.columns,
                this.state.selectionData
              )
            }
            rowClassName={(record, index) => {
              let className = 'singular-row';
              if (index % 2 === 1) className = 'dual-row';
              if (this.state.selectionData.selectedRows.indexOf(record) > -1)
                className = `${className} row-selected`;
              return className;
            }}
            onRow={(record: any, index: number) => {
              return {
                onClick: (e: any) => {
                  if (/ant-checkbox-wrapper/.test(e.target.innerHTML)) {
                    this.tableCheckboxOnClick(record);
                  } else {
                    if (this.props.onTableRowClick) {
                      this.props.onTableRowClick(record, index);
                    }
                    this.onRowClick(record, index);
                  }
                }
              };
            }}
            {...this.props}
            size='small'
            className='elSearchTable'
            rowKey={this.props.rowKey}
            loading={this.state.tableLoading || this.props.loading}
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            rowSelection={
              this.props.rowSelectionConfig
                ? {
                  selectedRowKeys:
                    this.props.rowSelectionConfig.selectedRowKeys ||
                    this.state.selectionData.selectedRowKeys,
                  onChange: this.onSelectionChange,
                  type: this.props.rowSelectionConfig.type,
                  fixed: this.props.rowSelectionConfig.fixed,
                  getCheckboxProps: (record) => {
                    return {
                      disabled: Array.isArray(
                        this.props.rowSelectionConfig.disabledRowIds
                      )
                        ? this.props.rowSelectionConfig.disabledRowIds.some(
                          (item) => record[this.props.rowKey] === item
                        )
                        : false
                    };
                  }
                }
                : null
            }
            pagination={
              this.props.mode.pagination
                ? {
                  size: 'small',
                  total: this.state.pagination.total,
                  current: this.state.pagination.current,
                  // hideOnSinglePage: true,
                  pageSize: this.state.pagination.pageSize,
                  showQuickJumper: true,
                  showSizeChanger: true,
                  showTotal: (total, range) => {
                    return (
                      <>
                        <ToolBar
                          columns={this.props.columns}
                          setColumns={this.setColumns}
                          tableId={this.props.tableId}
                        />
                        {/** todo 优化 **/}
                        <span
                          style={{ marginRight: '10px' }}
                        >{`共${this.state.pagination.total}条记录`}</span>
                        <span
                          style={{ marginRight: '10px' }}
                        >{`当前页共${this.state.dataSource.length}条记录`}</span>
                        <span style={{ marginRight: '10px' }}>{`共${Math.ceil(
                          total / this.state.pagination.pageSize
                        )}页`}</span>
                      </>
                    );
                  },
                  onChange: this.onPaginationChange
                }
                : false
            }
          />
        </div>

        {this.props.mode.tabs && (
          <div className='elSearchTable-tab-container'>
            <ElTab {...this.props.tabs} record={this.state.tempRecord} />
          </div>
        )}
      </ConfigProvider>
    );
  }
}
export type {
  ElSearchTableColumns,
  ActionButtonProps,
  TableProxy,
  SearchFormOption
};
export default ElSearchTable;
