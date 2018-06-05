<template>
  <div class="user-center-view">
    <c-head></c-head>
    <div class="cp-scroll-content">      
      <img class="pic" :src="user.avatar || defaultImg" />   
      <p class="name">{{user.name}}</p>
      <Button @click="chat()">聊天</Button>   
    </div>
    <div class="chat-dialog" v-show="chatShow">
      <div class="chat-head">{{userInfo.name}}</div>
      <div class="chat-inner">
        <ul class="chat-list">
          <li v-for="(item,index) in chatList" :key="index" class="message-list">
            <img class="pic" :src="defaultImg" />
            <span class="msg">{{item.content}}</span>
          </li>
        </ul>
      </div>
      <div class="chat-input">
        <textarea v-model="chatText"></textarea>
        <Button @click="send()">发送</Button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {get_user_info} from 'api/index'
import {Button} from 'iview'

export default {
  data(){
      return{
          user:'',
          userName:'',
          defaultImg: require("../assets/img/default.jpg"),
          lists:[],
          chatShow: false,
          chatText: '',
          chatList:[{

          }]
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
            this.$store.commit('SET_CHAT_USER',this.user);
        }).catch((err)=>{
          console.log(err)
        })
    },
    chat() {
      console.log(this.user)
      this.chatShow = true
    },
    send(){

    }
  }
}
</script>

<style lang="scss" scoped>
  .user-center-view{
      position: relative;
      height: 100%;
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
    .chat-dialog{
      position: absolute;
      width: 300px;
      height: 400px;
      background: #fff;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: column;
    }
    .chat-head{
      width: 100%;
      line-height: 40px;
      height: 40px;
      border-bottom: 1px solid #ccc;
    }
    .chat-inner{
      flex:1;
      overflow-y: atuo;
      .message-list{
        display: flex;
        .pic{
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .msg{
          display: inline-block;
          background: #ccc;
        }
      }
    }
    .chat-input{
      border-top: 1px solid #ccc;
      height: 100px;
    }
  }
</style>
