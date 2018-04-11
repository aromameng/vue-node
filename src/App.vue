<template>
    <transition name="router-fade" mode="out-in">     
      <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" class="view"></router-view>
        </keep-alive> 
        <router-view class="view" v-if="!$route.meta.keepAlive"></router-view>
      </div>     
    </transition>
</template>

<script>
export default {
  data(){
    return{
      title:'app',
      routeData:{}
    }
  },
  methods:{
    getRouteData() {
        return this.routeData;
    },
  }
}
</script>

<style lang="scss">
// @import './assets/css/normalize.scss';
// @import './assets/css/common.scss';
// @import './assets/css/component.scss';
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
