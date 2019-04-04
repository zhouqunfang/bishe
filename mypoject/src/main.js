// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import vuex from 'vuex'
import store from './store'
import '../src/assets/css/cssreset.css'
// 引入mockjs
import './mock.js'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);//全部引入
// import { Message, Button } from 'element-ui'
// mint ui 按需引入
import { Toast, Swipe, SwipeItem, Header, Button, Popup, Picker} from 'mint-ui' // 按需引入
import '../node_modules/mint-ui/lib/style.css'
import 'vue2-animate/dist/vue2-animate.min.css'
// npm px2rem-loader  lib-flexible --save
import 'lib-flexible/flexible.js'
import '../src/assets/js/time.js'
// import Mint from 'mint-ui'
// Vue.use(Mint);
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
// Vue.prototype.$message = Message
Vue.prototype.$toast = Toast // 导入样式
Vue.use(VueRouter)
Vue.prototype.$http = axios
Vue.use(vuex)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
