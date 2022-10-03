import React from 'react';
import { Upload, Button } from 'antd';
import { UploadBlue } from '@/components/el/ElIcon';
import request from '@/utils/request';
import { ElPlayer, ElNotification } from '@/components/el';
import './style.less';

/**
 * UploadPlayer
 * @description 视频上传播放组件
 */

interface Props {
  value?: any;
  onChange?: Function;
  loop?: boolean; // 是否需要无脑循环
  controls?: boolean; // 是否需要控制
  width?: string; // 播放器宽
  height?: string; // 播放器高
  prefix?: string; // 路径前缀
}
const config = {
  uploadUrl: `{prefix}/com/file/v1/upload`,
  downLoadUrl: `{prefix}/com/file/v1/{fileCode}/download`,
  removeUrl: `{prefix}/com/file/v1/{fileCode}`
};
class UploadPlayer extends React.Component<Props> {
  static defaultProps = {
    loop: true,
    width: '640px',
    height: '360px',
    prefix: '/yst-b2c'
  };
  beforeUpload = (file) => {
    console.log(file);
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const typeFlag = file.type === 'video/mp4';
    if (!typeFlag) {
      ElNotification({
        type: 'error',
        message: '请选择格式为.mp4的文件!'
      });
      return typeFlag;
    }
    const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
    if (!isLt2M) {
      ElNotification({
        type: 'error',
        message: '视频大小不能超过20MB!'
      });
      return isLt2M;
    }
    return true;
  };
  customRequest = async (options) => {
    const { onChange, prefix } = this.props;
    const { file } = options;
    let formData = new FormData();
    formData.append('file', file);
    console.log(config.uploadUrl.replace('{prefix}', prefix));
    const fileUploadRes = await request(
      config.uploadUrl.replace('{prefix}', prefix),
      {
        method: 'post',
        query: formData
      }
    );
    if (fileUploadRes.success) {
      onChange(fileUploadRes.data);
    }
  };
  changeVideoSource = () => {
    const { onChange } = this.props;
    onChange({});
  };
  render() {
    const { value, height, width, loop, controls, prefix } = this.props;
    if (!value || !value.fileCode) {
      return (
        <div style={{ height, width }} className='video-upload-container'>
          <Upload
            showUploadList={false}
            customRequest={this.customRequest}
            beforeUpload={this.beforeUpload}
          >
            <Button icon={<UploadBlue />}>视频上传</Button>
          </Upload>
        </div>
      );
    }
    return (
      <div style={{ height, width }} className='video-upload-container'>
        <span className='change-button' onClick={this.changeVideoSource}>
          切换视频
        </span>
        <ElPlayer
          url={config.downLoadUrl
            .replace('{fileCode}', value.fileCode)
            .replace('{prefix}', prefix)}
          controls={controls}
          loop={loop}
        />
      </div>
    );
  }
}
export default UploadPlayer;
