import React from 'react';
interface Props {
  authCode?: string;
  noAuthRender?: any;
}
import { setupEvent, dispatchEvent } from '@/core/eventbus';

// 校验当前用户是否有能力编码对应的权限

export function checkAuth(authCode, authData) {
  if (authCode) {
    if (
      authData.isAdmin ||
      (authData && authData.actions.some((v) => v.code === authCode))
    ) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}

/**
 * 权限组件封装
 */
class AuthWrapper extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {
      authData: {
        isAdmin: false,
        actions: []
      }
    };
  }
  componentDidMount() {
    this.dealEventListener('add');
    this.loadSuccess();
  }
  componentWillUnmount() {
    this.dealEventListener('remove');
  }
  loadSuccess = () => {
    dispatchEvent(
      setupEvent('authWrapperLoadSuccess', {
        authCode: this.props.authCode
      })
    );
  };
  onNewAuth = (event) => {
    this.setState({
      authData: event.detail
    });
  };
  dealEventListener = (type: 'add' | 'remove') => {
    if (type === 'add') {
      window.addEventListener('onNewAuth', this.onNewAuth);
    } else {
      window.removeEventListener('onNewAuth', this.onNewAuth);
    }
  };
  render() {
    return checkAuth(this.props.authCode, this.state.authData)
      ? this.props.children
      : this.props.noAuthRender
      ? this.props.noAuthRender
      : null;
  }
}
export default AuthWrapper;
