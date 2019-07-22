export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    dynamic: true,
    routes: [
      // admin首页

      {
        path: '/reportforms',
        name: 'home',
        icon: 'dashboard',
        component: './Dashboard/Analysis',
        authority: ['admin'],
        dynamic: true,
      },
      // admin 能力管理首页
      {
        path: '/systemRole',
        icon: 'form',
        name: 'powerManage',
        hideChildrenInMenu: false,
        authority: ['admin'],
        dynamic: true,
        routes: [
          {
            path: '/systemRole/list',
            name: 'index',
            component: './Forms/PowerList',
          },
          {
            path: '/systemRole/update',
            name: 'analysis',
            component: './Forms/Analysis',
          },
          {
            path: '/systemRole/edit',
            name: 'edit',
            component: './Forms/AddPower',
          },
        ],
      },
      // 客户管理首页customerIndex
      {
        path: '/reportforms',
        icon: 'table',
        name: 'customerManage',
        hideChildrenInMenu: false,
        authority: ['admin'],
        dynamic: true,
        routes: [
          { path: '/reportforms', redirect: '/customerIndex/table-list' },
          {
            path: '/reportforms/list',
            name: 'edit',
            component: './List/TableList',
          },
          {
            path: '/reportforms/update',
            name: 'analysis',
            component: './List/BasicList',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
