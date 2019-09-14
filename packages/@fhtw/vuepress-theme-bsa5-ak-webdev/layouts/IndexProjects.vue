<template>
  <basic-layout>
    <div class="theme-default-content" slot="content">
      <div class="flex-container">
        <router-link
          class="flex-item"
          v-for="project of projects"
          :key="project.regularPath"
          :to="project.regularPath"
        >
          <ProjectCard :path="project.regularPath" />
        </router-link>
      </div>
    </div>
  </basic-layout>
</template>

<script>
import BasicLayout from "@theme/layouts/BasicLayout.vue";
import ProjectCard from "@theme/components/projects/ProjectCard.vue";

export default {
  components: {
    BasicLayout,
    ProjectCard
  },
  computed: {
    projects() {
      return this.$site.pages.filter(({ regularPath }) =>
        this.$page.frontmatter.indexed.includes(regularPath)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.flex-item {
  width: 45%;
  margin: 0.6vh auto;
  box-shadow: #ccc 1px 2px 5px 0px;
  transition: 0.5s width ease;
  min-width: 300px;
  &:hover {
    text-decoration: none !important;
    box-shadow: #bbb 2px 4px 5px 0px;
  }
}
@media (max-width: 768px) {
  .flex-item {
    width: 100%;
    height: 55vh;
  }
}
</style>