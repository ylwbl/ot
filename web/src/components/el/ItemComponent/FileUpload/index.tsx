import React from 'react';
import { Upload, Modal } from 'antd';
const { confirm } = Modal;
import { ElNotification, ElButton } from '@/components/el';
import request from '@/utils/request';
import {
  UploadBlue,
  RecycleRed,
  DownloadBlue,
  CancelRed
} from '@/components/el/ElIcon';
import './style.less';
import { any, clone } from 'ramda';
import { download } from '@/utils/utils';

/**
 * FileUpload
 * @deprecated
 * @description 文件上传组件
 * # FileUpload

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

 */

interface Props {
  value?: any;
  url?: string;
  onChange?: Function;
  buttonText?: string;
  fileListLen?: number | 'multi';
  [props: string]: any;
  orderCode?: string;
  onFileChange?: Function;
  onUploadErr?: Function;
  onRemoveErr?: Function;
  prefix?: string;
  uploadInfo?: string;
  useType?: 'inTable' | 'outTable';
  fileValidate?: Function;
}
const config = {
  uploadUrl: `{prefix}/com/file/v1/upload`,
  downLoadUrl: `{prefix}/com/file/v1/{fileCode}/download`,
  previewUrl: `{prefix}/com/file/v1/{fileCode}/show?thumbnail=false`,
  removeUrl: `{prefix}/com/file/v1/{fileCode}`
};

interface State {
  data: unknown[];
  loading: boolean;
  fileType: any;
  filePath: any;
  visible: boolean;
}
const downLoadFile = (id, prefix) => {
  return request(
    config.downLoadUrl.replace('{fileCode}', id).replace('{prefix}', prefix),
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }
  );
};
class FileUpload extends React.Component<Props, State> {
  static defaultProps = {
    buttonText: '上传',
    value: [],
    fileListLen: 1,
    prefix: '/yst-b2c'
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      filePath: null,
      fileType: null,
      visible: false
    };
  }
  getFileList = (value): any => {
    const values = value ? (Array.isArray(value) ? value : [value]) : [];
    const fileList = values
      .map((v) => {
        return {
          uid: v?.fileCode,
          name: v?.originalName || v?.fileCode,
          status: 'done',
          url: `${config.downLoadUrl
            .replace('{fileCode}', v?.fileCode)
            .replace('{prefix}', this.props.prefix)}`
        };
      })
      .filter((item) => item.uid);
    return fileList;
  };
  onChange = ({ file, fileList }) => {
    console.log('fileList changed');
  };
  onRemove = async (file) => {
    const isRemove = await this.confirmRemove();
    if (isRemove) {
      const {
        onRemoveErr,
        onChange,
        onFileChange,
        prefix,
        fileListLen,
        value
      } = this.props;
      const { success, msg } = await request(
        config.removeUrl
          .replace('{fileCode}', file.uid)
          .replace('{prefix}', prefix),
        {
          method: 'DELETE'
        }
      );
      const values = value && Array.isArray(value) ? value : [value];
      if (fileListLen > 1 || fileListLen === 'multi') {
        onChange && onChange(values.filter((v) => v.fileCode !== file.uid));
      } else {
        onChange && onChange([]);
        onFileChange && onFileChange([]);
      }
      if (!success && onRemoveErr) {
        onRemoveErr(msg);
      }
      return true;
    }
    return false;
  };
  confirmRemove = () => {
    return new Promise((reslove, reject) => {
      confirm({
        title: '确认删除',
        icon: <CancelRed />,
        content: '附件将会马上删除，且不可恢复，确定吗？',
        onOk() {
          reslove(true);
        },
        onCancel() {
          reject(false);
        }
      });
    });
  };
  onPreview = async (file) => {
    // const { prefix } = this.props;
    // const res = await downLoadFile(file.uid, prefix);
    // const defaultName = '未命名的导出文件';
    // console.log(res, file);
    // const fileType = file.name.split('.')[1];
    // const filePath = `${
    //   process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:3000'
    //     : 'https://nrp-dev.elitescloud.com'
    // }${file.url}`;
    // this.setState({
    //   fileType,
    //   filePath,
    //   visible: true
    // });
    // const blob = new Blob([res]);
    // const name = `${file.name ? file.name : defaultName}`;
    // if ('download' in document.createElement('a')) {
    //   // 非IE下载
    //   const elink = document.createElement('a');
    //   elink.download = name;
    //   elink.style.display = 'none';
    //   elink.href = URL.createObjectURL(blob);
    //   document.body.appendChild(elink);
    //   elink.click();
    //   URL.revokeObjectURL(elink.href); // 释放URL 对象
    //   document.body.removeChild(elink);
    // } else {
    //   // IE10+下载
    //   navigator.msSaveBlob(blob, file.name);
    // }
  };
  beforeUpload = (file) => {
    // const imgTypeSupportList = [
    //   'image/jpeg',
    //   'image/png',
    //   'image/jpg',
    //   'image/tiff',
    //   'image/pcx',
    //   'image/bmp',
    //   'image/gif',
    //   'image/wbmp',
    //   'image/raw',
    //   'image/pnm',
    //   'image/tif'
    // ];
    // // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // const typeFlag = imgTypeSupportList.includes(file.type);
    // if (!typeFlag) {
    //   ElNotification({
    //     type: 'error',
    //     message:
    //       '请选择格式为jpg、png、jpeg、tiff、pcx、bmp、gif、wbmp、raw、pnm、tif的图片!'
    //   });
    //   return typeFlag;
    // }
    const limit = 10;
    const isLimit = file.size / 1024 / 1024 < limit;
    if (!isLimit) {
      ElNotification({
        type: 'error',
        message: `文件大小不能超过${limit}MB!`
      });
      return isLimit;
    }
    const { fileValidate } = this.props;
    if (fileValidate) {
      return fileValidate();
    }
    return true;
  };
  customRequest = async (options) => {
    const { value, onChange, onFileChange, fileListLen, prefix } = this.props;
    const { file } = options;
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append('file', file);
    const fileUploadRes = await request(
      config.uploadUrl.replace('{prefix}', prefix),
      {
        method: 'post',
        query: formData
      }
    );
    if (fileUploadRes?.success) {
      if (fileListLen > 1 || fileListLen === 'multi') {
        let temp = value ? (Array.isArray(value) ? value : [value]) : [];
        temp.push(fileUploadRes.data);
        if (temp.length > fileListLen) {
          temp = temp.slice(-Number(fileListLen));
        }
        onChange(clone(temp));
        onFileChange && onFileChange(temp);
      } else {
        onChange(fileUploadRes.data);
        onFileChange && onFileChange(fileUploadRes.data);
      }
    } else {
      const { onUploadErr } = this.props;
      onUploadErr && onUploadErr(fileUploadRes);
    }
    this.setState({ loading: false });
  };
  onDownload = async (file) => {
    const { prefix } = this.props;
    const res = await downLoadFile(file.uid, prefix);
    download(res, file.name);
  };
  onError = () => {
    ElNotification({
      type: 'error',
      message: '加载失败,可能是不支持的文件类型.'
    });
  };
  render() {
    const { fileListLen, uploadInfo, value } = this.props;
    const fileList = this.getFileList(value);
    return (
      <>
        {/* <Modal
          visible={this.state.visible}
          onCancel={() => {
            this.setState({
              visible: false
            });
          }}
          footer={null}
          width='1000px'
        >
          <div style={{ height: '800px' }}>
            <FileViewer
              fileType={this.state.fileType}
              filePath={this.state.filePath}
              // errorComponent={CustomErrorComponent}
              onError={this.onError}
            />
          </div>
        </Modal> */}
        <Upload
          {...this.props}
          maxCount={fileListLen !== 'multi' ? fileListLen : undefined}
          listType='text'
          customRequest={this.customRequest}
          fileList={fileList}
          onChange={this.onChange}
          onRemove={this.onRemove}
          onPreview={this.onPreview}
          onDownload={this.onDownload}
          beforeUpload={this.beforeUpload}
          showUploadList={{
            showDownloadIcon: true,
            downloadIcon: <DownloadBlue />,
            showRemoveIcon: true,
            removeIcon: <RecycleRed />
          }}
        >
          {fileListLen !== 'multi' && fileList.length >= fileListLen ? null : (
            <>
              <ElButton
                icon={<UploadBlue />}
                text={this.props.buttonText}
                style={{ margin: 0 }}
              />
              {uploadInfo && <span className='info-text'>{uploadInfo}</span>}
            </>
          )}
        </Upload>
      </>
    );
  }
}
export default FileUpload;
