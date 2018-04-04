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
      <div class="book-pv">
        
      </div>
      <p class="s-title">评论：</p>
      <ul class="comment-list">
        <li v-for="(item,index) in commentList" :key="index">
          <div class="user-info" @click="goUserCenter(item)">
              <img class="pic" :src="item.author.avatar || defaultImg" />
              <span>{{item.author.name || '注销'}}</span>
          </div>
          <div class="info">{{item.content}}</div>
          <div class="bottom">         
            <span>{{item.created_at | dateFormat}}</span>
          </div>
        </li>
        <li class="cp-nodata" v-if="!commentList.length">暂无评论</li>
      </ul>
      <Page v-if="commentLen" :total="commentLen" size="small" @on-change="changePage"></Page>
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
import {Page} from 'iview'


export default {
  data(){
      return{
          bookId:'',
          bookInfo:'',
          comment:'',
          commentList:[],
          defaultImg: require("../assets/img/default.jpg"),
          commentLen:0,
          page:1,
          rows:10
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
  filters: {
      
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
       var params={
          page:this.page,
          rows:this.rows,
          bookId:this.bookId
       }
       get_comment(params).then((res)=>{
          this.commentList=res.data.result;
          this.commentLen = res.data.total;
        }).catch((err)=>{
          console.log(err)
        })
    },
    submit(){
        if(!this.comment.trim()){
          return this.$Message.info('评论内容不能为空');
        }
        post_comment(this.bookId,this.userInfo._id,{content:this.comment}).then((res)=>{
           this.commentList.unshift({
             author:{
               _id:this.userInfo._id,
               name:this.userInfo.name,
               avatar:this.userInfo.avatar
             },
             content:this.comment,
             created_at:res.data.created_at
           })
           this.comment='';
        }).catch((err)=>{
          console.log(err)
        })
    },
    changePage(page){
       this.page=page;
       this.getComment();
    },
    goUserCenter(item){
      if(!item.author._id) return
      this.$router.push({name:'userCenter',query:{name:item.author.name}});
    }
  }
}
</script>

<style lang="scss" scoped>
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
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        &:last-child{
          border-bottom: none;
        }
        .user-info{
          cursor: pointer;
        }
        .info{
          padding: 10px 0;
        }
        .pic{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
          background: #fff;
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
