<template>
  <div class="news-view">
     <c-head></c-head>
    <div class="cp-scroll-content">
      <h4 class="c-title">图书列表</h4>
      <router-link to="/book/other">跳转</router-link>
      <ul class="news-list">
        <li v-for="(item,index) in lists" :key="index">
          <router-link :to="{name:'bookDetail',params: { id: item._id }}" class="title">{{item.title}}</router-link>        
          <div class="content" v-html="item.content">
          </div>   		 
          <span class="time">{{item.created_at | dateFormat}}</span>       
        </li>
      </ul>
      <Page :total="totalNum" @on-change="changePage"></Page>
      
    </div>
    <transition name="router-slid">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>
import {get_booklist} from 'api/index'
import {Modal,Page} from 'iview'

export default {
  data(){
      return{
          lists:'',
          page:1,
          rows:10,
          totalNum:0
      }
  },
  created(){
    
  },
  mounted(){
    this.getList();
  },
  filters:{
    substrContent:function(val){
      if(!val) return '';
      return val.substr(0,50);
    }
  },
  methods:{
    getList(){
      var params={
        page:this.page,
        rows:this.rows
      }
      get_booklist(params).then((res)=>{
        this.lists=res.data.result;
        // 截取字数
        this.lists.map((item)=>{
          item.content=item.content.substr(0,50);
        })
      }).catch((err)=>{
        console.log(err)
      })
    },
    changePage(page){
       this.page=page;
       this.getList();
    }
  }
}
</script>

<style lang="scss" scoped>
  .news-list{
    &>li{
      border-bottom:1px solid #eee;
      padding:20px 0;
      .title{
        color: #009a61;
        &:hover,&:focus{
          color: #004e31;
        }
      }
      .content{
        color: #666;
      }
    }
    .time{
      color:#999;
    }
    .del{
      color: #999;
      cursor: pointer;
      font-size: 12px;
      &:hover{
        color:red;
      }
    }
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translateX(100%);
  }
</style>
