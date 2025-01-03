import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { promises as fs } from 'fs';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml?: string;
  headings?: { id: string; text: string; level: number }[];
}

function extractHeadingsFromMarkdown(content: string) {
  const headings = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      
      headings.push({ level, text, id });
    }
  }

  return headings;
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Extract headings before converting to HTML
  const headings = extractHeadingsFromMarkdown(matterResult.content);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);

  // Add IDs to the HTML headings
  let contentHtml = processedContent.toString();
  headings.forEach(heading => {
    const headingRegex = new RegExp(`<h${heading.level}>(${heading.text})</h${heading.level}>`, 'i');
    contentHtml = contentHtml.replace(
      headingRegex,
      `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`
    );
  });

  return {
    id,
    contentHtml,
    headings,
    ...(matterResult.data as { title: string; date: string; description: string })
  };
}

export async function getAllPostIds() {
  const fileNames = await fs.readdir(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export async function getSortedPostsData(): Promise<PostData[]> {
  const fileNames = await fs.readdir(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as { title: string; date: string; description: string })
      };
    })
  );

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
