import { existsSync } from "fs";
import { join } from "path";

import logger from "../util/logger";
import chalk from "chalk";

import { DirectoryClassifierPluginOptions } from "./interface/Options";
import { IndexPage } from "./interface/ExtraPages";
import { PageEnhancer } from "./interface/PageEnhancers";

/**
 * Handle options from users.
 * @param options
 * @param ctx Vuepress context.
 * @return {*}
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
    return false;
  });

  const indexPages: IndexPage[] = [];
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
      level = 1,
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
    indexPages.push({
      permalink: indexPath,
      frontmatter: {
        layout: ctx.getLayout(indexLayout),
        title: capitalize(id),
        subdirlevel: level,
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

      if (typeof nav.order === "string") {
        if (nav.order === "append") {
          navBar.push({
            text: nav.title,
            link: indexPath
          });
        }
      } else {
        if (nav.order > 0 && nav.order < navBar.length) {
          navBar.splice(nav.order - 1, 0, {
            text: nav.title,
            link: indexPath
          });
        }
      }
    }

    /**
     * 1.4 Set layout for pages that match current directory classifier.
     */
    pageEnhancers.push({
      when: ({ regularPath }) => isIndexed(regularPath, indexPath, level),
      frontmatter: {
        layout: itemLayout || "Page"
      },
      data: {
        id
      }
    });
  }
  return {
    pageEnhancers,
    indexPages
  };
}

/**
 * Capitalize first letter of every word.
 * @param text
 * @return {*}
 */
function capitalize(text: string) {
  return text.replace(/(?:^|\s)\S/g, l => l.toUpperCase());
}

/**
 * Filter pages in `dirname`, i.e. only top-level files or index files in sub directories.
 * @param regularPath
 * @param indexPath
 * @param level
 * @return {*}
 */
export function isIndexed(indexedPath: string, indexPath: string, level: number) {
  return (
    Boolean(indexedPath) &&
    indexedPath !== indexPath &&
    indexedPath.startsWith(indexPath) &&
    (indexedPath.endsWith("index.html") ||
      indexedPath.endsWith("/") ||
      isWithinSubDir(indexPath, indexedPath, level))
  );
}

/**
 * Subtract `sub` from `text`.
 * @param text
 * @param sub
 * @return {*}
 */
function diff(text, sub) {
  return text.split(sub).join("");
}

/**
 * Test weather subtraction makes sense.
 * @param text
 * @param sub
 * @return {*}
 */
function diffValidate(text, sub) {
  return text !== diff(text, sub);
}

/**
 * Test if path is within the next`level` sub directories.
 * @param index
 * @param path
 * @param level
 * @return {*}
 */
function isWithinSubDir(index, path, level = 1) {
  if (level > 0 && diffValidate(path, index)) {
    const dirLevel = diff(path, index).split("/").length;
    return dirLevel > 0 && dirLevel <= level + 1;
  }
  return false;
}
