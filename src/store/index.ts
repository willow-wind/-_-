import { createStore } from "vuex";
import user from "./user";

// state属性和getter属性已删除
export default createStore({
  mutations: {},
  actions: {},
  modules: {
    user,
  },
});
