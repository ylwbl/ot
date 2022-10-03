import React from 'react';
import { Input, Popover, Modal } from 'antd';
import { ElSearchTable, ElClickAway } from '@/components/el';
import { CloseCircleOutlined } from '@ant-design/icons';
import './style.less';

/**
 * # PopupSelection



## API

### props

| 属性           | 类型                       | 默认值     |说明              |
| ------------- | -------------------------- | ---------- | ------------------ |



## 修改记录

- 2021-06-30：修复清除图标功能 _郑海洋_
- 2021-06-07：增加是否需要手输属性 _陈英杰_

 */

interface Props {
  tableProxy?: any;
  disabled?: boolean;
  columns?: any;
  value?: any;
  onChange?: Function;
  multiple?: boolean;
  searchFormProps?: any;
  placeholder?: string;
  showColumn?: string;
  rowKey?: string;
  overLayWidth?: number;
  limit?: number;
  needModal?: boolean;
  noNeedInput?: boolean; //是否需要手输
  modalTitle?: string;
  onRef?: any;
  modalTableColumns: any; //弹出窗的columns
  keywords?: string;
  needPopup?: boolean;
  beforeConfirm?: Function;
  destroyOnClose: boolean;
  defaultSearchData?: any;
  setDisabledRowIds?: any;
  callBackFn?: Function;
  modalWidth?: number;
  showSuffix?: boolean; //清除小图标的显隐
}
interface State {
  visible: boolean;
  inputValue: string;
  prevInputValue: string;
  tableRef: any;
  popupTable: any;
  modalTable: any;
  modalVisible: boolean;
}

const getInputValue = (record, showColumn) => {
  if (!record) {
    return '';
  }
  if (Array.isArray(showColumn)) {
    if (Array.isArray(record)) {
      return record
        .map((v) => {
          let inputValue = '';
          showColumn.forEach((i) => {
            inputValue = !inputValue
              ? `${record[i] ? record[i] : ''}`
              : `${inputValue}-${record[i] ? record[i] : ''}`;
          });
          return inputValue;
        })
        .filter((v) => !!v)
        .toString();
    } else {
      let inputValue = '';
      showColumn.forEach((i) => {
        inputValue = !inputValue
          ? `${record[i] ? record[i] : ''}`
          : `${inputValue}-${record[i] ? record[i] : ''}`;
      });
      return inputValue;
    }
  } else {
    return Array.isArray(record)
      ? record
        .map((v) => (v[showColumn] ? v[showColumn] : ''))
        .filter((v) => !!v)
        .toString()
      : record[showColumn]
        ? record[showColumn]
        : '';
  }
};
class PopupSelection extends React.Component<Props, State> {
  static defaultProps = {
    showColumn: 'id',
    keywords: 'keywords',
    needPopup: false,
    destroyOnClose: true,
    defaultSearchData: {},
    setDisabledRowIds: [],
    showSuffix: false
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      inputValue: '',
      prevInputValue: '',
      tableRef: null,
      popupTable: null,
      modalTable: null,
      modalVisible: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (typeof props.value === 'object') {
      const inputValue = getInputValue(props.value, props.showColumn);
      if (inputValue !== state.prevInputValue) {
        return {
          inputValue,
          prevInputValue: inputValue
        };
      }
    } else if (typeof props.value === 'string') {
      if (props.value !== state.prevInputValue) {
        return {
          inputValue: props.value,
          prevInputValue: props.value
        };
      }
    } else {
      return {
        inputValue: undefined,
        prevInputValue: undefined
      };
    }
    return null;
  }
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  onRef = (ref) => {
    this.setState({
      popupTable: ref
    });
  };
  onModalRef = (ref) => {
    this.setState({
      modalTable: ref
    });
  };
  setStateInputValue = (value) => {
    if (!value) {
      this.setState({ modalVisible: false });
      return;
    }
    const inputValue = getInputValue(value, this.props.showColumn);
    this.setState({ inputValue, modalVisible: false }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  };
  onTableSelectedChange = (selectionData) => {
    const inputValue = getInputValue(
      selectionData.selectedRows,
      this.props.showColumn
    );
    this.setState(
      {
        inputValue
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(selectionData.selectedRows);
        }
      }
    );
  };
  onPopClickAway = () => {
    if (this.state.visible) {
      this.setState({
        visible: false
      });
    }
  };
  renderContent = () => {
    return (
      <ElClickAway onClickAway={this.onPopClickAway}>
        <div>
          <ElSearchTable
            onRef={this.onRef}
            scroll={{ x: 'min-content' }}
            onRow={
              this.props.multiple
                ? null
                : (record: any) => {
                  return {
                    onClick: () => {
                      const inputValue = getInputValue(
                        record,
                        this.props.showColumn
                      );
                      this.setState(
                        {
                          inputValue,
                          visible: false
                        },
                        () => {
                          if (this.props.onChange) {
                            this.props.onChange(record);
                          }
                        }
                      );
                    }
                  };
                }
            }
            mode={{
              proxy: false,
              action: false,
              search: false,
              pagination: false,
              descriptions: false,
              tabs: false
            }}
            rowSelectionConfig={
              this.props.multiple
                ? {
                  type: 'checkbox',
                  fixed: true,
                  onChange: this.onTableSelectedChange
                }
                : null
            }
            rowKey={this.props.rowKey}
            tableProxy={this.props.tableProxy}
            columns={this.props.columns}
          />
        </div>
      </ElClickAway>
    );
  };
  renderModalContent = () => {
    return (
      <ElSearchTable
        onRef={this.onModalRef}
        scroll={{ x: 'min-content', y: 400 }}
        // onRow={
        //   this.props.multiple
        //     ? null
        //     : (record: any) => {
        //         return {
        //           onClick: () => {
        //             const inputValue = getInputValue(
        //               record,
        //               this.props.showColumn
        //             );
        //             console.log(inputValue);
        //             this.setState(
        //               {
        //                 inputValue
        //               },
        //               () => {
        //                 if (this.props.onChange) {
        //                   this.props.onChange(record);
        //                 }
        //               }
        //             );
        //           }
        //         };
        //       }
        // }
        mode={{
          proxy: true,
          action: false,
          search: true,
          pagination: true,
          descriptions: false,
          tabs: false
        }}
        rowSelectionConfig={
          this.props.multiple
            ? {
              type: 'checkbox',
              fixed: true,
              disabledRowIds: this.props.setDisabledRowIds
            }
            : {
              type: 'radio',
              fixed: true,
              disabledRowIds: this.props.setDisabledRowIds
            }
        }
        rowKey={this.props.rowKey}
        tableProxy={this.props.tableProxy}
        columns={this.props.modalTableColumns}
        searchFormProps={this.props.searchFormProps}
        defaultSearchData={this.props.defaultSearchData}
      />
    );
  };
  handleChange = (e) => {
    this.setState(
      {
        inputValue: e.target.value
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(e.target.value);
        }
      }
    );
  };
  handleEnter = (e) => {
    e.stopPropagation();
    const { keywords } = this.props;
    const { inputValue } = this.state;
    let params = {};
    params[keywords] = inputValue;
    this.state.popupTable.getTableData(params);
  };
  handleSearch = (_, event) => {
    if (this.props.callBackFn) {
      this.props.callBackFn(() => {
        if (event.target.nodeName !== 'INPUT') {
          this.setState({
            modalVisible: true,
            visible: false
          });
        }
      });
    } else {
      if (event.target.nodeName !== 'INPUT') {
        this.setState({
          modalVisible: true,
          visible: false
        });
      }
    }
  };
  // onVisibleChange = (visible) => {
  //   if (!visible) {
  //     const inputValue = getInputValue(this.props.value, this.props.showColumn);
  //     this.setState({
  //       inputValue
  //     });
  //   }
  // };
  onModalConfirm = async () => {
    const record = this.state.modalTable.getSelectionData().selectedRows;
    if (record?.length) {
      const inputValue = getInputValue(record, this.props.showColumn);
      let beforeConfirmRes = true;
      if (this.props.beforeConfirm) {
        beforeConfirmRes = await this.props.beforeConfirm(
          this.state.modalTable.getSelectionData()
        );
      }
      beforeConfirmRes &&
        this.setState(
          {
            inputValue,
            modalVisible: false
          },
          () => {
            if (this.props.onChange) {
              this.props.onChange(
                this.props.multiple
                  ? this.state.modalTable.getSelectionData().selectedRows
                  : this.state.modalTable.getSelectionData().selectedRows[0]
              );
            }
          }
        );
    } else {
      this.setState({
        modalVisible: false
      });
    }
  };
  onInputClick = (e) => {
    e.stopPropagation();
    if (!this.state.visible && this.props.noNeedInput) {
      this.setState({
        visible: true
      });
    }
  };
  onModalCancel = () => {
    this.setState({
      modalVisible: false
    });
  };
  onVisibleChange = (visible) => {
    this.setState({
      visible
    });
  };
  clearAll = (e) => {
    e.stopPropagation();
    this.setState(
      {
        inputValue: ''
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(undefined);
        }
      }
    );
  };
  render() {
    const { inputValue } = this.state;
    const { showSuffix } = this.props;
    const suffix =
      inputValue && showSuffix ? (
        <CloseCircleOutlined
          style={{ color: '#ccc' }}
          onClick={(e) => this.clearAll(e)}
        />
      ) : (
        <span />
      );
    return (
      <div id='popupSelection' className='popupSelection'>
        <Modal
          visible={this.state.modalVisible}
          okText='确认'
          cancelText='取消'
          onOk={this.onModalConfirm}
          onCancel={this.onModalCancel}
          closable={true}
          width={this.props.modalWidth ? this.props.modalWidth : '80%'}
          title={this.props.modalTitle || '未配置title'}
          destroyOnClose={this.props.destroyOnClose}
          className='popupModal'
        >
          {this.renderModalContent()}
        </Modal>
        {this.props.needPopup ? (
          <Popover
            placement='bottomLeft'
            visible={this.state.visible}
            // onVisibleChange={this.onVisibleChange}
            content={this.renderContent()}
            trigger='click'
            getPopupContainer={() => document.getElementById('popupSelection')}
            overlayStyle={{ width: this.props.overLayWidth }}
          >
            {this.props.needModal ? (
              <Input.Search
                id='popup'
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.state.inputValue}
                onChange={this.handleChange}
                allowClear
                onClick={this.onInputClick}
                onPressEnter={(e) => this.handleEnter(e)}
                onSearch={this.handleSearch}
                suffix={suffix}
              />
            ) : (
              <Input
                id='popup'
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.state.inputValue}
                onChange={this.handleChange}
                allowClear
                onClick={this.onInputClick}
                onPressEnter={(e) => this.handleEnter(e)}
              />
            )}
          </Popover>
        ) : this.props.needModal ? (
          <Input.Search
            readOnly
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            value={this.state.inputValue}
            onChange={this.handleChange}
            // allowClear
            onSearch={this.handleSearch}
            suffix={suffix}
          />
        ) : (
          <Input
            readOnly
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            value={this.state.inputValue}
            onChange={this.handleChange}
            allowClear
          />
        )}
      </div>
    );
  }
}
export default PopupSelection;
