import React from 'react';
import { Radio, InputNumber, Checkbox } from 'antd';
import {
  UdcSelection,
  Selection,
  DatePicker,
  RangePicker,
  Text,
  TextArea,
  Percentage,
  ImgUpload,
  Switch,
  AsyncInputSelect,
  FileUpload,
  InputAddonAfter,
  ColorPicker,
  UploadPlayer,
  NewImgUpload,
  MyAutoComplete,
  TagSelection,
  Transfer,
  RangeNumber,
  Input
} from '../ItemComponent';
import { ElImage } from '@/components/el';
import { ElJson } from '@/components/el';
import { ElFormItem } from '../../../projectConfig'; //各域业务组件引入

interface RegisterItem {
  type: string;
  render: Function;
}
let originRenderOptions = [
  {
    type: '$json',
    render: (props, events) => {
      return <ElJson {...props} {...events}/>;
    }
  },
  {
    type: '$input',
    render: (props, events) => {
      return <Input {...props} {...events} autoComplete='off' />;
    }
  },
  {
    type: '$async-input-select',
    render: (props, events) => {
      return <AsyncInputSelect {...props} {...events} />;
    }
  },
  {
    type: '$inputNumber',
    render: (props, events) => {
      return (
        <InputNumber
          style={{ width: '100%' }}
          {...props}
          {...events}
          autoComplete='off'
        />
      );
    }
  },
  {
    type: '$radio',
    render: (props, events) => {
      return (
        <Radio.Group {...props}>
          {props.options.map((v) => {
            <Radio key={v.value} value={v.value}>
              {v.label}
            </Radio>;
          })}
        </Radio.Group>
      );
    }
  },
  {
    type: '$img-show',
    render: (props, events) => {
      return <ElImage {...props} />;
    }
  },
  {
    type: '$checkbox',
    render: (props, events) => {
      return <Checkbox.Group {...props} />;
    }
  },
  {
    type: '$udc',
    render: (props, events) => {
      return <UdcSelection {...props} {...events} />;
    }
  },
  {
    type: '$select',
    render: (props, events) => {
      return (
        <Selection
          options={props ? props.options : undefined}
          request={props.request}
          {...props}
          {...events}
        />
      );
    }
  },
  {
    type: '$switch',
    render: (props, events) => {
      return <Switch {...props} {...events} />;
    }
  },
  {
    type: '$datePicker',
    render: (props, events) => {
      return <DatePicker {...props} />;
    }
  },
  {
    type: '$rangePicker',
    render: (props, events) => {
      return <RangePicker {...props} />;
    }
  },
  {
    type: '$text',
    render: (props, events) => {
      return <Text {...props} {...events} />;
    }
  },
  {
    type: '$textArea',
    render: (props, events) => {
      return <TextArea {...props} />;
    }
  },
  {
    type: '$percentage',
    render: (props, events) => {
      return <Percentage {...props} />;
    }
  },
  {
    type: '$img-upload',
    render: (props, events) => {
      return <ImgUpload {...props} />;
    }
  },
  {
    type: '$file-upload',
    render: (props, events) => {
      return <FileUpload {...props} />;
    }
  },
  {
    type: '$input-addon-after',
    render: (props, events) => {
      return <InputAddonAfter {...props} />;
    }
  },
  {
    type: '$color-picker',
    render: (props) => {
      return <ColorPicker {...props} />;
    }
  },
  {
    type: '$video-upload-show',
    render: (props) => {
      return <UploadPlayer {...props} />;
    }
  },
  {
    type: '$new-img-upload',
    render: (props) => {
      return <NewImgUpload {...props} />;
    }
  },
  {
    type: '$auto-complete',
    render: (props) => {
      return <MyAutoComplete {...props} />;
    }
  },
  {
    type: '$tag-select',
    render: (props) => {
      return <TagSelection {...props} />;
    }
  },
  {
    type: '$transfer',
    render: (props) => {
      return <Transfer {...props} />;
    }
  },
  {
    type: '$rangeNumber',
    render: (props) => {
      return <RangeNumber {...props} />;
    }
  }
];
let cache = new Map();
const itemRegister = (renderOptions: Array<RegisterItem>) => {
  renderOptions.forEach((v) => {
    if (cache.get(v.type)) {
      console.error(
        `[ElError]: 重复的type => ${v.type}, 会导致前者的RenderItem被后者覆盖`
      );
    }
    cache.set(v.type, v.render);
  });
};
itemRegister(originRenderOptions);
const cacheRender = (type, props, events) => {
  return cache.get(type)(props, events);
};
const formRender = (obj, form) => {
  if (obj.formOption && obj.formOption.render) {
    return obj.formOption.render(form);
  }
  if (obj.formOption && obj.formOption.type) {
    if (cache.has(obj.formOption.type)) {
      return cacheRender(
        obj.formOption.type,
        obj.formOption.props,
        obj.formOption.events
      );
    }
    return <text style={{ color: 'red' }}>未找到对应的renderItem</text>;
  }
};
itemRegister(ElFormItem); //各域业务组件注入
export default formRender;
export { itemRegister, cache };
export type { RegisterItem };
