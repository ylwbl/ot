import React from 'react';
const sysCenterRouters = [
  {
    path: '/sys',
    name: 'sys',
    meta: { title: '系统中心' },
    routes: [
      {
        path: '/sys/numbering',
        name: 'numbering',
        meta: { title: '发号器设置' },
        routes: [
          {
            path: '/sys/numbering/rules',
            name: 'rules',
            meta: { title: '规则设置' },
            component: React.lazy(() => import('@/page/sys/numbering/Rule'))
          },
          {
            path: '/sys/numbering/nextnum',
            name: 'nextnum',
            meta: { title: '下一编号' },
            component: React.lazy(() => import('@/page/sys/numbering/NextNum'))
          }
        ]
      },
      {
        path: '/sys/administration',
        name: 'administration',
        meta: { title: '用户角色权限' },
        routes: [
          {
            path: '/sys/administration/users',
            name: 'users',
            meta: { title: '用户列表', keepAlive: true },
            component: React.lazy(
              () => import('@/page/sys/administration/User')
            )
          },
          {
            path: '/sys/administration/approle',
            name: 'appRole',
            meta: { title: '应用角色列表' },
            component: React.lazy(
              () => import('@/page/sys/administration/AppRole')
            )
          },
          {
            path: '/sys/administration/wrokflowrole',
            name: 'workflowRole',
            meta: { title: '流程角色列表' },
            component: React.lazy(
              () => import('@/page/sys/administration/WorkflowRole')
            )
          },
          {
            path: '/sys/administration/datarole',
            name: 'dataRole',
            meta: { title: '数据角色列表' },
            component: React.lazy(
              () => import('@/page/sys/administration/DataRole')
            )
          },
          {
            path: '/sys/administration/dataroledetail/new',
            name: 'system-dataRoleDetail-add',
            meta: { title: '数据角色新增', hidden: true },
            component: React.lazy(
              () => import('@/page/sys/administration/DataRole/Detail')
            )
          },
          {
            path: '/sys/administration/dataroledetail/edit/:id',
            name: 'system-dataRoleDetail-edit',
            meta: { title: '数据角色编辑', hidden: true },
            component: React.lazy(
              () => import('@/page/sys/administration/DataRole/Detail')
            )
          },
          {
            path: '/sys/administration/permissions',
            name: 'permissions',
            meta: { title: '权限列表' },
            component: React.lazy(
              () => import('@/page/sys/administration/Permission')
            )
          },
          {
            path: '/sys/administration/dataPermission',
            name: 'datapermission',
            meta: { title: '业务数据权限' },
            component: React.lazy(
              () => import('@/page/sys/administration/DataPermission')
            )
          }
        ]
      },
      {
        path: '/sys/metadata',
        name: 'metadata',
        meta: { title: '数据字典' },
        routes: [
          {
            path: '/sys/metadata/udc',
            name: 'udc',
            meta: { title: '分类码管理', keepAlive: true },
            component: React.lazy(() => import('@/page/sys/metadata/Udc'))
          },
          {
            path: '/sys/metadata/setting',
            name: 'setting',
            meta: { title: '系统设置' },
            component: React.lazy(() => import('@/page/sys/metadata/Setting'))
          }
        ]
      },
      {
        path: '/sys/manage',
        name: 'manage',
        meta: { title: '系统管理' },
        routes: [
          {
            path: '/sys/manage/oauth2',
            name: 'oauth2',
            meta: { title: 'OAuth2管理' },
            component: React.lazy(() => import('@/page/sys/manage/OAuth2'))
          }
        ]
      },
      {
        path: '/sys/template',
        name: 'template',
        meta: { title: '模板管理' },
        routes: [
          {
            path: '/sys/template/rules',
            name: 'template_category',
            meta: { title: '模板分类' },
            component: React.lazy(
              () => import('@/page/sys/staticmanage/TemplateCategory')
            )
          },
          {
            path: '/sys/template/manage',
            name: 'template',
            meta: { title: '模板管理' },
            component: React.lazy(
              () => import('@/page/sys/staticmanage/TemplateManage')
            )
          }
        ]
      },
      {
        path: '/sys/message',
        name: 'message',
        meta: { title: '消息模板' },
        routes: [
          {
            path: '/sys/message/templateList',
            name: 'messageTemplateList',
            meta: { title: '消息模板列表' },
            component: React.lazy(
              () => import('@/page/message/MessageTemplate')
            )
          },
          {
            path: '/sys/message/topicList',
            name: 'messageTopicList',
            meta: { title: '消息主题列表' },
            component: React.lazy(() => import('@/page/message/MessageTopic'))
          }
        ]
      },
      {
        path: '/sys/pic',
        name: 'pic',
        meta: { title: '图片库管理' },
        routes: [
          {
            path: '/sys/pic/tag',
            name: 'picTag',
            meta: { title: '图片标签管理' },
            component: React.lazy(
              () => import('@/page/sys/staticmanage/PicTag')
            )
          },
          {
            path: '/sys/pic/manage',
            name: 'picManage',
            meta: { title: '图片管理' },
            component: React.lazy(
              () => import('@/page/sys/staticmanage/PicManage')
            )
          }
        ]
      }
    ]
  }
];

export default sysCenterRouters;
