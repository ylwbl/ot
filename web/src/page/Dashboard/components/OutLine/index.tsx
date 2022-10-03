import React from 'react';
import { Tree, Tag } from 'antd';
import {
  Bill as IconBill,
  WorkflowDeploy as IconWorkflowDeploy
} from '@el-components/el-icons'
import './style.less';
function OutLine({ config, setSelectedBlock, setActiveComCode }) {
  const formatConfig = () => {
    const loop = (children) => {
      if (children && Array.isArray(children)) {
        return children.map((v) => {
          if (v.type === 'page') {
            return {
              key: v.i,
              component: v.component,
              name: v.name,
              type: v.type,
              title: <Tag color='purple'>{v.name}</Tag>,
              icon: <IconBill />,
              children: loop(v.children)
            }
          } else if (v.type === 'container') {
            return {
              key: v.i,
              component: v.component,
              name: v.name,
              type: v.type,
              title: <Tag color='volcano'>{v.name}</Tag>,
              icon: <IconBill />,
              children: loop(v.children)
            }
          } else {
            return {
              key: v.i,
              component: v.component,
              name: v.name,
              type: v.type,
              title: <Tag color='cyan'>{v.name}</Tag>,
              icon: <IconWorkflowDeploy />,
              children: loop(v.children)
            }
          };
        });
      }
      return undefined;
    };

    return loop([config]);
  };
  const onTagSelected = (selectedKeys, e) => {
    if (e.selected) {
      const nodeInfo = e.selectedNodes[0];
      if (nodeInfo.type === 'page') {
        setSelectedBlock('page');
        setActiveComCode('page');
      } else {
        setSelectedBlock(nodeInfo.key);
        setActiveComCode(nodeInfo.component);
      }
    } else {
      setSelectedBlock('page');
      setActiveComCode('page');
    }
  };
  return (
    <Tree
      treeData={formatConfig()}
      defaultExpandAll={true}
      onSelect={onTagSelected}
      showLine={{ showLeafIcon: false }}
      showIcon
    ></Tree>
  );
}

export default OutLine;
