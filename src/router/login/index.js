/** @format */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: require('login/Login').default
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: require('login/Register').default
  },
  {
    path: '/password',
    name: 'password',
    meta: {
      title: '忘记密码'
    },
    component: require('login/password').default
  }
];
