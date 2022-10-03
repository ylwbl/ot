import React from 'react';
import { withRouter, Redirect, Route } from 'react-router-dom';
import ContentLoading from './ContentLoading';
import MultiTabStore from '@/store/multiTab';
import AuthMobx from '@/store/auth';
import AppStore from '@/store';
import { pathToRegexp } from 'path-to-regexp';
import { setupEvent, dispatchEvent } from '@/core/eventbus';
import {
  CacheRoute,
  CacheSwitch,
  getCachingComponents,
  getCachingKeys,
  dropByCacheKeyAndPathname
} from 'ylwbl-cache-route';
interface State {
  authMenuList: Array<any>;
  routerList: Array<any>;
}
interface PathObject {
  pathname: string;
  state?: any;
  query?: any;
}
// 目前使用了react-router-cache-route用于多tab缓存
// 此块整体思路为首先展平有component的路由,防止父级路由卸载导致子路由组件缓存丢失
// 然后使用CacheRoute进行缓存
// 需要缓存的路由在meta中添加keepAlive: true 即可
// 手动清除缓存 todo
interface Props {
  isAdmin: boolean;
  flattenRoutes: any[];
  authMenuMap: Map<string, any>;
  history: any;
  location?: any;
}
class Authorized extends React.Component<Props, State> {
  multiTabStore: any;
  authMobx: any;
  actions: any;
  constructor(props) {
    super(props);
    this.state = {
      authMenuList: [],
      routerList: []
    };
    this.multiTabStore = MultiTabStore;
    this.authMobx = AuthMobx;
    this.actions = [];
  }

  async componentDidMount() {
    console.log(this.props);
    this.dealEventListener('add');
    const { location, history } = this.props;
    let routerList = this.multiTabStore.getRouter();
    this.setRouterList(routerList);
    this.redirectRoutes(routerList);
    this.multiTabStore.saveHistory(history);
    if (location.pathname !== '/') {
      this.multiTabStore.add(location.pathname);
    }
  }
  componentWillUnmount() {
    this.dealEventListener('remove');
  }
  setStateAsync(state) {
    return new Promise((resolve: any) => {
      this.setState(state, resolve);
    });
  }
  dealEventListener = (type: 'add' | 'remove') => {
    if (type === 'add') {
      window.addEventListener(
        'authWrapperLoadSuccess',
        this.onAuthWrapperLoadSuccess
      );
    } else {
      window.removeEventListener(
        'authWrapperLoadSuccess',
        this.onAuthWrapperLoadSuccess
      );
    }
  };
  onAuthWrapperLoadSuccess = () => {
    dispatchEvent(
      setupEvent('onNewAuth', {
        actions: this.actions,
        isAdmin: this.props.isAdmin
      })
    );
  };
  setRouterList = (routerList) => {
    this.setState({
      routerList
    });
  };
  authRoute = (route: any, callBack) => {
    const { authMenuList } = this.state;
    const { location } = this.props;
    let page = authMenuList.find((j) => j.code === route.name);
    if (page) {
      if (!!pathToRegexp(route.path).exec(location.pathname)) {
        if (callBack) {
          callBack(page.id);
        }
      }
      return true;
    }
    return false;
  };
  redirectRoutes = (routerList) => {
    if (window.location.pathname === '/') {
      this.props.history.push('/dashboard');
      return;
    }
    const { authMenuList } = this.state;
    const { location } = this.props;
    const matchRoute = routerList.find(
      (v) => v.path && pathToRegexp(v.path).test(location.pathname)
    );
    const isExist =
      !!matchRoute ||
      ['/login', '/err', '/erra', '/dashboard', '/'].includes(
        location.pathname
      );

    const isPermed =
      this.props.isAdmin ||
      authMenuList.some((v) => {
        return (
          (matchRoute && matchRoute.name === v.code) ||
          (matchRoute && matchRoute.meta.noAuth)
        );
      });
    if (authMenuList.length === 0 && isExist) {
      // do nothing
    } else if (!isExist) {
      //
      window.location.replace('/404');
    } else if (isExist && !isPermed) {
      window.location.replace('/403');
      // <Redirect to='/403' />;
      // window.location.replace('/erra');
    } else {
      // do nothing
    }
    // return [<Route key='1' component={Err404} path='*' name='404' />];
  };
  componentWillReceiveProps(nextProps) {
    // console.log('...componentWillReceiveProps...', this.props);
    // console.log('...componentWillReceiveProps...', nextProps);
    //如果点击的是路由跳转，不是快速定位
    //先判断是否点击的是锚点
    if (!nextProps.location.hash.includes('#')) {
      if (this.props.location.key !== nextProps.location.key) {
        this.multiTabStore.add(nextProps.location.pathname);
      }
    }
  }
  renderRoutes = () => {
    if (this.props.flattenRoutes && Array.isArray(this.props.flattenRoutes)) {
      if (this.props.isAdmin) {
        return this.props.flattenRoutes.map((authedRoute) => {
          return (
            <CacheRoute
              {...authedRoute}
              key={authedRoute.name}
              store={{}}
              cacheKey={authedRoute.name}
              exact={!!authedRoute.component}
              multiple={authedRoute.meta.multiple}
              when={() => {
                return !!authedRoute.meta.keepAlive;
              }}
            />
          );
        });
      }
      return this.props.flattenRoutes
        .filter((route) => {
          if (this.props.authMenuMap.get(route.name)) {
            return true;
          }
        })
        .map((authedRoute) => {
          return (
            <CacheRoute
              {...authedRoute}
              key={authedRoute.name}
              store={{}}
              cacheKey={authedRoute.name}
              exact={!!authedRoute.component}
              multiple={authedRoute.meta.multiple}
              when={() => {
                return !!authedRoute.meta.keepAlive;
              }}
            />
          );
        });
    }
  };
  render() {
    return (
      <CacheSwitch>
        <React.Suspense fallback={<ContentLoading />}>
          <button
            onClick={() => {
              console.log(getCachingComponents(), getCachingKeys());
            }}
          >
            asd
          </button>
          <button
            onClick={() => {
              dropByCacheKeyAndPathname('pageRender', '/pageRender/1/1');
            }}
          >
            123
          </button>
          {this.renderRoutes()}
        </React.Suspense>
      </CacheSwitch>
    );
  }
}
export default withRouter(Authorized);
