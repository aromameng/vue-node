import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import filters from './filters';
import components from './components';
import mock from './mock';
import Toast from './assets/js/toast';

import VueQuillEditor from 'vue-quill-editor';
import VeeValidate from 'vee-validate';
import store from './vuex'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
