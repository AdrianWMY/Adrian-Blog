'use client';
import BlogPostCard from '@/components/BlogPostCard';
import Categories from '@/components/Categories';
import Pagination from '@/components/Pagination';
import { useState, useEffect } from 'react';

interface BlogPost {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  author: string;
  date: string;
  thumbnail?: string;
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog-posts');
        const posts = await response.json();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <div key={post.slug} className="mb-5">
              <BlogPostCard
                slug={post.slug}
                title={post.title}
                tags={post.tags}
                description={post.description}
                author={post.author}
                date={post.date}
                thumbnail={post.thumbnail}
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
