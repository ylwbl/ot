import React from 'react';
import { Select } from 'antd';
import request from '@/utils/request';

/**
 * TagSelection
 * @description 标签式下拉选择组件
 */


const { Option } = Select;

export interface TransferProps {
    value: string;
    label: string;
}
interface Props {
    requestUrl: string;
    requestMethod: string;
    placeholder: string;
    onChange?: Function;
    transfer?: TransferProps;
    multiple?: boolean;
    defaultValue?: Array<any>;
}

interface State {
    value: Array<any>;
    options: Array<any>;
}

class Autocomplete extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            options: []
        };
    }
    componentDidMount() {
        if (this.props.requestUrl && this.props.requestMethod) {
            this.getList();
        }
    }
    getList = async () => {
        const { requestUrl, requestMethod, transfer, defaultValue } = this.props;
        let res = await request(requestUrl, {
            method: requestMethod
        });
        if (res.success) {
            let options = [];
            options = res.data.map((val) => {
                return {
                    label: val[transfer.label],
                    value: val[transfer.value]
                }
            })
            this.setState({ options, value: defaultValue })
        }
    };
    onSelect = (data, options) => {
        this.setState({
            value: data
        }, () => {
            if (this.props.onChange) {
                let returnData;
                if (!options.value) {
                    returnData = {
                        label: data,
                        value: ''
                    }
                } else {
                    returnData = {
                        label: options.children,
                        value: options.key
                    }
                }
                this.props.onChange(returnData);
            }
        })
    }
    onClear = () => {
        this.setState({
            value: []
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(null);
            }
        })
    }


    render() {
        const { placeholder } = this.props;
        const { value, options } = this.state;
        return (
            <Select mode="tags" style={{ width: '100%' }}
                allowClear={true}
                value={value}
                onSelect={this.onSelect}
                onClear={this.onClear}
                placeholder={placeholder}>
                {options && options.length > 0 && options.map(v => {
                    return (
                        <Option key={v.value} value={v.label}>{v.label}</Option>
                    )
                })}
            </Select>
        );
    }
}

export default Autocomplete;
