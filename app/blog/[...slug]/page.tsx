'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Tag from '@/components/Tag';

// Sample blog post data (same as in blog/page.tsx)
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
    content: `
      # Getting Started with React Hooks

      React Hooks have revolutionized how we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how to implement them effectively.

      ## useState Hook

      The useState hook is the most basic hook that allows you to add state to functional components. Here's a simple example:

      \`\`\`jsx
      function Counter() {
        const [count, setCount] = useState(0);
        return (
          <button onClick={() => setCount(count + 1)}>
            Count: {count}
          </button>
        );
      }
      \`\`\`

      ## useEffect Hook

      The useEffect hook lets you perform side effects in your components. It's perfect for data fetching, subscriptions, or manually changing the DOM.

      \`\`\`jsx
      useEffect(() => {
        // Side effect code here
        return () => {
          // Cleanup code here
        };
      }, [dependencies]);
      \`\`\`

      ## useContext Hook

      The useContext hook provides a way to share values between components without explicitly passing props through every level.

      \`\`\`jsx
      const ThemeContext = React.createContext('light');

      function ThemedButton() {
        const theme = useContext(ThemeContext);
        return <button className={theme}>Themed Button</button>;
      }
      \`\`\`

      ## Best Practices

      1. Only call hooks at the top level
      2. Only call hooks from React function components
      3. Use multiple useEffect hooks to separate concerns
      4. Include all dependencies in the dependency array

      ## Conclusion

      React Hooks provide a more intuitive way to work with state and side effects in React components. By following these patterns and best practices, you can write more maintainable and efficient React applications.
    `,
  },
  // ... other blog posts
];

const BlogPost = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl text-red-600">Post not found</h1>
        <Link
          href="/blog"
          className="text-pink-600 hover:text-pink-700 mt-4 inline-block"
        >
          ← Back to Blog
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
        ← Back to Blog
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div className="flex items-center">
              <div className="author-icon mr-2"></div>
              <span>{post.author}</span>
            </div>
            <time>{post.date}</time>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('#')) {
              const level = paragraph.match(/^#+/)?.[0].length || 1;
              const text = paragraph.replace(/^#+\s*/, '');

              switch (level) {
                case 1:
                  return (
                    <h1 key={index} className="text-3xl font-bold my-4">
                      {text}
                    </h1>
                  );
                case 2:
                  return (
                    <h2 key={index} className="text-2xl font-bold my-4">
                      {text}
                    </h2>
                  );
                case 3:
                  return (
                    <h3 key={index} className="text-xl font-bold my-4">
                      {text}
                    </h3>
                  );
                default:
                  return (
                    <h4 key={index} className="text-lg font-bold my-4">
                      {text}
                    </h4>
                  );
              }
            }
            if (paragraph.startsWith('```')) {
              return null; // Skip code block markers
            }
            if (paragraph.trim() === '') {
              return <br key={index} />;
            }
            return (
              <p key={index} className="my-4">
                {paragraph}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
