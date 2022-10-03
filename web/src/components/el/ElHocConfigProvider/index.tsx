import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

/**
 * ElHocConfigProvider
 * @description 用于给组件包裹antd configProvider的hoc
 * @param WrappedComponent 
 * @returns React.Component
 * @example export default ElHocConfigProvider(<React.Component />)
 * 
 */
const ElHocConfigProvider = WrappedComponent => {
    return class extends React.Component {
        render() {
            return <ConfigProvider locale={zhCN}>
                <WrappedComponent {...this.props} />
            </ConfigProvider>
        }
    }
}

export default ElHocConfigProvider;