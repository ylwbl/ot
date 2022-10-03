import React from 'react';
import { Dropdown, Button } from 'antd';
import { DownBlack } from '@/components/el/ElIcon';
import './style.less';
import { SketchPicker } from 'react-color';

/**
 * ColorPicker
 * @description 颜色选择器
 */

interface Props {
  value?: string;
  onChange?: Function;
}

const ColorPicker = (props: Props) => {
  const { value = '#fff', onChange } = props;
  const onColorChange = (color) => {
    const { hex } = color;
    onChange(hex || '#fff');
  };
  return (
    <>
      <Dropdown
        trigger={['click']}
        overlay={<SketchPicker color={value} onChange={onColorChange} />}
      >
        <Button className='color-picker-button'>
          <div className='color-picker-container'>
            <div
              className='color-picker-color-show'
              style={{ background: value }}
            />
            <DownBlack
              style={{ height: '10px', width: '10px', position: 'relative' }}
            />
          </div>
        </Button>
      </Dropdown>
    </>
  );
};
export default ColorPicker;
