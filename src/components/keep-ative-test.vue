<template>
  <div class="keep-ative-test">
      <p>keep-active测试——{{title}}</p>
      <ul>
        <li v-for="item of lists" :key="item.id">{{item.name}}</li>
      </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name:'keepActiveTest',
  data () {
    return {
      title:'hello world',
      lists:[{
        id:1,
        name:'语文'
      },{
        id:2,
        name:'数学'
      }]
    }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  methods:{
    
  },
  beforeRouteEnter(to, from, next){
    next()
  },
  created(){
    console.log('1------created-------',this.title)
    this.title = 'world is so large';
  },
  mounted(){
    console.log('1------mounted-----')        
  },
  activated(){
    console.log('1------activated')   
  },
  deactivated(){
    console.log('1------deactivated')   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
