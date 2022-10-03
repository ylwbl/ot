import React from 'react';
import cls from 'classnames';
import { Space, ButtonProps, Modal, Affix } from 'antd';
import './style.less';
import { withRouter } from 'react-router-dom';
import { LeftBlack } from '@/components/el/ElIcon';
import ElButton from '../ELButton';
import AuthWrapper from '@/layout/AuthWrapper';

/**
 * #ELRowContainer

## API
### props
| 属性             | 说明        | 类型                      | 默认值  | 版本 |
| --------------- | ---------- | -----------------------   | ------ | ---- |
| position        |            | top｜inbox                | inbox  |      |
| blocks?         |            | ActionButtonProps[]       | -      |      |
| onBack?         |            | function                  | -      |      |
| history?        |            | History                   | -      |     |
| needBackButton? |            | boolean                   | true   |     |

### ActionButtonProps
| 属性             | 说明        | 类型                      | 默认值  |
| --------------- | ---------- | -----------------------   | ------ |
| text?           |            | string                    | -      |
| disabled?       |            | boolean                   | -      |
| hidden?         |            | boolean                   | -      |
| key             |            | string                    | -      |
| handleClick?    |            | function                  | -      |
| needConfirm?     |            | boolean                   | -      |
| confirmText?     |            | string                    | -      |
| localtion?      |            | left｜right                | -      |
| authCode?       |            | string                    | -      |

## 修改记录

- 2021-06-17：修改blocks中配置为hidden的项不再渲染以解决原来div占位使gap生效导致间距错误问题

 */

const { confirm } = Modal;
interface ActionButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
  needConfirm?: boolean;
  confirmText?: string;
  localtion?: 'left' | 'right';
  authCode?: string;
}
interface Props {
  position: 'top' | 'inbox';
  blocks?: Array<ActionButtonProps>;
  onBack?: Function;
  history?: History;
  needBackButton?: boolean;
}
class ElRowContainer extends React.Component<Props, {}> {
  static defaultProps = {
    needBackButton: true,
    position: 'inbox'
  };
  constructor(props) {
    super(props);
  }
  onBackClick = () => {
    const { onBack, history } = this.props;
    if (onBack) {
      onBack();
    } else {
      history.go(-1);
    }
  };
  render() {
    const { position, needBackButton } = this.props;
    return position === 'top' ? (
      <Affix offsetTop={66}>
        <div
          className={'el-cmpt el-cmpt-row-container el-cmpt-row-container-top'}
        >
          {Array.isArray(this.props.blocks) ? (
            <Space>
              {needBackButton && (
                <ElButton
                  icon={<LeftBlack />}
                  key={'inbox-container'}
                  className='action-button back-button'
                  onClick={this.onBackClick}
                >
                  返回
                </ElButton>
              )}
              {this.props.blocks
                .filter((item) => !item.hidden)
                .map((v) => {
                  const {
                    text,
                    key,
                    disabled,
                    hidden,
                    handleClick,
                    className,
                    needConfirm,
                    confirmText,
                    authCode,
                    ...rest
                  } = v;
                  return needConfirm ? (
                    <AuthWrapper authCode={authCode} key={v.key}>
                      <ElButton
                        {...rest}
                        key={key}
                        disabled={disabled}
                        hidden={hidden}
                        type='primary'
                        className={cls('action-button', className)}
                        onClick={() =>
                          confirm({
                            content: confirmText,
                            cancelText: '取消',
                            okText: '确认',
                            onOk: () => {
                              handleClick && handleClick();
                            },
                            onCancel: () => {}
                          })
                        }
                      >
                        {text}
                      </ElButton>
                    </AuthWrapper>
                  ) : (
                    <AuthWrapper authCode={authCode} key={v.key}>
                      <ElButton
                        {...rest}
                        key={key}
                        disabled={disabled}
                        hidden={hidden}
                        type='primary'
                        className={cls('action-button', className)}
                        onClick={() => handleClick && handleClick()}
                      >
                        {text}
                      </ElButton>
                    </AuthWrapper>
                  );
                })}
            </Space>
          ) : null}
        </div>
      </Affix>
    ) : (
      <div
        className={'el-cmpt el-cmpt-row-container el-cmpt-row-container-inbox'}
      >
        {Array.isArray(this.props.blocks) ? (
          <Space>
            {this.props.blocks
              .filter((item) => !item.hidden)
              .map((v) => {
                const {
                  text,
                  key,
                  disabled,
                  hidden,
                  handleClick,
                  className,
                  needConfirm,
                  confirmText,
                  authCode,
                  ...rest
                } = v;
                return needConfirm ? (
                  <AuthWrapper authCode={authCode} key={v.key}>
                    <ElButton
                      {...rest}
                      key={key}
                      disabled={disabled}
                      hidden={hidden}
                      className={cls('action-button', className)}
                      type='primary'
                      onClick={() =>
                        confirm({
                          content: confirmText,
                          cancelText: '取消',
                          okText: '确认',
                          onOk: () => {
                            handleClick && handleClick();
                          },
                          onCancel: () => {}
                        })
                      }
                    >
                      {text}
                    </ElButton>
                  </AuthWrapper>
                ) : (
                  <AuthWrapper authCode={authCode} key={v.key}>
                    <ElButton
                      {...rest}
                      key={key}
                      disabled={disabled}
                      hidden={hidden}
                      className={cls('action-button', className)}
                      onClick={() => handleClick && handleClick()}
                    >
                      {text}
                    </ElButton>
                  </AuthWrapper>
                );
              })}
          </Space>
        ) : null}
      </div>
    );
  }
}
export type { ActionButtonProps as ElContainerProps };
export default withRouter(ElRowContainer);
