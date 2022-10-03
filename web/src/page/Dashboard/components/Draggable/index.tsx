import React from 'react';
import ComMap from '@/ComMap';
interface Props {
  children: any;
  onDragStart?: Function;
  code: string;
}
function Draggable({ children, code }: Props) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', '');
    e.dataTransfer.setData('code', code);
  };
  return (
    <div
      className='drag-tag'
      draggable
      onDragStart={handleDragStart}
      data-type='component'
    >
      {children}
    </div>
  );
}

export default Draggable;
