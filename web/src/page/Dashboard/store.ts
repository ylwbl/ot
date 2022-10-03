import { observable, action, makeAutoObservable, extendObservable } from 'mobx';
import { clone } from 'ramda';

class EditorStore {
    constructor() {
        //  自定绑定
        makeAutoObservable(this);
    }

    @observable config = null;

    @observable activeConfig = null;

    @action setConfig = (config) => {
        this.config = config;
    };
    @action setActiveConfig = (activeConfig) => {
        this.activeConfig = activeConfig;
    }
    @action changeActiveConfig = () => {
        this.activeConfig.asd = '123'
    }
    @action refreshConfig = () => {
        this.config = clone(this.config)
    }
}

export default new EditorStore();
