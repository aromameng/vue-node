<template>
  <div class="chat-view">
    <c-head></c-head>
    <div class="cp-scroll-content">   
        <div class="chat-inner">
            <div class="head">{{chatUser.name}}</div>
            <ul class="chat-list">
                <li>
                    <span class="name">{{chatUser.name}}</span>
                    <span class="con">fdfee</span>
                </li>
                 <li>
                    <span class="name">{{chatUser.name}}</span>
                    <span class="con">fdfee</span>
                </li>
                 <li class="my">
                    <span class="name">{{userInfo.name}}</span>
                    <span class="con">333333官方供稿人让</span>
                </li>
            </ul>   
            <div class="bottom">
                <Input class="msg-input" v-model="message" type="textarea" :autosize="true" placeholder="请输入"></Input>
                <Button class="msg-btn" type="primary">发送</Button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {get_user_info} from 'api/index'
import {Button, Input} from 'iview'

export default {
  data(){
      return{
          user:'',
          userName:'',
          defaultImg: require("../assets/img/default.jpg"),
          chatList:[],
          message:''
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo','chatUser'])
  },
  route:{
      data(){
         
      }
  },
  created(){
       this.userName = this.$route.query.name;
       this.getChatList();
  },
  mounted(){
    
  },
  methods:{
    getChatList(){

    }
  }
}
</script>

<style lang="scss" scoped>
  .chat-view{
      position: absolute;
      height: 100%;
      width: 100%;
      .cp-scroll-content{
          height: 100%;
          padding-bottom: 0;
          .chat-inner{
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
          }
          .bottom{
            //   position: absolute;
              bottom: 10px;
              width: 100%;
              min-height: 40px;
              display: flex;
              flex:none;
              align-self: flex-end;
          }
          .msg-input,.msg-btn{
              display: inline-block;
          }
          .msg-btn{
              margin-left: 10px;
          }
          .head{
              width: 100%;
              flex:none;
              text-align: center;
              height: 40px;
              line-height: 40px;
              background: #fff;
              border-bottom: 1px solid #ccc;
          }
          .chat-list{
              background: #fff;
              width: 100%;
              flex:1;
              padding: 20px 10px;
              li{
                  margin-bottom: 20px;
              }
              .name{
                  width: 40px;
                  height: 40px;
                  line-height: 40px;
                  display: inline-block;
                  border-radius: 50%;
                  background: #ccc;
                  text-align: center;
                  vertical-align: top;
                  margin-top: -10px;
              }
              .con{
                  
              }
              .my{
                  text-align: right;
                  .name{
                      float: right;
                      margin-left: 10px;
                      
                  }
              }
          }
      }
  }
</style>
