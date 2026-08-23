import { getAllPosts } from '../../../lib/mdx'

export async function GET() {
    const posts = getAllPosts()
    
    const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>Axiom Newsletter</title>
    <subtitle>The official newsletter of Axiom, the philosophy society at NSUT.</subtitle>
    <link href="https://axiomnsut.in/newsletter/feed.xml" rel="self"/>
    <link href="https://axiomnsut.in/"/>
    <updated>${posts.length > 0 ? new Date(posts[0].frontmatter.date).toISOString() : new Date().toISOString()}</updated>
    <id>https://axiomnsut.in/</id>
    <author>
        <name>Axiom NSUT</name>
    </author>
    ${posts.map(post => `
    <entry>
        <title>${post.frontmatter.title}</title>
        <link href="https://axiomnsut.in/newsletter/${post.slug}"/>
        <updated>${new Date(post.frontmatter.date).toISOString()}</updated>
        <id>https://axiomnsut.in/newsletter/${post.slug}</id>
        <content type="html"><![CDATA[${post.frontmatter.description || post.frontmatter.title}]]></content>
    </entry>
    `).join('')}
</feed>`

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
        },
    })
}


