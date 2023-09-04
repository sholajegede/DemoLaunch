// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

const Pagination = ({ totalInfluencers, numPerPage, currentPage, setCurrentPage }) => {
  const history = useHistory();

  const totalPages = Math.ceil(totalInfluencers / numPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    history.push(`/search/${page}`);
  };

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`${
            i === currentPage
              ? 'inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
              : 'inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return <div className="flex items-center space-x-4 mt-9">{renderPages()}</div>;
};

export default Pagination;