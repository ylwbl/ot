// 发号器规则新增
import React, { Component } from 'react';
import { Modal } from 'antd';
import { ElCard, ElNotification } from '@/components/el';
import Detail from './Detail/index';
import Rule from './Rule/index';
import * as service from '../service';

export default class EditModal extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      ruleRef: null,
      detailRef: null,
      deleteFlags: [],
      saveLoading: false,
      type: ''
    };
  }
  componentDidMount() {}

  getRuleRef = (ref) => {
    this.setState({
      ruleRef: ref
    });
  };

  getDetailRef = (ref) => {
    this.setState({
      detailRef: ref
    });
  };

  //保存
  save = async () => {
    this.setState({
      saveLoading: true
    });
    await this.state.detailRef.quitEditState();
    const ruleData = await this.state.ruleRef.validateFields();
    const detailData = await this.state.detailRef.validateTableRows();
    console.log('rule组件', ruleData);
    console.log('detail组件', detailData);
    const params = detailData.data.map((item) => ({
      ...item,
      numberType: item.numberType?.udcVal,
      numberTypeName: item.numberType?.valDesc
    }));
    let tempData = {
      ...ruleData,
      ruleDetails: params
    };
    if (this.props.mark == 'create') {
      const res = await service.createRule(tempData);
      await service.createRuleBatch(
        detailData.data.map((val) => {
          return {
            ...val,
            ruleId: res.data,
            numberType: val.numberType?.udcVal,
            numberTypeName: val.numberType?.valDesc
          };
        })
      );
      if (res.success) {
        ElNotification({
          type: 'success',
          message: res.msg || '操作成功'
        });
        this.props.tableRef.getTableData();
      } else {
        ElNotification({
          type: 'error',
          message: res.msg || '操作失败'
        });
      }
    } else {
      tempData.id = this.props.editId;
      const res = await service.updataRule(tempData);
      await service.createRuleBatch(
        detailData.data.map((v) => {
          return {
            ...v,
            ruleId: tempData.id,
            numberType: v.numberType?.udcVal,
            numberTypeName: v.numberType?.valDesc
          };
        })
      );
      if (res.success) {
        ElNotification({
          type: 'success',
          message: res.msg || '操作成功'
        });
        this.props.tableRef.getTableData();
      } else {
        ElNotification({
          type: 'error',
          message: res.msg || '操作失败'
        });
      }
    }
    //form表单重置为默认值，即是全空状态
    // this.state.ruleRef.resetFields();
    // this.props?.resetTable();
    // if (res.success) {
    //   ElNotification({
    //     type: 'success',
    //     message: res.msg || '操作成功'
    //   });
    // } else {
    //   ElNotification({
    //     type: 'error',
    //     message: res.msg || '操作失败'
    //   });
    // }
    this.setState({
      saveLoading: false
    });
  };

  setDeleteFlags = (params) => {
    this.setState({ deleteFlags: [...this.state.deleteFlags, ...params] });
  };

  render() {
    // console.log('子组件EditModal渲染', this.props.editData.ruleDetails);
    const { modalVisible, editData, destroyOnClose } = this.props;
    return (
      <Modal
        width={1000}
        visible={modalVisible}
        keyboard={true}
        destroyOnClose={destroyOnClose}
        centered
        onOk={this.save}
        // footer={null}
        title='新增发号器规则'
        onCancel={() => {
          this.props.onCancel();
          this.state.ruleRef.resetFields(); //form表单重置为默认值，即是全空状态
          this.state.detailRef.clearRows();
        }}
      >
        <ElCard title='基本信息'>
          <Rule
            type={this.props.mark}
            getRuleRef={this.getRuleRef}
            ruleRef={this.state.ruleRef}
            ruleData={editData}
          />
        </ElCard>
        <ElCard title='规则明细'>
          <Detail
            saveLoading={this.state.saveLoading}
            save={this.save}
            getDetailRef={this.getDetailRef}
            detailRef={this.state.detailRef}
            detailData={editData?.ruleDetails}
            setDeleteFlags={this.setDeleteFlags}
          />
        </ElCard>
      </Modal>
    );
  }
}
