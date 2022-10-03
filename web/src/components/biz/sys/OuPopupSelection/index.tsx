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
 * OuPopupSelection
 * @description 公司选择
 */
class OuPopupSelection extends React.Component<Props, State> {
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
          modalTitle='选择公司'
          tableProxy={{
            request: async (paramData) => {
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              paramData = { ...paramData, ...this.props.otherParams };
              return await requests('/yst-support/org/component/ou/paging', {
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
              title: '公司编号',
              width: 300,
              dataIndex: 'ouCode'
            },
            {
              title: '公司名称',
              // width: 200,
              dataIndex: 'ouName'
            }
          ]}
          columns={[
            {
              title: '公司编号',
              width: 200,
              dataIndex: 'ouCode'
            },
            {
              title: '公司名称',
              width: 200,
              dataIndex: 'ouName'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '公司名称',
                name: 'ouCodeName',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: '公司编号、名称、简称'
                  }
                }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          showColumn={this.props.showColumn ? this.props.showColumn : 'ouName'}
          {...this.props}
        />
      </>
    );
  }
}
export default OuPopupSelection;
