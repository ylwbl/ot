import React from 'react';
import { Upload, Modal } from 'antd';
import { ElNotification, ElButton } from '@/components/el';
import request from '@/utils/request';
import { UploadBlue, DeleteRed, DownloadBlue } from '@/components/el/ElIcon';
import './style.less';
import { clone } from 'ramda';
import { download } from '@/utils/utils';
interface Props {
  value?: any;
  url?: string;
  onChange?: Function;
  buttonText?: string;
  fileListLen?: any;
  [props: string]: any;
  orderCode?: string;
  onFileChange?: Function;
  onUploadErr?: Function;
  onRemoveErr?: Function;
  uploadInfo?: string;
  useType?: 'inTable' | 'outTable';
  fileValidate?: Function;
}
const config = {
  uploadUrl: `/coordinator/el-fsm-service/api/tmpl/file`,
  downLoadUrl: `/coordinator/el-fsm-service/api/fsm/download/{fileCode}`,
  removeUrl: `/coordinator/el-fsm-service/api/tmpl/file?fileCode={fileCode}`
};

interface State {
  fileList: Array<any>;
  data: unknown[];
  loading: boolean;
  value: Array<any>;
  fileType: any;
  filePath: any;
  visible: boolean;
}
const downLoadFile = (fileCode) => {
  return request(config.downLoadUrl.replace('{fileCode}', fileCode), {
    method: 'get',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
};
class FileUpload extends React.Component<Props, State> {
  static defaultProps = {
    buttonText: '上传',
    value: [],
    fileListLen: 1
  };
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      data: [],
      loading: false,
      value: [],
      filePath: null,
      fileType: null,
      visible: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    // 设置 fileList
    const { value } = props;
    const values = value && Array.isArray(value) ? value : [value];
    if (values && JSON.stringify(values) !== JSON.stringify(state.value)) {
      const fileList = values.map((v) => {
        return {
          uid: v.fileCode,
          name: v.originalName || v.fileCode,
          status: 'done',
          url: `${config.downLoadUrl.replace('{fileCode}', v.fileCode)}`
        };
      });
      return {
        value: values,
        fileList
      };
    } else {
      return null;
    }
  }
  componentDidMount() {
    this.getFileList(this.props.value);
  }
  getFileList = (value) => {
    const values = value && Array.isArray(value) ? value : [value];
    if (values) {
      const fileList = values.map((v) => {
        return {
          uid: v.fileCode,
          name: v.originalName || v.fileCode,
          status: 'done',
          url: `${config.downLoadUrl.replace('{fileCode}', v.fileCode)}`
        };
      });
      this.setState({
        fileList
      });
    } else {
      this.setState({
        fileList: []
      });
    }
  };
  onChange = ({ file, fileList }) => {
    console.log('fileList changed');
  };
  onRemove = async (file) => {
    const { onChange, onFileChange } = this.props;
    const { fileList } = this.state;
    const newFileList = fileList.filter((v) => v.uid !== file.uid);
    if (onChange) {
      onChange(newFileList);
    }
    if (onFileChange) {
      onFileChange(newFileList);
    }
    return true;
  };
  onPreview = async (file) => {
    console.log(file);
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
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   ElNotification({
    //     type: 'error',
    //     message: '图片大小不能超过2MB!'
    //   });
    //   return isLt2M;
    // }
    const { fileValidate } = this.props;
    if (fileValidate) {
      return fileValidate();
    }
    return true;
  };
  customRequest = async (options) => {
    const { value, onChange, onFileChange, fileListLen } = this.props;
    const { onSuccess, onError, file, onProgress } = options;
    this.setState({ loading: true });
    let formData = new FormData();
    formData.append('file', file);
    const fileUploadRes = await request(config.uploadUrl, {
      method: 'post',
      query: formData
    });
    if (fileListLen > 1) {
      let temp = value ? [...value] : [];
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
    this.setState({ loading: false });
  };
  onDownload = async (file) => {
    const res = await downLoadFile(file.uid);
    download(res, file.name);
  };
  onError = () => {
    ElNotification({
      type: 'error',
      message: '加载失败,可能是不支持的文件类型.'
    });
  };
  render() {
    const { fileListLen, uploadInfo } = this.props;
    const { fileList } = this.state;
    return (
      <>
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
            removeIcon: <DeleteRed />
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
