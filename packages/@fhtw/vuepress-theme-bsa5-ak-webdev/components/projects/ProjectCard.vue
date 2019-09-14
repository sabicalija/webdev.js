<template>
  <b-card no-body>
    <div slot="header">
      <b-card-title class="mt-0">{{project.title}}</b-card-title>
      <b-card-sub-title>{{project.subtitle}}</b-card-sub-title>
    </div>
    <b-card-img-lazy
      class="card-image"
      :src="project.image || 'https://via.placeholder.com/400x600'"
      :image-alt="project.imageAlt || 'TODO: Alt. image description'"
      bottom
    ></b-card-img-lazy>
  </b-card>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    projectPage() {
      return this.$site.pages.find(
        ({ regularPath }) => regularPath === this.path
      );
    },
    project() {
      return this.projectPage.frontmatter;
    }
  }
};
</script>

<style lang="scss" scoped>
.card-image {
  height: 200px;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>