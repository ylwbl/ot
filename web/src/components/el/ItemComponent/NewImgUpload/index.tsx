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
 * @description 图片上传组件
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
  loading: boolean;
  previewVisible: boolean;
  previewTitle: string;
  previewImage: any;
}
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
      loading: false,
      previewTitle: '',
      previewVisible: false,
      previewImage: null
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
  onChange = ({ file, fileList }) => { };
  onRemove = async (file) => {
    const isRemove = await this.confirmRemove();
    if (isRemove) {
      const {
        onRemoveErr,
        onChange,
        onFileChange,
        prefix,
        value,
        fileListLen
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
      if (fileListLen > 1) {
        onChange &&
          onChange(values.filter((v) => v && v.fileCode !== file.uid));
      } else {
        onChange && onChange({});
        onFileChange && onFileChange({});
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
        content: '图片将会马上删除，且不可恢复，确定吗？',
        onOk() {
          reslove(true);
        },
        onCancel() {
          reject(false);
        }
      });
    });
  };
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
    const { value, onChange, onFileChange, fileListLen, prefix, onUploadErr } =
      this.props;
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
      if (fileListLen > 1) {
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
      onUploadErr && onUploadErr(fileUploadRes);
    }
    this.setState({ loading: false });
  };
  handlePreviewCancel = () => {
    this.setState({
      previewVisible: false
    });
  };
  render() {
    const { fileListLen, useType, uploadInfo, value } = this.props;
    const fileList = this.getFileList(value);
    const { previewVisible, previewTitle, previewImage } = this.state;
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
                style={{ marginRight: 0 }}
              />
              {useType !== 'inTable' && uploadInfo && (
                <span className='info-text'>{uploadInfo}</span>
              )}
            </>
          )}
        </Upload>
        {useType === 'inTable' &&
          fileListLen !== 'multi' &&
          !(fileList.length >= fileListLen) &&
          uploadInfo && <span className='info-text'>{uploadInfo}</span>}
      </>
    );
  }
}
export default ImgUpload;
