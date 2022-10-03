interface InitProps {
  url: string; // 接口路径
  withCredentials: boolean; // 是否需要传输cookie
  handleMessage: (event: any) => {};
  handleConnectErr: (event: any) => {};
}
interface SSEProps {
  message: string;
  success: boolean;
  close?: Function;
}
function initSSE(props: InitProps): SSEProps {
  if ('EventSource' in window) {
    const { url, withCredentials, handleMessage, handleConnectErr } = props;
    const source = new EventSource(url, { withCredentials });
    function openConnect(event: any) {
      source.addEventListener('message', handleMessage);
      source.addEventListener('error', handleConnectErr);
      source.removeEventListener('open', openConnect);
      return {
        message: '连接成功',
        success: true,
        close: close
      };
    }
    function close() {
      source.removeEventListener('message', handleMessage);
      source.removeEventListener('error', handleConnectErr);
      source.close();
    }
    source.addEventListener('open', openConnect);
  } else {
    return {
      message: '浏览器不支持SSE功能,将会导致收不到系统通知!',
      success: false
    };
  }
}
export { initSSE };
