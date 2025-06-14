import { NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${(await params).slug}.md`);

    if (!fs.existsSync(filePath)) {
      return Response.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return Response.json({
      slug: (await params).slug,
      content,
      ...data,
    });
  } catch (error) {
    console.error('Error reading blog post:', error);
    return Response.json(
      { error: 'Error reading blog post' },
      { status: 500 }
    );
  }
} 