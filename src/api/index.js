import {
  request_get,
  request_post,
  request_put
} from '@/assets/js/request'

const API_BOOK = '/api/book';
const API_USER = '/api/user'
const API_COMMENT = '/api/comment'

import {isObject,isString,isNumber,parse} from 'js/helper'

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

// 获取图书列表
export const get_booklist = (data) => {
  const url = parse(API_BOOK,data);
  return request_get(url)
}

// 获取最新发版的图书列表
export const get_newbooklist = (data) => {
  const url = `${API_BOOK}/new10`
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

// 获取图书评论
export const get_comment = (id) => {
  const url = `${API_COMMENT}/${id}`
  return request_get(url)
}

// 提交评论
export const post_comment = (bookId,authorId,data)=>{
  const url = parse(`${API_COMMENT}/add/${bookId}/${authorId}`,data) 
  return request_post(url,data)
}
