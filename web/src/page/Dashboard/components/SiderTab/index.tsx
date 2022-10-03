import React, { useState } from 'react';
import cls from 'classnames';
import './style.less';
interface Tab {
  title: string;
  icon: any;
  code: string;
}
interface Props {
  tabs: Array<Tab>;
  onTabChange: Function;
}
const SiderTab = ({ tabs, onTabChange }: Props) => {
  const [selectedTitle, setSelectedTitle] = useState('大纲');
  const onSiderTabChange = (v) => {
    setSelectedTitle(v.title);
    onTabChange(v);
  };
  return (
    <div className='sider-tabs'>
      {tabs.map((v) => {
        return (
          <div
            key={v.title}
            onClick={() => onSiderTabChange(v)}
            className={cls('sider-toolbar-item', {
              'sider-toolbar-item-selected': v.title === selectedTitle
            })}
          >
            {React.cloneElement(v.icon, {
              className: 'sider-toolbar-item-icon'
            })}
            <div className='sider-toolbar-item-text'>{v.title}</div>
          </div>
        );
      })}
      {/* <Menu className='sider-toolbar-item-icon' />
        <div className='sider-toolbar-item-text'>代码</div> */}
    </div>
  );
};
export type { Tab };
export default SiderTab;
