<template>
  <div class="admin-view" :class="{'user-view': !userInfo.isAdmin}">
    <admin-head></admin-head>
    <Menu ref="menu" v-if="userInfo.isAdmin"></Menu>
    <div class="cp-scroll-content">
      <transition>
           <keep-alive>
            <router-view class="view_main"></router-view>     
          </keep-alive> 
      </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import Menu from 'components/Menu.vue';

export default {
  data(){
      return{
          defaultImg: require("../../assets/img/default.jpg")
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  components:{
    Menu
  },
  activated(){
    if(this.$route.name == 'admin' && this.userInfo.isAdmin ){
      // console.log(this.userInfo)
      this.$nextTick(()=>{
        this.$router.push({name:'adminBook'})
      })
    }else{
      this.$nextTick(()=>{
        this.$router.push({name:'adminHome'})
      })
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .admin-view{
    position: relative;
    display:table;
    width: 100%;
    height: 100%;
    .cp-scroll-content{
      width: 100%;
      padding:50px 0 0 200px; 
      .view_main{
        padding: 20px;
      }
    }
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
    &.user-view{
      .cp-scroll-content{
          width: 1000px;
          margin: 0 auto;
      }
    }
  }
</style>
