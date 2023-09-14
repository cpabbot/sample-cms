import BlogList from "@/components/BlogList";
import styles from "./page.module.css";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type PostFrontMatter = {
  [key: string]: string;
  // title: string;
  // author: string;
  // date: string;
  // hero_image: string;
};

export type PostProps = {
  slug: string;
  frontmatter: PostFrontMatter;
};

export type PostsProps = {
  posts?: PostProps[];
};

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className={styles.main}>
      <BlogList posts={posts} />
    </main>
  );
}

export async function getPosts(): Promise<PostProps[]> {
  const root = process.cwd();
  const files = fs.readdirSync(path.join(root, "src", "posts"));

  // create an array of post data from all .md files in "posts" folder
  return files.map((slug): PostProps => {
    const fileContents = fs.readFileSync(
      path.join(root, "src", "posts", slug),
      "utf8"
    );
    const { data }: { data: PostFrontMatter } = matter(fileContents);
    return {
      frontmatter: data,
      slug: slug.replace(".md", ""),
    };
  });
}
