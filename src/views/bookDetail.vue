<template>
  <div class="news-detail-view">
    <c-head></c-head>
    <div class="cp-scroll-content">
      <h4 class="c-title">图书详情</h4>
      <h3 class="title">书名：{{bookInfo.title}}</h3>
      <p class="title">作者：{{bookInfo.author}}</p>
      <p class="time">出版日期：{{bookInfo.publish | dateFormat}}</p>
      <p>内容简介：</p>
      <div class="content" v-html="bookInfo.content"></div>
      <p class="s-title">评论：</p>
      <ul class="comment-list">
        <li v-for="(item,index) in commentList" :key="index">
          <div class="info">{{item.content}}</div>
          <div class="bottom">
            <span>作者：{{item.author.name}}</span>
            <span class="c-fr">{{item.created_at | dateFormat}}</span>
          </div>
        </li>
      </ul>
      <p class="s-title">添加评论：</p>      
      <div class="add-comment" v-if="isLogin">
        <textarea class="con" v-model="comment" rows="5"></textarea>
        <button @click="submit" class="submit">提交</button>
      </div>
      <div class="login-status" v-if="!isLogin">
          <p>你还没有登录，请<router-link to="/login">登录</router-link>页面进行评论</p>
      </div>
    </div>
  </div>
</template>

<script>

import {get_bookDetail,post_comment,get_comment} from 'api/index'
import {mapGetters} from 'vuex'


export default {
  data(){
      return{
          bookId:'',
          bookInfo:'',
          comment:'',
          commentList:[]
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  created(){
  	this.bookId=this.$route.params.id;
    this.getDetail();
    this.getComment();
  },
  methods:{
    getDetail(){
        get_bookDetail(this.bookId).then((res)=>{
          this.bookInfo=res.data;
        }).catch((err)=>{
          console.log(err)
        })
    },
    getComment(){
       get_comment(this.bookId).then((res)=>{
          this.commentList=res.data.result;
        }).catch((err)=>{
          console.log(err)
        })
    },
    submit(){
        if(!this.comment.trim()){
          return this.$Message.error('评论内容不能为空');
        }
        post_comment(this.bookId,this.userInfo._id,{content:this.comment}).then((res)=>{
           this.commentList.push({
             author:{
               _id:this.userInfo._id,
               name:this.userInfo.name
             },
             content:this.comment,
             created_at:res.data.created_at
           })
           this.comment='';
        }).catch((err)=>{
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
  .news-detail-view{
    .cp-scroll-content{
      line-height: 25px;
    }
    .content{
      color: #666;
      padding: 5px 0;
      text-align: left;
      text-indent: 2em;
      margin-bottom: 20px;
    }
    .title{
      font-size: 16px;
    }
    .s-title{
      line-height: 30px;
      font-size: 16px;
      border-left: 3px solid #2d8cf0;
      padding-left: 5px;
      margin-bottom: 10px;
    }
    .comment-list{
      &>li{
        padding: 5px 0;
        border-bottom: 1px solid #ccc;
        &:last-child{
          border-bottom: none;
        }
      }
      .bottom{
        color: #999;
        font-size: 12px;
      }
    }
    .add-comment{
      .con{
        width:60%;
      }
      .submit{
        display: block;
        width: 80px;
      }
    }
  }
</style>
