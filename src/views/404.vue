<template>
  <div class="not-found-view">
      <div class="inner">
          <h2>404</h2>
          <p>页面找不到了</p>
          <router-link to="/" class="link">返回首页</router-link>
      </div>
      
  </div>
</template>

<script>

export default {
  data(){
      return{
         
      }
  },
  created(){
    
  },
  mounted(){
    
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
  .not-found-view{
    text-align: center;
    background: #eff2f5;
    padding-top: 300px;
  }
  .inner{
    width: 400px;
    padding: 2em 1.25em;
    border: 1px solid #babbbc;
    border-radius: 5px;
    background: #f7f7f7;
    text-align: center;
    margin: 0 auto;
  }
</style>
