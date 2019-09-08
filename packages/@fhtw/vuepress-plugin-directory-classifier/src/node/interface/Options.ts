/**
 * A Directory-based Classifier
 */
export interface DirectoryClassifier {
    /**
     * Unique id for current classifier.
     */
    id: string;
    /**
     * Matched directory name.
     */
    dirname: string;
    /**
     * Entry page for current classifier.
     */
    path: string;
    /**
     * Layout component name for entry page.
     */
    layout?: string;
    /**
     * Frontmatter for entry page.
     */
    frontmatter?: Record<string, any>;
    /**
     * Layout for matched page.
     */
    itemLayout?: string;
    /**
     * Display in navbar.
     */
    nav?: {
      /**
       * Navbar title.
       */
      title: string;
      /**
       * Navbar order.
       */
      order: number;
    };
  }
  
  /**
   * Options for this plugin.
   */
  export interface DirectoryClassifierPluginOptions {
    directories: DirectoryClassifier[];
  }
  