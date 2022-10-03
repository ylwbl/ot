import React from 'react';
import { Layout, Dropdown, Menu, Input } from 'antd';
import {
  MenuWhite,
  FullscreenWhite,
  FullscreenexitWhite,
  SetBlack,
  UserBlack,
  SearchWhite,
  LogoutBlack,
  BellWhite,
  EditWhite
} from '@/components/el/ElIcon';
import screenfull from 'screenfull';
import store from '@/store';
import { ChangePassword } from './components';
const { Header } = Layout;
const { Item, Divider } = Menu;

interface Props {
  menuVisible: boolean;
  onOpen: any;
  onClose: any;
  // history?: history,
}
interface State {
  isFullscreen: boolean;
}

const UserMenu = () => {
  const handleClickMenu = ({ key }) => {
    // console.log('history', history);
    // const {history} = this.props;
    // switch (key) {
    //   case 'logout':
    //     history.push({
    //       pathname: 'login/logout',
    //     });
    //     break;
    //   case 'changePW':
    //     break;
    //   case 'settings':
    //     break;
    //   default:
    //     break;
    // }
  };

  const dropDownMenu = (
    <Menu onClick={handleClickMenu}>
      <ChangePassword />
      <Divider />
      <Item key='logout'>
        <LogoutBlack />
        <span
          style={{ marginLeft: '2px' }}
          onClick={() => location.replace('/login')}
        >
          退出登录
        </span>
      </Item>
    </Menu>
  );
  return (
    <Dropdown
      overlayStyle={{ zIndex: 1070 }}
      overlay={dropDownMenu}
      placement='bottomRight'
    >
      <div className='el-layout-header-item btn User'>
        <UserBlack className='avatar' />
        <span className='username'>{store.principal['username'] || ''}</span>
      </div>
    </Dropdown>
  );
};

class ElHeader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFullscreen: false
    };
  }
  fullScreen = () => {
    if (screenfull.isEnabled) {
      this.setState({ isFullscreen: !this.state.isFullscreen });
      screenfull.toggle();
    }
  };
  componentDidMount() { }
  toggleMenu = () => {
    if (this.props.menuVisible) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  };
  render() {
    return (
      <Header className='el-layout-header'>
        <div className='el-layout-header-item btn Menu' onClick={this.toggleMenu}>
          <MenuWhite />
          <span className='Menu-text'>菜单</span>
        </div>
        <div className='el-layout-header-item Logo'>
          <div className='LogoName'></div>
        </div>
        <div className='el-layout-header-item Content'></div>
        <div className='el-layout-header-item  Icon'>
          <div className='btn'>
            <BellWhite />
          </div>
          <div className='btn' hidden={this.state.isFullscreen}>
            <FullscreenWhite
              onClick={this.fullScreen}
            />
          </div>
          <div className='btn' hidden={!this.state.isFullscreen}>
            <FullscreenexitWhite
              onClick={this.fullScreen}
            />
          </div>
          <div className='btn'>
            <EditWhite onClick={() => { }} />
          </div>
        </div>
        <UserMenu />
      </Header>
    );
  }
}
export default ElHeader;
