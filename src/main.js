import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import filters from './filters';
import components from './components';
import Toast from './assets/js/toast';

import VueQuillEditor from 'vue-quill-editor';
import VeeValidate from 'vee-validate';
import store from './vuex'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/css/normalize.scss';
import './assets/css/common.scss';
import './assets/css/component.scss';

Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示

Vue.use(Toast);
Vue.use(VueQuillEditor)
Vue.use(VeeValidate)
Vue.use(iView);

// fastclick,解决移动端300ms延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body)
  }, false)
}

router.beforeEach((to, from, next) => {
  // 默认keepAlive为false
  if(!to.meta.keepAlive) to.meta.keepAlive = false;
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
