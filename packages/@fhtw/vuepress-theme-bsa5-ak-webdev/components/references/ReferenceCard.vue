<template>
  <b-card no-body>
    <div slot="header">
      <b-card-title class="mt-0 reference-title">{{ref.title}}</b-card-title>
      <b-card-sub-title class="reference-subtitle">{{ref.subtitle}}</b-card-sub-title>
    </div>

    <b-card-img-lazy
      class="card-image"
      :src="ref.image || 'https://via.placeholder.com/800x600'"
      :image-alt="ref.imageAlt || 'TODO: Alt. image description'"
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
.reference-title {
  height: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.reference-subtitle {
  margin-top: 0.4rem;
  height: 1rem;
}
.card-image {
  object-fit: cover;
  object-position: 50%;
}
</style>