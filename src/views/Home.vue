<template>
  <div class="home">
    <RepoList :page="page"></RepoList>
  </div>
</template>

<script>
import RepoList from "@/components/RepoList.vue";

export default {
  name: "Home",
  components: {
    RepoList
  },
  computed: {
    page() {
      return this.$route.params.page;
    }
  }
};
</script>
