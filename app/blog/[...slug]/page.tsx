'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Tag from '@/components/Tag';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  author: string;
  date: string;
  thumbnail?: string;
  content: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const BlogPost = () => {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog-posts/${params.slug}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/blog" className="text-pink-600 hover:text-pink-700">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/blog"
        className="text-pink-600 hover:text-pink-700 mb-8 inline-block"
      >
        ← Back to blog
      </Link>
      {post.thumbnail && (
        <div className="mb-8">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 mb-8">
        <span className="text-gray-600">{post.author}</span>
        <span className="text-gray-600">•</span>
        <span className="text-gray-600">{formatDate(post.date)}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;
