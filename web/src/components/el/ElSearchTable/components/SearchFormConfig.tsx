import React from 'react';
import { ElFormProps } from '@/components/el/ElForm';
import { Modal } from 'antd';
import { ElForm } from '@/components/el';
import { SearchFormOption } from '../index';
import ElNotification from '../../ElNotification';
interface Props {
  searchFormProps?: ElFormProps;
  setSearchFormProps?: Function;
  searchFormOptions?: Array<SearchFormOption>;
  setSearchFormOptions?: Function;
  onRef?: Function;
}
interface State {
  visible: boolean;
  formData?: any;
  formRef?: any;
}
const getEditForm = ({ toSelectList, formData }): ElFormProps => {
  return {
    labelCol: { span: 4 },
    items: [
      {
        title: '筛选器名称',
        name: 'name',
        span: 24,
        rules: [
          {
            required: true,
            message: '请输入筛选器名称!'
          }
        ],
        formOption: {
          type: '$input',
          props: {
            placeholder: '筛选器名称'
          }
        }
      },
      {
        name: 'include',
        span: 24,
        wrapperCol: { span: 24 },
        formOption: {
          type: '$transfer',
          props: {
            selectedListTitle: '选中的查询条件',
            toSelectListTilte: '待选择的查询条件',
            toSelectList: toSelectList
          }
        }
      }
    ]
  };
};
class SearchFormConfig extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      formData: { include: [] },
      formRef: null
    };
  }
  componentDidMount() {
    const { onRef } = this.props;
    onRef &&
      onRef({
        setModalVisible: this.setModalVisible
      });
  }
  setModalVisible = (visible: boolean, formData?) => {
    if (formData) {
      this.setState(
        {
          formData
        },
        () => {
          this.setState({
            visible
          });
        }
      );
    } else {
      this.setState({
        visible
      });
    }
  };
  handleSave = async () => {
    // 此处需要判断name的重复
    const { formRef } = this.state;
    const { searchFormOptions, setSearchFormOptions } = this.props;
    const data = formRef ? await formRef.validateFields() : {};
    if (data.name.length > 6) {
      ElNotification({
        type: 'warning',
        message: '筛选器名称过长'
      });
      return;
    }
    const isRepet = searchFormOptions.find((v) => v.name === data.name);
    if (isRepet) {
      setSearchFormOptions &&
        setSearchFormOptions(
          searchFormOptions.map((v) => {
            if (v.name === data.name) {
              return {
                name: data.name,
                isDefault: false,
                isSelected: false,
                include: data.include
              };
            }
            return v;
          })
        );
    } else if (searchFormOptions.length <= 5) {
      setSearchFormOptions &&
        setSearchFormOptions(
          searchFormOptions.concat([
            {
              name: data.name,
              isDefault: false,
              isSelected: false,
              include: data.include,
              formData: {}
            }
          ])
        );
    } else {
      ElNotification({
        type: 'warning',
        message: '筛选器数量不能超过五个'
      });
    }
    this.setModalVisible(false);
  };
  render() {
    return (
      <Modal
        visible={this.state.visible}
        closable={false}
        width='800px'
        onOk={this.handleSave}
        onCancel={() => {
          this.setState({
            visible: false
          });
        }}
      >
        <ElForm
          onRef={(formRef) => {
            this.setState({ formRef });
          }}
          data={this.state.formData}
          formProps={getEditForm({
            formData: this.state.formData,
            toSelectList: this.props.searchFormProps?.items.map((v) => {
              return {
                label: v.title,
                value: v.name
              };
            }) || []
          })}
        />
      </Modal>
    );
  }
}
export default SearchFormConfig;
