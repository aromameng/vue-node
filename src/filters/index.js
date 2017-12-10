import Vue from 'vue';

/*
 * 时间格式化
 * Usage: '2017-04-12 16:03' => '2017-04-12'
 */
Vue.filter('dateFormat', function(value) {
  if (!value) return;
  return value.toString().substr(0, 10);
});
