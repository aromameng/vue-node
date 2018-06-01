<template>
  <div class="news-view">
    <template v-if="userInfo && userInfo.isAdmin"> 
      <h4 class="c-title">图书列表</h4>
      <ul class="news-list">
        <li class="list-head">
          <span class="title c-text-left">标题</span>
          <span class="c-fr">
            <span class="time">更新时间</span>
            <span>操作</span>
          </span>
        </li>
        <li v-for="(item,index) in lists" :key="index">
          <router-link :to="{name:'addBook',query: { id: item._id }}" class="title c-text-left">{{item.title}}</router-link>       
          <span class="c-fr">
              <span class="time">{{item.created_at | dateFormat}}</span>	
              <span @click="del(item._id)" class="del">删除</span>
          </span>
        </li>
      </ul>
      <Page :total="totalNum" @on-change="changePage"></Page>
    </template>
    <Modal
        v-model="modal1"
        title="提示"
        @on-ok="sureDel">
        <p>确定要删除吗?</p>
    </Modal>
    <div class="cp-no-authority" v-if="!(userInfo && userInfo.isAdmin)">
        <span>你无权限访问该页面</span>
    </div>
  </div>
</template>

<script>
import {get_booklist,del_book} from 'api/index'
import {Modal,Page} from 'iview'
import {mapGetters} from 'vuex'

export default {
  data(){
      return{
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
    if(!this.userInfo) return this.$router.push({name:'login'})
  },
  activated(){
    this.getList();
  },
  filters:{
    substrContent:function(val){
      if(!val) return '';
      return val.substr(0,50);
    }
  },
  methods:{
    getList(){
      var params={
        page:this.page,
        rows:this.rows
      }
      get_booklist(params).then((res)=>{
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
      del_book(this.currId).then((res)=>{
        // console.log(res)       
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
  .news-list{
    &>li{
      border-bottom:1px solid #eee;
       height: 40px;
       line-height: 40px;
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
        height: 40px;
        @extend %ellipsis;
        vertical-align: middle;
        &:hover,&:focus{
          color: #004e31;
        }
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
