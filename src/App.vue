<template>
  <div id="app">
    <router-view class="view" />
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:'app'
    }
  },
  methods:{

  }
}
</script>

<style lang="scss">
@import './assets/css/normalize.scss';
@import './assets/css/common.scss';
@import './assets/css/component.scss';
</style>
