import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import ManageUserView from "@/views/user/ManageUserView.vue";
import AddUserView from "@/views/user/AddUserView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserInfoView from "@/views/user/UserInfoView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
  {
    path: "/manage",
    name: "管理用户",
    component: ManageUserView,
  },
  {
    path: "/add/user",
    name: "新增用户",
    component: AddUserView,
  },
  {
    path: "/update/user",
    name: "更新题目",
    component: AddUserView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/info",
    name: "用户信息",
    component: UserInfoView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "about",
    meta: {
      hideInMenu: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
