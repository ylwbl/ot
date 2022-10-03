import React from 'react';
import { Card, CardProps } from 'antd';
import './style.less';
function ComCard({ title, children }: CardProps) {
  return (
    <Card title={title} className='com-card'>
      {children}
    </Card>
  );
}

export default ComCard;
