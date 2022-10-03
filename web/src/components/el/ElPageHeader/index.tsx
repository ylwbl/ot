import React from 'react';
import { Affix, Button, PageHeader as AntdPageHeader, Space } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import { ButtonProps } from 'antd/lib/button';
import { withRouter } from 'react-router-dom';
import './style.less';
import { omit } from 'ramda';

/**
 * @name ElPageHeader
 * # ElPageHeader 使用文档

注意: ElPageHeader是基于antd PageHeader的再次封装,通常情况下,antd的原本的属性和方法都可以使用

## 1.Porps

| 属性   | 类型                   | 解释              |
| ------ | ---------------------- | ----------------- |
| title  | string                 | 组件最左侧的title |
| blocks | Array<ButtonProps>见下 | 最右侧按钮列表    |

### 1.ButtonProps

| 属性        | 类型                   | 解释     |
| ----------- | ---------------------- | -------- |
| text        | string                 | 按钮文字 |
| disabled    | boolean                | 是否禁用 |
| hidden      | boolean                | 是否隐藏 |
| key         | string                 | 唯一标识 |
| handleClick | Function(selectedData) | 点击事件 |


 */

/**
 * @interface BlockFunctionProps
 * @param (): React.ReactNode;
 */
export interface BlockFunctionProps {
  (): React.ReactNode;
}
interface ActionButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
}

/**
 * @interface Props
 * @param title?: string;
 * @param blocks?: ActionButtonProps[];
 * @param className?: string;
 * @param headerClassName?: string;
 * @param history?: History;
 */
interface Props extends PageHeaderProps {
  title?: string;
  blocks?: ActionButtonProps[];
  className?: string;
  headerClassName?: string;
  history?: History;
}

class ElPageHeader extends React.Component<Props, {}> {
  render() {
    return (
      <Affix className='el-page-header'>
        <AntdPageHeader
          className={this.props.headerClassName}
          ghost={false}
          title={<span className='block'>{this.props.title}</span>}
          {...omit(
            ['title', 'blocks', 'className', 'headerClassName', 'history'],
            this.props
          )}
          extra={
            Array.isArray(this.props.blocks) ? (
              <Space>
                {this.props.blocks.map((v) => {
                  const { text, key, disabled, hidden, handleClick, ...rest } =
                    v;
                  return (
                    <Button
                      {...rest}
                      key={key}
                      disabled={disabled}
                      hidden={hidden}
                      onClick={() => handleClick()}
                    >
                      {text}
                    </Button>
                  );
                })}
              </Space>
            ) : null
          }
        />
      </Affix>
    );
  }
}
export default withRouter(ElPageHeader);
