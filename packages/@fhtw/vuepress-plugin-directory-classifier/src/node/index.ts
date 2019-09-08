import { DirectoryClassifierPluginOptions } from "./interface/Options";
import { handleOptions } from "./handleOptions";

function injectExtraAPI(ctx: any) {
  const { layoutComponentMap } = ctx.themeAPI;

  /**
   * A function used to check whether layout exists
   */
  const isLayoutExists = name => layoutComponentMap[name] !== undefined;

  /**
   * Get layout
   */
  ctx.getLayout = (name?: string, fallback?: string) => {
    return isLayoutExists(name) ? name : fallback || "Layout";
  };
}

module.exports = (options: DirectoryClassifierPluginOptions, ctx: any) => {
  injectExtraAPI(ctx);

  const { pageEnhancers, extraPages } = handleOptions(options, ctx);

  return {
    name: "vuepress-plugin-directory-classifier",

    /**
     * 1. Execute `pageEnhancers` generated in handleOptions
     */
    extendPageData(pageCtx: any) {
      const { frontmatter: rawFrontMatter } = pageCtx;

      pageEnhancers.forEach(({ when, data = {}, frontmatter = {} }) => {
        if (when(pageCtx)) {
          Object.keys(frontmatter).forEach(key => {
            /**
             * Respect the original frontmatter in markdown
             */
            if (!rawFrontMatter[key]) {
              rawFrontMatter[key] = frontmatter[key];
            }
          });
          Object.assign(pageCtx, data);
        }
      });
    },
    /**
     * 2. Add additional pages
     */
    additionalPages: extraPages
  };
};
