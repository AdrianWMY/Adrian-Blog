import React from 'react';
import Tag from '@/components/Tag';
import Link from 'next/link';
// import Image from 'next/image';

interface BlogPostCardProps {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  author: string;
  date: string;
  thumbnail?: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const BlogPostCard = ({
  slug,
  title,
  tags,
  description,
  author,
  date,
}: // thumbnail,
BlogPostCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        {/* {thumbnail && (
          <div className="mb-4">
            <Image
              width={100}
              height={100}
              src={thumbnail}
              alt={title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )} */}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{author}</span>
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
