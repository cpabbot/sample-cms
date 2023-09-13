import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export type Frontmatter = {
  title: string;
  date: string;
};

export type PostData = {
  slug: string;
  frontmatter: Frontmatter;
};

export async function getPostData(slug: string) {
  const fullPath = path.join("src/posts", `${slug}.md`);
  // const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  return {
    data,
    content,
  };
}

export default async function Post({ params }: Params) {
  const { data, content } = await getPostData(params.slug);
  return (
    <main>
      Title: {data.title}
      <Image width={200} height={120} src={data.hero_image} alt="hero" />
      <ReactMarkdown>{content}</ReactMarkdown>
    </main>
  );
}
