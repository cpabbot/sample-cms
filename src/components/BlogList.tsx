// import styles from "../styles/BlogList.module.css"
import { PostProps } from "@/app/page";
import Link from "next/link";

const BlogList = ({ posts }: { posts: PostProps[] }) => {
  return (
    <div>
      <h3>List of all blog posts will go here</h3>
      {!posts || (!posts.length && <i>no posts</i>)}
      {posts &&
        posts.length &&
        posts.map((post) => (
          <div key={post.slug}>
            <Link href={`./${post.slug}`}>{post.slug}</Link>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
