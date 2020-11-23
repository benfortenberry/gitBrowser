<template>
  <div class="about">
    <repo-detail :repo="repo"></repo-detail>
  </div>
</template>

<script>
import RepoDetail from "@/components/RepoDetail.vue";

export default {
  name: "About",
  computed: {
    repo() {
      return this.$route.params.name;
    }
  },
  components: {
    RepoDetail
  }
};
</script>
