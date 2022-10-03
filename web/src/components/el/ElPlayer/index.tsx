import React from 'react';
import ReactPlayer from 'react-player/lazy';

import './style.less';

/**
 * @interface Props
 * @param url: string;
 * @param loop?: boolean; 是否需要无脑循环
 * @param controls?: boolean; 是否需要控制
 * @param width?: string; 播放器宽
 * @param height?: string; 播放器高
 */
interface Props {
  url: string;
  loop?: boolean;
  controls?: boolean;
  width?: string;
  height?: string;
}

/**
 * @name ElPlayer
 * @description 播放器组件
 */
class ElPlayer extends React.Component<Props> {
  static defaultProps = {
    loop: true,
    width: '640px',
    height: '360px'
  };
  render() {
    const { url, height, width } = this.props;

    return (
      <ReactPlayer
        url={url}
        pip={true}
        height={height}
        width={width}
        playing={true}
        controls={true}
        onContextMenu={(e) => e.preventDefault()} // 禁用右键菜单,防止下载
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        fallback={<p>the video is now unavailable</p>}
      />
    );
  }
}
export default ElPlayer;
