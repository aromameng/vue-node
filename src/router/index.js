import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import home from 'views/home'
import bookList from 'views/bookList'
import bookDetail from 'views/bookDetail'
import login from 'views/login'
import register from 'views/register'
import test from 'views/test'
import notFound from 'views/404'
import userCenter from 'views/userCenter'

// 后台
import addBook from 'views/admin/addBook'
import admin from 'views/admin/index'
import adminBook from 'views/admin/bookList'
import adminUser from 'views/admin/userList'
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
      component: bookList
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
      path: '/test',
      name: 'test',
      component: test
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
      },
  ]
})
