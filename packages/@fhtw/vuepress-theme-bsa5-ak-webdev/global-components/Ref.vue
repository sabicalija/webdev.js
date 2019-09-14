<template>
  <Link type="/references/" :id="id" />
</template>

<script>
export default {
  name: "Ref",
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>