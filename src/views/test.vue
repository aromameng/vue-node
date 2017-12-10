<template>
  <div class="test-view">
    <h4 class="c-title">{{title}}</h4>
    <div class="user" :style="{color:color}">
        <p>{{name}}</p>
        <p>{{age}}</p>
        <p>{{date}}</p>
    </div>
    <div class="pic">
        <img :src="pic" />
    </div>
    <div class="form">
        <div class="label"><span class="l-title">内容：</span>
             <quill-editor v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
            </quill-editor>
        </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
import {post_news} from 'api/index'
import { ImageImport } from 'js/ImageImport.js'
import { ImageResize } from 'js/ImageResize.js'
Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)

import {request_get} from 'js/request';

import axios from 'axios'

export default {
  data(){
      return{
          title: 'Mock测试',
          content:'',
          editorOption: {
            placeholder: "输入内容",
            modules: {
                toolbar: [
                [{ 'size': ['small', false, 'large'] }],
                ['bold', 'italic'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image']
                ],
                history: {
                delay: 1000,
                maxStack: 50,
                userOnly: false
                },
                imageImport: true,
                imageResize: {
                displaySize: true
                }
            }
        },
        name:'',
        age:'',
        color:'',
        date:'',
        pic:''
      }
  },
  computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
  },
  created(){
    
  },
  mounted(){
      // 使用mock模拟数据
      request_get('http://g.cn').then((res)=>{
          this.name=res.name;
          this.age=res.age;
          this.color=res.color;
          this.content=res.content;
          this.date=res.date;
          this.pic=res.pic;
      })
  },
  filters:{
    
  },
  methods:{
      onEditorBlur(editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        // console.log('editor ready!', editor)
      }
  }
}
</script>

<style lang="scss">
  .test-view{
      .form{
        .label{
           display: block;
           margin-bottom: 20px;
           .l-title{
               display:inline-block;
               line-height: 24px;
               vertical-align: top;                     
           } 
        }
        .ql-editor {
            min-height: 20em;
            padding-bottom: 1em;
            max-height: 25em;
                        
        }
        .html {
            height: 9em;
            overflow-y: auto;
            border: 1px solid #ccc;
            border-top: none;
            resize: vertical;
        }
        .submit{
            cursor: pointer;
            width: 80px;
        }       
      }  
  }
</style>
