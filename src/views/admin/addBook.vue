<template>
  <div class="addnews-view">
    <admin-head></admin-head>
    <div class="cp-scroll-content">
        <h4 class="c-title">{{title}}</h4>
        <div class="form">
            <div class="label">
                <span class="label-span">书名：</span>
                <input v-validate="'required'" name="title" type="text" class="input-text" v-model="book_title" /> 
                <span class="c-error" v-show="errors.has('title')">书名不能为空</span>
            </div>         
            <div class="label">
                <span class="label-span">作者：</span>
                <input type="text" v-validate="'required'" class="input-text" name="author" v-model="author" />
                <span class="c-error" v-show="errors.has('author')">作者不能为空</span>
            </div>
            <div class="label">
                <span class="label-span">出版日期：</span>
                <DatePicker type="date" format="yyyy-MM-dd" v-validate="'required'" name="publish" v-model="publish" placeholder="请选择" style="width: 200px"></DatePicker>
                <span class="c-error" v-show="errors.has('publish')">出版日期不能为空</span>
            </div>
            <div class="label"><span class="label-span">简介：</span>
                <quill-editor v-model="content"
                      :options="editorOption" >
                </quill-editor>
            </div>

            <div class="label"><button class="submit" @click="submit()">提交</button></div>
        </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
import {post_book,get_bookDetail,update_book} from 'api/index'
import { ImageImport } from 'js/ImageImport.js'
import { ImageResize } from 'js/ImageResize.js'
Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)
import {Modal,DatePicker} from 'iview'

export default {
  data(){
      return{
          title: '增加图书',
          newsId:'',
          book_title:'',
          content:'',
          publish:'',
          author:'',
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
      }
  },
  computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
  },
  created(){
    this.newsId=this.$route.query.id;
    if(this.newsId){
        this.title='修改图书';
        this.getDetail();
    }
  },
  mounted(){
    
  },
  filters:{
    
  },
  methods:{
      submit(){        
        if( !this.book_title){
            return this.$toast('书名不能为空！')
        }
        if(!this.author){
            return this.$toast('作者不能为空！')
        }
        if(!this.publish){
            return this.$toast('出版日期不能为空！')
        }
        if(!this.content){
            return this.$toast('简介不能为空！')
        }
        var params={
            author: this.author,
            title: this.book_title,
            publish:this.publish,
            content: this.content
         }
        if(this.newsId) return this.updateBook(params);
        post_book(params).then((res)=>{
            let msg='增加成功！';
            this.$toast(msg);
            setTimeout(()=>{
                this.$router.push({name: 'adminBook'});
            },1000)
        }).catch((err)=>{
            console.log(err)
        })
      },
      updateBook(params){
           update_book(this.newsId,params).then((res)=>{
                this.$toast('修改成功!');
                setTimeout(()=>{
                    this.$router.push({name: 'adminBook'});
                },1000)
            }).catch((err)=>{
                console.log(err)
            })
      },
      getDetail(){
          get_bookDetail(this.newsId).then((res)=>{
              this.book_title = res.data.title;
              this.author = res.data.author;
              this.content = res.data.content;
          },(err)=>{
              console.log(err)
          })
      }
  }
}
</script>

<style lang="scss">
  .addnews-view{
      .form{
        .label{
           display: block;
           margin-bottom: 20px;
           .label-span{
               display:inline-block;
               line-height: 24px;
               vertical-align: top;                     
           }
           input{
               font-size: 14px;
           }
           .input-text{
               width: 240px;
           }
        }
        .submit{
            cursor: pointer;
            width: 80px;
        }
        .c-error{
            padding-left: 10px;
        }
      }
    .editor-example {
         width: 90%;
        border: 1px solid #999;
         margin-top: 10px;
         border-radius: 2px;
    }
    .ql-container .ql-editor {
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
  }
</style>
