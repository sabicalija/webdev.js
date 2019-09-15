<template>
  <div class="container">
    <!-- <router-link :to="src">Slides</router-link>
    <a :href="frontmatter.pdf" target="_blank">PDF</a>
    <span>Download</span>
    <span>Maximize</span>-->

    <a :href="`${frontmatter.pdf}-presentation-43.pdf`" target="_blank">
      <img class="icon" src="/assets/img/icons/43-light-custom.svg" alt="4:3" />
    </a>
    <a :href="`${frontmatter.pdf}-presentation-169.pdf`" target="_blank">
      <img class="icon" src="/assets/img/icons/169-light-custom.svg" alt="16:9" />
    </a>
  </div>
</template>

<script>
export default {
  name: "SlideSet",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    frontmatter() {
      return this.$site.pages.find(
        ({ regularPath }) => regularPath === `${this.src}.html`
      ).frontmatter;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.icon {
  height: 1.2rem;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.25rem;
}
</style>