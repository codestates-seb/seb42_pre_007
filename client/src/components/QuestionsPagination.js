import React from 'react';
import { Link } from 'react-router-dom';
import {
  PaginationContainer,
  PageButton,
  PrevButton,
  NextButton,
} from '../styles/questionsPagination';

const QuestionsPagination = ({
  postsPerPage,
  totalQuestions,
  currentPage,
  setCurrentPage,
}) => {
  // 표시할 페이지 버튼 숫자를 담을 배열
  const pageNumbers = [];
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalQuestions / postsPerPage);
  // 첫번째 페이지 버튼의 숫자
  let startPage = currentPage - 2;
  // 마지막 페이지 버튼의 숫자
  let endPage = currentPage + 2;

  // 현재 페이지를 기준으로 startPage, endPage 조정
  // startPage가 1보다 작을 경우 endPage 조정
  if (startPage < 1) {
    endPage += Math.abs(startPage) + 1;
    startPage = 1;
  }
  // endPage가 전체 페이지를 초과할 경우 startPage 조정
  if (endPage > totalPages) {
    startPage -= endPage - totalPages;
    endPage = totalPages;
  }
  // startPage부터 endPage까지의 숫자를 pageNumbers 배열에 추가
  for (let i = startPage; i <= endPage; i++) {
    if (i > 0) pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {currentPage === 1 ? (
        <PrevButton disabled>prev</PrevButton>
      ) : (
        <Link to={`/questions?page=${currentPage - 1}`}>
          <PrevButton onClick={() => setCurrentPage(currentPage - 1)}>
            prev
          </PrevButton>
        </Link>
      )}
      {pageNumbers.map(number => (
        <Link key={number} to={`/questions?page=${number}`}>
          <PageButton
            onClick={() => setCurrentPage(number)}
            currentPage={currentPage === number}>
            {number}
          </PageButton>
        </Link>
      ))}
      {currentPage === totalPages ? (
        <NextButton disabled>next</NextButton>
      ) : (
        <Link to={`/questions?page=${currentPage + 1}`}>
          <NextButton onClick={() => setCurrentPage(currentPage + 1)}>
            next
          </NextButton>
        </Link>
      )}
    </PaginationContainer>
  );
};

export default QuestionsPagination;
