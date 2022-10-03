import React from 'react';
import { strings } from '@/utils';
import Input from '@/components/lowCode/Input';
const InfoMap = new Map([
  [
    'page',
    {
      type: 'container',
      name: '页面容器',
      layout: [
        {
          w: 24,
          h: 6,
          x: 0,
          y: 0
        }
      ]
    }
  ],
  [
    'container',
    {
      name: '网格容器',
      layout: [
        {
          w: 24,
          h: 10,
          x: 0,
          y: 0
        }
      ]
    }
  ],
  [
    'form',
    {
      type: 'container',
      layout: [
        {
          w: 24,
          h: 6,
          x: 0,
          y: 0
        }
      ]
    }
  ],
  [
    'input',
    {
      type: 'component',
      name: '输入框',
      layout: [
        {
          w: 6,
          h: 2,
          x: 0,
          y: 0
        }
      ],
      useAction: false,
      editor: [
        {
          key: 'trimed',
          label: '去除首尾空格',
          component: '$switch',
          type: 'boolean',
          regexp: /\d/,
          default: false,
          span: 24
        },
        {
          key: 'width',
          label: '长',
          component: '$input',
          type: 'boolean',
          regexp: /\d/,
          default: false
        },
        {
          key: 'height',
          label: '高',
          component: '$input',
          type: 'boolean',
          regexp: /\d/,
          default: false
        },
        {
          key: 'name',
          label: '名字',
          component: '$input',
          type: 'boolean',
          regexp: /\d/,
          default: false,
          span: 24
        }
        // key 为字段名, value对象为用于渲染的时候的一些参数
      ],
      component: <Input/>
    }
  ],
  [
    'button',
    {
      type: 'component',
      name: '输入框',
      layout: [
        {
          w: 6,
          h: 2,
          x: 0,
          y: 0
        }
      ],
      useAction: false,
      editor: [
        {
          key: 'text',
          label: '描述',
          component: 'button',
          type: 'boolean',
          regexp: /\d/,
          default: false,
          span: 24
        },
      ],
      component: <Input/>
    }
  ]
]);
class ComMap {
  infoMap: Map<string, any>;
  constructor() {
    this.infoMap = InfoMap;
  }
  getWithLayout = (code, layout, layoutItem) => {
    const info = this.infoMap.get(code);
    info.layout = info.layout.map((v) => {
      return {
        ...v,
        i: strings.getGuId(),
        type: info.type,
        name: info.name,
        component: code,
        x: layoutItem.x,
        y: layoutItem.y
        // 这里需要完成坐标补正
      };
    });
    return info;
  };
  getPureInfo = (code) => {
    return this.infoMap.get(code);
  };
}
export default ComMap;
