<template>
  <basic-layout>
    <div class="theme-default-content" slot="content">
      <div class="flex-container">
        <router-link
          v-for="reference of references"
          :key="reference.regularPath"
          class="flex-item"
          :to="reference.regularPath"
        >
          <ReferenceCard class="ref-card" :path="reference.regularPath" />
        </router-link>
      </div>
    </div>
  </basic-layout>
</template>

<script>
import BasicLayout from "@theme/layouts/BasicLayout.vue";
import ReferenceCard from "@theme/components/references/ReferenceCard.vue";

import mixin from "@dynamic/mixin";

export default {
  components: {
    BasicLayout,
    ReferenceCard
  },
  mixins: [mixin],
  computed: {
    references() {
      return this.filterPages(this.$site.pages, this.$route.path);
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
}

.ref-card {
  // display: block;
  height: 100%;
}

@media (max-width: 768px) {
  .flex-item {
    width: 100%;
    height: 55vh;
  }
}
</style>