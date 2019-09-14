import { isWithinSubDir } from "@dynamic/utils";
export default {
  methods: {
    filterPages(pages, path, options = { level: 1 }) {
      return pages.filter(({ regularPath }) => {
        return (
          Boolean(path) &&
          regularPath !== path &&
          regularPath.startsWith(path) &&
          (regularPath.endsWith("index.html") ||
            regularPath.endsWith("/") ||
            isWithinSubDir(path, regularPath, options.level))
        );
      });
    }
  }
};
