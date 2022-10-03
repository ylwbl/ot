import {
  ElFormProps,
  ElFormItemProps,
  ElFormItemTypes
} from '@/components/el/ElForm';
import { clone } from 'ramda';
import {
  Refresh,
  Delete,
  Eye,
  Save,
  Left,
  Right,
  BackwardLined,
  ForwardLined
} from '@el-components/el-icons';
const getPageBtnConfig = ({
  selectedBlock,
  config,
  setConfig,
  formRef,
  history,
  changeStack,
  pushStack,
  leftDisabled,
  rightDisabled,
  getActiveConfig,
  setSaveVisible,
  setPublishVisible
}: {
  selectedBlock: string;
  config: any;
  setConfig: Function;
  formRef: any;
  history: any;
  changeStack: Function;
  pushStack: Function;
  leftDisabled: boolean;
  rightDisabled: boolean;
  getActiveConfig: Function;
  setSaveVisible: Function;
  setPublishVisible: Function;
}) => [
  {
    id: 'left',
    icon: <BackwardLined />,
    info: '回到上一次保存的页面配置',
    disabled: leftDisabled,
    onClick: (config, setConfig, selectedBlock) => {
      // 这里应当是调用接口 生成版本号并保存
      changeStack(-1);
    }
  },
  {
    id: 'right',
    icon: <ForwardLined />,
    info: '回到下一次保存的页面配置',
    disabled: rightDisabled,
    onClick: (config, setConfig, selectedBlock) => {
      // 这里应当是调用接口 生成版本号并保存
      changeStack(1);
    }
  },
  {
    id: '1',
    icon: <Refresh />,
    info: '更新页面配置并更新设计器视图',
    onClick: async () => {
      // 首先从config中获取block的config
      let blockConfig;
      if (config.i === selectedBlock) {
        blockConfig = config;
      } else {
        config.children.forEach((v) => {
          if (v.i === selectedBlock) {
            blockConfig = v;
            return;
          }
          if (v.children && Array.isArray(v.children)) {
            v.children.forEach((j) => {
              if (j.i === selectedBlock) {
                blockConfig = j;
                return;
              }
            });
          }
        });
      }
      // 此时需要判断是否找到
      if (blockConfig) {
        // 此处对找到的参数进行一些修改后 直接通过更改引用的方式更新,然后深拷贝改变内存地址通知视图进行更新
        let activeConfig = getActiveConfig();
        const data = await formRef.validateFields();
        if (activeConfig) {
          for (let i in data) {
            activeConfig[i] = data[i];
          }
        }
        setConfig(clone(config));
        pushStack(clone(config));
      } else {
        // 报错 严重错误
      }
    }
  },
  {
    id: 'save',
    icon: <Save />,
    info: '保存页面配置',
    onClick: (config, setConfig, selectedBlock) => {
      // 这里应当是调用接口 生成版本号并保存
      setSaveVisible(true);
    }
  },

  {
    id: '2',
    icon: <Delete colorName='red' />,
    danger: true,
    info: '删除选中的元素',
    disabled: selectedBlock === 'page',
    onClick: () => {
      console.log('handle del');
    }
  },
  {
    id: '3',
    icon: <Eye />,
    info: '预览当前页面',
    disabled: selectedBlock === 'page',
    onClick: () => {
      console.log('handle forward');
      // 带着当前的配置到预览页面
      history.push({
        pathname: '/pageViewer/view',
        state: config
      });
    }
  }
];

const getCmptBtnConfig = (
  selectedBlock: string,
  config: any,
  setConfig: Function
) => [
  {
    id: '1',
    icon: <Refresh />,
    info: '刷新配置以及配置页面刷新配置以及配置页面刷新配置以及配置页面刷新配置以及配置页面刷新配置以及配置页面刷新配置以及配置页面',
    onClick: (config, setConfig, selectedBlock) => {
      // 首先从config中获取block的config
      let blockConfig;
      config.children.forEach((v) => {
        if (v.i === selectedBlock) {
          blockConfig = v;
          return;
        }
        if (v.children && Array.isArray(v.children)) {
          v.children.forEach((j) => {
            if (j.i === selectedBlock) {
              blockConfig = j;
              return;
            }
          });
        }
      });
      // 此时需要判断是否找到
      if (blockConfig) {
        // 此处对找到的参数进行一些修改后 直接通过更改引用的方式更新,然后深拷贝改变内存地址通知视图进行更新
        setConfig(clone(config));
      } else {
        // 报错 严重错误
      }
    }
  },
  {
    id: '3',
    icon: <Eye />,
    info: '预览',
    disabled: selectedBlock === 'page',
    onClick: () => {
      console.log('handle forward');
    }
  },
  {
    id: '2',
    icon: <Delete colorName='red' />,
    danger: true,
    info: '删除选中的元素',
    disabled: selectedBlock === 'page',
    onClick: () => {
      console.log('handle del');
    }
  }
];
const getComEditor = (comInfo): ElFormProps => {
  if (!comInfo || !comInfo.editor || !Array.isArray(comInfo.editor)) {
    return {
      items: []
    };
  } else {
    return {
      items: comInfo.editor.map((item) => {
        const { key, label, component, span, type } = item;
        return {
          title: label,
          name: key,
          labelAlign: 'left',
          // wrapperAlign: 'right',
          span: span || 12,
          labelCol: { span: 12 },
          wrapperCol: { span: 12 },
          formOption: {
            type: component,
            props: {
              placeholder: label
            }
          }
        };
      })
    };
  }
};
const getSaveFormConfig = (): ElFormProps => {
  return {
    items: [
      {
        title: '保存标题',
        name: 'title',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '保存标题'
          }
        }
      },
      {
        title: '保存消息',
        name: 'message',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '保存消息'
          }
        }
      },
      {
        title: '是否发布',
        name: 'isPublished',
        span: 24,
        formOption: {
          type: '$switch',
          props: {
            placeholder: '是否发布'
          }
        }
      }
    ]
  };
};
const getPublishFormConfig = (): ElFormProps => {
  return {
    items: [
      {
        title: '保存标题',
        name: 'title',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '保存标题'
          }
        }
      },
      {
        title: '保存消息',
        name: 'message',
        span: 24,
        formOption: {
          type: '$input',
          props: {
            placeholder: '保存消息'
          }
        }
      }
    ]
  };
};
export {
  getPageBtnConfig,
  getCmptBtnConfig,
  getComEditor,
  getSaveFormConfig,
  getPublishFormConfig
};
