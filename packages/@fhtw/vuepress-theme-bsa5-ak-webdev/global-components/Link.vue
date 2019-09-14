<template>
  <span>
    <router-link :to="link">{{label}}</router-link>
  </span>
</template>

<script>
export default {
  name: "Link",
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: null
    },
    title: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    link() {
      return this.page.regularPath;
    },
    label() {
      if (this.text) return this.text;
      if (this.title && this.page.frontmatter.title)
        return this.page.frontmatter.title;
      // TODO: Make sure idx is unique and same across pages.
      for (const [idx, page] of this.indexedPages.entries()) {
        if (page.regularPath === this.link) return `[${idx}]`;
      }
      return "<?>";
    },
    indexedPages() {
      const indexPage = this.$site.pages.find(
        ({ regularPath }) => regularPath === this.type
      );
      return this.$site.pages.filter(({ regularPath }) => {
        return indexPage.frontmatter.indexed.includes(regularPath);
      });
    },
    page() {
      return this.indexedPages.find(
        ({ frontmatter }) => frontmatter.id === this.id
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>