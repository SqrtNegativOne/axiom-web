import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

const components = {
    img: ({ src, alt, title, ...rest }) => {
        if (src && src.startsWith('../')) {
            src = src.replace('../', '/newsletter/');
        }
        return (
            <span className="block my-8 text-center">
                <Image 
                    src={src} 
                    alt={alt || ''} 
                    width={800} 
                    height={500} 
                    className="max-w-full max-h-[70vh] w-auto h-auto mx-auto rounded-xs block object-contain" 
                    {...rest} 
                />
                {title && (
                    <span className="block mt-2.5 font-mono text-[0.72rem] tracking-wider text-ink/50 dark:text-ink/50">
                        {title}
                    </span>
                )}
            </span>
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


