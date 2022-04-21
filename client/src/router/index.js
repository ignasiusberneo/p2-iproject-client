import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HomePage from "../views/HomePage.vue";
import LoginRegisterPage from "../views/LoginRegisterPage.vue";
import DetailPage from "../views/DetailPage.vue";
import WatchlistPage from "../views/WatchlistPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginRegisterPage,
    },
    {
      path: "/drama/:id",
      name: "detail",
      component: DetailPage,
    },
    {
      path: "/watchlist",
      name: "watchlist",
      component: WatchlistPage,
    },
  ],
});

export default router;
