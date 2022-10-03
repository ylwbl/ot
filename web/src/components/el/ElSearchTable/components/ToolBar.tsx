import React from 'react';
import ColumnSetting from './ColumnSetting';
import { ElSearchTableColumns } from '../index';
interface ToolBarProps {
  columns: Array<ElSearchTableColumns>;
  setColumns: Function;
  tableId: string;
}
interface State {}
class ToolBar extends React.Component<ToolBarProps, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {this.props.tableId && (
          <ColumnSetting
            tableId={this.props.tableId}
            columns={this.props.columns}
            setColumns={this.props.setColumns}
          />
        )}
      </>
    );
  }
}

export default ToolBar;
