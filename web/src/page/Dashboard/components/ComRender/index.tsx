import React from 'react';
import { cache } from '@/components/el/ElForm/utils';
import { omit } from 'ramda';
import { Input } from 'antd';
const coms = new Map([
  [
    'input',
    (props) => {
      return <Input {...props} />;
    }
  ]
]);
const comRender = (info) => {
  return coms.get(info.component)(omit(['component'], info));
};
export default comRender;
