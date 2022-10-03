import React, { useRef, useState, useEffect } from 'react';
import { Modal, Table, Button, Upload, message, Popconfirm } from 'antd';
import { ClosecircleBlack, CheckcircleBlack } from '@/components/el/ElIcon';
import './index.less';
import iconAdd from './img/Icon-add.svg';
import iconDownload from './img/Icon-download.svg';
import iconDel from './img/Icon-dele.svg';

/**
 * @name ELImport
 * @deprecated
 * # ELImport 使用文档

注意: ELImport 基础antd  Modal/Table/Upload组件组合而成，一次只能选择一个文件，调用接口成功后会返回信息。/把文件给后端，后端解析直接入库

## 使用例子

```javascript
import { ElImport } from '@/components/el';

  imports = () => {
    console.log('导入');
    const { importModalRef } = this.state;
    importModalRef.openModal();
    //importModalRef.closeModal();
  };
    //获取modalref
  modalRef = (importModalRef) => {
    this.setState({
      importModalRef
    });
  };
  //导入接口调用成功后的回调
  importCallBack = (rep) => {
    console.log('reprep', rep);
  };

    <ElImport
    onRef={this.modalRef}
    templateFileName='库存组装导入模板'
    templateFilePath='/assets/excel/库存组装导入模板.xlsx'
    requestPath='/yst-pur/pur/purMoq/import'
    maxSize={1}
    sizeType='KB'
    note='仅支持xlsx格式文件，文件不能超过1kb'
    successCallBak={this.importCallBack}
    fileType='xlsx|xls|xlsx'
  />

```

##修改记录
- 2021-06-18: 增加关闭弹出框后清除已选择的文件功能
- 2021-06-19: 增加请求头身份信息
- 2021-06-26: 修改下载模版路径
- 2021-07-15: 修改超时时间，从6秒改为60秒
 */

const constPrefixStr =
  process.env.NODE_ENV !== 'development'
    ? window.location.port
    : `:${window.location.port}`;
interface Props {
  templateFileName: string; // 模版文件名称
  templateFilePath: string; // 模版文件绝对位置
  onRef: Function; //导入组件ref
  requestPath: string; //导入请求路径
  params?: Object; //传参
  successCallBak: Function; //成功回调
  maxSize: number; //文件最大大小
  sizeType: string; //大小单位 mb
  note: string; //说明
  fileType: string; //上传文件类型，校验
}

interface State {
  modalTitle: string;
  visible: boolean;
  currentFile: any;
  uploadLoading: boolean;
  clearTableDataFN: Function;
}
const prefixStr = '';
const FileBox = ({
  templateFileName,
  templateFilePath,
  callBakCurrentFile,
  maxSize,
  sizeType,
  note,
  fileType,
  clearTableDataCallbak
}) => {
  const [tableData, setTableData] = useState([]);
  const fileRef = useRef(null);
  // 选择文件
  const selectFile = (req) => {
    //判断大小
    let sizeStatus = validationFileSize(req.file, maxSize);
    if (!sizeStatus.validaStatus) {
      message.error('超过最大限制' + maxSize);
      return false;
    }
    //校验文件类型
    let typeStatus = validationFileType(req.file, fileType);
    if (!typeStatus) {
      message.error('仅支持' + fileType + '文件');
      return false;
    }
    //更新文件
    setTableData([
      {
        fileName: req.file.name,
        fileSize: (req.file.size / sizeStatus.transformationRatio).toFixed(2),
        id: '1'
      }
    ]);
    callBakCurrentFile(req.file);
  };

  //校验文件类型
  const validationFileType = (file, fileType) => {
    const { name } = file;
    let reg = new RegExp('.(' + fileType + ')$');
    return reg.test(name);
  };
  //校验文件大小
  const validationFileSize = (file, maxSize) => {
    const { size } = file;
    //获取转换比例，如果是kb 就是1，mb就是1024
    const transformationRatio =
      sizeType.toLocaleUpperCase() === 'KB' ? 1024 : 1024 * 1024;
    if (size > maxSize * transformationRatio) {
      message.error('文件不能超过' + maxSize + sizeType.toLocaleUpperCase());
      return {
        validaStatus: false
      };
    }
    return {
      validaStatus: true,
      transformationRatio
    };
  };

  //删除
  const del = () => {
    if (tableData.length >= 1) {
      setTableData([]);
      callBakCurrentFile(null);
    }
  };

  //清空tableData
  const clearTableData = () => {
    setTableData([]);
    callBakCurrentFile(null);
  };

  useEffect(() => {
    clearTableDataCallbak(clearTableData);
  }, []);

  //下载模版
  const downFile = () => {
    const downa = document.createElement('a');
    downa.href =
      window.location.origin +
      templateFilePath +
      `?time=${new Date().getTime()}`;
    // console.log(
    //   'a-->',
    //   `${window.location.protocol}//${window.location.hostname}${constPrefixStr}${templateFilePath}?time=${new Date().getTime()}`
    // );
    downa.download = templateFileName;
    downa.style.textDecoration = 'underline';
    document.body.appendChild(downa);
    downa.click();
    document.body.removeChild(downa);
  };

  const column = [
    {
      title: '序号',
      dataIndex: 'key',
      render: (value, row, index) => <span>{index + 1}</span>
    },
    {
      title: '文件名称',
      dataIndex: 'fileName'
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      render: (value) => {
        return (
          <span>
            {value}
            {sizeType.toLocaleUpperCase()}
          </span>
        );
      }
    }
  ];
  return (
    <div className='el-import-table'>
      <div className='import-button-box'>
        <Upload
          accept='application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          listType='text'
          multiple={false}
          customRequest={(req) => selectFile(req)}
          showUploadList={false}
        >
          <Button
            icon={<img src={iconAdd} style={{ marginRight: '4px' }}></img>}
            className='el-btn-default'
          >
            选择文件
          </Button>
        </Upload>
        <Button
          className='el-btn-default'
          style={{ marginLeft: '8px' }}
          onClick={downFile}
          icon={<img src={iconDownload} style={{ marginRight: '4px' }}></img>}
        >
          模版下载
        </Button>
        <Popconfirm
          title='确认要删除吗？'
          okText='确认'
          cancelText='取消'
          onConfirm={del}
        >
          <Button
            className='el-btn-default'
            style={{ marginLeft: '8px' }}
            icon={<img src={iconDel} style={{ marginRight: '4px' }}></img>}
          >
            删除
          </Button>
        </Popconfirm>
        <span className='import-button-box-span'>{note}</span>
      </div>
      <Table
        size='small'
        columns={column}
        dataSource={tableData}
        pagination={{ hideOnSinglePage: true }}
        rowKey='id'
        bordered
      />
    </div>
  );
};

class ElImport extends React.Component<Props, State> {
  xmlhhtp: any;
  static defaultProps = {
    params: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      modalTitle: '文件导入',
      visible: false,
      currentFile: null,
      uploadLoading: false,
      clearTableDataFN: null
    };
  }

  callBakCurrentFile(file) {
    this.setState({
      currentFile: file
    });
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  openModal = () => {
    this.setState({
      visible: true
    });
  };
  clearTableDataCallbak = (fn) => {
    this.setState({
      clearTableDataFN: fn
    });
  };

  closeModal = () => {
    const { clearTableDataFN } = this.state;
    this.xmlhhtp && this.xmlhhtp.abort();
    clearTableDataFN();
    this.setState({
      visible: false,
      uploadLoading: false
    });
    this.xmlhhtp = null;
  };

  uploadLoading = (params) => {
    this.setState({
      uploadLoading: params
    });
  };

  //上传文件
  uploadFile = () => {
    const { requestPath, successCallBak } = this.props;
    const { currentFile } = this.state;
    //判断文件是否存在
    if (!currentFile) {
      message.error('请选择文件');
      return;
    }
    const formData = new FormData();
    formData.append('file', currentFile);
    if (Object.keys(this.props.params).length > 0) {
      if (!!this.props.params && Object.keys(this.props.params).length > 0) {
        Object.keys(this.props.params).forEach((key) => {
          formData.append(key, this.props.params[key]);
        });
      }
    }
    const xmlhttp = new XMLHttpRequest();
    this.xmlhhtp = xmlhttp;
    xmlhttp.timeout = 60000; //请求超时 60秒
    xmlhttp.open('POST', `${prefixStr + requestPath}`);
    xmlhttp.setRequestHeader(
      'Authorization',
      `${window.localStorage.getItem('Authorization')}`
    );
    xmlhttp.onreadystatechange = (e) => {
      //请求处理中
      if (xmlhttp.readyState === 3) {
        return;
      }
      //请求完成
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        let response = JSON.parse(xmlhttp.response);
        //         console.log('responseresponse', response);
        successCallBak(response);
        this.closeModal();
      } else if (xmlhttp.readyState === 4 && xmlhttp.status === 404) {
        let response = JSON.parse(xmlhttp.response);
        successCallBak(response);
      }
      this.uploadLoading(false);
    };
    xmlhttp.ontimeout = (e) => {
      message.error('请求超时');
      xmlhttp.abort();
      this.uploadLoading(false);
    };
    xmlhttp.send(formData);
    this.uploadLoading(true);
  };

  render() {
    const { modalTitle, visible, uploadLoading } = this.state;
    return (
      <Modal
        title={modalTitle}
        visible={visible}
        width='550px'
        onCancel={this.closeModal}
        maskClosable={false}
        bodyStyle={{ padding: '0px' }}
        className='el-import-modal'
        footer={
          <div>
            <Button icon={<ClosecircleBlack />} onClick={this.closeModal}>
              取消
            </Button>
            <Button
              type='primary'
              icon={<CheckcircleBlack />}
              onClick={this.uploadFile}
              loading={uploadLoading}
            >
              上传
            </Button>
          </div>
        }
      >
        <FileBox
          {...this.props}
          clearTableDataCallbak={(clearTableDataCallbak) =>
            this.clearTableDataCallbak(clearTableDataCallbak)
          }
          callBakCurrentFile={(file) => this.callBakCurrentFile(file)}
        />
      </Modal>
    );
  }
}

export default ElImport;
