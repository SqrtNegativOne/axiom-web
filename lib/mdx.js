import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

const components = {
    img: ({ src, alt, ...rest }) => {
        if (src && src.startsWith('../')) {
            src = src.replace('../', '/newsletter/');
        }
        return (
            <Image 
                src={src} 
                alt={alt || ''} 
                width={800} 
                height={500} 
                style={{ width: '100%', height: 'auto' }} 
                {...rest} 
            />
        );
    }
}

const postsDirectory = path.join(process.cwd(), 'content', 'newsletter')

export async function getPostBySlug(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) return null
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const { content: compiledContent } = await compileMDX({
        source: content,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
        },
        components,
    })

    return {
        slug,
        frontmatter: data,
        content: compiledContent,
        rawContent: content
    }
}

export function getAllPosts() {
    if (!fs.existsSync(postsDirectory)) return []
    
    const filenames = fs.readdirSync(postsDirectory)
    const posts = filenames
        .filter(name => name.endsWith('.md'))
        .map((name) => {
            const slug = name.replace(/\.md$/, '')
            const fullPath = path.join(postsDirectory, name)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data } = matter(fileContents)
            return {
                slug,
                frontmatter: data,
            }
        })

    return posts.toSorted((a, b) => (new Date(a.frontmatter.date) < new Date(b.frontmatter.date) ? 1 : -1))
}


