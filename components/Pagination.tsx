import React from 'react';

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="join flex justify-between items-center mt-8">
      <button
        className="join-item btn btn-outline w-24"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="align-baseline">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="join-item btn btn-outline w-24"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
