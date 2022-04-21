import { defineStore } from "pinia";
import axios from "axios";

export const useDramaStore = defineStore({
  id: "drama",
  state: () => ({
    baseUrl: "http://localhost:3000",
    page: 1,
    isLoggedIn: false,
    name: "",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    axiosGetDramas() {
      return axios.get(
        `${this.baseUrl}/dramas?page=${this.page}&name=${this.name}`
      );
    },
    axiosLogin(data) {
      return axios.post(`${this.baseUrl}/login`, data);
    },
    axiosRegister(data) {
      return axios.post(`${this.baseUrl}/register`, data);
    },
    axiosGetDramaById(id) {
      return axios.get(`${this.baseUrl}/dramas/${id}`);
    },
    axiosPostComment(id, comment) {
      return axios.post(`${this.baseUrl}/dramas/${id}`, comment, {
        headers: { access_token: localStorage.access_token },
      });
    },
    axiosAddWatchlist(id) {
      return axios.post(
        `${this.baseUrl}/dramas/watchlist/${id}`,
        {},
        { headers: { access_token: localStorage.access_token } }
      );
    },
    axiosGetWatchlist() {
      return axios.get(`${this.baseUrl}/dramas/watchlist`, {
        headers: { access_token: localStorage.access_token },
      });
    },
  },
});
