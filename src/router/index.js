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

// 后台
import addBook from 'views/admin/add-book'
import admin from 'views/admin/index'
import adminBook from 'views/admin/book-list'
import adminUser from 'views/admin/user-list'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*', 
      redirect: '/404',
      
    },
    {
      path: '/404',
      name:'notFound',
      component:notFound
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/book',
      name: 'bookList',
      component: bookList,
      children:[{
          path:'other',
          name:'other',
          component:other
        }]
      },
    {
      path: '/book/:id',
      name: 'bookDetail',
      component: bookDetail
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
      path: '/admin/addBook',
      name: 'addBook',
      component: addBook
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/admin/book',
      name: 'adminBook',
      component: adminBook
     },
     {
       path: '/admin/user',
       name: 'adminUser',
       component: adminUser
      }
  ]
})
