import React from 'react';
import { Tag, Tooltip } from 'antd';
import { InfoCircleLined } from '@el-components/el-icons';
interface Props {
  text: string;
  info: string;
  // onClick: Function;
}
function ComTag({ text, info }: Props) {
  const onIconClick = (e) => {
    e.stopPropagation();
    console.log('infoclick');
  };
  // const onTextClick = (e) => {
  //   e.stopPropagation();
  //   onClick();
  // };
  return (
    <Tag
      icon={
        <Tooltip title={info} trigger='click'>
          <InfoCircleLined onClick={onIconClick} />
        </Tooltip>
      }
    >
      {text}
      {/* <span onClick={onTextClick}>{text}</span> */}
    </Tag>
  );
}

export default ComTag;
