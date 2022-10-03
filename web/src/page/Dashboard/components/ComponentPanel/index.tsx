import React from 'react';
import ComCard from '../ComCard';
import ComTag from '../ComTag';
import Draggable from '../Draggable';
interface Props {}

class ComponentPanel extends React.Component<Props> {
  componentDidMount() {}
  render() {
    return (
      <>
        <ComCard title='块级组件'>
          <Draggable code='searchTable'>
            <ComTag text='查询表格' info='123' />
          </Draggable>
          <Draggable code='form'>
            <ComTag text='表单' info='123' />
          </Draggable>
        </ComCard>
        <ComCard title='表单项'>
          <Draggable code='input'>
            <ComTag text='输入框' info='123' />
          </Draggable>
          <Draggable code='input.password'>
            <ComTag text='密码框' info='123' />
          </Draggable>
          <Draggable code='text'>
            <ComTag text='纯文字' info='123' />
          </Draggable>
        </ComCard>
      </>
    );
  }
}

export default ComponentPanel;
