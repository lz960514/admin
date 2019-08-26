import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import ElementUi from 'element-ui';

import "./assets/css/reset.css";

import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/font-awesome-4.7.0/css/font-awesome.css';

import http from './utils/http';

Vue.use(ElementUi);

Vue.config.productionTip = false;

Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
