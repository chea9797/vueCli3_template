import Vue from "vue";
import VueRouter from "vue-router";

/* 路由懒加载 */
const Index = () => import("views/Index.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index
  }
];

const router = new VueRouter({
  routes
});

export default router;
