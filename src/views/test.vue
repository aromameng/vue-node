<template>
  <div class="test_view">
    <c-head></c-head>
    <div class="cp-scroll-content">
      <router-link to="/">返回</router-link>
      <h4 class="c-title">{{title}}</h4>
        <keep-alive>
            <component :is="currentView"></component>
        </keep-alive>
      <keep-active-test2></keep-active-test2>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { getNewArray } from 'js/utils'
import keepActiveTest from 'components/keep-ative-test.vue'
import keepActiveTest2 from 'components/keep-ative-test2.vue'

/*
  这里的keep-alive 不会生效，只会控制子组件activated、deactivated的生效，对created/mounted都无效
  还需要待验证
*/

export default {
  data(){
      return{
          currentView:'keepActiveTest',
          title: '测试',
          username:'',
          lists:[]
      }
  },
  components:{
    keepActiveTest,
    keepActiveTest2
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  beforeRouteEnter(to, from, next){
    next()
  },
  created(){
    console.log('created')
  },
  mounted(){
    console.log('mounted')    
  },
  activated(){
    console.log('activated')   
  },
  deactivated(){
    console.log('deactivated')   
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
  
</style>
