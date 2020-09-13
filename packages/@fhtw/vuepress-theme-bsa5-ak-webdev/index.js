module.exports = (themeConfig, ctx) => {
  const plugins = [];
  const extendMarkdown = (md) => {
    md.set({ html: true, breaks: false, typographer: true, linkify: true });
    md.use(require("markdown-it-abbr"));
    md.use(require("markdown-it-sup"));
    md.use(require("markdown-it-sub"));
  };
  const config = {
    extend: "@vuepress/theme-default",
    plugins,
    extendMarkdown,
  };

  return config;
};
