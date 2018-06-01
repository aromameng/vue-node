
// 后台
import addBook from 'views/admin/add-book'
import admin from 'views/admin/index'
import adminBook from 'views/admin/book-list'
import adminUser from 'views/admin/user-list'
import adminHome from 'views/admin/home'

export default [
{
  path: '/admin',
  name: 'admin',
  components: {
    default: admin,
    home: adminHome
  },
  meta:{
    keepAlive:true
  },
  children:[
    {
      path: '/admin/home',
      name: 'adminHome',
      component: adminHome,
      meta:{}
    },
    {
      path: '/admin/book',
      name: 'adminBook',
      component: adminBook,
      meta:{
        subMenu:'book'
      }
    },
    {
      path: '/admin/user',
      name: 'adminUser',
      component: adminUser,
      meta:{}
  },{
    path: '/admin/addBook',
    name: 'addBook',
    component: addBook,
    meta:{
      subMenu:'book'
    }
  }]
}]