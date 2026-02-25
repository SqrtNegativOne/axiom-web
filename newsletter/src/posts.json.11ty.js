// Generates /newsletter/posts.json — consumed by the React home page
// Using a JS template so JSON.stringify() runs without Nunjucks HTML escaping.

export default class PostsJson {
  data() {
    return {
      permalink: 'posts.json',
      eleventyExcludeFromCollections: true,
    }
  }

  render({ collections }) {
    const posts = (collections.posts || []).map((post) => ({
      title: post.data.title || '',
      url: `/newsletter${post.url}`,
      date: post.date.toISOString().split('T')[0],
      dateReadable: post.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }),
      author: post.data.author || null,
      excerpt: post.data.excerpt || null,
    }))

    return JSON.stringify(posts, null, 2)
  }
}
