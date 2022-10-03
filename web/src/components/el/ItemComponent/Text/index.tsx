import React from 'react';
import { Tooltip } from 'antd';
import { asserts } from '@/utils';
import './style.less';

/**
 * Text
 * @description 静态文本组件
 */

interface Props {
  value?: any;
  className?: string;
  needTooltip?: false;
  threshold?: number;
  encrypted?: boolean;
}

class Text extends React.Component<Props, {}> {
  static defaultProps = {
    value: '',
    needTooltip: true,
    threshold: 30,
    encrypted: false
  };
  render() {
    return (
      <>
        {asserts.isExist(this.props.value) &&
          (!this.props.encrypted ? (
            String(this.props.value).length > this.props.threshold ? (
              <Tooltip placement='topLeft' title={String(this.props.value)}>
                <span className='el-text'>
                  {`${String(this.props.value).slice(
                    0,
                    this.props.threshold
                  )}...`}
                </span>
              </Tooltip>
            ) : (
              <span className='el-text'>
                {asserts.isExist(this.props.value)
                  ? String(this.props.value)
                  : ''}
              </span>
            )
          ) : (
            <span className='el-text'>***</span>
          ))}
      </>
    );
  }
}
export default Text;
