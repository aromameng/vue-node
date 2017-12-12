<template>
  <div class="cp-head">
      <div class="head-inner">
          <router-link  to="/"><img src="../assets/img/pic.jpg" class="logo" /></router-link>
          <ul class="menu">
              <li :class="{'active':curMenu('home')}"><router-link  to="/">首页</router-link></li>
              <li :class="{'active':curMenu('book')}"><router-link  to="/book">图书</router-link></li>
          </ul>
          <div class="user-info"  v-if="!isLogin">
              <router-link to="/register" class="link">注册</router-link>
              <router-link to="/login" class="link">登录</router-link>
          </div>
          <div class="user-info" v-if="isLogin">
              <span>{{userInfo && userInfo.name}}</span>
              <router-link to="/admin" class="person">个人中心</router-link>
              <span class="btn" @click="loginout">退出登录</span>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {user_loginout} from 'api/index'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  methods:{
    loginout(){
      let _id=this.userInfo._id;
      user_loginout({_id:_id}).then((res)=>{
         var data={
              status:false,
              userInfo:res.data
          }
         this.$store.commit('SET_LOGIN',data);
      })
    },
    curMenu(name){
        return this.$route.name==name;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .cp-head{
        position: fixed;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        background: #fff;
        width: 100%;
        z-index: 2;
        .head-inner{
            width: 1000px;
            margin: 0 auto;
            vertical-align: middle;
        }
        .user-info{
            float: right;
            .person{
                display: inline-block;
                margin: 0 10px;
            }
            .link{
                display: inline-block;
                padding: 0 10px;
                color: #999;
            }
        }
        .btn{
            cursor: pointer;
            color: #999;
        }
        .logo{
            width: 40px;
            height: 40px;
            display: inline-block;
            margin-top: 5px;
            vertical-align: middle;
        }
        .menu{
            display:inline-block;
            vertical-align: middle;
            padding: 0 10px;
            
            &>li{
                display:inline-block;
                padding: 0 20px;
                text-align: center;
                a{
                    color: #8590a6;
                    &:hover{
                        color: #175199;
                    }
                }
                &.active{
                    a{
                        color: #175199;
                    }
                }
            }
        }
    }
</style>
