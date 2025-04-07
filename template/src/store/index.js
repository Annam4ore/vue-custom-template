import Vue from "vue";
import Vuex from "vuex";
import { http } from "@/utils/http";
import { getItem, setItem, removeItem } from "@/utils/storage";
import router from "@/router";
import snackbar from "./modules/snackbar";
import errorLog from "./modules/errorLog";

export const TOKEN = 'VEA-TOKEN'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: null,
    authorization: getItem(TOKEN),
    refreshToken: ''
  },
  getters: {
    userinfo: (state) => state.userinfo,
    isAuthenticated: (state) => !!state.authorization,
  },
  mutations: {
    // token & userinfo
    SET_TOKEN(state, payload) {
      state.authorization = payload;
      // 保存到sesstionStorage
      setItem(TOKEN, payload);
    },
    CLEAR_TOKEN(state, payload) {
      state.authorization = "";
      removeItem(TOKEN);
      router.push("/login");
    },
    SET_USER(state, payload) {
      state.userinfo = payload;
    },
    CLEAR_USER(state, payload) {
      state.userinfo = null;
    },
  },

  actions: {
    // token & userinfo
    initToken({ commit, dispatch }, payload) {
      commit("CLEAR_TOKEN");
      commit("SET_TOKEN", payload);
    },
    initUser({ commit, dispatch }, payload) {
      commit('CLEAR_USER')
      commit('SET_USER', payload)
    },
  },
  modules: {
    snackbar: snackbar,
    errorLog: errorLog
  },
});
