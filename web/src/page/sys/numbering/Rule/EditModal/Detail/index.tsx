import { ElEditTable } from '@/components/el';
import React, { Component } from 'react';
import { maths } from '@/utils';
import { getTableColumns, getTableActionButtons } from './config';
import Item from 'antd/lib/list/Item';

export default class index extends Component<any, any> {
  create = async () => {
    await this.props.detailRef.quitEditState();
    this.props.detailRef.addRow({
      id: maths.genFakeId(-1)
    });
  };

  del = async ({ selectedRowKeys }) => {
    await this.props.detailRef.quitEditState(); //删除前退出编辑状态
    const deleteFlags = selectedRowKeys.filter((item) => +item > 0);
    this.props.setDeleteFlags(deleteFlags);
    this.props.detailRef.removeRowsByKeys(selectedRowKeys, 'rowKey');
  };

  save = () => {
    this.props.save();
  };
  render() {
    return (
      <ElEditTable
        tableId='sys_rule_detail'
        rowKey='id'
        bordered
        onRef={this.props.getDetailRef}
        dataSource={this.props?.detailData?.map((item) => ({
          ...item,
          numberType: {
            udcVal: item.numberType,
            valDesc: item.numberTypeName
          }
        }))}
        actionButtons={getTableActionButtons(
          this.create.bind(this),
          this.del.bind(this),
          this.save.bind(this),
          this.props.saveLoading
        )}
        columns={getTableColumns()}
        scroll={{ y: 300 }}
        style={{ height: 330 }}
      />
    );
  }
}
