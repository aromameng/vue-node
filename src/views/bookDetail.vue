<template>
  <div class="news-detail-view">
    <c-head></c-head>
    <div class="cp-scroll-content">
      <h4 class="c-title">图书详情</h4>
      <h3 class="title">{{bookInfo.title}}</h3>
      <p class="time">{{bookInfo.created_at | dateFormat}}</p>
      <div class="content" v-html="bookInfo.content"></div>
    </div>
  </div>
</template>

<script>

import {get_bookDetail} from 'api/index'

export default {
  data(){
      return{
          bookId:'',
          bookInfo:''
      }
  },
  created(){
  	this.bookId=this.$route.params.id;
  	get_bookDetail(this.bookId).then((res)=>{
      console.log(res)
      this.bookInfo=res.data;
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style lang="scss">
  .news-detail-view{
    .cp-scroll-content{
      text-align: center;
    }
    .c-title{
      text-align: left;
    }
    .content{
      color: #666;
      line-height: 26px;
      padding: 15px 0;
      text-align: left;
      text-indent: 2em;
    }
    .time{
      color: #999;
    }
    .title{
      font-size: 16px;
      line-height: 40px;
    }
  }
</style>
