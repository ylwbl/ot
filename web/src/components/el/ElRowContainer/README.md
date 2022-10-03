#ELRowContainer

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
