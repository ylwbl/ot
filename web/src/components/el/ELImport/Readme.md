# ELImport 使用文档

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