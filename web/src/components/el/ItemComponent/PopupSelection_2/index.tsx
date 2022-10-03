import React from 'react';
import { Input, Popover, Modal, Row, Col, Button, Empty } from 'antd';
import { ElSearchTable, ElClickAway } from '@/components/el';
import { CloseCircleOutlined } from '@ant-design/icons';
import { RightBlack, DeleteRed } from '@/components/el/ElIcon';
import './style.less';



interface Props {
  tableProxy?: any;
  disabled?: boolean;
  columns?: any;
  value?: Array<any> | object;
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
  selectedData: any;
  prevSelectedData: any;
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
      modalVisible: false,
      selectedData: null,
      prevSelectedData: null
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (typeof props.value === 'object') {
      const inputValue = getInputValue(props.value, props.showColumn);
      if (inputValue !== state.prevInputValue) {
        return {
          inputValue,
          prevInputValue: inputValue,
          selectedData: props.value,
          prevSelectedData: props.value
        };
      }
    } else if (typeof props.value === 'string') {//此场景不应出现
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
  handleAddSelected = () => {
    this.selectedDataAdd(this.state.modalTable.getSelectionData().selectedRows);
  }
  selectedDataAdd = (arr: Array<any>) => {
    if (this.props.multiple) {
      let { selectedData } = this.state;
      selectedData = selectedData ? [...selectedData] : []
      const newSelectData = selectedData;
      arr.forEach(item => {
        let contin = false;
        selectedData.forEach((element, idx) => {
          if (element.id === item.id) {
            newSelectData[idx] = element;
            contin = true;
          }
        });
        if (contin) {
          return;
        } else {
          newSelectData.push(item);
        }
      })
      this.setState({
        selectedData: newSelectData
      })
    } else {
      this.setState({
        selectedData: [arr[0]]
      })
    }
  }
  handleRemoveSelected = (id: string) => {
    this.selectedDataRemove([id]);
  }
  selectedDataRemove = (ids: Array<string>) => {
    const { selectedData } = this.state;
    const newSelectData = selectedData.filter(item => {
      const v = ids.some(id => item.id === id);
      return !v;
    });
    this.setState({
      selectedData: newSelectData
    });
    console.log(newSelectData);
  }
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
    const { value, showColumn, multiple } = this.props;
    const { selectedData } = this.state;
    if (multiple) {
      return (
        <Row>
          <Col span={16} className='popupModal-left'>
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
                {
                  type: 'checkbox',
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
          </Col>
          <Col span={1} className='popupModal-center'>
            <div className='popupModal-center-btn'>
              <Button type='primary' onClick={this.handleAddSelected} ><RightBlack /></Button>
            </div>
          </Col>
          <Col span={7} className='popupModal-right'>
            <div className='popupModal-right-head'>已选择：</div>
            <div className='popupModal-right-content'>
              {selectedData && selectedData.length ?
                <ul>
                  {selectedData.map((item, idx) => {
                    return <li key={item.id ? item.id : idx} title={item[showColumn]}>
                      {item[showColumn]}
                      <Button type='text' className='btn-delete'
                        onClick={() => { this.handleRemoveSelected(item.id) }}><DeleteRed /></Button>
                    </li>
                  })}
                </ul> :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              }
            </div>
          </Col>
        </Row>
      );
    } else {
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
            {
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
      )
    }

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
    const record = this.props.multiple ? this.state.selectedData : this.state.modalTable.getSelectionData().selectedRows;
    if (record?.length) {
      const inputValue = getInputValue(record, this.props.showColumn);
      let beforeConfirmRes = true;
      if (this.props.beforeConfirm) {
        beforeConfirmRes = await this.props.beforeConfirm(
          record
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
                  ? record
                  : record[0]
              );
            }
          }
        );
    } else {
      this.setState({
        modalVisible: false,
        prevSelectedData: record
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
      modalVisible: false,
      selectedData: this.state.prevSelectedData
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
        inputValue: '',
        selectedData: [],
        prevSelectedData: []
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
                title={this.state.inputValue}
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
                title={this.state.inputValue}
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
            title={this.state.inputValue}
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
            title={this.state.inputValue}
            onChange={this.handleChange}
            allowClear
          />
        )}
      </div>
    );
  }
}
export default PopupSelection;
