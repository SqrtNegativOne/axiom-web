import { DateTime } from "luxon";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function (eleventyConfig) {
  // Pass through the shared design tokens CSS
  eleventyConfig.addPassthroughCopy({
    "../shared/design-tokens.css": "css/design-tokens.css",
  });

  // Readable date filter: "February 25, 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  // ISO date filter for <time datetime>
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();
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
