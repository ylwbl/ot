import React from 'react';
//域业务组件
import {
  TemplateUpload,
  PicManagerUpload,
  CheckSwitch,
  BuPopupSelection,
  EmpPopupSelection,
  OuPopupSelection
} from './components/biz';

type ELFormItemType =
  | '$mg-pop-wh'
  | '$oms-pop-customerPopupSelection'
  | '$mg-select-ou'
  | '$oms-pop-salesmanPoPupSelection'
  | '$mg-pop-item'
  | '$b2c-cascader-region'
  | '$oms-org-tree'
  | '$mg-pop-user'
  | '$support-category-cascader'
  | '$support-item-brand'
  | '$oms-pop-itemPopupSelection'
  | '$template-upload'
  | '$check-switch'
  | '$emp-popup'
  | '$bu-popup'
  | '$ou-popup'
  | '$pic-manager-upload';

const ElFormItem = [
  {
    type: '$template-upload',
    render: (props) => {
      return <TemplateUpload {...props} />;
    }
  },
  {
    type: '$pic-manager-upload',
    render: (props) => {
      return <PicManagerUpload {...props} />;
    }
  },
  {
    type: '$check-switch',
    render: (props) => {
      return <CheckSwitch {...props} />;
    }
  },
  {
    type: '$emp-popup',
    render: (props) => {
      return <EmpPopupSelection {...props} />;
    }
  },
  {
    type: '$bu-popup',
    render: (props) => {
      return <BuPopupSelection {...props} />;
    }
  },
  {
    type: '$ou-popup',
    render: (props) => {
      return <OuPopupSelection {...props} />;
    }
  }
];
export { ElFormItem };
export type { ELFormItemType };
