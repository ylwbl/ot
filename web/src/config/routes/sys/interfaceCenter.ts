import React from 'react';
const InterfaceRouters = [
  {
    path: '/interface',
    name: 'interface',
    meta: { title: '接口中心' },
    routes: [
      {
        path: '/interface/http',
        name: 'interface_http',
        meta: { title: 'HTTP接口' },
        routes: [
          {
            path: '/interface/http/httpgroup',
            name: 'httpGroup',
            meta: { title: 'HTTP组' },
            component: React.lazy(
              () => import('@/page/interfaceCenter/http/HttpGroup')
            )
          },
          {
            path: '/interface/http/httpInterface',
            name: 'httpInterface',
            meta: { title: 'HTTP' },
            component: React.lazy(
              () => import('@/page/interfaceCenter/http/HttpInterface')
            )
          },
          {
            path: '/interface/http/httpDetail/:id',
            name: 'httpDetail',
            meta: { title: 'HTTP详情', hidden: true },
            component: React.lazy(
              () => import('@/page/interfaceCenter/http/HttpInterface/Detail')
            )
          }
        ]
      },
      {
        path: '/interface/taskConfig',
        name: 'taskConfig',
        meta: { title: '任务编排' },
        routes: [
          {
            path: '/interface/taskconfig/taskList',
            name: 'taskList',
            meta: { title: '任务列表' },
            component: React.lazy(
              () => import('@/page/interfaceCenter/taskConfig/TaskList')
            )
          },
          {
            path: '/interface/taskconfig/nodeList/:id',
            name: 'nodeList',
            meta: { title: '任务节点维护', hidden: true },
            component: React.lazy(
              () => import('@/page/interfaceCenter/taskConfig/NodeList')
            )
          }
        ]
      },
      {
        path: '/interface/setting',
        name: 'setting',
        meta: { title: '系统配置' },
        routes: [
          {
            path: '/interface/setting/account',
            name: 'settingAccount',
            meta: { title: '验证账号' },
            component: React.lazy(
              () => import('@/page/interfaceCenter/setting/Account')
            )
          },
          {
            path: '/interface/setting/logList',
            name: 'interface-logList',
            meta: { title: '日志信息' },
            component: React.lazy(
              () => import('@/page/interfaceCenter/setting/LogList')
            )
          }
        ]
      }
    ]
  }
];

export default InterfaceRouters;
