import React from 'react';
import { ElForm, ElNotification } from '@/components/el';
import { ElFormProps } from '@/components/el/ElForm';
import { Modal, Menu, Input } from 'antd';
import { UserBlack } from '@/components/el/ElIcon';
import AppStore from '@/store';
import { changePassword } from '../service';
import { enCodeStr } from '@/utils/utils';
import { omit } from 'ramda';
const { Item } = Menu;

const psdConfirmValitedate = (rule, value, formRef) => {
  return new Promise((res, rej) => {
    const psdConfirm = formRef.getFieldValue('newPassword');
    if (psdConfirm && value !== psdConfirm) {
      rej('两次密码输入不一致');
    } else {
      res(null);
    }
  });
  // return {
  //   validateStatus: 'error',
  //   errorMsg: 'The prime between 8 and 12 is 11!'
  // };
};
const formItems = ({ formRef }): ElFormProps => {
  return {
    labelCol: { span: 4 },
    items: [
      {
        title: '原密码',
        name: 'currentPassword',
        span: 24,
        rules: [
          {
            required: true, message: '原密码不能为空'
          }
        ],
        formOption: {
          render: () => {
            return <Input.Password placeholder='原密码' />;
          }
        }
      },
      {
        title: '新密码',
        name: 'newPassword',
        span: 24,
        validateFirst: true,
        rules: [
          {
            required: true, message: '新密码不能为空'
          },
          {
            validator: (rule, value) => {
              return new Promise((ressole, reject) => {
                const reg = /(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[A-Z]){1})/;
                if (reg.test(value)) {
                  ressole(null);
                } else {
                  reject('必须大小写字母和数字的组合')
                }
              })
            }
          },
          {
            validator: (rule, value) => {
              return new Promise((ressole, reject) => {
                const reg = /(?=^.{8,16}$)/;
                if (reg.test(value)) {
                  ressole(null);
                } else {
                  reject('长度在8-16之间')
                }
              })
            }
          },
          {
            validator: (rule, value) => {
              return new Promise((ressole, reject) => {
                const reg = /^(?!.*\s)[0-9a-zA-Z!@#%^&]+$/i;
                if (reg.test(value)) {
                  ressole(null);
                } else {
                  reject('仅限包含 !@#%^& 符号')
                }
              })
            }
          }
        ],
        formOption: {
          render: () => {
            return <Input.Password placeholder='新密码' />;
          }
        }
      },
      {
        title: '新密码确认',
        name: 'newPasswordConfirm',
        span: 24,
        validateFirst: true,
        rules: [
          {
            required: true,
            message: '新密码确认不能为空'
          },
          {
            validator: (rule, value) =>
              psdConfirmValitedate(rule, value, formRef)
          }
        ],
        formOption: {
          render: () => {
            return <Input.Password placeholder='新密码确认' />;
          }
        }
      }
    ]
  };
};
class ChangePassword extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      AppStore,
      formData: {},
      formRef: null,
      loading: false
    };
  }
  componentDidMount() {
    this.setState({
      formData: {
        userId: this.state.AppStore.principal.id
      }
    });
  }
  handleSave = async () => {
    const data = this.state.formRef
      ? await this.state.formRef.validateFields()
      : {};
    this.setState({
      loading: true
    });
    data.currentPassword = enCodeStr(data.currentPassword);
    data.newPassword = enCodeStr(data.newPassword);
    const res = await changePassword(omit(['newPasswordConfirm'])({
      ...this.state.formData,
      ...data
    }));
    if (res.success) {
      ElNotification({
        type: 'success',
        message: '修改成功'
      });
      this.state.formRef && this.state.formRef.resetFields();
      this.setState({
        loading: false,
        visible: false
      });
    } else {
      ElNotification({
        type: 'error',
        message: res.msg
      });
      this.setState({
        loading: false
      });
    }
  };
  closeModal = () => {
    this.setState({
      visible: false
    });
  };
  openModal = () => {
    this.setState({ visible: true });
  };
  render() {
    return (
      <>
        <Modal
          destroyOnClose={false}
          visible={this.state.visible}
          title='修改密码'
          onCancel={this.closeModal}
          onOk={this.handleSave}
          forceRender={true}
          width='800px'
          okText='修改'
          okButtonProps={{
            disabled: this.state.loading,
            loading: this.state.loading
          }}
        >
          <ElForm
            formProps={formItems({ formRef: this.state.formRef })}
            data={this.state.formData}
            onRef={(formRef) => this.setState({ formRef })}
          />
        </Modal>
        <Item key='changePW' onClick={this.openModal}>
          <UserBlack />
          <span style={{ marginLeft: '2px' }}>修改密码</span>
        </Item>
      </>
    );
  }
}
export default ChangePassword;
