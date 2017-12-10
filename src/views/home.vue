<template>
  <div class="home-view">
    <c-head></c-head>
    <div class="cp-scroll-content">
      <h4 class="c-title">{{title}}</h4>  
      <router-link to="/book" class="link clearfix">图书列表</router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){
      return{
          title: '首页',
          username:''
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
  }
</style>
