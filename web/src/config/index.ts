import React from 'react';
import sysCenterRouters from './routes/sys/sysCenter'; // 系统中心
// import interfaceCenterRouters from './routes/sys/interfaceCenter'; // 接口中心
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { title: '首页', hidden: true, noAuth: true },
    component: React.lazy(() => import('@/page/Dashboard'))
  },
  {
    path: '/403',
    name: 'err403',
    meta: { title: '403', hidden: true },
    component: React.lazy(() => import('@/page/errPage/Err403'))
  },
  {
    path: '/menuConfig',
    name: 'menuConfig',
    meta: { title: 'menuConfig', hidden: false },
    component: React.lazy(() => import('@/page/MenuConfig'))
  },
  {
    path: '/pageRender/:action/:id',
    name: 'pageRender',
    meta: {
      title: 'pageRender',
      hidden: true,
      keepAlive: true,
      multiple: true
    },
    component: React.lazy(() => import('@/page/PageRender'))
  },
  {
    path: '/pageViewer/view',
    name: 'pageViewer',
    meta: { title: 'pageViewer', hidden: true },
    component: React.lazy(() => import('@/page/PageRender/PageViewer'))
  },
  {
    path: '/cacheRoute',
    name: 'cacheRoute',
    meta: { title: 'cacheRoute', hidden: true, multiple: true },
    component: React.lazy(() => import('@/page/CacheRoute'))
  },
  ...sysCenterRouters
  // ...interfaceCenterRouters,
];
export default routes;
