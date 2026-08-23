import Link from 'next/link'
import { getAllPosts } from '../../lib/mdx'

export const metadata = {
    title: 'Newsletter | Axiom',
    description: 'Updates and philosophical insights from Axiom.',
}

export default function NewsletterIndex() {
    const posts = getAllPosts()

    return (
        <div className="pt-20 max-w-4xl mx-auto px-6 py-16 animate-on-load">
            <h1 className="section-heading mb-4">Newsletter</h1>
            <div className="h-px w-16 bg-gold/50 mb-12" />
            
            <div className="space-y-12">
                {posts.map((post) => (
                    <article key={post.slug} className="group">
                        <Link href={`/newsletter/${post.slug}`}>
                            <h2 className="text-2xl font-heading text-green group-hover:text-terracotta transition-colors mb-2">
                                {post.frontmatter.title}
                            </h2>
                            <p className="font-mono text-xs text-gold/70 tracking-widest uppercase mb-4">
                                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            {post.frontmatter.description && (
                                <p className="font-body text-ink/80 leading-relaxed">
                                    {post.frontmatter.description}
                                </p>
                            )}
                        </Link>
                    </article>
                ))}
                
                {posts.length === 0 && (
                    <p className="font-body text-ink/50 text-lg">No posts available.</p>
                )}
            </div>
        </div>
    )
}
