import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
// 使用者
import user from "./modules/user.js";
import login from "./modules/login.js";
import pageNotFound from "./modules/pageNotFound.js";

Vue.use(VueRouter);

const routes = [...login, ...user, ...pageNotFound];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const isAuthRoute = to.name === "login" || to.name === "rootLogin";

  if (isAuthRoute && isAuthenticated) {
    next({ path: "/users", replace: true });
  } else if (!isAuthRoute && !isAuthenticated) {
    next({ name: "login", replace: true });
  } else {
    next();
  }

});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
