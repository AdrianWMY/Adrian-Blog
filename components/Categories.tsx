import React, { useEffect, useState } from 'react';

interface CategoriesProps {
  onTagSelect: (tag: string | null) => void;
  selectedTag: string | null;
}

interface BlogPost {
  tags: string[];
}

const Categories: React.FC<CategoriesProps> = ({
  onTagSelect,
  selectedTag,
}) => {
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog-posts');
        const posts: BlogPost[] = await response.json();

        // Get all unique tags from posts
        const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

        // Count occurrences of each tag
        const counts = allTags.reduce((acc, tag) => {
          acc[tag] = posts.filter((post) => post.tags.includes(tag)).length;
          return acc;
        }, {} as Record<string, number>);

        setTagCounts(counts);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-semibold">Tags</h2>
        <div className="animate-pulse px-5 pt-5">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Tags</h2>
      <ul className="px-5 pt-5">
        <li
          className={`hover:text-pink-600 cursor-pointer py-2 ${
            !selectedTag ? 'text-pink-600' : ''
          }`}
          onClick={() => onTagSelect(null)}
        >
          All Posts
        </li>
        {Object.entries(tagCounts).map(([tag, count]) => (
          <li
            className={`flex justify-between hover:text-pink-600 cursor-pointer py-2 ${
              selectedTag === tag ? 'text-pink-600' : ''
            }`}
            key={tag}
            onClick={() => onTagSelect(tag)}
          >
            <span>{tag}</span>
            <span>({count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
