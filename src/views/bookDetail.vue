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
          <div class="top">
            <img class="pic" :src="item.author.avatar || defaultImg" />
            <span>{{item.author.name}}</span>
          </div>
          <div class="info">{{item.content}}</div>
          <div class="bottom">
            
            <span>{{item.created_at | dateFormat}}</span>
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
          commentList:[],
          defaultImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA1hJREFUaAXtmE1oE0EUx5vPmqBiFEIFE0hKm3qTevDj4EUEoR48+IE9iKjQS6EnlVr8RG3pRaEggiAIgnoQETzUe0UP1oNQaJpC60UIShDxI0GS+BuhB5Odnd2ZtSu4C8Puznvv//7/N5PZzHR0BFdQgf+7AiEv5S8tLa2p1WqHQqHQgWazuQPsLbSPvL/lPh2Pxx/kcrnPXub0TECpVDpZr9cnIbdJRhAhP7BN9Pb2jvP8U+bnpt9YAJUOLywsPOR+xGliyL9OpVL70un0V6cxMr+wzOC0H/JTbsgLXPx3ViqVJ9wjTvPI/IxGgGnTz7SZlYGr+hmJY4VC4ZHKz85uNAKNRuOsHbjKxgicUfmo7EYCIDCgSqCw9y8vL29W+NiatQUsLi6mQV5ri+7AWK1W8w7cpC7aApg+OSmqO4MRjrYAOK5zx1PqbYRjIkDKaDUNgYDVrLZVrmAErKqymn3aI8DfgIoXRE1xtAVAfo7kNVMR0WhU7BW0L20BPT09Nf5KPNfOTCAFeNfd3V0ywdAWIJLGYrEJSDQMCIwbxP4ONRJA9d4g4LoOCeIem/6VFnmNBAgAptJlyDwVzy6uWXZkp134S12NBYgpxGZ9kAyvpFn+NLzHf8CL7aSANRYgQDhpqCLkMI/KjXokEjmRz+fLIs6LyxMBggjLodigKwWwBfXk+7Ei3jMBEBsGNLkCbHM/Z2NzbfJEQLFYPMo34arD7IPz8/MXHPoq3YxOJSAdhvwY8/8Sz66OSIi5m0wmRzKZjDjs0r60BXAetBXSd2h7dLMjYo74ob6+vpfaGG4DOf/cwPnnGHEjtJjb+FZ/RDTpu59IJMay2eyHVrvq3fEIcIjVyUZ+mIqdB3SjCljD/p2Ymyyzk3wcvziNVwqAcBjyxyF/BdCsU2BdP0bkE+0aIm5zVy7LtgIgvovlcQoy23UJGcQVGY0RhLyww7BcRql6iNXlIlWf8Ym84FygeNMsubfgE5WJsBwByN8gaFQW5EP/PVaqU1Z52wRwZLgb5TNiFKwCfOw7iIhnrfnbphDkh/5B8mL3NtRKXry3CaBvv5Wj330UdS+t7bdgJWC932Ql+ePlcrmz1damiH3uNqZRW39roA/vza6urm8+5A1SBhUIKvA3K/AL++gIHMVQO6sAAAAASUVORK5CYII='
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
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        &:last-child{
          border-bottom: none;
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
