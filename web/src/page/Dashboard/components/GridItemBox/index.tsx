import React from 'react';
import cls from 'classnames';
import './style.less';
interface props {
  id: string;
  setSelectedBlock?: any;
  selectedBlock?: any;
}
class GridItemBox extends React.Component<props, any> {
  constructor(props) {
    super(props);
  }
  onSelectBox = (key, e) => {
    const { setSelectedBlock } = this.props;
    console.log('onSelectBox', key);
    setSelectedBlock(key);
  };
  onDragOver = (e) => {
    e.preventDefault();
    console.log(e);
  };
  render() {
    const { id } = this.props;
    return (
      <div
        className={cls({
          'grid-item-inbox': true,
          'grid-item-inbox-selected': id === this.props.selectedBlock
        })}
        onClick={(e) => {
          this.onSelectBox(id, e);
        }}
      >
        {this.props.children}
        <div className='grid-item-inbox-tool'>
          <div className='grid-item-inbox-tool-bar'>tool bar</div>
          <span className='grid-item-inbox-tool-add top'>+</span>
          <span className='grid-item-inbox-tool-add right'>+</span>
          <span className='grid-item-inbox-tool-add bottom'>+</span>
          <span className='grid-item-inbox-tool-add left'>+</span>
        </div>
      </div>
    );
  }
}
export default GridItemBox;
