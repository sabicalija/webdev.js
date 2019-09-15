<template>
  <div class="pdf-document">
    <transition-group name="list" tag="p">
      <PDFPage v-for="page of pages" :page="page" :scale="scale" :key="page.pageNumber"  />
    </transition-group>
  </div>
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
      pages: [],
      currentPage: 1
    };
  },
  methods: {
    fetchPDF() {
      const _self = this;
      pdfjsLib.getDocument(_self.url).promise.then(pdf => (_self.pdf = pdf)).catch();
    }
  },
  computed: {
    page() {
      return this.pages[this.currentPage];
    }
  },
  watch: {
    pdf(pdf) {
      this.pages = [];
      const promises = range(1, pdf.numPages).map(number =>
        pdf.getPage(number).catch(err => console.log("#err2"))
      );
      Promise.all(promises).then(pages => {
        this.pages = pages;
      }).catch(err => console.log("err#1"));
    }
  },
  mounted() {
    this.fetchPDF();
  }
};
</script>

<style lang="scss" scoped>
.pdf-document {

}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>