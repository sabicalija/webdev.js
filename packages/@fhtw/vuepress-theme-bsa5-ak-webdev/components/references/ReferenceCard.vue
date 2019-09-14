<template>
  <b-card no-body>
    <div slot="header">
      <b-card-title class="mt-0">{{ref.title}}</b-card-title>
      <b-card-sub-title>{{ref.subtitle}}</b-card-sub-title>
    </div>

    <b-card-img-lazy
      :src="ref.image || 'https://via.placeholder.com/800x600'"
      :image-alt="ref.imageAlt || 'Alt. image description'"
      bottom
    ></b-card-img-lazy>
  </b-card>
</template>

<script>
export default {
  name: "ReferenceCard",
  props: {
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    refPage() {
      return this.$site.pages.find(
        ({ regularPath }) => regularPath === this.path
      );
    },
    ref() {
      return this.refPage.frontmatter;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>