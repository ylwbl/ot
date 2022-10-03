import React from 'react';
import { Select, Table, Tag } from 'antd';
import request from '@/utils/request';

/**
 * 
# AsyncInputSelect
- 模糊搜索，下拉，按回车搜索 参数如下

- queryParam 查询条件的字段。目前支持单个
- requestUrl 接口url地址
- requestMethod 请求方法类型
- columns table展示的列 同antd配置。
- labelKey 展示的字段
- valueKey 回传的值的字段
- uniqueKey table表格唯一id 字段
- multiple 是否多选，目前支持单选 传fasle
- showSearch 是否单选，目前支持单选 传true

 */

interface Props {
  requestUrl: string;
  requestMethod: string;
  queryParam: any;
  columns: any;
  labelKey: string;
  [props: string]: any;
  onBlur: any;
  defaultValues: Array<any>;
  placeholder: string;
}

interface State {
  loading: boolean;
  tableData: any;
  selectedRowKeys: any;
  selectLabelValues: any;
  selectedRows: any;
  selectValues: any;
}

class AsyncInputSelect extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tableData: [],
      selectedRowKeys: [],
      selectedRows: [],
      selectLabelValues: [],
      selectValues: []
    };
  }

  static getDerivedStateFromProps({
    defaultValues,
    labelKey,
    valueKey,
    uniqueKey
  }) {
    if (defaultValues) {
      return {
        selectedRowKeys: defaultValues.map((row) => row[uniqueKey]),
        selectedRows: defaultValues,
        selectLabelValues: defaultValues.map((row) => ({
          label: row[labelKey],
          value: row[valueKey]
        })),
        selectValues: defaultValues.map((row) => row[valueKey])
      };
    }
    return null;
  }
  timer = null;
  selectOnsearch = true;

  changeRowSelection = (selectedRowKeys, selectedRows) => {
    const { labelKey, valueKey, showSearch } = this.props;
    this.setState(
      {
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows,
        selectLabelValues: selectedRows.map((row) => ({
          label: row[labelKey],
          value: row[valueKey]
        })),
        selectValues: selectedRows.map((row) => row[valueKey])
      },
      () => {
        this.props.onChange(
          showSearch ? this.state.selectValues.join() : this.state.selectValues,
          selectedRows
        );
      }
    );
  };

  componentDidMount() {
    const { queryParam } = this.props;
    this.getList({ [queryParam]: '' });
  }

  //getList
  getList = async (params) => {
    const { requestUrl, requestMethod } = this.props;
    // params.current = 1; //默认选择第一页
    // params.size = 10000; //默认1W条数据
    let res = await request(requestUrl, {
      method: requestMethod,
      query: params
    });
    if (res.success) {
      this.setState({
        tableData: res.data.records,
        selectedRowKeys: [],
        selectedRows: [],
        selectLabelValues: []
      });
    } else {
      console.log('....');
    }
  };

  changeSelect = async (value) => {
    const { queryParam } = this.props;
    this.setState({
      loading: true
    });
    await this.getList({ [queryParam]: value });
    this.setState({
      loading: false
    });
  };

  onSearch = (value) => {
    if (this.selectOnsearch) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => this.changeSelect(value), 500);
    }
  };

  change = (value, option) => {
    //多选 todo
    // console.log('change-value', value);
    // console.log('change-options', option);
    // const { labelKey, valueKey } = this.props;
    // const { selectedRowKeys, selectedRows, selectLabelValues, selectValues } =
    //   this.state;
    this.selectOnsearch = true;
    this.setState({
      // selectedRowKeys:
      // selectedRows:selectedRows.filter((row)=>row.id!==options[0]),
      selectLabelValues: value
      // selectValues: selectedRows.map((row) => row[valueKey])
    });
  };

  tagRender = (props) => {
    console.log('propsprops', props);
    // const { labelKey, valueKey, uniqueKey } = this.props;
    return (
      <Tag style={{ marginRight: 3 }} closable={props.closable}>
        {props.label}
      </Tag>
    );
  };

  clear = () => {
    const { showSearch } = this.props;
    this.setState(
      {
        selectedRowKeys: [],
        selectedRows: [],
        selectLabelValues: [],
        selectValues: []
      },
      () => {
        this.props.onChange(
          showSearch ? this.state.selectValues.join() : this.state.selectValues
        );
        this.selectOnsearch = true;
      }
    );
  };
  onBlur = () => {
    if (this.selectOnsearch) {
      this.selectOnsearch = false;
    }
  };
  onFocus = () => {
    this.selectOnsearch = true;
  };

  render() {
    const { columns, uniqueKey, showSearch, multiple } = this.props;
    let { loading, tableData, selectedRowKeys, selectLabelValues } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.changeRowSelection,
    //   type: showSearch ? 'radio' : 'checkbox'
    // };
    console.log(':selectLabelValues', selectLabelValues);
    return (
      <Select
        allowClear={true}
        showSearch={showSearch}
        onClear={this.clear}
        dropdownStyle={{ paddingBottom: '0px' }}
        style={{ width: '100%' }}
        onSearch={this.onSearch}
        onChange={this.change}
        value={selectLabelValues}
        tagRender={this.tagRender}
        labelInValue={true}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        placeholder={this.props.placeholder}
        dropdownRender={() => {
          return (
            <Table
              columns={columns}
              loading={loading}
              rowSelection={{
                selectedRowKeys,
                onChange: this.changeRowSelection,
                type: showSearch ? 'radio' : 'checkbox'
              }}
              dataSource={tableData}
              rowKey={uniqueKey}
            />
          );
        }}
      />
    );
  }
}

export default AsyncInputSelect;
