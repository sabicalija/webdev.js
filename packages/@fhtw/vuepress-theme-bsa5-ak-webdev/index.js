const twemoji = require("twemoji");
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
          order: "append"
        }
      },
      {
        id: "references",
        dirname: "references",
        layout: "IndexReferences",
        itemLayout: "Reference",
        nav: {
          title: "References",
          order: "append"
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
  const extendMarkdown = md => {
    // md.set({ html: true, breaks: true, typographer: true, linkify: true });
    md.use(require("markdown-it-sup"));
    md.use(require("markdown-it-sub"));
    md.use(require("markdown-it-abbr"));
    md.use(require("markdown-it-deflist"));
    md.use(require("markdown-it-footnote"));
    md.use(require("markdown-it-ins"));
    md.use(require("markdown-it-mark"));
    md.use(require("markdown-it-checkbox"));
    md.use(require("markdown-it-kbd"));
    md.use(require("markdown-it-imsize"));
    md.renderer.rules.emoji = function(token, idx) {
      return twemoji.parse(token[idx].content, {
        base: "https://twemoji.maxcdn.com/2/",
        ext: ".svg",
        folder: "svg"
      });
    };
  };
  const config = {
    extend: "@vuepress/theme-default",
    plugins,
    extendMarkdown
  };

  return config;
};
