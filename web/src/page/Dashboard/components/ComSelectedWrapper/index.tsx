import React from 'react';

function ComSelectedWrapper() {
  return (
    <div>
      todo 此处用于包裹低代码设计器内的每一个块级组件
      需要选中时触发onChange事件告知其他组件,并且被选中时需要变成蓝色边框附带工具栏
    </div>
  );
}

export default ComSelectedWrapper;
