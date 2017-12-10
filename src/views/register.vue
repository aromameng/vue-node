<template>
  <div class="login-view">
    <c-head></c-head>
    <div class="cp-scroll-content">
        <h4 class="c-title">{{$route.meta.title}}</h4>
        <form class="login-form">
            <div class="label">
                <span class="l-title">用户名：</span><input type="text" v-model="user" />
            </div>
            <div class="label">
                <span class="l-title">密码：</span><input type="password" v-model="password" />
            </div>
            <div class="label">
                <button @click="register()">注册</button>
            </div>
        </form>
        <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>

import {user_reg} from 'api/index'

export default {
  data(){
      return{
          user:'',
          password:''
      }
  },
  created(){
      
  },
  mounted(){

    
  },
  methods:{
      register(){
          var that=this;
          if(!this.user){
              return this.$toast('用户名不能为空！');
          }
          if(!this.password){
              return this.$toast('密码不能为空！');
          }
          const user={
              name:this.user,
              password:this.password
          }
          user_reg(user).then((res)=>{
            //   console.log(res)
              this.$toast('注册成功！');
              var data={
                    status:true,
                    userInfo:res.data
                }
              this.$store.commit('SET_LOGIN',data);
              setTimeout(()=>{
                  that.$router.push({name: 'home'});
              },1000)
          },(msg)=>{
              this.$toast(msg);
          })
      }
  }
}
</script>

<style lang="scss">
  .login-view{
    .login-form{
        .label{
            margin-bottom: 15px;
            input{
                display: inline-block;
                width: 200px;
                line-height:28px;
                border: 1px solid #eee;
            }
            button{
                display: inline-block;
                width: 100px;
                line-height: 30px;
                width: 90px;
                cursor: pointer;
            }
        }
        .l-title{
            display: inline-block;
            width: 80px;
            text-align: right;
        }
        
    }
  }
</style>
