import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入全局自定义过滤器
import * as myFilters from "utils/filters";
console.log("myFilters", myFilters);
Object.keys(myFilters).forEach(key => {
  Vue.filter(key, myFilters[key]);
});

import "amfe-flexible"; //自适应方案
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
