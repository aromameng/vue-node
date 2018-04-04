<template>
  <div class="admin-view">
    <admin-head></admin-head>
    <div class="cp-scroll-content">
        <div class="main-con" v-if="isLogin">
          <h4 class="c-title">个人中心</h4>
          <p>欢迎您！</p>
          <br/>
          <img :src="userInfo && userInfo.avatar || defaultImg" class="avatar" /><span class="name">{{userInfo && userInfo.name}}</span>
          <router-link  class="back" to="/">返回首页</router-link>
        </div>
       
    </div>
    <div class="cp-no-authority" v-if="!isLogin">
        <span>你无权限访问该页面，请</span><router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  data(){
      return{
          defaultImg: require("../../assets/img/default.jpg")
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo']),
    ...mapGetters('book',{
      count:'count'
    }),
    ...mapGetters('test',{
      count2:'count'
    })
  },
  created(){
    console.log('book',this.count)
    console.log('test',this.count2)
    if(!this.userInfo) return this.$router.push({name:'login'})
    // 调用book模块的getCount方法
    this.getCount();
    console.log('book',this.count)
    // 调用test模块的getCount方法
    this.$store.dispatch('test/getCount');
    console.log('test',this.count2)
  },
  mounted(){
    
  },
  methods:{
    ...mapActions('book', [
      'getCount'
    ])
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
