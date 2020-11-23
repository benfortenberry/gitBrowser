<template>
  <div>
    <h1>
      <h2>{{ repo }} commits:</h2>
    </h1>
    <router-link class="btn btn-secondary" to="/">
      <b-icon icon="arrow-left-circle-fill" />
      Back</router-link
    >

    <div v-if="errorFound">
      <b-alert show variant="danger">Sorry, but an error has occurred</b-alert>
    </div>

    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <skeleton />
      </template>

      <b-list-group class="mt-2">
        <b-list-group-item
          variant="dark"
          class="commitItem"
          v-for="commitItem in commits"
          :key="commitItem.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1" v-if="commitItem.commit">
              {{ commitItem.commit.message | truncate(140) }}
            </h5>
          </div>
          <p class="mb-1" v-if="commitItem.commit">
            {{ commitItem.commit.author.name }} -
            {{ commitItem.commit.author.date | formatDate }}
          </p>
        </b-list-group-item>
      </b-list-group>

      <b-button-group class="mt-2 mb-5">
        <b-button :disabled="currentPage == 1" @click="goBack()">Prev</b-button>
        <b-button @click="goForward()">Next</b-button>
      </b-button-group>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
import Skeleton from "@/components/Skeleton.vue";

export default {
  data() {
    return {
      loading: true,
      errorFound: false,
      currentPage: 1,
    };
  },
  components: { Skeleton },
  props: ["repo"],
  computed: {
    commits() {
      return this.$store.state.commits;
    },
  },
  watch: {
    currentPage: {
      handler: function () {
        this.fetchData();
      },
    },
  },
  methods: {
    goForward() {
      this.currentPage++;
    },
    goBack() {
      this.currentPage--;
    },
    async fetchData() {
      this.loading = true;
      await this.$store
        .dispatch("loadCommits", { page: this.currentPage, repo: this.repo })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.errorFound = true;
        });
    },
  },
  async created() {
    await this.$store
      .dispatch("loadCommits", { page: this.currentPage, repo: this.repo })
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.errorFound = true;
      });
  },
};
</script>

<style>
.customPagination > li > button {
  background-color: #c6c8ca;
  border-color: rgba(0, 0, 0, 0.125);
  color: #111;
}

.page-item.disabled .page-link {
  background-color: #ddd !important;
  border-color: rgba(0, 0, 0, 0.125);
  color: #111;
}
</style>
