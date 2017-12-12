<template>
  <div class="admin-view">
    <admin-head></admin-head>
    <div class="cp-scroll-content">
        <div class="main-con" v-if="isLogin">
          <h4 class="c-title">个人中心</h4>
          <p>欢迎您！</p>
          <br/>
          <img :src="userInfo && userInfo.avatar" class="avatar" /><span class="name">{{userInfo && userInfo.name}}</span>
          <router-link  class="back" to="/">返回首页</router-link>
        </div>
       
    </div>
    <div class="cp-no-authority" v-if="!isLogin">
        <span>你无权限访问该页面，请</span><router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){
      return{
          
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  created(){

  },
  mounted(){
    
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
  .admin-view{
      .no-authority{
        width: 100%;
        text-align: center;
        padding-top: 200px;
      }
      .back{
        font-size: 16px;
        margin-top: 10px;
        display: block;
      }
      .avatar{
        width: 60px;
        height: 60px;
        display: inline-block;
      }
      .name{
         display: inline-block;
         padding-left: 10px;
      }
  }
</style>
