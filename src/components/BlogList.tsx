import styles from "./BlogList.module.css"
import { PostProps } from "@/app/page";
import Link from "next/link";

const BlogList = ({ posts }: { posts: PostProps[] }) => {
  return (
    <div className={styles.blog_list}>
      {!posts || (!posts.length && <i>no posts</i>)}
      {posts &&
        posts.length &&
        posts.map((post) => (
          <div key={post.slug} className={styles.post}>
            <Link href={`./${post.slug}`} className={styles.link}>{post.frontmatter.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
