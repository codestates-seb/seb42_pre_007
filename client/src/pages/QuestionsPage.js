import { useState, useEffect } from 'react';
import Questions from './Questions';
import QuestionsPagination from '../components/QuestionsPagination';
import axios from 'axios';
import { URI } from '../App';
import useScrollTop from '../util/useScrollTop';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const QuestionPageContainer = styled.main`
/* display: flex; */
`;

export function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지 당 보여줄 게시글의 갯수
  const [postsPerPage, setPostsPerPage] = useState(30);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    if (currentPage === 1) {
      const getQuestions = async () => {
        const questions = await axios.get(`${URI}/questions`);
        setQuestions(questions.data.data);
        setTotalQuestions(questions.data.pageableInfo.totalCount);
      };
      getQuestions();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${URI}/questions?page=${currentPage}`
      );
      // console.log(response.data)
      setQuestions(response.data.data);
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    console.log('get questions success!');
    console.log(questions);
  }, [questions]);

  const endIdx = currentPage * postsPerPage;
  const startIdx = endIdx - postsPerPage;
  const currentQuestions = (questions) => {
    // let currentQuestions = 0;
    // if (questions.length > 0)
    //   currentQuestions = questions.slice(startIdx, endIdx);
    // return currentQuestions;
    return questions;
  };

  const setCurrentPageHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useScrollTop(currentPage);

  return (
    <div>
      <QuestionPageContainer>
        <div>
          <Nav />
          {questions && (
            <Questions
              questions={currentQuestions(questions)}
              totalQuestions={totalQuestions}
            />
          )}
          {questions && (
            <QuestionsPagination
              postsPerPage={postsPerPage}
              totalQuestions={totalQuestions}
              setCurrentPage={setCurrentPageHandler}
              currentPage={currentPage}
            />
          )}
        </div>
      </QuestionPageContainer>
      <Footer />
    </div>
  );
}
