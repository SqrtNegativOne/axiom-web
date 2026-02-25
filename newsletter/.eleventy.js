export default function (eleventyConfig) {
  // Pass through the shared design tokens CSS
  eleventyConfig.addPassthroughCopy({
    "../shared/design-tokens.css": "css/design-tokens.css",
  });

  // Readable date filter: "February 10, 2025"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(dateObj);
  });

  // ISO date filter for <time datetime>
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return dateObj.toISOString().split("T")[0];
  });

  // Prefix a page.url with /newsletter/ for use in hrefs
  // (Eleventy's page.url does not include pathPrefix in templates)
  eleventyConfig.addFilter("withPrefix", (url) => `/newsletter${url}`);

  // Posts collection, newest first
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: "/newsletter/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
