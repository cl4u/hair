/*
 * @Description:
 * @Author: rk
 * @Date: 2020-11-09 11:27:31
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd, { message } from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import "./assets/scss/index.scss";
import axios from "axios";

import {
  Menu,
  Submenu,
  MenuItem,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css"

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);

Vue.config.productionTip = false
Vue.use(Antd);

message.config({
  top: "60px",
  duration: 2,
  maxCount: 1,
});

Vue.prototype.$axios = axios;

Vue.prototype.$message = message;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
