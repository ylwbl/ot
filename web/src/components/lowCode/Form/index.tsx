import React, { useEffect } from 'react';
import { ConfigProvider, Form, Row, Col } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './style.less';
import {
  FormInstance,
  FormItemProps,
  FormProps as AntdFormProps
} from 'antd/lib/form';

import ElFormItem from './components/ElFormItem';
import { ELFormItemType } from '../../../projectConfig'; //各域业务组件引入

/**
 * @interface ElFormProps
 * @param items?: Array<ElFormItemProps>;
 * @param span?: number;
 */
interface ElFormProps extends AntdFormProps {
  items?: Array<ElFormItemProps>;
  span?: number;
}

type types =
  | '$input'
  | '$async-input-select'
  | '$radio'
  | '$checkbox'
  | '$udc'
  | '$select'
  | '$switch'
  | '$datePicker'
  | '$rangePicker'
  | '$text'
  | '$textArea'
  | '$percentage'
  | '$img-upload'
  | '$file-upload'
  | '$inputNumber'
  | '$img-show'
  | '$color-picker'
  | '$video-upload-show'
  | '$new-img-upload'
  | '$input-addon-after'
  | '$auto-complete'
  | '$tag-select'
  | '$rangeNumber'
  | '$transfer';

type allTypes = types | ELFormItemType;
interface ElFormItemProps extends FormItemProps {
  id?: string;
  title?: string;
  name?: string;
  dataIndex?: string;
  hidden?: boolean;
  span?: number;
  form?: FormInstance;
  className?: string;
  formOption: {
    type?: allTypes;
    props?: {
      domain?: string;
      udc?: string;
      request?: Function;
      mode?: 'multiple' | 'tags';
      [props: string]: any;
    };
    render?: Function;
    events?: {
      onChange?: Function;
      [props: string]: any;
    };
  };
}
interface Props {
  onRef?: Function;
  formProps?: ElFormProps;
  rowClassName?: string;
  data?: any;
  children?: any;
  title?: string;
  id?: string;
}
const ElForm = (props: Props) => {
  const [form] = Form.useForm();
  // const [collapse, setCollapse] = useState(true);
  useEffect(() => {
    if (props.onRef) {
      props.onRef(form);
    }
  }, []);
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue(props.data);
    }
  }, [props.data]);
  return (
    <>
      <ConfigProvider locale={zhCN}>
        {props.title && (
          <div className='elform-title-container'>
            <p className='elform-title'>{props.title}</p>
          </div>
        )}
        <Form
          id={props.id}
          name='el_search'
          layout='horizontal'
          labelAlign='right'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          size='small'
          {...props.formProps}
          form={form}
        >
          {props.children ? (
            props.children
          ) : (
            <Row className={props.rowClassName} align='middle'>
              {props.formProps?.items &&
                Array.isArray(props.formProps?.items) &&
                props.formProps?.items
                  .filter((e) => !e.hidden)
                  .map((v, idx) => {
                    return (
                      <Col
                        span={v.span || 6}
                        key={v.name || `Col${idx}`}
                        style={{ padding: '0 20px' }}
                      >
                        <ElFormItem id={`Item${idx}`} {...v} form={form} />
                      </Col>
                    );
                  })}
            </Row>
          )}
        </Form>
      </ConfigProvider>
    </>
  );
};
export type { ElFormProps, ElFormItemProps };
export default ElForm;
