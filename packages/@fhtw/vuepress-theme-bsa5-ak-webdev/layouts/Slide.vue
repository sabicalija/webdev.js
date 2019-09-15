<template>
  <basic-layout>
    <div class="theme-default-content" slot="content">
      <!-- <div> -->
        <!-- <span>{{$frontmatter}}</span> -->
        <PDFDocument :url="$frontmatter.pdf" :scale="2" />
      <!-- </div> -->
    </div>
  </basic-layout>
</template>

<script>
import BasicLayout from "@theme/layouts/BasicLayout.vue";
import PDFDocument from "@theme/components/pdf/PDFDocument.vue";
// import "pdfjs-dist/web/pdf_viewer.css";

export default {
  name: "Slide",
  components: {
    BasicLayout,
    PDFDocument
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
#container {
  outline: 1px solid;
}
</style>