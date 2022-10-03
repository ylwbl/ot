import React from 'react';
import { ColumnType, TableProps } from 'antd/lib/table';
import { ButtonProps } from 'antd/lib/button';
import {
  Table,
  Button,
  FormInstance,
  Dropdown,
  Modal,
  Menu,
  Statistic
} from 'antd';
import ElForm from '../ElForm';
import ElFormItem from '../ElForm/components/ElFormItem';
import cls from 'classnames';
import validate from './utils/validate';
import { path } from 'ramda';
import './style.less';
import { addOnlyRowId } from './utils/utils';
import ToolBar from './components/ToolBar';
import MenuItem from 'antd/lib/menu/MenuItem';
import AuthWrapper from '@/layout/AuthWrapper';
import { clone } from 'ramda';
import { DownBlack } from '@/components/el/ElIcon';
import { ElNotification } from '..';
const { confirm } = Modal;
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { sum, average, count, max, min } from './summary';
import { omit } from 'ramda';

/**
 * @name ElEditTable
 * @description 可编辑表格
 * # ElEditTable 使用文档

注意: ElEditTable 是基于 antd table 的再次封装,通常情况下,antd 的原本的属性和方法都可以使用

双击编辑,esc 退出编辑

## 1.tableProps

| 属性               | 类型                                                               | 解释                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rowKey             | string                                                             | 不传入的情况下默认为 id,表格行的唯一标识                                                                                                                                                                      |
| rowSelectionConfig | {type：‘radio’ \|\| ‘checkbox’，fixed: boolean,disabledRowIds: []} | 不传入情况下不会出现表格选中列,radio 为单选,checkbox 为多选,fixed 为 true 时,选中列会固定在左侧,同时 onChange 事件会触发,当传入 disabledRowIds 时,如果 record 的 rowkey 和表格中某一项相等,则禁用该行的选择器 |
| dataSource         | Array<object>                                                      | 表格的数据,当传入 tableProxy 时,此项不会起效                                                                                                                                                                  |
| disabledTable      | boolean                                                            | 是否禁用表格编辑功能                                                                                                                                                                                          |
| tableProxy         | object 见下                                                        | 数据代理                                                                                                                                                                                                      |
| actionButtons      | Array<object>见下                                                  | 事件按钮列表                                                                                                                                                                                                  |
| pageSize           | number                                                             | 每页表格显示的行数                                                                                                                                                                                            |
| columns            | Array<object>见下                                                  | 表格列配置                                                                                                                                                                                                    |
| descriptions       | () => JSX.ELEMENT                                                  | actionsButtons 下方的插槽,可以插入任意的 jsx                                                                                                                                                                  |
| onRef              | (ref) => {}                                                        | 第一个入参 ref 即可编辑表格暴露出来的方法                                                                                                                                                                     |
| editFocusName      | string                                                             | 当进入编辑状态时,会去找对应的编辑列并进行聚焦                                                                                                                                                                 |
| getNewDataExtra    | () => {return {}}                                                  | 返回的值会在可编辑表格新增一行的时候进行数据补充，如果配置为                                                                                                                                                  |
| dealDataToForm     | (record) => {return {}}                                            | 入参为即将进入编辑的行数据,返回值会作为编辑状态的行的数据                                                                                                                                                     |
| dealFormToData     | ({data, record, formRef}) => {return {}}                           | 入参为对象,data 是结构赋值的行数据和编辑状态的数据混合,record 是行数据,formRef 是 formInstance,返回的值会作为行数据进行保存                                                                                   |

### 1.tableProxy

| 属性            | 类型                                              | 解释                                                       |
| -------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| request         | () => Promise                                     | 返回后端请求                                               |
| errCallBack     | Function                                          | 请求失败的回调                                             |
| successCallBack | Function(tableRef)                                | 请求成功的回调                                             |
| props           | {result: string, total: string, success: boolean} | 在请求返回的 response 里面请求数据,数据总量,是否成功的键名 |

### 2.actionButtons

| 属性         | 类型                   | 解释         |
| ------------ | ---------------------- | ------------ |
| text         | string                 | 按钮文字     |
| disabled     | boolean                | 是否禁用     |
| hidden       | boolean                | 是否隐藏     |
| key          | string                 | 唯一标识     |
| handleClick  | Function(selectedData) | 点击事件     |
| icon         | JSX.ELEMENT            | 按钮图标     |
| overLay      | Array<actionButtons>   | 下拉按钮组   |
| minSelection | number                 | 最小选中数   |
| maxSelection | number                 | 最大选中数   |
| needConfirm  | boolean                | 是否需要确认 |
| confirmText  | string                 | 确认框文字   |

### 3.columns

| 属性            | 类型                                                      | 解释                                                                                                                                               |
| --------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| title           | string                                                    | 列 title                                                                                                                                           |
| width           | number                                                    | 列宽度                                                                                                                                             |
| dataIndex       | string                                                    | 列字段                                                                                                                                             |
| editable        | boolean                                                   | 是否可编辑                                                                                                                                         |
| field           | () => {return {}}                                         | 具体见下                                                                                                                                           |
| renderDataIndex | string                                                    | 在可编辑的 cell 不处于编辑状态时,覆盖原来的 dataIndex                                                                                              |
| cellRender      | (text, record, index) => JSX.ELEMENT                      | 表格在非编辑状态下的 render 方法                                                                                                                   |
| selectMapping   | ({changedValues,allValues,record,formRef}) => {return {}} | changedValues 当前改变的值,allValues 所有的 form 的值, record,当前编辑的行的表格的数据,formRef,formInstance， 返回的值会对当前编辑的 form 进行赋值 |

### 5.onRef 获取的方法

| 方法名                                                                            | 解释                                                                                                                                         |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| getActiveRow: ()=> obj                                                            | 获取当前编辑的行的数据                                                                                                                       |
| setActiveRow: (data) => void                                                      | 设置当前编辑的行的数据                                                                                                                       |
| getActiveRecord: () => obj                                                        | 获取当前编辑的行的表格的数据                                                                                                                 |
| clearActiveRow: () => void                                                        | 清空当前编辑的行的数据                                                                                                                       |
| quitEditState: () => void                                                         | 保存并退出编辑状态                                                                                                                           |
| getRows:() => dataSource                                                          | 获取 dataSource                                                                                                                              |
| addRow: (data) => void                                                            | 新增一行,data 会加入 dataSource                                                                                                              |
| addRows: (data: Array) => void                                                    | 新增多行                                                                                                                                     |
| reloadTableData: () =>                                                            | 重新获取表格数据                                                                                                                             |
| getRowByIndex:(index) => data                                                     | 返回 dataSource[index]的值                                                                                                                   |
| clearRows: () => void                                                             | 清空表格                                                                                                                                     |
| removeRowByKey:(key:any, type?: 'index'\| 'rowKey') => newDataSource              | 删除指定的 key 对应的 dataSource 中的数据,当 type 为 index 时,删除 dataSource[index]，当为 rowKey 时,删除 dataSource[rowKey=key]             |
| removeRowsByKeys: (keys: Array<any>, type?: 'index' \| 'rowKey') => newDataSource | 删除指定的 keys 数组中 key 对应的 dataSource 中的数据,当 type 为 index 时,删除 dataSource[index]，当为 rowKey 时,删除 dataSource[rowKey=key] |
| validateTableRows:() => Promise                                                   | 校验全表格                                                                                                                                   |
| getSelectionData: () => obj                                                       | 返回 selectionData 信息                                                                                                                      |
| setSelectionData:(data) => void                                                   | 设置 selectionData 信息                                                                                                                      |
| clearSelectionData: () => void                                                    | 清空 selectionData 信息                                                                                                                      |
| getFormRef: () => FormInstance                                                    | 获取 form 对象                                                                                                                               |
| setUpRow:(index: number) => void                                                  | 将 index 对应的 record 向上移                                                                                                                |
| setDownRow:(index: number) => void                                                | 将 index 对应的 reocrd 向下移                                                                                                                |
| swapRow:(index1: number, index2: number) => void                                  | 交换两个入参对应的 record 位置                                                                                                               |
| setLoading                                                                        | 设置表格的 loading 状态                                                                                                                      |
| setCurrentColumns                                                                 | 设置列配置                                                                                                                                   |
| getCurrentColumns                                                                 | 获取当前列配置                                                                                                                               |
| refreshCurrentColumns                                                             | 刷新表格列配置,会引起表格重载                                                                                                                |
| updateTableData: (data: object) => void                                           | 通过传入的 data,更新表格每一行数据，可以覆盖 dataSource 本身的数据                                                                           |
| updateRows:(data: object,rowKeyList:Array<string> ) => void                       | 通过传入的 data,更新所有 rowKey 在 rowKeyList 中存在的行，正常情况传入 selectedRowKeys 即可                                                  |

 */

/**
 * @interface ElEditTableProps
 * @param tableId?: string;
 * @param rowKey: string;
 * @param rowSelectionConfig?: {
     type: 'radio' | 'checkbox';
     fixed: boolean;
     onChange?: Function;
     disabledRowIds?: Array<unknown>;
     columnWidth?: number | string;
   };
 * @param disabledTable?: boolean;
 * @param columns: Array<ElEditTableColumns>;
 * @param editFocusName?: string;
 * @param dataSource?: Array<any>;
 * @param tableProxy?: TableProxy;
 * @param actionButtonsExtraRender?: Function;
 * @param actionButtons?: Array<ActionButtonProps>;
 * @param descriptions?: Function;
 * @param onRef?: Function;
 * @param getNewDataExtra?: Function;
 * @param dealDataToForm?: Function;
 * @param dealFormToData?: Function;
 * @param needToolBar?: boolean;
 * @param defaultTableConfig?: {
    onBottomPressEnter: 'add' | 'save' | 'trigger' | 'noaction';
    onTableIntoEdit: 'click' | 'dbclick';
  };
 * @param canTableRowEdit?: Function;
 * @param summarySetup?: Array<SummarySetupProps>;
 */
interface ElEditTableProps extends TableProps<any> {
  tableId?: string;
  rowKey: string;
  rowSelectionConfig?: {
    type: 'radio' | 'checkbox';
    fixed: boolean;
    onChange?: Function;
    disabledRowIds?: Array<unknown>;
    columnWidth?: number | string;
  };
  disabledTable?: boolean;
  columns: Array<ElEditTableColumns>;
  editFocusName?: string;
  dataSource?: Array<any>;
  tableProxy?: TableProxy;
  actionButtonsExtraRender?: Function;
  actionButtons?: Array<ActionButtonProps>;
  descriptions?: Function;
  onRef?: Function;
  getNewDataExtra?: Function;
  dealDataToForm?: Function;
  dealFormToData?: Function;
  needToolBar?: boolean;
  defaultTableConfig?: {
    onBottomPressEnter: 'add' | 'save' | 'trigger' | 'noaction';
    onTableIntoEdit: 'click' | 'dbclick';
  };
  canTableRowEdit?: Function;
  summarySetup?: Array<SummarySetupProps>;
}
interface SelectionDataProps {
  selectedRowKeys: Array<any>;
  selectedRows: Array<any>;
  length: number;
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

/**
 * @interface TableProxy
 * @param autoLoad?: boolean;
 * @param request?: Function;
 * @param errCallBack?: Function;
 * @param successCallBack?: Function;
 * @param props?: {
       result: string;
       total: string;
       success: string;
     };
   }
 */
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
}
interface ColumnsRule {
  type?:
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null'
  | 'any';
  pattern?: string;
  format?: Function;
  minLength?: number;
  maxLength?: number;
  const?: string | number;
  enum?: string[] | number[];
  required?: boolean;
  multipleOf?: number;
  message?: string;
}

/**
 * @interface ElEditTableColumns
 * @extends ColumnType<any>
 * @param title?: any;
 * @param width?: number;
 * @param dataIndex?: string;
 * @param editable?: boolean;
 * @param field?: Function;
 * @param rule?: ColumnsRule;
 * @param selectMapping?: Function;
 * @param renderDataIndex?: string;
 * @param cellRender?: any;
 * @param children?: any;
 * @param summary?: SummaryProps;
 */
interface ElEditTableColumns extends ColumnType<any> {
  title?: any;
  width?: number;
  dataIndex?: string;
  editable?: boolean;
  field?: Function;
  rule?: ColumnsRule;
  selectMapping?: Function;
  renderDataIndex?: string;
  cellRender?: any;
  children?: any;
  summary?: SummaryProps;
}
interface SummaryProps {
  [type: string]: {
    //'max' | 'min' | 'sum' | 'average' | 'count' | string
    func?: Function;
    target?: 'auto' | 'manual';
    render?: Function;
    cellProps?: any;
  };
}
interface State {
  offset: number;
  tableLoading: boolean;
  dataSource: Array<any>;
  selectionData: SelectionDataProps;
  columns: Array<ElEditTableColumns>;
  hasSet: boolean;
  errRowIndexs: Array<number>;
  formRef: FormInstance;
  config: {
    onBottomPressEnter: 'trigger' | 'save' | 'add' | 'noaction';
    onTableIntoEdit: 'click' | 'dbclick';
  };
  extraData: any;
}

// todo editTable
class ElEditTable extends React.Component<ElEditTableProps, State> {
  static defaultProps = {
    rowKey: 'rowId',
    tableId: 'EditTable',
    mode: {
      proxy: true,
      search: true,
      action: true,
      pagination: true,
      descriptions: true
    },
    disabledTable: false,
    columns: [],
    actionButtons: [],
    rowSelectionConfig: {
      type: 'checkbox',
      fixed: true,
      disabledRowIds: []
    },
    tableProxy: {
      autoLoad: true,
      props: {
        result: 'data',
        total: 'data.length',
        success: 'success'
      }
    },
    needToolBar: true
  };
  constructor(props) {
    super(props);
    this.state = {
      offset: -1,
      tableLoading: false,
      dataSource: [],
      selectionData: {
        selectedRows: [],
        selectedRowKeys: [],
        length: 0
      },
      columns: [],
      hasSet: false,
      errRowIndexs: [],
      formRef: null,
      config: {
        onBottomPressEnter: props.defaultTableConfig
          ? props.defaultTableConfig.onBottomPressEnter
          : 'add',
        onTableIntoEdit: props.defaultTableConfig
          ? props.defaultTableConfig.onTableIntoEdit
          : 'dbclick'
      },
      extraData: {}
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { dataSource } = props;
    const { dataSource: oldDataSource } = state;
    let returnData: any = {};
    if (JSON.stringify(props.columns) !== JSON.stringify(state.columns)) {
      returnData.columns = props.columns;
    }
    if (
      !state.hasSet &&
      dataSource &&
      dataSource.length >= 1 &&
      dataSource !== oldDataSource &&
      Array.isArray(dataSource)
    ) {
      (returnData.dataSource = dataSource.map((v) =>
        addOnlyRowId(v, props.rowKey)
      )),
        (returnData.hasSet = true);
    }
    return returnData;
  }
  componentDidMount() {
    const { onRef, columns } = this.props;
    // 不再暴露整个this
    if (onRef) {
      this.props.onRef({
        getActiveRow: this.getActiveRow,
        getActiveRecord: this.getActiveRecord,
        setActiveRow: this.setActiveRow,
        quitEditState: this.quitEditState,
        reloadTableData: this.getTableData,
        addRow: this.addRow,
        getRows: this.getRows,
        getRowByIndex: this.getRowByIndex,
        clearRows: this.clearRows,
        removeRowByKey: this.removeRowByKey,
        validateTableRows: this.validateTable,
        getSelectionData: this.getSelectionData,
        setSelectionData: this.setSelectionData,
        clearSelectionData: this.clearSelectionData,
        getFormRef: this.getFormRef,
        removeRowsByKeys: this.removeRowsByKeys,
        addRows: this.addRows,
        setUpRow: this.setUpRow,
        setDownRow: this.setDownRow,
        swapRow: this.swapRow,
        setLoading: this.setLoading,
        setCurrentColumns: this.setCurrentColumns,
        getCurrentColumns: this.getCurrentColumns,
        refreshCurrentColumns: this.refreshCurrentColumns,
        updateTableData: this.updateTableData,
        updateRows: this.updateRows
      });
    }
    this.getColumnsConfig(columns);
    this.addKeyDownEvent();
    this.getTableData();
  }
  getColumnsConfig = (
    columns: Array<ElEditTableColumns>,
    callBack?: Function
  ) => {
    const newColumns = columns.map((v) => {
      return {
        ...v,
        key: v.dataIndex
        // title: v.editable ? (
        //   <span>
        //     {v.title}
        //     <EditBlue style={{ marginLeft: '5px' }} />
        //   </span>
        // ) : (
        //   v.title
        // )
      };
    });
    this.setState(
      {
        columns: newColumns
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };
  getTableData = async () => {
    // 如果需要数据代理
    if (
      this.props.tableProxy &&
      this.props.tableProxy.request &&
      this.props.tableProxy.autoLoad
    ) {
      this.setState({
        tableLoading: true
      });
      const res = await this.props.tableProxy.request();
      if (path(this.props.tableProxy.props.success.split('.'), res)) {
        // 请求成功
        this.setState(
          {
            // total: this.props.tableProxy.props.total.indexOf('.')
            dataSource: Array.from(
              path(this.props.tableProxy.props.result.split('.'), res)
            ).map((v) => addOnlyRowId(v, this.props.rowKey))
          },
          () => {
            this.clearSelectionData();
            if (this.props.tableProxy.successCallBack) {
              const tableRef = {
                query: this.getTableData,
                dataSource: this.state.dataSource
              };
              this.props.tableProxy.successCallBack(tableRef);
            }
          }
        );
      } else {
        this.setState(
          {
            dataSource: []
          },
          () => {
            // 请求失败
            if (this.props.tableProxy.errCallBack) {
              this.props.tableProxy.errCallBack();
            }
          }
        );
      }
    } else {
      // 如果没用数据代理
      this.setState({
        dataSource: this.props.dataSource
          ? this.props.dataSource.map((v) => addOnlyRowId(v, this.props.rowKey))
          : []
      });
    }
    this.setState({
      tableLoading: false
    });
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
  onRef = (form) => {
    this.setState({
      formRef: form
    });
  };
  onTablePressEsc = () => {
    this.saveEditResult(() => {
      this.setState({
        offset: -1,
        extraData: {}
      });
    });
  };
  onTablePressEnter = (e) => {
    const focusName = document.activeElement.id;
    const { length } = this.state.dataSource;
    if (this.state.offset !== -1) {
      this.saveEditResult(() => {
        if (this.state.offset <= length - 2) {
          const can = this.canTableRowEdit(
            this.state.dataSource[this.state.offset + 1]
          );
          if (can) {
            this.setState(
              {
                offset: this.state.offset + 1
              },
              () => {
                this.intoEdit(
                  this.state.dataSource[this.state.offset],
                  this.state.offset,
                  focusName
                );
              }
            );
          } else {
            this.setState({
              offset: -1
            });
            ElNotification({
              type: 'warning',
              message: '下行数据无法编辑'
            });
          }
        } else {
          if (this.state.config.onBottomPressEnter === 'noaction') {
            this.focusEditItem();
            return;
          } else if (this.state.config.onBottomPressEnter === 'trigger') {
            const can = this.canTableRowEdit(this.state.dataSource[0]);
            if (can) {
              this.setState(
                {
                  offset: 0
                },
                () => {
                  this.intoEdit(
                    this.state.dataSource[this.state.offset],
                    this.state.offset,
                    focusName
                  );
                }
              );
            } else {
              this.setState({
                offset: -1
              });
              ElNotification({
                type: 'warning',
                message: '第一行数据无法编辑'
              });
            }
          } else if (this.state.config.onBottomPressEnter === 'add') {
            // const { dealDataToForm } = this.props;
            // if (dealDataToForm) {
            //   this.setActiveRow(dealDataToForm(this.state.dataSource[this.state.offset]));
            // } else {
            //   this.setActiveRow(this.state.dataSource[this.state.offset]);
            // }
            // 这里可能需要优化  默认给个rowkey 防止报错
            this.addRow(
              this.props.getNewDataExtra ? this.props.getNewDataExtra() : {},
              () => {
                // this.state.formRef.resetFields();
                this.setState(
                  {
                    offset: this.state.offset + 1
                  },
                  () => {
                    this.focusEditItem(focusName);
                  }
                );
              }
            );
          } else {
            this.setState({
              offset: -1
            });
          }
        }
      });
    }
  };
  addKeyDownEvent = () => {
    document
      .getElementById(this.props.tableId)
      .addEventListener('keydown', (e) => {
        const key = e.key?.toLowerCase();
        switch (key) {
          case 'escape':
            this.onTablePressEsc();
            break;
          case 'enter':
            this.onTablePressEnter(e);
            break;
        }
      });
  };
  // 进入编辑状态
  intoEdit = (record, index, focusName?: string) => {
    const can = this.canTableRowEdit(record);
    if (can) {
      this.setState(
        {
          extraData: {}
        },
        () => {
          const { offset } = this.state;
          if (offset >= 0) {
            this.saveEditResult(() => {
              const { dealDataToForm } = this.props;
              let t = {};
              if (dealDataToForm) {
                t = dealDataToForm(record);
              } else {
                t = record;
              }
              this.setActiveRow(t);
              this.setState(
                {
                  offset: index
                },
                () => {
                  this.focusEditItem(focusName);
                }
              );
            });
          } else {
            const { dealDataToForm } = this.props;
            let t = {};
            if (dealDataToForm) {
              t = dealDataToForm(record);
            } else {
              t = record;
            }
            this.setActiveRow(t);
            this.setState(
              {
                offset: index
              },
              () => {
                this.focusEditItem(focusName);
              }
            );
          }
        }
      );
    } else {
      ElNotification({
        type: 'warning',
        message: '此行数据无法编辑'
      });
    }
  };
  // 保存逻辑
  saveEditResult = (callBack?: Function) => {
    const { dealFormToData } = this.props;
    let newDataSource = [...this.state.dataSource];
    if (dealFormToData) {
      newDataSource[this.state.offset] = dealFormToData({
        data: {
          ...this.state.dataSource[this.state.offset],
          ...this.state.extraData,
          ...this.state.formRef.getFieldsValue()
        },
        record: this.state.dataSource[this.state.offset],
        formRef: this.state.formRef
      });
    } else {
      newDataSource[this.state.offset] = {
        ...this.state.dataSource[this.state.offset],
        ...this.state.extraData,
        ...this.state.formRef.getFieldsValue()
      };
    }
    this.state.formRef.resetFields();
    this.setState(
      {
        dataSource: newDataSource
      },
      () => {
        this.refreshSelectionRows(() => {
          if (callBack) {
            callBack();
          }
        });
      }
    );
  };
  // 聚焦逻辑    等待优化  todo todo todo
  focusEditItem = (focusName?: string) => {
    const { tableId } = this.props;
    // 暂时默认聚焦第一个可编辑元素 如果有定制需要  这里入参预留
    if (!focusName) {
      const { editFocusName } = this.props;
      // const first = this.state.columns.filter(
      //   //陈英杰修改this.state.columns
      //   (v) => v.editable && v.field && Object.keys(v.field()).indexOf('name')
      // )[0];
      let first;
      if (editFocusName) {
        first = editFocusName;
      } else {
        first = this.state.columns.filter((v) => v.editable)[0]?.dataIndex;
      }

      // const t = first?.field
      //   ? first.field().name
      //     ? first.field().name
      //     : ''
      //   : '';
      //直接使用dom操作
      let element: any = document.querySelector(
        `#${tableId} #el_search_${first}`
      );
      element?.focus();
      // document.getElementById(`el_search_${first}`)?.focus();
      // console.log(document.getElementById(`el_search_${first}`));
    } else {
      let element: any = document.querySelector(`#${tableId} #${focusName}`);
      element?.focus();
      // document.getElementById(`el_search_${name}`)?.focus();
    }
  };

  mergeColumns = (columns: Array<ElEditTableColumns>) => {
    return columns.map((row, colIndex) => {
      if (row.children) {
        row.children = this.mergeColumns(row.children);
      }
      const { field, editable, cellRender, renderDataIndex } = row;
      row.className = cls(
        { 'form-required': row.rule?.required },
        { 'ant-table-selection-column': row.rule?.required },
        `${row.dataIndex}`
      );
      if (!editable) {
        // do sth
        row.render = (text: any, record: any, index: any) => {
          return cellRender
            ? cellRender(text, record, index)
            : renderDataIndex
              ? record[renderDataIndex]
              : text;
        };
        return row;
      } else {
        row.render = (text: any, record: any, index: any) => {
          return index === this.state.offset ? (
            field ? (
              <ElFormItem
                {...field({
                  text,
                  record,
                  index,
                  formRef: this.state.formRef,
                  formData: this.state.formRef.getFieldsValue()
                })}
              />
            ) : cellRender ? (
              cellRender(text, record, index)
            ) : (
              text
            )
          ) : cellRender ? (
            cellRender(text, record, index)
          ) : renderDataIndex ? (
            record[renderDataIndex]
          ) : (
            text
          );
        };
        return row;
      }
    });
  };
  refreshSelectionRows = (callBack: Function) => {
    const { rowKey } = this.props;
    this.setState(
      {
        selectionData: {
          ...this.state.selectionData,
          selectedRows: [
            ...this.state.dataSource.filter((v) =>
              this.state.selectionData.selectedRowKeys.includes(v[rowKey])
            )
          ]
        }
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };
  findSelectMapping = (columns: Array<ElEditTableColumns>, changedValues) => {
    const changeColumns = columns
      .map((v) => {
        if (v.selectMapping && v.dataIndex === Object.keys(changedValues)[0]) {
          return v;
        } else if (v.children) {
          return this.findSelectMapping(v.children, changedValues);
        }
      })
      .find((v) => v !== undefined);
    if (changeColumns) {
      return changeColumns;
    }
  };
  canTableRowEdit = (row) => {
    const { canTableRowEdit } = this.props;
    if (!canTableRowEdit) {
      return true;
    } else {
      const can = canTableRowEdit(row);
      if (can) {
        return true;
      } else {
        return false;
      }
    }
  };
  onFormValueChange = async (changedValues: any, allValues: any) => {
    // const changeColumn = this.state.columns.find((v) => {
    //   //this.state.columns修改
    //   // 先用dataIndex进行比较，因为直接调用field会导致field入参丢失，页面抛错
    //   if (v.selectMapping && v.dataIndex === Object.keys(changedValues)[0]) {
    //     return v;
    //   }
    // });
    const changeColumn = this.findSelectMapping(
      this.state.columns,
      changedValues
    );
    if (changeColumn) {
      const data = await changeColumn.selectMapping({
        changedValues: changedValues,
        allValues: allValues,
        record: this.state.dataSource[this.state.offset],
        formRef: this.state.formRef,
        editTableRef: {
          getActiveRow: this.getActiveRow,
          getActiveRecord: this.getActiveRecord,
          setActiveRow: this.setActiveRow,
          quitEditState: this.quitEditState,
          reloadTableData: this.getTableData,
          addRow: this.addRow,
          getRows: this.getRows,
          getRowByIndex: this.getRowByIndex,
          clearRows: this.clearRows,
          removeRowByKey: this.removeRowByKey,
          validateTableRows: this.validateTable,
          getSelectionData: this.getSelectionData,
          setSelectionData: this.setSelectionData,
          clearSelectionData: this.clearSelectionData,
          getFormRef: this.getFormRef,
          removeRowsByKeys: this.removeRowsByKeys,
          addRows: this.addRows,
          setUpRow: this.setUpRow,
          setDownRow: this.setDownRow,
          swapRow: this.swapRow,
          setLoading: this.setLoading,
          setCurrentColumns: this.setCurrentColumns,
          getCurrentColumns: this.getCurrentColumns,
          refreshCurrentColumns: this.refreshCurrentColumns,
          updateTableData: this.updateTableData,
          updateRows: this.updateRows
        }
      });
      this.setState(
        {
          extraData: { ...this.state.extraData, ...data }
        },
        () => {
          this.state.formRef.setFieldsValue({
            ...data
          });
        }
      );
    }
  };
  updateTableData = (data: object | Function) => {
    const { offset, dataSource, formRef } = this.state;
    if (typeof data === 'object' && !Array.isArray(data)) {
      if (offset > -1) {
        this.setState({
          dataSource: dataSource.map((v) => {
            return { ...v, ...data };
          }),
          selectionData: {
            selectedRowKeys: this.state.selectionData.selectedRowKeys,
            selectedRows: this.state.selectionData.selectedRows.map((v) => {
              return { ...v, ...data };
            }),
            length: this.state.selectionData.length
          }
        });
      } else {
        let formData = formRef.getFieldsValue();
        formRef.setFieldsValue({ ...formData, ...data });
        this.setState({
          dataSource: dataSource.map((v) => {
            return { ...v, ...data };
          }),
          selectionData: {
            selectedRowKeys: this.state.selectionData.selectedRowKeys,
            selectedRows: this.state.selectionData.selectedRows.map((v) => {
              return { ...v, ...data };
            }),
            length: this.state.selectionData.length
          }
        });
      }
    } else if (typeof data === 'function') {
      if (offset > -1) {
        this.setState({
          dataSource: dataSource.map((v) => {
            return { ...v, ...data(v) };
          }),
          selectionData: {
            selectedRowKeys: this.state.selectionData.selectedRowKeys,
            selectedRows: this.state.selectionData.selectedRows.map((v) => {
              return { ...v, ...data(v) };
            }),
            length: this.state.selectionData.length
          }
        });
      } else {
        let formData = formRef.getFieldsValue();
        formRef.setFieldsValue({ ...formData, ...data });
        this.setState({
          dataSource: dataSource.map((v) => {
            return { ...v, ...data(v) };
          }),
          selectionData: {
            selectedRowKeys: this.state.selectionData.selectedRowKeys,
            selectedRows: this.state.selectionData.selectedRows.map((v) => {
              return { ...v, ...data(v) };
            }),
            length: this.state.selectionData.length
          }
        });
      }
    } else {
      // do nothing
    }
  };
  setTableConfig = (value) => {
    this.setState({
      config: value
    });
    return value;
  };
  getTableConfig = () => {
    return this.state.config;
  };
  // 外部方法
  getActiveRecord = () => {
    if (this.state.offset <= -1) {
      return null;
    } else {
      return this.state.dataSource[this.state.offset];
    }
  };
  getActiveRow = () => {
    return this.state.formRef.getFieldsValue();
  };
  setActiveRow = (data) => {
    this.state.formRef && this.state.formRef.resetFields();
    return this.state.formRef.setFieldsValue(data);
  };
  clearActiveRow = () => {
    return this.state.formRef.resetFields();
  };
  quitEditState = (callBack?: Function) => {
    if (this.state.offset !== -1) {
      this.saveEditResult(callBack);
      return this.setState({
        offset: -1,
        extraData: {}
      });
    } else {
      callBack && callBack(); //陈英杰修改，表单里插如可编辑表格时，去编辑的时候数据回显，如果不操作可编辑表格，直接点击保存offset为-1，无法调回调函数
    }
  };
  getRows = () => {
    return this.state.dataSource;
  };
  getRowByIndex = (index: number) => {
    if (index >= 0) {
      return this.state.dataSource[index];
    } else {
      return null;
    }
  };
  clearRows = async (callBack?: Function) => {
    await this.quitEditState();
    this.setState(
      {
        dataSource: []
      },
      () => {
        callBack && callBack();
      }
    );
  };
  addRow = (data = {}, callBack?: Function | string) => {
    const { dataSource } = this.state;
    return this.setState(
      {
        dataSource: [
          ...dataSource,
          { ...addOnlyRowId(data, this.props.rowKey) }
        ]
      },
      () => {
        if (callBack) {
          if (typeof callBack === 'function') {
            callBack();
          } else {
            if (callBack === 'intoEdit') {
              this.intoEdit(
                this.state.dataSource[this.state.dataSource.length - 1],
                this.state.dataSource.length - 1
              );
            }
          }
        }
      }
    );
  };
  addRows = (data: Array<unknown>, callBack?: Function) => {
    const { dataSource } = this.state;
    return this.setState(
      {
        dataSource: [
          ...dataSource,
          ...data.map((v) => addOnlyRowId(v, this.props.rowKey))
        ]
      },
      () => {
        if (callBack) {
          callBack();
        }
      }
    );
  };

  updateRows = (data: object | Function, rowKeyList: Array<string>) => {
    const { rowKey } = this.props;
    const { dataSource } = this.state;
    if (typeof data === 'object' && !Array.isArray(data)) {
      this.setState({
        dataSource: dataSource.map((v) => {
          if (rowKeyList.includes(v[rowKey])) {
            return { ...v, ...data };
          } else {
            return v;
          }
        })
      });
    } else if (typeof data === 'function') {
      this.setState({
        dataSource: dataSource.map((v) => {
          if (rowKeyList.includes(v[rowKey])) {
            return { ...v, ...data(v) };
          } else {
            return v;
          }
        })
      });
    } else {
      // do nothing
    }
  };
  removeRowByKey = (key: any, type: 'index' | 'rowKey') => {
    let newDataSource = [...this.state.dataSource];
    if (type && type === 'index') {
      newDataSource = this.state.dataSource.filter(
        (value, index) => index !== key
      );
      this.setState({
        dataSource: newDataSource
      });
    } else {
      newDataSource = this.state.dataSource.filter(
        (value) => value[this.props.rowKey] !== key
      );
      this.setState({
        dataSource: newDataSource
      });
    }
    this.clearSelectionData();
    return newDataSource;
  };
  removeRowsByKeys = (
    key: Array<unknown>,
    type: 'index' | 'rowKey',
    callBack?: Function
  ) => {
    if (Array.isArray(key)) {
      const { dataSource } = this.state;
      let newDataSource = [...dataSource];
      if (type && type === 'index') {
        newDataSource = dataSource.filter(
          (value, index) => !key.includes(index)
        );
        this.setState(
          {
            dataSource: newDataSource
          },
          () => {
            callBack && callBack();
          }
        );
      } else {
        newDataSource = dataSource.filter(
          (value) => !key.includes(value[this.props.rowKey])
        );
        this.setState(
          {
            dataSource: newDataSource
          },
          () => {
            callBack && callBack();
          }
        );
      }
      this.clearSelectionData();
      return newDataSource;
    } else {
      return false;
    }
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
  setUpRow = (key: any) => {
    if (this.state.offset !== -1) {
      this.saveEditResult(() => {
        this.setState(
          {
            offset: -1
          },
          () => {
            const { rowKey } = this.props;
            const { dataSource } = this.state;
            const index = dataSource.findIndex((v) => v[rowKey] === key);
            if (index && index <= 0) {
              return false;
            }
            let temp = [...dataSource];
            temp[index] = temp.splice(index - 1, 1, temp[index])[0];
            this.setState({
              dataSource: temp
            });
          }
        );
      });
    } else {
      const { rowKey } = this.props;
      const { dataSource } = this.state;
      const index = dataSource.findIndex((v) => v[rowKey] === key);
      if (index !== undefined && index <= 0) {
        return false;
      }
      let temp = [...dataSource];
      temp[index] = temp.splice(index - 1, 1, temp[index])[0];
      this.setState({
        dataSource: temp
      });
    }
  };
  setDownRow = (key: any) => {
    if (this.state.offset !== -1) {
      this.saveEditResult(() => {
        this.setState(
          {
            offset: -1
          },
          () => {
            const { rowKey } = this.props;
            const { dataSource } = this.state;
            const index = dataSource.findIndex((v) => v[rowKey] === key);
            if (index && index >= dataSource.length - 1) {
              return false;
            }
            let temp = [...dataSource];
            temp[index] = temp.splice(index + 1, 1, temp[index])[0];
            this.setState({
              dataSource: temp
            });
          }
        );
      });
    } else {
      const { rowKey } = this.props;
      const { dataSource } = this.state;
      const index = dataSource.findIndex((v) => v[rowKey] === key);
      if (index !== undefined && index >= dataSource.length - 1) {
        return false;
      }
      let temp = [...dataSource];
      temp[index] = temp.splice(index + 1, 1, temp[index])[0];
      this.setState({
        dataSource: temp
      });
    }
  };
  swapRow = (keyF: any, keyS: any) => {
    if (this.state.offset !== -1) {
      this.saveEditResult(() => {
        this.setState(
          {
            offset: -1
          },
          () => {
            const { rowKey } = this.props;
            const { dataSource } = this.state;
            const indexF = dataSource.findIndex((v) => v[rowKey] === keyF);
            const indexS = dataSource.findIndex((v) => v[rowKey] === keyS);
            if (
              (indexF && indexS && indexF < 0) ||
              indexS > dataSource.length - 1
            ) {
              return false;
            }
            let temp = [...dataSource];
            temp[indexF] = temp.splice(indexS, 1, temp[indexF])[0];
            this.setState({
              dataSource: temp
            });
          }
        );
      });
    } else {
      const { rowKey } = this.props;
      const { dataSource } = this.state;
      const indexF = dataSource.findIndex((v) => v[rowKey] === keyF);
      const indexS = dataSource.findIndex((v) => v[rowKey] === keyS);
      if ((indexF && indexS && indexF < 0) || indexS > dataSource.length - 1) {
        return false;
      }
      let temp = [...dataSource];
      temp[indexF] = temp.splice(indexS, 1, temp[indexF])[0];
      this.setState({
        dataSource: temp
      });
    }
  };
  searchTable = (key: unknown) => {
    // todo...
    // 浅search  暂不考虑深层
    // const { dataSource } = this.state;
    // dataSource.filter((v) => {});
  };
  renderSummary = (
    pageData,
    columns: Array<ElEditTableColumns>,
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
    columns: Array<ElEditTableColumns>,
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
  resetTableAfterSearch = () => { };
  // 表格校验  todo...
  validateTable = async () => {
    return new Promise((resolve) => {
      validate(this.state.dataSource, this.state.columns).then((res) => {
        if (res.errors.length > 0) {
          let errIndexs = new Set<number>();
          res.errors.forEach((v: any) => {
            errIndexs.add(Number(v.property.match(/\d+/)[0]));
          });
          this.setState({
            errRowIndexs: Array.from(errIndexs)
          });
          resolve({
            success: false,
            msg: res,
            data: this.state.dataSource
          });
        } else {
          this.setState({
            errRowIndexs: []
          });
          resolve({
            success: true,
            msg: res,
            data: this.state.dataSource
          });
        }
      });
    });
  };
  setLoading = (loading: boolean) => {
    this.setState({
      tableLoading: loading
    });
  };
  setCurrentColumns = (
    columns: Array<ElEditTableColumns>,
    callBack?: Function
  ) => {
    this.getColumnsConfig(columns, callBack);
  };
  refreshCurrentColumns = (callBack?: Function) => {
    const { columns } = this.props;
    this.getColumnsConfig(clone(columns), callBack);
  };
  getCurrentColumns = () => {
    return this.state.columns;
  };
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <div className='elEditTable-actionButton-container'>
          <div className='elEditTable-actionButton-container-left'>
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
                            this.state.selectionData.length < v.minSelection) ||
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
                                          this.state.formRef.getFieldsValue()
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
                              this.state.selectionData.length > v.maxSelection)
                          }
                          icon={icon}
                          onClick={() => {
                            if (handleClick) {
                              handleClick(
                                this.state.selectionData,
                                this.state.formRef &&
                                this.state.formRef.getFieldsValue()
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
                            this.state.selectionData.length < v.minSelection) ||
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
                                this.state.formRef.getFieldsValue()
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
                            this.state.selectionData.length < v.minSelection) ||
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
                              this.state.formRef.getFieldsValue()
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
            <div className='elEditTable-actionButton-container-right'>
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
                                            this.state.formRef.getFieldsValue()
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
                                  this.state.formRef.getFieldsValue()
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
                                  this.state.formRef.getFieldsValue()
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
                                this.state.formRef.getFieldsValue()
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
        </div>
        <div className='elEditTable-description-container'>
          {this.props.descriptions && this.props.descriptions()}
        </div>
        <ElForm
          onRef={this.onRef}
          formProps={{
            onValuesChange: this.onFormValueChange,
            wrapperCol: { span: 24 }
          }}
        >
          <Table
            {...this.props}
            summary={(pageData) =>
              this.renderSummary(
                pageData,
                this.state.columns,
                this.state.selectionData
              )
            }
            bordered
            id={this.props.tableId}
            size='small'
            className='elEditTable'
            rowKey={this.props.rowKey}
            loading={this.state.tableLoading}
            columns={this.mergeColumns(this.state.columns)}
            dataSource={this.state.dataSource}
            rowSelection={
              this.props.rowSelectionConfig
                ? {
                  onChange: this.onSelectionChange,
                  type: this.props.rowSelectionConfig.type,
                  fixed: this.props.rowSelectionConfig.fixed,
                  selectedRowKeys: this.state.selectionData.selectedRowKeys,
                  getCheckboxProps: (record) => {
                    return {
                      disabled: Array.isArray(
                        this.props.rowSelectionConfig.disabledRowIds
                      )
                        ? this.props.rowSelectionConfig.disabledRowIds.some(
                          (item) => record[this.props.rowKey] === item
                        )
                        : true
                    };
                  }
                }
                : null
            }
            rowClassName={(record, index) => {
              let className = '';
              if (this.state.errRowIndexs.includes(index))
                className = 'validate-err';
              return className;
            }}
            onRow={(record: any, index: number) => {
              return {
                onClick:
                  !this.props.disabledTable &&
                    this.state.config.onTableIntoEdit === 'click' &&
                    index !== this.state.offset
                    ? (e: any) => {
                      const arr = e.target.className.split(' ');
                      this.intoEdit(
                        record,
                        index,
                        `el_search_${arr[arr.length - 1]}`
                      );
                    }
                    : null,
                onDoubleClick:
                  !this.props.disabledTable &&
                    this.state.config.onTableIntoEdit === 'dbclick' &&
                    index !== this.state.offset
                    ? (e: any) => {
                      const arr = e.target.className.split(' ');
                      this.intoEdit(
                        record,
                        index,
                        `el_search_${arr[arr.length - 1]}`
                      );
                    }
                    : null
              };
            }}
            pagination={{
              pageSize: 999999,
              // total: this.state.dataSource.length,
              // hideOnSinglePage: true,
              showQuickJumper: false,
              showSizeChanger: false,

              showTotal: (total, range) => {
                return (
                  this.props.needToolBar && (
                    <>
                      <ToolBar
                        defaultTableConfig={this.props.defaultTableConfig}
                        selectionData={this.state.selectionData}
                        setTableConfig={this.setTableConfig}
                        getTableConfig={this.getTableConfig}
                        setUpRow={this.setUpRow}
                        setDownRow={this.setDownRow}
                        swapRow={this.swapRow}
                      />
                      <span
                        style={{ marginRight: '14px' }}
                      >{`共${this.state.dataSource.length}条记录`}</span>
                    </>
                  )
                );
              }
            }}
          />
        </ElForm>
      </ConfigProvider>
    );
  }
}
export type {
  ElEditTableProps,
  ActionButtonProps,
  TableProxy,
  ElEditTableColumns
};
export default ElEditTable;
