<template>
  <!-- <ClientOnly> -->
  <div class="pdf-document">
    <PDFPage v-for="page in pages" :page="page" :scale="scale" :key="page.pageNumber" />
  </div>
  <!-- </ClientOnly> -->
</template>

<script>
import range from "lodash/range";
import PDFPage from "@theme/components/pdf/PDFPage.vue";
export default {
  name: "PDFDocument",
  components: {
    PDFPage
  },
  props: ["url", "scale"],
  data() {
    return {
      pdf: undefined,
      pages: []
    };
  },
  methods: {
    fetchPDF() {
      import("pdfjs-dist/webpack")
        // import(
        //   "/home/alija/Git/github/sabicalija/webdev.js/node_modules/pdfjs-dist/webpack.js"
        // )
        .then(pdfjs => pdfjs.getDocument(this.url))
        .then(pdf => (this.pdf = pdf));
    }
  },
  watch: {
    pdf(pdf) {
      this.pages = [];
      const promises = range(1, pdf.numPages).map(number =>
        pdf.getPage(number)
      );
      Promise.all(promises).then(pages => {
        this.pages = pages;
      });
    }
  },
  mounted() {
    this.fetchPDF();
  }
};
</script>

<style lang="scss" scoped>
</style>