import {
  request_get,
  request_post,
  request_put
} from '@/assets/js/request'

const API_BOOK = '/api/book';
const API_USER = '/api/user'

import {isObject,isString,isNumber} from 'js/helper'

function parse(path,params){
  if (path.charAt(path.length - 1) === '/') path = path.substr(0, path.length - 1)
  if (isString(params)) return path + '/' + params
  if (isNumber(params)) return path + '/' + params
  if (isObject(params)) {
    if (/:[a-zA-Z]+/.test(path)) {
      for (var key in params) {
        path = path.replace(new RegExp(':' + key, 'g'), params[key])
      }
    } else {
      var search = '?'
      if (path.indexOf('?') > -1) {
        search = '&'
      }
      var counter = 0
      for (var key in params) {
        if (counter) search += '&'
        search += key + '=' + params[key]
        counter++
      }
      return path + search
    }
  }
  return path
}

// 获取图书列表
export const get_booklist = (data) => {
  const url = parse(API_BOOK,data);
  return request_get(url)
}

// 获取图书详情
export const get_bookDetail = (id) => {
  const url = `${API_BOOK}/${id}`
  return request_get(url)
}

// 提交图书
export const post_book = (data)=>{
  const url = `${API_BOOK}`
  return request_post(url,data)
}

// 修改图书
export const update_book = (id,data)=>{
  const url = `${API_BOOK}/${id}`
  return request_post(url,data)
}

// 删除图书
export const del_book = (id) =>{
  const url = `${API_BOOK}/remove/${id}`
  return request_get(url)
}

// 注册
export const user_reg = (data) =>{
  const url = `${API_USER}/register`
  return request_post(url,data)
}

// 登录
export const user_login = (data) =>{
  const url = `${API_USER}/login`
  return request_post(url,data)
}

// 退出登录
export const user_loginout = (data) =>{
  const url = `${API_USER}/loginout`
  return request_post(url,data)
}
