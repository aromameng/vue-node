<template>
  <div class="cp_menu">
    <Menu ref="menu" :theme="theme2" @on-select="selected" mode="vertical" width="200px" :open-names="curSubMenu()" :active-name="curMenu()">
        <Submenu name="book">
            <template slot="title">
                <Icon type="ios-paper"></Icon>
                图书管理
            </template>
            <MenuItem name="adminBook" path="/admin/book">图书列表</MenuItem>
            <MenuItem name="addBook" path="/admin/addBook">增加图书</MenuItem>
            <!-- <MenuItem name="1-3">举报管理</MenuItem> -->
        </Submenu>
        <MenuItem name="adminUser" path="/admin/user" >
            <Icon type="ios-people"></Icon>
            用户管理
        </MenuItem>
    </Menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {user_loginout} from 'api/index'
import {Menu, Submenu, MenuItem } from 'iview'

export default {
  data () {
    return {
      theme2: 'light'
    }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  activated(){
    // console.log(this.$route.name)
  },
  methods:{
    selected(name){
      this.$router.push({name:name})
    },
    curMenu(){
      return this.$route.name
    },
    curSubMenu(){     
      if(this.$route.meta && this.$route.meta.subMenu){
        return [this.$route.meta.subMenu]
      }
      return []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .cp_menu{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      .ivu-menu{
        height: 100%;
      }
    }
</style>
