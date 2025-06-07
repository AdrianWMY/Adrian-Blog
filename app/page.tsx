import ArticleCard from '@/components/ArticleCard';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="px-5">
      <section className="mt-10 text-center lg:text-start lg:w-1/2">
        <h1 className="text-3xl lg:text-4xl font-bold ">
          Documenting My Journey as a Web Developer
        </h1>
        <br />
        <p className="text-lg">
          Follow along as I share my experiences, learnings, and insights from
          the world of web development.
        </p>
        <br />
        <button className="btn btn-neutral">Explore All Posts</button>
      </section>

      <section className="mt-20">
        <h1 className="text-2xl ">Latest Articles</h1>
        <div className="mt-10 flex justify-center lg:justify-between flex-wrap lg:gap-0 gap-5 ">
          {Array.from({ length: 3 }).map((_, index) => (
            <ArticleCard key={index} />
          ))}
        </div>
      </section>

      <section className="bg-zinc-200 mt-10 py-20 text-center w-screen relative left-1/2 -translate-x-1/2">
        <h1 className="text-3xl font-bold">Stay Updated</h1>
        <br />
        <p>
          Subscribe to my newsletter to receive the latest articles, tutorials,
          and insights about web development.
        </p>
        <br />
        <button className="btn btn-neutral">Subscribe</button>
      </section>
    </div>
  );
}
