import React from 'react';
import { Link } from 'react-router-dom';
import { PageUl, PageLi, PageSpan } from '../style/questionsPagination';

const QuestionsPagination = ({
  postsPerPage,
  totalQuestions,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalQuestions / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PageUl>
      {pageNumbers.map(number => (
        <React.Fragment key={number}>
          <Link to={`/question?page=${number}`}>
            <PageLi
              onClick={() => setCurrentPage(number)}
              currentPage={currentPage === number}>
              <PageSpan
                onClick={() => setCurrentPage(number)}
                currentPage={currentPage === number}>
                {number}
              </PageSpan>
            </PageLi>
          </Link>
        </React.Fragment>
      ))}
    </PageUl>
  );
};

export default QuestionsPagination;
