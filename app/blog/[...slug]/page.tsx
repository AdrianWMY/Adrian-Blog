'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Tag from '@/components/Tag';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Components } from 'react-markdown';
import Image from 'next/image';

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

// Custom components for markdown rendering
const MarkdownComponents: Components = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      className="text-2xl md:text-3xl lg:text-4xl font-bold my-3 md:my-4"
      {...props}
    />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2
      className="text-xl md:text-2xl lg:text-3xl font-bold my-3 md:my-4"
      {...props}
    />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3
      className="text-lg md:text-xl lg:text-2xl font-bold my-2 md:my-3"
      {...props}
    />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4
      className="text-base md:text-lg lg:text-xl font-bold my-2 md:my-3"
      {...props}
    />
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p
      className="text-base md:text-lg my-3 md:my-4 leading-relaxed"
      {...props}
    />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside my-3 md:my-4 ml-0 md:ml-4 space-y-1 md:space-y-2"
      {...props}
    />
  ),
  ol: (props: { className?: string; children?: React.ReactNode }) => (
    <ol
      className={`list-decimal list-inside my-3 md:my-4 ml-0 md:ml-4 space-y-1 md:space-y-2 ${
        props.className || ''
      }`}
    >
      {props.children}
    </ol>
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="my-1 md:my-2 text-base md:text-lg" {...props} />
  ),
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a
      className="text-pink-600 hover:text-pink-700 underline break-words"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-gray-200 pl-3 md:pl-4 my-3 md:my-4 italic text-gray-700"
      {...props}
    />
  ),
  code: ({
    inline,
    ...props
  }: { inline?: boolean } & React.HTMLProps<HTMLElement>) =>
    inline ? (
      <code
        className="bg-gray-100 rounded px-1 py-0.5 text-sm md:text-base break-words"
        {...props}
      />
    ) : (
      <code className="text-sm md:text-base" {...props} />
    ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre
      className="bg-zinc-900 text-white rounded-lg p-3 md:p-4 my-3 md:my-4 overflow-x-auto text-sm md:text-base"
      {...props}
    />
  ),
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
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={1200}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
            priority
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

      <article className="prose prose-base md:prose-lg max-w-none prose-headings:font-bold prose-h1:text-2xl md:prose-h1:text-4xl prose-h2:text-xl md:prose-h2:text-3xl prose-h3:text-lg md:prose-h3:text-2xl prose-pre:bg-zinc-900 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-3 md:prose-pre:p-4 prose-a:text-pink-600 hover:prose-a:text-pink-700 prose-img:rounded-lg prose-img:w-full prose-img:mx-auto prose-img:my-3 md:prose-img:my-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={MarkdownComponents}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default BlogPost;
