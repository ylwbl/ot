import React from 'react';
import { message } from 'antd';
import requests from '@/utils/request';
import { PopupSelection_2 } from '@/components/el/ItemComponent';
import { omit } from 'ramda';
interface Props {
  value?: any;
  onChange?: Function;
}
interface State {
  popupSelection: any;
}
// 在此处组装所有的数据

/**
 * UserPopupSelection
 * @description 公司选择
 */
class EmpPopupSelection extends React.Component<Props, State> {
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
          modalTitle='选择员工'
          tableProxy={{
            request: async (paramData) => {
              paramData.orders = [
                {
                  asc: false,
                  column: 'createTime'
                }
              ];
              return await requests('/yst-support/org/component/emp/paging', {
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
              title: '员工名称',
              width: 100,
              dataIndex: 'empName'
            },
            {
              title: '公司名称',
              dataIndex: 'ouName'
            },
            {
              title: 'bu名称',
              dataIndex: 'buName'
            }
          ]}
          columns={[
            {
              title: '员工名称',
              width: 100,
              dataIndex: 'empName'
            },
            {
              title: '公司名称',
              dataIndex: 'ouName'
            },
            {
              title: 'bu名称',
              dataIndex: 'buName'
            }
          ]}
          searchFormProps={{
            items: [
              {
                title: '员工名称',
                name: 'empCodeName',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: '员工名称'
                  }
                }
              },
              {
                title: '公司名称',
                name: 'ouCodeName',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: '公司名称'
                  }
                }
              },
              {
                title: 'bu名称',
                name: 'buCodeName',
                span: 8,
                formOption: {
                  type: '$input',
                  props: {
                    placeholder: 'bu名称'
                  }
                }
              }
            ]
          }}
          needModal={true}
          onRef={this.onRef}
          showColumn='empName'
          {...this.props}
        />
      </>
    );
  }
}
export default EmpPopupSelection;
