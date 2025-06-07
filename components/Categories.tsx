import React from 'react';

interface CategoriesProps {
  onTagSelect: (tag: string | null) => void;
  selectedTag: string | null;
}

const Categories: React.FC<CategoriesProps> = ({
  onTagSelect,
  selectedTag,
}) => {
  // Get unique tags from all blog posts
  const allTags = [
    'React',
    'JavaScript',
    'Web Development',
    'TypeScript',
    'Programming',
    'Node.js',
    'API',
    'Backend',
    'CSS',
    'Web Design',
    'Frontend',
    'Docker',
    'DevOps',
    'Containerization',
    'GraphQL',
    'Next.js',
    'Testing',
    'Jest',
    'Redux',
    'State Management',
    'Performance',
    'Optimization',
  ];

  // Sample blog posts data to count tags
  const blogPosts = [
    {
      id: 1,
      tags: ['React', 'JavaScript', 'Web Development'],
    },
    {
      id: 2,
      tags: ['TypeScript', 'JavaScript', 'Programming'],
    },
    {
      id: 3,
      tags: ['Node.js', 'API', 'Backend'],
    },
    {
      id: 4,
      tags: ['CSS', 'Web Design', 'Frontend'],
    },
    {
      id: 5,
      tags: ['Docker', 'DevOps', 'Containerization'],
    },
    {
      id: 6,
      tags: ['GraphQL', 'API', 'Web Development'],
    },
    {
      id: 7,
      tags: ['Next.js', 'React', 'Web Development'],
    },
    {
      id: 8,
      tags: ['React', 'Testing', 'Jest'],
    },
    {
      id: 9,
      tags: ['Redux', 'React', 'State Management'],
    },
    {
      id: 10,
      tags: ['Performance', 'Web Development', 'Optimization'],
    },
  ];

  // Count actual occurrences of each tag in blog posts
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = blogPosts.filter((post) => post.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h2 className="text-xl font-semibold">Tags</h2>
      <ul className="px-5 pt-5 ">
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
