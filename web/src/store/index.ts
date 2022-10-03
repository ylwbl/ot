import { observable, action, makeAutoObservable } from 'mobx';

class AppStore {
  constructor() {
    //  自定绑定
    makeAutoObservable(this);
  }

  @observable appName = '中燃';
  // todo 查询当前用户信息的接口有问题，先前端写死数据，等当前用户信息的接口恢复调用后，改回空字符串
  @observable principal = {
    id: '398199898527453184',
    firstName: 'd',
    username: '3rxh4x4i1'
  };
  @action
  changeAppName(newAppName: string) {
    this.appName = newAppName;
  }
  @action updatePrincipal = (values) => {
    this.principal = values;
    localStorage.setItem('principalObj', JSON.stringify(values));
  };
  @action getPrincipal = () => {
    if (localStorage.getItem('principalObj')) {
      (this.principal = JSON.parse(localStorage.getItem('principalObj')))
    }
  };
  @action setPrincipal = () => {
    localStorage.setItem('principalObj', JSON.stringify(this.principal));
  };
}

export default new AppStore();
