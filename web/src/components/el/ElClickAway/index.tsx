import React, { ReactElement, cloneElement } from 'react';

/**
 * ElClickAway
 * @description 点击外面组件
 * 
 */
interface Props {
  children?: ReactElement;
  onClickAway?: Function;
}
interface State {
  childRef: any;
}

class ElClickAway extends React.Component<Props, State> {
  componentDidMount() {
    this.addWindowCLickEvent();
  }
  componentWillUnmount() {
    this.removeWindowClickEvent();
  }
  handleClickEvent = (e) => {
    const { onClickAway } = this.props;
    if (
      this.state.childRef &&
      this.state.childRef.contains &&
      !this.state.childRef.contains(e.target)
    ) {
      onClickAway && onClickAway();
    }
  };
  addWindowCLickEvent = () => {
    window.addEventListener('click', this.handleClickEvent);
    window.addEventListener('touch', this.handleClickEvent);
  };
  removeWindowClickEvent = () => {
    window.removeEventListener('click', this.handleClickEvent);
    window.removeEventListener('touch', this.handleClickEvent);
  };
  handleChildRef = (childRef) => {
    this.setState({
      childRef
    });
  };
  render() {
    return React.Children.only(
      cloneElement(this.props.children, {
        ref: this.handleChildRef
      })
    );
  }
}
export default ElClickAway;
