import React from 'react';
import { Button } from 'antd';
export const getModalFooter = ({
    loadding,
    recordId,
    closeModal,
    handleExport,
    handleRest
}) => {
    const arr = [
        <Button
            key='cancel'
            type='default'
            // disabled={loadding}
            onClick={closeModal}>{loadding ? '后台导出' : '取消'}</Button>
    ];
    if (recordId) {
        return [...arr, <Button
            key='reset'
            type='primary'
            loading={loadding}
            onClick={handleRest}>清除本次导出结果</Button>]
    } else {
        return [...arr, <Button
            key='export'
            type='primary'
            loading={loadding}
            onClick={handleExport}>导出</Button>]
    }
}