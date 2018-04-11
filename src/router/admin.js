
// 后台
import addBook from 'views/admin/add-book'
import admin from 'views/admin/index'
import adminBook from 'views/admin/book-list'
import adminUser from 'views/admin/user-list'

export default [{
  path: '/admin/addBook',
  name: 'addBook',
  component: addBook,
  meta:{}
},
{
  path: '/admin',
  name: 'admin',
  component: admin,
  meta:{
    keepAlive:false
  }
},
{
  path: '/admin/book',
  name: 'adminBook',
  component: adminBook,
  meta:{}
 },
 {
   path: '/admin/user',
   name: 'adminUser',
   component: adminUser,
   meta:{}
}]