import { existsSync } from "fs";
import { join, relative } from "path";

import { chalk, logger } from "@vuepress/shared-utils";

import { DirectoryClassifierPluginOptions } from "./interface/Options";
import { ExtraPage } from "./interface/ExtraPages";
import { PageEnhancer } from "./interface/PageEnhancers";

/**
 * Handle options from users.
 * @param options
 * @param ctx Vuepress context.
 * return {*}
 */
export function handleOptions(options: DirectoryClassifierPluginOptions, ctx: any) {
  let { directories = [] } = options;

  /**
   * Validate the existence of directory specified by directory classifier.
   */
  directories = directories.filter(directory => {
    const targetDir = join(ctx.sourceDir, directory.dirname);
    if (existsSync(targetDir)) {
      return true;
    }

    logger.warn(
      `[@fhtw/plugin-directory-classifier]` +
        `  Invalid directory classifier: ${chalk.cyan(directory.id)}, ` +
        `  ${chalk.gray(targetDir)} doesn't exist!`
    );
  });

  const extraPages: ExtraPage[] = [];
  const pageEnhancers: PageEnhancer[] = [];

  /**
   * 1. Directory-based classification
   */
  for (const directory of directories) {
    const {
      id,
      dirname,
      path: indexPath = `/${directory.id}/`,
      layout: indexLayout = "IndexPage",
      frontmatter,
      itemLayout = "Page",
      nav
    } = directory;

    /**
     * 1.1 Required index path.
     */
    if (!indexPath) {
      continue;
    }

    /**
     * 1.2 Inject index page.
     */
    extraPages.push({
      permalink: indexPath,
      frontmatter: {
        layout: ctx.getLayout(indexLayout),
        title: capitalize(id),
        itemPath: dirname,
        ...frontmatter
      },
      meta: {
        id
      }
    });

    /**
     * 1.3 Inject index entry in navigation.
     */
    if (nav) {
      const { nav: navBar } = ctx.themeConfig;
      if (nav.order > 0 && nav.order < navBar.length) {
        navBar.splice(nav.order - 1, 0, {
          text: nav.title,
          link: indexPath
        });
      }
    }

    /**
     * 1.4 Set layout for pages that match current directory classifier.
     */
    pageEnhancers.push({
      when: ({ regularPath }) => filterIndexedPages(regularPath, indexPath, dirname),
      frontmatter: {
        layout: ctx.getLayout(itemLayout, "Page")
      },
      data: {
        id
      }
    });
  }
  return {
    pageEnhancers,
    extraPages
  };
}

/**
 * Capitalize first letter of every word.
 * @param text
 * return {*}
 */
function capitalize(text: string) {
  return text.replace(/(?:^|\s)\S/g, l => l.toUpperCase());
}

/**
 * Filter pages in `dirname`, i.e. only top-level files or index files in sub directories.
 * @param regularPath
 * @param indexPath
 * @param dirname
 * return {*}
 */
function filterIndexedPages(regularPath: string, indexPath: string, dirname: string) {
  return (
    Boolean(regularPath) &&
    regularPath !== indexPath &&
    regularPath.startsWith(`/${dirname}/`) &&
    (regularPath.endsWith("index.html") ||
      regularPath.endsWith("/") ||
      isFirstLevelEntry(regularPath, indexPath))
  );
}

/**
 * Tests if entry is first level entry of given index page.
 * @param itemPath
 * @param indexPath
 * return {*}
 */
function isFirstLevelEntry(itemPath: string, indexPath: string) {
  const p = relative(indexPath, itemPath);
  return p.split("/").length == 1;
}
