import { useState, useEffect } from 'react';
import { URI } from '../App';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useScrollTop from '../util/useScrollTop';
import styled from 'styled-components';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Questions from './Questions';
import QuestionsPagination from '../components/QuestionsPagination';

const QuestionPageContainer = styled.main`
/* display: flex; */
min-height: 90vh;
`;
const MainWrap = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0 10vw;
`;
const PageWrap = styled.div`
  width: calc(100% - 165px);
  margin-left: 165px;
  padding: var(--gap-large);
`;

function Search() {
  const {searchString}=useParams();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지 당 보여줄 게시글의 갯수
  const [postsPerPage, setPostsPerPage] = useState(30);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    if (currentPage === 1) {
      const getQuestions = async () => {
        const questions = await axios({
          method: 'get',
          url: `${URI}/questions`,
          params:{
            page:1,
            q:searchString
          }
        });
        setQuestions(questions.data.data);
        setTotalQuestions(questions.data.pageableInfo.resultCount);
      };
      getQuestions();
    }
  }, [searchString]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        method: 'get',
        url: `${URI}/questions`,
        params:{
          page:currentPage,
          q:searchString
        }
      });
      // console.log(response.data)
      setQuestions(response.data.data);
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
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
        <MainWrap>
        <Nav />
        <PageWrap>
          {questions && (
            <Questions
            questions={currentQuestions(questions)}
            totalQuestions={totalQuestions}
            isSearch={true}
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
            </PageWrap>
        </MainWrap>
      </QuestionPageContainer>
      <Footer />
    </div>
  );
}

export default Search;
