import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";

export default function (eleventyConfig) {
  // Pass through the shared design tokens CSS
  eleventyConfig.addPassthroughCopy({
    "../shared/design-tokens.css": "css/design-tokens.css",
  });

  // Pass through images co-located with posts
  eleventyConfig.addPassthroughCopy("src/posts/**/*.{jpg,jpeg,png,gif,svg,webp,avif}");

  // Configure markdown-it with footnote support
  const md = markdownIt({ html: true, linkify: true, typographer: true }).use(
    markdownItFootnote
  );
  eleventyConfig.setLibrary("md", md);

  // Readable date filter: "February 10, 2025"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(dateObj);
  });

  // ISO date filter for <time datetime> and Atom feeds
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return dateObj.toISOString().split("T")[0];
  });

  // RFC-3339 date for Atom feeds
  eleventyConfig.addFilter("rfc3339Date", (dateObj) => {
    return dateObj.toISOString().replace(/\.\d{3}Z$/, "Z");
  });

  // RFC-2822 date for RSS feeds
  eleventyConfig.addFilter("rfc2822Date", (dateObj) => {
    return dateObj.toUTCString();
  });

  // Prefix a page.url with /newsletter/ for use in hrefs
  // (Eleventy's page.url does not include pathPrefix in templates)
  eleventyConfig.addFilter("withPrefix", (url) => `/newsletter${url}`);

  // Absolute URL for feeds
  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    return new URL(url, base).toString();
  });

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
