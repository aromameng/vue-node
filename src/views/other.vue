<template>
  <div class="other-view">
    <!-- <c-head></c-head> -->
    <div class="cp-scroll-content">
      <h4 class="c-title">{{title}}</h4>
      <!-- <router-link to="/book" class="link clearfix">图书列表</router-link> -->
      <section class="section">
        <div class="home-title">新书速递</div>     
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
          title: '其他',
          username:'',
          lists:[]
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  beforeRouteEnter(to, from, next){
    next()
  },
  created(){
    console.log('created=====',this.title)
    this.title='其他222'
  },
  mounted(){
    console.log('mounted')    
  },
  activated(){
    console.log('activated')   
  },
  deactivated(){
    console.log('deactivated')   
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
  .other-view{
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: #fff;
      .cp-scroll-content{
        padding: 60px 20px;
      }
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
