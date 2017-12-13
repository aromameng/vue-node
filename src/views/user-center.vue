<template>
  <div class="user-center-view">
    <c-head></c-head>
    <div class="cp-scroll-content">      
      <img class="pic" :src="user.avatar || defaultImg" />   
      <p class="name">{{user.name}}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {get_user_info} from 'api/index'

export default {
  data(){
      return{
          user:'',
          userName:'',
          defaultImg: require("../assets/img/default.jpg"),
          lists:[]
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  route:{
      data(){
         
      }
  },
  created(){
       this.userName = this.$route.query.name;
       this.getUserInfo();
  },
  mounted(){
    
  },
  methods:{
    getUserInfo(){
        get_user_info(this.userName).then((res)=>{
            this.user = res.data;
        }).catch((err)=>{
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-center-view{
      text-align: center;
      .c-title{
          text-align: center;
      }
    .pic{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: inline-block;
        margin-top: 20px;
    }
    .name{
        font-size: 20px;
    }
  }
</style>
