<template>
  <div>
    <h1>
      <h2 v-if="orgInfo">
        <b-avatar square variant="secondary" :src="orgInfo.avatar_url" />
        Microsoft Repositories ({{ orgInfo.public_repos }})
      </h2>
    </h1>
    <div v-if="errorFound">
      <b-alert show variant="danger">Sorry, but an error has occurred</b-alert>
    </div>
    <p>most recently updated:</p>

    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <skeleton />
      </template>

      <b-list-group class="mt-2">
        <b-list-group-item
          button
          variant="dark"
          class="repoItem"
          @click="loadRepo(repo.name)"
          v-for="repo in repos"
          :key="repo.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ repo.name }}</h5>
            <small>{{ repo.updated_at | formatDate }}</small>
          </div>

          <p class="mb-1">
            {{ repo.description }}
          </p>
        </b-list-group-item>
      </b-list-group>

      <b-pagination
        class="mt-2 mb-5 customPagination"
        v-if="repos.length"
        :total-rows="orgInfo.public_repos"
        per-page="10"
        v-model="currentPage"
      />
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
      currentPage: 1
    };
  },
  components: { Skeleton },
  computed: {
    repos() {
      return this.$store.state.repos;
    },
    orgInfo() {
      return this.$store.state.org;
    }
  },
  watch: {
    currentPage: {
      handler: function() {
        this.fetchData();
      }
    }
  },
  methods: {
    loadRepo(name) {
      this.$router.push({ name: "about", params: { name } });
    },
    async fetchData() {
      this.loading = true;
      await this.$store
        .dispatch("loadRepos", this.currentPage)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.errorFound = true;
        });
    }
  },
  async created() {
    await this.$store.dispatch("loadOrg");

    await this.$store
      .dispatch("loadRepos", this.currentPage)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.errorFound = true;
      });
  }
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
