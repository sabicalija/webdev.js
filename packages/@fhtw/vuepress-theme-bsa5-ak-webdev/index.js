module.exports = (themeConfig, ctx) => {
  const defaultDirectoryClassifierPluginOptions = {
    directories: [
      {
        id: "projects",
        dirname: "projects",
        layout: "IndexProjects",
        itemLayout: "Project",
        nav: {
          title: "Projects",
          order: 2
        }
      },
      {
        id: "references",
        dirname: "references",
        layout: "IndexReferences",
        itemLayout: "Reference",
        nav: {
          title: "References",
          order: 3
        }
      }
    ]
  };

  const { modifyDirectoryClassifierOptions } = themeConfig;

  const directoryClassifierPluginOptions =
    typeof modifyDirectoryClassifierOptions === "function"
      ? modifyDirectoryClassifierOptions(defaultDirectoryClassifierPluginOptions)
      : defaultDirectoryClassifierPluginOptions;

  const plugins = [["@fhtw/directory-classifier", directoryClassifierPluginOptions]];
  const config = {
    extend: "@vuepress/theme-default",
    plugins
  };

  return config;
};
