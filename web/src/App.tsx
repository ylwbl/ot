import React from 'react';
import { Provider } from 'mobx-react';
import store from '@/store/index';
import ElLayout from '@/layout';
import MultiTabMobx from '@/store/multiTab';
import './style/index.less';
import './style/variable.less';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Err404 from '@/page/errPage/Err404';
class App extends React.Component<any> {
  componentWillMount() {
    store.getPrincipal();
  }
  componentDidMount() {
    //在页面刷新时将mobx里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      store.setPrincipal();
    });
    // window.onerror = function (msg, source, lineno, colno, error) {
    //   console.log('>>> error log', msg, source, lineno, colno, error);
    // };
  }
  render() {
    return (
      <Router>
        <Provider store={store} multiTabMobx={MultiTabMobx}>
          {/* <ElLayout /> */}
          <Switch>
            <Route path='/404' component={Err404} />
            <Route
              path='/'
              // render={() =>
              //   !!isLogin() ? <ElLayout /> : <Redirect to='/login' />
              // }
              render={() => <ElLayout />}
            />
            {/* <Route path='*' component={Err404} /> */}
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default App;
