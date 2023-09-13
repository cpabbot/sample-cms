import Image from "next/image"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
// import styles from "post.module.css"
import glob from "glob"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
// import Layout from "../../components/Layout"

export type BlogFrontMatter = {
  title: string
  description: string
  publishedDate: string
  tags: string[]
  // added stuff
  author: string
  hero_image: string
  date: string
}

export type BlogPostProps = {
  slug: string
  siteTitle: string
  frontMatter: BlogFrontMatter
  markdownBody: any
  wordCount: number
  readingTime: string
}

function reformatDate(fullDate: string) {
  const date = new Date(fullDate)
  return date.toDateString().slice(4)
}

export default function BlogTemplate({ frontMatter, markdownBody }: BlogPostProps) {
  return (
    // <Layout siteTitle={siteTitle}>
      <article className={styles.blog}>
        <figure className={styles.blog__hero}>
          <Image
            height="1080"
            src={frontMatter.hero_image}
            alt={`blog_hero_${frontMatter.title}`}
          />
        </figure>
        <div className={styles.blog__info}>
          <h1>{frontMatter.title}</h1>
          <h3>{reformatDate(frontMatter.date)}</h3>
        </div>
        <div className={styles.blog__body}>
          <ReactMarkdown>{markdownBody}</ReactMarkdown>
        </div>
        <h2 className={styles.blog__footer}>Written By: {frontMatter.author}</h2>
      </article>
    // </Layout>
  )
}

export async function getStaticProps({ params }: Params) {

  const config = await import(`../data/config.json`)

  // retrieving the Markdown file associated to the slug
  // and reading its data
  const content = await import(`../../posts/${params.slug}.md`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontMatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  // getting all .md files from the posts directory
  const blogs = glob.sync(`posts/**/*.md`)

  // converting the file names to their slugs
  const blogSlugs = blogs.map((file: string) =>
    file
      .split('/')[1]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
  )

  // creating a path for each of the `slug` parameter
  const paths = blogSlugs.map((slug: string) => { return { params: { slug: slug } } })

  return {
    paths,
    fallback: false,
  }
}