<template>
  <div class="home-view">
    <c-head></c-head>
    <div class="cp-scroll-content">
      <h4 class="c-title">{{title}}</h4>  
      <!-- <router-link to="/book" class="link clearfix">图书列表</router-link> -->
      <section class="section">
        <div class="home-title">新书速递</div>
        <ul class="new-list">
          <li v-for="(item,index) in lists" :key="index">
            <router-link :to="{name:'bookDetail',params:{id: item._id}}">
              <span>{{item.title}}</span>
            </router-link>
          </li>
        </ul>
        <router-link to="/book">查看更多>></router-link>
        <router-link to="/test">测试>></router-link>
      </section>    
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {get_newbooklist} from 'api/index'

export default {
  data(){
      return{
          title: '首页',
          username:'',
          lists:[]
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  created(){
    this.getNewBook();
  },
  mounted(){
    
  },
  methods:{
    getNewBook(){
      get_newbooklist().then((res)=>{
        this.lists=res.data.result;      
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-view{
    .link{
      line-height: 36px;
      display: block;
      border-bottom: 1px dashed #ccc;
      width: 200px;
      color: #009a61;
    }
    .test{
      margin-top: 40px;
    }
    .home-title{
      line-height: 30px;
      font-size: 16px;
      border-left: 3px solid #2d8cf0;
      padding-left: 5px;
    }
    .new-list{
      width: 240px;
      line-height: 30px;
      li{
        border-bottom: 1px solid #ccc;
      }
      a{
        color: #2d8cf0;
      }
    }
  }
</style>
