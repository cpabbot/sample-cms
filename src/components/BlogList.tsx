// import styles from "../styles/BlogList.module.css"

export type BlogFrontMatter = {
  title: string
  description: string
  publishedDate: string
  tags: string[]
}

export type BlogPostProps = {
  slug: string
  siteTitle: string
  frontMatter: BlogFrontMatter
  markdownBody: any
  wordCount: number
  readingTime: string
}

export type BlogPostsProps = {
  posts?: BlogPostProps[]
}

const BlogList = ({ posts }: BlogPostsProps) => {
    return (
    <div>
      <h3>List of all blog posts will go here</h3>
    </div>
    )
}

export default BlogList