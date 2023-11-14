import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/Home.vue"),
    },
    {
      path: "/account",
      name: "Account",
      component: () => import("@/pages/Account.vue"),
    },
    {
      path: "/mojo",
      name: "Mojo",
      component: () => import("@/pages/Mojo.vue"),
    },
    {
      path: "/statistics",
      name: "Statistics",
      component: () => import("@/pages/Statistics.vue"),
    },
  ],
});

export default router;
