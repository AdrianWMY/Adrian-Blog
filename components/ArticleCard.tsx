import React from 'react';

const ArticleCard = () => {
  return (
    <div className="card bg-base-100 w-80 xl:w-96 shadow-sm">
      <figure className="p-5">
        <img src="https://placehold.co/600x350" alt="" className="rounded-md" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Getting Started with React Hooks</h2>
        <p>
          A comprehensive guide to understanding and implementing React Hooks in
          your projects.
        </p>
        <div className="flex items-center gap-2">
          <svg
            width="16px"
            height="16px"
            viewBox="-0.5 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                fill="#000000"
                fillRule="evenodd"
                d="M61,154.006845 C61,153.45078 61.4499488,153 62.0068455,153 L73.9931545,153 C74.5492199,153 75,153.449949 75,154.006845 L75,165.993155 C75,166.54922 74.5500512,167 73.9931545,167 L62.0068455,167 C61.4507801,167 61,166.550051 61,165.993155 L61,154.006845 Z M62,157 L74,157 L74,166 L62,166 L62,157 Z M64,152.5 C64,152.223858 64.214035,152 64.5046844,152 L65.4953156,152 C65.7740451,152 66,152.231934 66,152.5 L66,153 L64,153 L64,152.5 Z M70,152.5 C70,152.223858 70.214035,152 70.5046844,152 L71.4953156,152 C71.7740451,152 72,152.231934 72,152.5 L72,153 L70,153 L70,152.5 Z"
                transform="translate(-61 -152)"
              ></path>{' '}
            </g>
          </svg>
          <h3>May 9, 2025</h3>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
