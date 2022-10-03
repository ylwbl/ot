import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.less';
import MultiTab from './MultiTab';
// import routes from "@/config/route"
import routes from '@/config/index';
import Authorized from './Authorized';
import ElHeader from './ElHeader';
import ElMenu from './ElMenu';
import { inject, observer } from 'mobx-react';

// todo  import routes from config
const { Content } = Layout;
interface State {
  menuVisible: boolean;
  flattenRoutes: any[];
  authMenuMap: Map<string, any>;
  isAdmin: boolean;
}
interface Props {
  multiTabMobx?: any;
}
@inject('multiTabMobx')
@observer
class ElLayout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuVisible: false,
      flattenRoutes: [],
      authMenuMap: new Map(),
      isAdmin: true
    };
  }
  componentWillMount() {
    this.generateRoutes(routes);
  }
  generateRoutes = (routes) => {
    let flattenRoutes = [];
    const generateRoutes = (routes) => {
      if (Array.isArray(routes)) {
        routes.forEach((v) => {
          if (v.component) {
            flattenRoutes.push(v);
          }
          if (v.routes) {
            {
              generateRoutes(v.routes);
            }
          }
        });
      }
    };
    generateRoutes(routes);
    // let routerList = this.multiTabStore.updateRouter();
    this.props.multiTabMobx.setRouter(flattenRoutes);
    this.setState({
      flattenRoutes
    });
  };

  onClose = () => {
    this.setState({ menuVisible: false });
  };
  onOpen = () => {
    this.setState({ menuVisible: true });
  };

  render() {
    return (
      <Router>
        <Layout>
          <ElHeader
            menuVisible={this.state.menuVisible}
            onOpen={this.onOpen}
            onClose={this.onClose}
          />
          <MultiTab />
          <Content id='el-content'>
            <ElMenu
              routes={routes}
              menuVisible={this.state.menuVisible}
              onOpen={this.onOpen}
              onClose={this.onClose}
            />
            <div className='el-content'>
              <Authorized
                flattenRoutes={this.state.flattenRoutes}
                authMenuMap={this.state.authMenuMap}
                isAdmin={this.state.isAdmin}
              />
            </div>
          </Content>
        </Layout>
      </Router>
    );
  }
}
export default ElLayout;
