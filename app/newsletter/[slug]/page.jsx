import { getPostBySlug, getAllPosts } from '../../../lib/mdx'
import Link from 'next/link'

export function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    
    if (!post) {
        return { title: 'Post Not Found' }
    }
    
    return {
        title: `${post.frontmatter.title} | Axiom Newsletter`,
        description: post.frontmatter.description || post.frontmatter.title,
    }
}

export default async function NewsletterPost({ params }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return (
            <div className="pt-20 min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-mono text-gold mb-4 text-xl">404: POST NOT FOUND</h1>
                    <Link href="/newsletter" className="text-terracotta hover:text-green underline underline-offset-4 transition-colors">
                        Return to newsletter
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <article className="pt-20 max-w-3xl mx-auto px-6 py-16 animate-on-load prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-green prose-a:text-terracotta hover:prose-a:text-green prose-a:transition-colors">
            <Link
                href="/newsletter"
                className="not-prose label-mono mb-8 inline-block hover:text-terracotta transition-colors"
            >
                &larr; Back to Newsletter
            </Link>
            
            <h1 className="section-heading mb-4 leading-tight">{post.frontmatter.title}</h1>
            <p className="font-mono text-sm text-gold tracking-widest uppercase mb-12">
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </p>
            
            <div className="content">
                {post.content}
            </div>
        </article>
    )
}
