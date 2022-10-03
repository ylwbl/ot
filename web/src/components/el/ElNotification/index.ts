import React from 'react';
import { notification } from 'antd';

/**
 * @name ElNotification
 * # ElNotification 使用文档

注意: ElNotification 基础antd  Notification copy的 只是一个展示组件

## 使用例子

```javascript
import { ElNotification } from '@/components/el';
ElNotification({type:'success',message:'成功通知'})//成功
ElNotification({type:'info',message:'消息通知'})//成功
ElNotification({type:'warning',message:'警告通知'})//成功
ElNotification({type:'error',message:'错误通知'})//成功
```

 */

/**
 * @interface NotificationProps
 * @param message: String;
 * @param closeCallBakck?: () => void;
 */
interface NotificationProps extends NotiTitle {
  message: String;
  closeCallBakck?: () => void;
}

interface NotiTitle {
  type: 'success' | 'info' | 'warning' | 'error';
}

enum notiTitleEnum {
  SUCCESS = '成功提示',
  INFO = '消息提示',
  WARNING = '警告提示',
  ERROR = '错误提示'
}

const notiTitle = (type): NotiTitle => {
  type = type.toUpperCase();
  return notiTitleEnum[type];
};

const ElNotification = ({
  type,
  message,
  closeCallBakck
}: NotificationProps) => {
  notification[type]({
    style: {
      wordWrap: 'break-word',
      wordBreak: 'break-all',
      whiteSpace: 'pre-wrap'
    },
    message: notiTitle(type),
    description: message,
    duration: type === 'error' ? 10 : 2,
    onClose: closeCallBakck
  });
};

export default ElNotification;
