<template>
  <div class="io-view">
    <c-head></c-head>
    <div class="cp-scroll-content">
      tttt
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data(){
      return{
          title: '其他',       
      }
  },
  computed: {
    ...mapGetters(['isLogin','userInfo'])
  },
  created(){
    socket.emit('my other event', { my: 'data2233' })
  },
  mounted(){
    
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
  .io-view{
      
  }
</style>
