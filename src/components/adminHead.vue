<template>
  <div class="cp-head">
      <div class="head-inner">
          <router-link to="/"><img src="../assets/img/pic.jpg" class="logo" /></router-link>
          <ul class="menu">
              <li v-if="userInfo.isAdmin" :class="{'active':curMenu('addBook','adminBook')}">
                  <a class="menu-item" href="javascript:;">图书管理</a>
                  <div class="box">
                      <router-link :class="{'active':curMenu('adminNews')}" to="/admin/book" class="link">图书列表</router-link>
                      <router-link :class="{'active':curMenu('addNews')}" to="/admin/addBook" class="link">添加图书</router-link>
                  </div>
                  
              </li>
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
    curMenu(){
        let status=false;
        for(var i in arguments){
            if(this.$route.name==arguments[i]) return status=true;
        }
        return status;
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
            text-align: left;
            &>li{
                display:inline-block;
                padding-right:20px;
                position: relative;
                .menu-item{
                    width: 100%;
                    display: inline-block;
                    // min-width:60px;
                    height: 100%;
                    color: #8590a6;
                    &:hover{
                        color: #175199;
                    }
                }
                &.active{
                    .menu-item{
                        color: #175199;
                    }
                }
                .box{
                    display: none;
                    position: absolute;
                    top: 50px;
                    left: 0;
                    width: 150px;
                    &>a{
                        display: block;
                        line-height: 40px;
                        text-align: left;
                        background: #fff;
                        padding-left: 10px;
                        border-bottom: 1px solid #ccc;
                        color: #8590a6;
                        &:last-child{
                            border-bottom: none;
                        }
                        &.active{
                            color: #175199;
                        }
                    }
                }
                &:hover{
                    .box{
                        display: block;
                    }
                }
            }
        }
    }
</style>
