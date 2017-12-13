<template>
  <div class="news-view">
    <admin-head></admin-head>
    <div class="cp-scroll-content" v-if="userInfo.isAdmin">
      <h4 class="c-title">用户列表</h4>
      <ul class="user-list">
        <li class="list-head">
          <span class="title c-text-left">用户名</span>
          <span class="c-fr">
            <span>是否管理员</span>
            <span class="time">创建时间</span>
            <span>操作</span>
          </span>
        </li>
        <li v-for="(item,index) in lists" :key="index">
          <span><img class="pic" :src="item.avatar || defaultImg" />{{item.name}}</span>       
          <span class="c-fr">
              <span>{{item.isAdmin | isAdmin}}</span>	
              <span class="time">{{item.created_at | dateFormat}}</span>	
              <span @click="del(item._id)" class="del">删除</span>
          </span>
        </li>
      </ul>
      <Page :total="totalNum" @on-change="changePage"></Page>
    </div>
    <Modal
        v-model="modal1"
        title="提示"
        @on-ok="sureDel">
        <p>确定要删除吗?</p>
    </Modal>
    <div class="cp-no-authority" v-if="!userInfo.isAdmin">
        <span>你无权限访问该页面</span>
    </div>
  </div>
</template>

<script>
import {del_user,get_user} from 'api/index'
import {Modal,Page} from 'iview'
import {mapGetters} from 'vuex'

export default {
  data(){
      return{
          defaultImg: require("../../assets/img/default.jpg"),
          lists:'',
          modal1:false,
          currId:'',
          page:1,
          rows:10,
          totalNum:0
      }
  },
  computed: {
      ...mapGetters(['userInfo'])
  },
  created(){
    
  },
  mounted(){
    this.getList();
  },
  filters:{
    isAdmin:function(val){
      return val ? '是' : '否'
    }
  },
  methods:{
    getList(){
      var params={
        page:this.page,
        rows:this.rows
      }
      get_user(params).then((res)=>{
        this.lists=res.data.result;
        this.totalNum=res.data.total;       
      }).catch((err)=>{
        console.log(err)
      })
    },
    changePage(page){
       this.page=page;
       this.getList();
    },
    del(id){
      this.currId=id;
      this.modal1=true;
    },
    sureDel(){
      del_user(this.currId).then((res)=>{     
        this.getList();
        this.$toast('删除成功！');
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
   @import '../../assets/css/mixin.scss';
  .user-list{
    &>li{
      border-bottom:1px solid #eee;
       height: 60px;
       line-height: 60px;
       overflow: hidden;
       span{
        display: inline-block;
        min-width: 80px;
        text-align: center;
      }
      .title{
        width: 700px;
        overflow: hidden;
        display: inline-block;
        color: #009a61;
        height: 60px;
        @extend %ellipsis;
        vertical-align: middle;
        &:hover,&:focus{
          color: #004e31;
        }
      }
      .pic{
          width: 40px;
          height: 40px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          border-radius: 50%;
      }
    }
    .list-head{
      span{
        color: #666;
        font-size: 14px;
      }
    }
    .time{
      color:#999;
      font-size: 14px;
      width: 120px;
    }
    .del{
      color: #999;
      cursor: pointer;
      font-size: 13px;
      &:hover{
        color:red;
      }
    }
  }
  .ivu-page{
    margin-top: 20px;
    text-align: center;
  }
</style>
