class EventBus {
  events: Map<string, Map<string, Function>>;
  // 此处type指事件类型 code指监听对象的标识 func指事件触发后每一个监听对象要触发的回调函数
  constructor() {
    this.events = new Map();
  }
  dispatch = (type: string, ...args) => {
    const targets = this.events.get(type);
    if (targets) {
      targets.forEach((value) => {
        Reflect.apply(value, this, args);
      });
    }
  };
  addListener = (type: string, code: string, func: Function) => {
    // 首先判断是否已经存在事件类型
    const targets = this.events.get(type);
    if (targets) {
      // 这里不用判断是否存在,不论如何,以最后注册的为准
      targets.set(code, func);
    } else {
      this.events.set(type, new Map([[code, func]]));
    }
  };
  removeListener = (type: string, code: string) => {
    const targets = this.events.get(type);
    if (targets) {
      targets.delete(code);
    }
  };
  removeAllListener = () => {
    this.events = new Map();
  };
}
const eventbus = new EventBus();
export default eventbus;
