/**
 * ElExport
 * 按业务功能导出功能
 */
import React from 'react';
import { Modal, Button, Progress } from 'antd';
import { ElNotification } from '@/components/el';
import { getModalFooter } from './config';
import { fetchExportData, fetchExportRate } from './service';
import { divide } from 'ramda';

import './index.less';

/**
 * @name ElExport
 * @example
 <ElExport
          key='export1'
          prefix='/yst-sale'
          tmplCode='yst_sale_quotation'
          onRef={(ref) => this.exportRef = ref}
          push={this.props.push}
        />
 */

interface Props {
    push: any;
    prefix: string;
    tmplCode: string;
    queryParam?: any;
    onRef: any;
}

interface State {
    visible: boolean;
    loadding: boolean;
    recordId: string;
    rate: number;
    total: string | number;
}

class ElExport extends React.PureComponent<Props, State>{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loadding: false,
            recordId: null,
            rate: 0,
            total: 0
        }
    }

    componentDidMount() {
        const { onRef } = this.props;
        onRef && onRef(this);
    }

    openModal = () => {
        this.setState({
            visible: true
        })
    }

    closeModal = () => {
        this.setState({
            visible: false
        })
    }

    handleExport = async () => {
        const { prefix, tmplCode, queryParam } = this.props;
        this.setState({
            loadding: true
        });
        const res_data = await fetchExportData(prefix, tmplCode, queryParam);
        if (res_data?.success) {
            const { recordId, sync } = res_data.data;
            if (sync) {
                this.setState({
                    loadding: false,
                    recordId
                });
                this.downloadExportFile();
            } else {

                await this.queryRate(prefix, recordId);
            }
        } else {
            ElNotification({
                type: 'error',
                message: res_data.data || res_data.msg || '导出失败'
            });
            this.handleRest();
        }

    }

    queryRate = async (prefix, recordId) => {
        const res_info = await fetchExportRate(prefix, recordId);
        if (res_info?.success) {
            const { finish, total, count } = res_info.data;
            const rate = +Number(divide(count, total)).toFixed(2) * 100;
            this.setState({
                rate,
                total
            });
            if (!finish) {
                setTimeout(() => {
                    this.queryRate(prefix, recordId);
                }, 2000);
            } else {
                this.setState({
                    recordId,
                    loadding: false
                });
                this.downloadExportFile();
            }
        } else {
            ElNotification({
                type: 'error',
                message: res_info.msg || res_info.data || '导出失败，请重试'
            });
            this.handleRest();
        }
    };

    handleRest = () => {
        this.setState({
            loadding: false,
            recordId: null,
            rate: 0
        })
    }

    downloadExportFile = () => {
        const { prefix } = this.props;
        const { recordId } = this.state;
        window.open(`${prefix}/com/import/export/${recordId}/file`, '_blank');
    }

    handleGoToLogPage = () => {
        const { push } = this.props;
        push('/sys/template/manage');
    }

    render() {
        const { prefix } = this.props;
        const { visible, loadding, recordId, rate, total } = this.state;
        return (
            <Modal
                key='ElExportModal'
                title='数据导出'
                visible={visible}
                closable={false}
                footer={getModalFooter({
                    loadding,
                    recordId,
                    closeModal: this.closeModal,
                    handleExport: this.handleExport,
                    handleRest: this.handleRest
                })}
            >
                {
                    loadding ?
                        <div>
                            <span>正在导出{total}条记录...</span>
                            <Progress percent={rate} />
                        </div>
                        : recordId ?
                            <span>导出已成功，您也可以再次<Button key='button' type='link' className='el-component-ElExport-downloadBtn manual' onClick={() => { this.downloadExportFile() }}>手动下载</Button></span>
                            : <div>
                                <div>导出大量数据时需要花费一些时间，确定确认是否继续？</div>
                                <br />
                                <div>您可在<Button key='button' type='link' onClick={() => { this.handleGoToLogPage() }}>模板管理</Button>查询历史导出记录</div>
                            </div>
                }
            </Modal>
        )
    }
}

export type { Props as ElexportProps };
export default ElExport;