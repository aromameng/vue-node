import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import home from 'views/home'
import bookList from 'views/book-list'
import bookDetail from 'views/book-detail'
import login from 'views/login'
import register from 'views/register'
import notFound from 'views/404'
import userCenter from 'views/user-center'
import chat from 'views/chat'
// import other from 'views/other'
const other = r => require.ensure([], () => r(require('views/other')), 'other')
const test = r => require.ensure([], () => r(require('views/test')), 'test')
const io = r => require.ensure([], () => r(require('views/io')), 'io')


import adminRoute from './admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', 
      redirect: '/404',
      meta:{}
    },
    {
      path: '/404',
      name:'notFound',
      component:notFound,
      meta:{}
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        keepAlive: false
      }
    },
    {
      path: '/book',
      name: 'bookList',
      component: bookList,
      meta:{},
      children:[{
          path:'other',
          name:'other',
          component:other,
          meta:{}
        }]
      },
    {
      path: '/book/:id',
      name: 'bookDetail',
      component: bookDetail,
      meta:{}
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        title:'登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta:{
        title:'注册'
      }
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter,
      meta:{
        title:'个人主页'
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat,
      meta:{
        title:'聊天'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta:{
        title:'测试'
      }
    },
    {
      path: '/io',
      name: 'io',
      component: io,
      meta:{
        title:'io'
      }
    },
    // 后台页面路由
    ...adminRoute
  ]
})
