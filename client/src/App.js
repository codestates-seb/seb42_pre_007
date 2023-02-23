import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './style/variable.css';
import './App.css';
import Questions from './page/Questions';
import QuestionsHeader from './questionsComponent/QuestionsHeader';
import QuestionsDetail from './questionsComponent/QuestionsDetail';
import QuestionsPagination from './questionsComponent/QuestionsPagination';
import useScrollTop from './util/useScrollTop';

export const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지 당 보여줄 게시글의 갯수
  const [postsPerPage, setPostsPerPage] = useState(15);

  useEffect(() => {
    const getQuestions = async () => {
      const questions = await axios.get(`${SERVER_URL}/question`);
      setQuestions(questions.data);
    };
    getQuestions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${SERVER_URL}/question?page=${currentPage}`
      );
      setQuestions(response.data);
    };
    fetchData();
  }, [currentPage]);

  const endIdx = currentPage * postsPerPage;
  const startIdx = endIdx - postsPerPage;
  const currentQuestions = questions => {
    let currentQuestions = 0;
    currentQuestions = questions.slice(startIdx, endIdx);
    return currentQuestions;
  };

  const setCurrentPageHandler = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useScrollTop(currentPage);

  return (
    <BrowserRouter>
      <div className='App'>
        <div className='questions-container'>
          <QuestionsHeader questions={questions} />
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Questions questions={currentQuestions(questions)} />
                  <QuestionsPagination
                    postsPerPage={postsPerPage}
                    totalQuestions={questions.length}
                    setCurrentPage={setCurrentPageHandler}
                    currentPage={currentPage}
                  />
                </>
              }
            />
            <Route
              path='/question'
              element={
                <>
                  <Questions questions={currentQuestions(questions)} />
                  <QuestionsPagination
                    postsPerPage={postsPerPage}
                    setPostsPerPage={setPostsPerPage}
                    totalQuestions={questions.length}
                    setCurrentPage={setCurrentPageHandler}
                    currentPage={currentPage}
                  />
                </>
              }
            />
            <Route path='/question/:id' element={<QuestionsDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
