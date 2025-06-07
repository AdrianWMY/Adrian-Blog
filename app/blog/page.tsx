'use client';
import BlogPostCard from '@/components/BlogPostCard';
import Categories from '@/components/Categories';
import Pagination from '@/components/Pagination';
import { useState } from 'react';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-react-hooks',
    title: 'Getting Started with React Hooks',
    tags: ['React', 'JavaScript', 'Web Development'],
    description:
      'A comprehensive guide to understanding and implementing React Hooks in your projects. Learn about useState, useEffect, useContext, and more.',
    author: 'Adrian',
    date: 'May 9, 2025',
  },
  {
    id: 2,
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    description:
      'Learn the best practices for using TypeScript in your projects. From type definitions to advanced features, this guide covers it all.',
    author: 'Adrian',
    date: 'May 8, 2025',
  },
  {
    id: 3,
    slug: 'building-rest-apis-with-nodejs',
    title: 'Building REST APIs with Node.js',
    tags: ['Node.js', 'API', 'Backend'],
    description:
      'A step-by-step guide to creating robust REST APIs using Node.js and Express. Includes authentication, validation, and error handling.',
    author: 'Adrian',
    date: 'May 7, 2025',
  },
  {
    id: 4,
    slug: 'css-grid-layout-mastery',
    title: 'CSS Grid Layout Mastery',
    tags: ['CSS', 'Web Design', 'Frontend'],
    description:
      'Master the CSS Grid Layout system with practical examples and real-world use cases. Transform your web layouts with modern CSS.',
    author: 'Adrian',
    date: 'May 6, 2025',
  },
  {
    id: 5,
    slug: 'docker-for-developers',
    title: 'Docker for Developers',
    tags: ['Docker', 'DevOps', 'Containerization'],
    description:
      'Learn how to containerize your applications with Docker. From basic concepts to advanced deployment strategies.',
    author: 'Adrian',
    date: 'May 5, 2025',
  },
  {
    id: 6,
    slug: 'graphql-vs-rest',
    title: 'GraphQL vs REST',
    tags: ['GraphQL', 'API', 'Web Development'],
    description:
      'A detailed comparison between GraphQL and REST APIs. Understand when to use each and their respective advantages.',
    author: 'Adrian',
    date: 'May 4, 2025',
  },
  {
    id: 7,
    slug: 'nextjs-14-features',
    title: 'Next.js 14 Features',
    tags: ['Next.js', 'React', 'Web Development'],
    description:
      "Explore the latest features in Next.js 14. From server components to improved routing, discover what's new.",
    author: 'Adrian',
    date: 'May 3, 2025',
  },
  {
    id: 8,
    slug: 'testing-react-applications',
    title: 'Testing React Applications',
    tags: ['React', 'Testing', 'Jest'],
    description:
      'Learn how to write effective tests for your React applications using Jest and React Testing Library.',
    author: 'Adrian',
    date: 'May 2, 2025',
  },
  {
    id: 9,
    slug: 'state-management-with-redux',
    title: 'State Management with Redux',
    tags: ['Redux', 'React', 'State Management'],
    description:
      'Master state management in React applications using Redux. Learn about actions, reducers, and the Redux store.',
    author: 'Adrian',
    date: 'May 1, 2025',
  },
  {
    id: 10,
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization',
    tags: ['Performance', 'Web Development', 'Optimization'],
    description:
      'Learn techniques to optimize your web applications for better performance and user experience.',
    author: 'Adrian',
    date: 'April 30, 2025',
  },
];

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter posts based on selected tag
  const filteredPosts = selectedTag
    ? blogPosts.filter((post) => post.tags.includes(selectedTag))
    : blogPosts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to first page when changing tags
  };

  return (
    <div className="md:px-10 flex mt-10 gap-10">
      <div className="w-1/4 hidden sm:block">
        <Categories onTagSelect={handleTagSelect} selectedTag={selectedTag} />
      </div>
      <div className="sm:w-3/4">
        <h2 className="text-3xl">Blog Posts</h2>
        {selectedTag && (
          <div className="mt-2 text-pink-600">
            Showing posts tagged with: {selectedTag}
          </div>
        )}
        <div className="mt-10">
          {currentPosts.map((post) => (
            <div key={post.id} className="mb-5">
              <BlogPostCard
                slug={post.slug}
                title={post.title}
                tags={post.tags}
                description={post.description}
                author={post.author}
                date={post.date}
              />
            </div>
          ))}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Page;
