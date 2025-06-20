import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    const files = fs.readdirSync(postsDirectory);

    const posts = files.map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title,
        tags: data.tags || [],
        description: data.description,
        author: data.author,
        date: data.date,
        thumbnail: data.thumbnail,
        content,
      };
    });

    // Sort posts by date in descending order
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
} 