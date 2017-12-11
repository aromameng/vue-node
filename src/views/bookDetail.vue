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
      <p>评论：</p>
      <ul class="comment-list">
        <li>
          <div class="info">辅导辅导方法发</div>
          <div class="bottom">
            <span>作者：方法</span>
            <span class="c-fr">2017-02-24</span>
          </div>
        </li>
        <li>
          <div class="info">辅导辅导方法发</div>
          <div class="bottom">
            <span>作者：方法</span>
            <span class="c-fr">2017-02-24</span>
          </div>
        </li>
      </ul>
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

import {get_bookDetail} from 'api/index'
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
  },
  methods:{
    getDetail(){
        get_bookDetail(this.bookId).then((res)=>{
          this.bookInfo=res.data;
        }).catch((err)=>{
          console.log(err)
        })
    },
    submit(){

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
    }
    .title{
      font-size: 16px;
    }
    .comment-list{
      .info{
        text-indent: 2em;
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
