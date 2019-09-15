<!--
<template>
  <div>
    <canvas class="pdf-canvas" ref="canvas"></canvas>
  </div>
</template>
-->
<script>
export default {
  name: "PDFPage",
  render: function(h) {
    const { canvasAttrs: attrs } = this;
    return h("canvas", { attrs, ref: "canvas" });
  },
  props: ["page", "scale", "hide"],
  created() {
    this.viewport = this.page.getViewport({scale:this.scale});
  },
  computed: {
    canvasAttrs() {
      let { width, height } = this.viewport;
      [width, height] = [width, height].map(dim => Math.ceil(dim));

      const style = this.canvasStyle;

      return {
        width,
        height,
        style,
        class: "pdf-page"
      };
    },
    canvasStyle() {
      const {
        width: actualSizeWidth,
        height: actualSizeHeight
      } = this.actualSizeViewport;
      const pixelRatio = window.devicePixelRatio || 1;
      const [pixelWidth, pixelHeight] = [actualSizeWidth, actualSizeHeight].map(
        dim => Math.ceil(dim / pixelRatio)
      );
      // return `width: ${pixelWidth}px; height: ${pixelHeight}px`;
      return "width: 100%; height: content";
    },
    actualSizeViewport() {
      return this.viewport.clone({ scale: this.scale });
    }
  },
  methods: {
    drawPage() {
      if (this.renderTask) return;
      const { viewport } = this;
      const canvasContext = this.$refs.canvas.getContext("2d");
      const renderContext = { canvasContext, viewport };
      this.renderTask = this.page.render(renderContext);
      this.renderTask
        .promise
        .then(() => this.$emit("rendered", this.page))
        .catch(this.destroyRenderTask);
    },
    destroyPage(page) {
      if (!page) return;
      page._destroy();
      if (this.renderTask) this.renderTask.cancel();
    },
    destroyRenderTask() {
      if (!this.renderTask) return;
      this.renderTask.cancel();
      delete this.renderTask;
    }
  },
  watch: {
    page(page, oldPage) {
      this.destroyPage(oldPage);
    }
  },
  mounted() {
    this.drawPage();
  },
  beforeDestroy() {
    this.destroyPage(this.page);
  }
};
</script>

<style lang="scss" scoped>
.pdf-canvas {
  width: 100%;
  height: content
}
</style>