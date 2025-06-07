import React from 'react';
import Tag from '@/components/Tag';

interface BlogPostCardProps {
  title: string;
  tags: string[];
  description: string;
  author: string;
  date: string;
}

const BlogPostCard = ({
  title,
  tags,
  description,
  author,
  date,
}: BlogPostCardProps) => {
  return (
    <div className="border border-solid rounded-md border-zinc-300 p-5 cursor-pointer hover:border-pink-500 transition-colors">
      <div className="title text-2xl py-1 font-semibold">{title}</div>
      <div>
        {tags.map((tag, index) => (
          <span key={index} className="mx-1">
            <Tag>{tag}</Tag>
          </span>
        ))}
      </div>
      <p className="short-description text-stone-500 py-1">{description}</p>
      <div className="flex justify-between text-stone-700 py-1">
        <div>
          <div className="author-icon"></div>
          <div className="author">{author}</div>
        </div>
        <div className="date-time">{date}</div>
      </div>
    </div>
  );
};

export default BlogPostCard;
