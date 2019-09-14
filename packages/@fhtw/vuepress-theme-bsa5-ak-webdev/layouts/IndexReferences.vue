<template>
  <basic-layout>
    <div class="theme-default-content" slot="content">
      <div class="flex-container">
        <router-link
          class="flex-item"
          v-for="reference of references"
          :key="reference.regularPath"
          :to="reference.regularPath"
        >
          <ReferenceCard :path="reference.regularPath" />
        </router-link>
      </div>
    </div>
  </basic-layout>
</template>

<script>
import BasicLayout from "@theme/layouts/BasicLayout.vue";
import ReferenceCard from "@theme/components/references/ReferenceCard.vue";

export default {
  components: {
    BasicLayout,
    ReferenceCard
  },
  computed: {
    references() {
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
  width: 31%;
  margin: 0.6vh auto;
  box-shadow: #ccc 1px 2px 5px 0px;
  transition: 0.5s width ease;
  min-width: 200px;
  &:hover {
    text-decoration: none !important;
    box-shadow: #bbb 2px 4px 5px 0px;
  }
}
@media (max-width: 768px) {
  .flex-item {
    width: 90%;
    // height: 55vh;
  }
}
</style>