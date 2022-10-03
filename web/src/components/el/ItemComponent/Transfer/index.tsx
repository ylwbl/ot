import React from 'react';
import { Tag } from 'antd';
import { path } from 'ramda';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.less';

/**
 * Transfer
 * @description 穿梭框组件
 */

interface Props {
  selectedListTitle?: string;
  toSelectListTilte?: string;
  toSelectList?: Array<{ label: string; value: string }>;
  request?: Function;
  data?: string;
  transfer?: {
    label: string;
    value: string;
  };
  value?: Array<{ label: string; value: string }>;
  onChange?: Function;
}
interface State {
  toSelectList?: Array<{ label: string; value: string }>;
  selectedList?: Array<{ label: string; value: string }>;
  selectedValueList?: Array<string>;
}
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  position: 'relative',
  width: 'fit-content',
  displace: 'inline-block',
  // change background colour if dragging

  ...draggableStyle
});
const getListStyle = (isDraggingOver) => ({
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  height: '100%',
  flexWrap: 'wrap'
});
class Transfer extends React.Component<Props, State> {
  static defaultProps = {
    selectedListTitle: '已选列表',
    toSelectListTilte: '待选列表',
    data: 'data',
    transfer: {
      label: 'label',
      value: 'value'
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      toSelectList: [],
      selectedList: [],
      selectedValueList: []
    };
  }
  static getDerivedStateFromProps({ value }, { selectedList }) {
    if (
      value &&
      Array.isArray(value) &&
      JSON.stringify(value) !== JSON.stringify(selectedList)
    ) {
      return {
        selectedList: value,
        selectedValueList: value.map((v) => v.value)
      };
    }
    return null;
  }
  componentDidMount() {
    this.initList();
    this.initSelectedList();
  }
  initList = async () => {
    const { toSelectList, request, transfer } = this.props;
    const { label, value } = transfer;
    if (toSelectList) {
      this.setState({ toSelectList });
    } else if (request) {
      const res = await request();
      if (res.success) {
        this.setState({
          toSelectList: Array.from(path(this.props.data.split('.'), res)).map(
            (v) => {
              return {
                key: v[value],
                label: v[label],
                value: v[value]
              };
            }
          )
        });
      }
    }
  };
  initSelectedList = () => {
    const { value, onChange } = this.props;
    if (value && Array.isArray(value)) {
      this.setState({
        selectedList: value
      });
    }
  };
  clickTag = (selectedValue: { label: string; value: string }) => {
    const { onChange } = this.props;
    let selectedList = this.state.selectedList;
    const isSelected = this.state.selectedList.find(
      (v) => v.value === selectedValue.value
    );
    if (!isSelected) {
      selectedList = selectedList.concat([selectedValue]);
    } else {
      selectedList = selectedList.filter(
        (v) => v.value !== selectedValue.value
      );
    }
    this.setState(
      {
        selectedValueList: selectedList.map((v) => v.value)
      },
      () => {
        onChange && onChange(selectedList);
      }
    );
  };
  checkTagIsSelected = (value: string) => {
    return this.state.selectedValueList.includes(value) ? 'blue' : null;
  };
  // 拖拽排序功能
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const { selectedList } = this.state;
    const newSelectedList = this.reOrder(
      selectedList,
      result.source.index,
      result.destination.index
    );

    this.setState(
      {
        selectedList: newSelectedList
      },
      () => {
        const { onChange } = this.props;
        onChange && onChange(selectedList);
      }
    );
  };
  reOrder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  render() {
    const { selectedListTitle, toSelectListTilte } = this.props;
    const { toSelectList, selectedList } = this.state;
    return (
      <div className='transfer-container'>
        <fieldset className='transfer-fieldset'>
          <legend>{selectedListTitle}</legend>
          <div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId='droppable' direction='horizontal'>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {this.state.selectedList.map((item, index) => (
                      <Draggable
                        key={item.value}
                        draggableId={item.value}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Tag
                              className='transfer-toSelect-tag'
                              color={this.checkTagIsSelected(item.value)}
                            >
                              {item.label}
                            </Tag>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </fieldset>
        <div className='transfer-fieldset-splitter'></div>
        <fieldset className='transfer-fieldset'>
          <legend>{toSelectListTilte}</legend>
          <div>
            {toSelectList.map((v) => (
              <Tag
                key={v.value}
                onClick={() => this.clickTag(v)}
                className='transfer-toSelect-tag'
                color={this.checkTagIsSelected(v.value)}
              >
                {v.label}
              </Tag>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }
}
export default Transfer;
