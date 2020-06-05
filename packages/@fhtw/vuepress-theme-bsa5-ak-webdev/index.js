module.exports = (themeConfig, ctx) => {
  const defaultDirectoryClassifierPluginOptions = {
    directories: [],
  };

  const { modifyDirectoryClassifierOptions } = themeConfig;

  const directoryClassifierPluginOptions =
    typeof modifyDirectoryClassifierOptions === "function"
      ? modifyDirectoryClassifierOptions(defaultDirectoryClassifierPluginOptions)
      : defaultDirectoryClassifierPluginOptions;

  const plugins = [["directory-classifier", directoryClassifierPluginOptions]];
  const extendMarkdown = (md) => {
    // md.set({ html: true, breaks: true, typographer: true, linkify: true });
  };
  const config = {
    extend: "@vuepress/theme-default",
    plugins,
    extendMarkdown,
  };

  return config;
};
