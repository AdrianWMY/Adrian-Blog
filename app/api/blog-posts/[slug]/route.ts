import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const post = {
      slug,
      title: data.title,
      tags: data.tags || [],
      description: data.description,
      author: data.author,
      date: data.date,
      thumbnail: data.thumbnail,
      content,
    };

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
} 