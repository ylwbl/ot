import React from 'react';
import { Upload, Button, Modal, Image } from 'antd';
const { confirm } = Modal;
import { ElNotification, ElButton } from '@/components/el';
import request from '@/utils/request';
import { UploadBlue, CancelRed } from '@/components/el/ElIcon';
import { clone } from 'ramda';
import './style.less';

/**
 * ImgUpload
 * @description 图片上传
 */

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
  prefix?: string;
  useType?: 'inTable' | 'outTable';
  uploadInfo?: string;
}
const config = {
  uploadUrl: `{prefix}/com/file/v1/upload`,
  downLoadUrl: `{prefix}/com/file/v1/{fileCode}/download`,
  previewUrl: `{prefix}/com/file/v1/{fileCode}/show?thumbnail=false`,
  removeUrl: `{prefix}/com/file/v1/{fileCode}`,
  searchUrl: `{prefix}/com/file/v1/query`
};

interface State {
  fileList: Array<any>;
  loading: boolean;
  previewVisible: boolean;
  previewTitle: string;
  previewImage: any;
  value: Array<any>;
}
const getFilesInfo = (idList, prefix) => {
  return request(config.searchUrl.replace('{prefix}', prefix), {
    method: 'post',
    query: idList
  });
};
class ImgUpload extends React.Component<Props, State> {
  static defaultProps = {
    buttonText: '上传',
    value: [],
    fileListLen: 1,
    prefix: '/yst-b2c',
    useType: 'inTable'
  };
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      loading: false,
      previewTitle: '',
      previewVisible: false,
      previewImage: null,
      value: []
    };
  }
  // static getDerivedStateFromProps(props, state) {
  //   console.log(props);
  //   // 设置 fileList
  //   const { value } = props;
  //   const values = value && Array.isArray(value) ? value : [value];
  //   if (values && JSON.stringify(values) !== JSON.stringify(state.value)) {
  //     return {
  //       value: values
  //     };
  //   } else {
  //     return null;
  //   }
  // }
  componentDidMount() {
    console.log(this.props.value);
    if (this.props.value) {
      if (Array.isArray(this.props.value)) {
        this.getFilesInfo(this.props.value);
      } else {
        this.getFilesInfo([this.props.value]);
      }
    }
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.value) === JSON.stringify(prevProps.value)) {
      return false;
    }
    return true;
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      if (Array.isArray(this.props.value)) {
        this.getFilesInfo(this.props.value);
      } else {
        this.getFilesInfo([this.props.value]);
      }
    }
  }
  getFilesInfo = async (value) => {
    const { prefix } = this.props;
    this.setState({ loading: true });
    const res = await getFilesInfo(value, prefix);
    if (res.success) {
      this.setState({
        loading: false,
        fileList: res.data.map((v) => {
          return {
            uid: v.fileCode,
            name: v.originalName || v.fileCode,
            status: 'done',
            url: `${config.downLoadUrl
              .replace('{fileCode}', v.fileCode)
              .replace('{prefix}', prefix)}`
          };
        })
      });
    } else {
      this.setState({
        fileList: []
      });
    }
    this.setState({
      loading: false
    });
  };
  onChange = ({ file, fileList }) => { };
  onRemove = async (file) => {
    const isRemove = await this.confirmRemove();
    if (isRemove) {
      const { onRemoveErr, onChange, onFileChange, prefix } = this.props;
      const { fileList } = this.state;
      const { success, msg } = await request(
        config.removeUrl
          .replace('{fileCode}', file.uid)
          .replace('{prefix}', prefix),
        {
          method: 'DELETE'
        }
      );
      // if (success) {
      if (onChange) {
        console.log(fileList.filter((v) => v.uid !== file.uid).map((v) => v.uid));
        onChange(fileList.filter((v) => v.uid !== file.uid).map((v) => v.uid));
      }
      if (onFileChange) {
        onFileChange(fileList.filter((v) => v.uid !== file.uid));
      }
      // }
      // if (success) {
      //   return true;
      // }
      if (onRemoveErr) {
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
        content: '图片将会马上删除，且不可恢复，确定吗？',
        onOk() {
          reslove(true);
        },
        onCancel() { reject(false) },
      });
    });
  }
  onPreview = (file) => {
    // window.open()
    // const image = new Image();
    // image.src = file.url;
    // const imgWindow = window.open(file.url);
    // imgWindow.document.write(image.outerHTML);
    if (!file.url) {
      return;
      // file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };
  beforeUpload = (file) => {
    const imgTypeSupportList = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/tiff',
      'image/pcx',
      'image/bmp',
      'image/gif',
      'image/wbmp',
      'image/raw',
      'image/pnm',
      'image/tif'
    ];
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const typeFlag = imgTypeSupportList.includes(file.type);
    if (!typeFlag) {
      ElNotification({
        type: 'error',
        message:
          '请选择格式为jpg、png、jpeg、tiff、pcx、bmp、gif、wbmp、raw、pnm、tif的图片!'
      });
      return typeFlag;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      ElNotification({
        type: 'error',
        message: '图片大小不能超过2MB!'
      });
      return isLt2M;
    }
  };
  customRequest = async (options) => {
    const { value, onChange, onFileChange, fileListLen, prefix } = this.props;
    const { onSuccess, onError, file, onProgress } = options;
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
    let temp = value ? [...value] : [];
    temp.push(fileUploadRes.data.fileCode);
    if (temp.length > fileListLen) {
      temp = temp.slice(-Number(fileListLen));
    }
    onChange && onChange(clone(temp));
    this.setState({ loading: false });
  };
  handlePreviewCancel = () => {
    this.setState({
      previewVisible: false
    });
  };
  render() {
    const { fileListLen, useType, uploadInfo } = this.props;
    const { fileList, previewVisible, previewTitle, previewImage } = this.state;
    return (
      <>
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup
            preview={{
              visible: previewVisible,
              onVisibleChange: (visible) => {
                this.setState({
                  previewVisible: visible
                });
              }
            }}
          >
            <Image alt={previewTitle} src={previewImage} />
          </Image.PreviewGroup>
        </div>
        <Upload
          {...this.props}
          className={
            useType === 'inTable' ? 'el-imgupload' : 'upload-list-inline'
          }
          style={{ height: '36px', width: '48px' }}
          maxCount={fileListLen !== 'multi' ? fileListLen : undefined}
          listType={
            this.props.useType === 'inTable' ? 'picture-card' : 'picture'
          }
          customRequest={this.customRequest}
          fileList={fileList}
          onChange={this.onChange}
          onRemove={this.onRemove}
          onPreview={this.onPreview}
          beforeUpload={this.beforeUpload}
        >
          {fileListLen !== 'multi' && fileList.length >= fileListLen ? null : (
            <>
              <ElButton
                icon={<UploadBlue />}
                text={this.props.buttonText}
                style={{ margin: 0 }}
              />
              {useType !== 'inTable' && uploadInfo && <span className='info-text'>{uploadInfo}</span>}
            </>
          )}
        </Upload>
        {useType === 'inTable' && fileListLen !== 'multi' && !(fileList.length >= fileListLen) && uploadInfo && <span className='info-text'>{uploadInfo}</span>}
      </>
    );
  }
}
export default ImgUpload;
