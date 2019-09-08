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
          order: 3
        }
      },
      {
        id: "references",
        dirname: "references",
        layout: "IndexReferences",
        itemLayout: "Reference",
        nav: {
          title: "References",
          order: 5
        }
      }
    ]
  };

  const plugins = [["@fhtw/directory-classifier", defaultDirectoryClassifierPluginOptions]];
  const config = {
    extend: "@vuepress/theme-default",
    plugins
  };

  return config;
};
