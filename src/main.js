import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// require("./mock"); mock接口数据

//引入全局自定义过滤器
import * as myFilters from "utils/filters";
Object.keys(myFilters).forEach((key) => {
  Vue.filter(key, myFilters[key]);
});

import "amfe-flexible"; //自适应方案
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
