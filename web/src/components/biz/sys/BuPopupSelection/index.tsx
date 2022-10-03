import React from 'react';
import { message } from 'antd';
import requests from '@/utils/request';
import { PopupSelection_2 } from '@/components/el/ItemComponent';
import { omit } from 'ramda';
interface Props {
  value?: any;
  onChange?: Function;
  otherParams?: any;
  beforeConfirm?: Function;
  showColumn?: string;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据
/**
 * BuPopupSelection
 * @description 公司选择
 */
class BuPopupSelection extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      popupSelection: null // 通过ref获取inputValue   popupSelection.state.inputValue
    };
  }
  componentDidMount() { }
  onRef = (ref) => {
    this.setState({
      popupSelection: ref
    });
  };
  render() {
    return (
      <>
        <PopupSelection_2
          overLayWidth={600}
          rowKey='id'
          modalWidth={900}
          modalTitle='选择组织'
          tableProxy={{
            request: async (paramData) => {
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              paramData = { ...paramData, ...this.props.otherParams };
              return await requests('/yst-support/org/component/bu/paging', {
                method: 'post',
                query: paramData
              });
            },
            errCallBack: (res) => {
              message.error(res.msg || '操作失败');
            },
            props: {
              success: 'success',
              result: 'data.records',
              total: 'data.total'
            },
            autoLoad: true
          }}
          modalTableColumns={[
            {
              title: '组织编号',
              width: 300,
              dataIndex: 'buCode'
            },
            {
              title: '组织名称',
              // width: 200,
              dataIndex: 'buName'
            }
          ]}
          columns={[
            {
              title: '组织编号',
              width: 200,
              dataIndex: 'buCode'
            },
            {
              title: '组织名称',
              width: 200,
              dataIndex: 'buName'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '组织名称',
                name: 'buCodeName',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: '组织编号、名称、简称'
                  }
                }
              }
            ]
          }}
          needModal={true}
          // needPopup={true}
          // noNeedInput={true}
          onRef={this.onRef}
          showColumn={this.props.showColumn ? this.props.showColumn : 'buName'}
          {...this.props}
        />
      </>
    );
  }
}
export default BuPopupSelection;
