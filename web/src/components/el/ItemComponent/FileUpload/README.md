# FileUpload

支持所有类型文件，大小限制固定为 10MB

## API

### props

| 属性           | 类型                       | 默认值     |说明              |
| ------------- | -------------------------- | ---------- | ------------------ |
| value?        | any                        |            |                 |
| url?          | string                     |            |                 |
| onChange?     | function({file, fileList})   |            |                 |
| buttonText?   | string                     |            |                 |
| fileListLen?   | number ｜'multi'           | 1          | 大于 1 时组件启用多文件模式 |
| orderCode?    | string                     |            | 暂时无含义           |
| onFileChange? | function({file, fileList})   |            |                 |
| onUploadErr?  | function                   |            | 上传错误回调          |
| onRemoveErr?  | function                   |            | 删除错误回调          |
| prefix?        | string                     | /yst-b2c   | 域前缀             |
| uploadInfo?   | string                     |            | 上传按钮边的提示信息      |
| useType?      | inTable｜outTable           |            | 使用类型为表格内或外部模式  |
| fileValidate?  | function                   |            |                 |


## 修改记录

- 2021-06-23：增加文件限制为 10MB
