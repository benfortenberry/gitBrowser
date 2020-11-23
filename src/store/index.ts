import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(VueAxios, axios);
Vue.use(Vuex);

export default new Vuex.Store({
  state: { org: {}, repos: [], commits: [] },
  mutations: {
    SAVE_ORG(state, org) {
      state.org = org;
    },
    SAVE_REPOS(state, repos) {
      state.repos = repos;
    },
    SAVE_COMMITS(state, commits) {
      state.commits = commits;
    }
  },
  actions: {
    loadRepos({ commit }, page) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "https://api.github.com/orgs/microsoft/repos?per_page=10&sort=updated&page=" +
              page
          )
          .then(response => {
            resolve(commit("SAVE_REPOS", response.data));
          })
          .catch(error => {
            reject(error.response.data.errors);
          });
      });
    },
    loadCommits({ commit }, { page, repo }) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "https://api.github.com/repos/microsoft/" +
              repo +
              "/commits?per_page=10&&page=" +
              page
          )
          .then(response => {
            resolve(commit("SAVE_COMMITS", response.data));
          })
          .catch(error => {
            reject(error.response.data.errors);
          });
      });
    },
    loadOrg({ commit }) {
      axios
        .get("https://api.github.com/orgs/microsoft", {})
        .then(response => response.data)
        .then(org => {
          commit("SAVE_ORG", org);
        });
    }
  },
  modules: {}
});
