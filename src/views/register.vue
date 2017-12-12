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
                <span class="l-title">头像：</span>
                <div class="avatar">
                    <img v-show="pic" class="pic" :src="pic" />
                    <span class="upload"><input type="file" @change="upload($event)" />点击上传</span>                   
                </div>
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

import {user_reg,uploadimg} from 'api/index'

export default {
  data(){
      return{
          user:'',
          password:'',
          pic:'',
          file:''
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
              return this.$Message.info('用户名不能为空！');
          }
          if(!this.password){
              return this.$Message.info('密码不能为空！');
          }
          if(!this.file){
              return this.$Message.info('头像不能为空！');
          }
          const user={
              name:this.user,
              password:this.password,
              avatar:this.pic
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
      },
      getFullPath(file){
            window.URL = window.URL || window.webkitURL;
            if (window.URL && window.URL.createObjectURL) {
                return window.URL.createObjectURL(file);
            } else {
                return null;
            }
      },
      upload(event){
          this.file = event.target.files[0];
        //   this.pic = this.getFullPath(this.file);
          var fData = new FormData();
          fData.append('file', this.file);
          uploadimg(fData).then((res)=>{
              this.pic=res.data;
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
            input[type=file]{
                background: none;
                border-width: 0;
                border-radius: 0;
                box-shadow: none;
                &:active,&:hover{
                    border: none;
                }
            }
        }
        .l-title{
            display: inline-block;
            width: 80px;
            text-align: right;
        }    
        .avatar{
            display: inline-block;
            .upload{
                position: relative;
                display: inline-block;
                width: 80px;
                height: 30px;
                line-height:30px;
                text-align: center;
                vertical-align: bottom;
                border: 1px solid #ccc;
                cursor: pointer;
                &>input{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    opacity: 0;
                    cursor: pointer;
                    z-index: 1;
                }
            }
            .pic{
                width: 80px;
                height: 80px;
                display: inline-block;
                vertical-align: middle;
            }
        }   
    }
    
  }
</style>
