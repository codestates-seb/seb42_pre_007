import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/variable.css';
import './App.css';
import { GlobalStyle } from './styles/globalStyle';
import Header from './components/Header';
import Index from './pages/Index';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import Ask from './pages/Ask';
import Questions from './pages/Questions';
import QuestionsPagination from './components/QuestionsPagination';
import useScrollTop from './util/useScrollTop';

export const URI = process.env.REACT_APP_API_URI;

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [auth, setAuth] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지 당 보여줄 게시글의 갯수
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      const questions = await axios.get(`${URI}/questions`);
      setQuestions(questions.data);
      setTotalQuestions(questions.data.length);
    };
    getQuestions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${URI}/questions?page=${currentPage}`
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
      <GlobalStyle />
      <Header
        isLogin={isLogin}
        user={user}
        setUser={setUser}
        setIsLogin={setIsLogin}
      />
      <Routes>
        {isLogin === false ? (
          <Route path='/' element={<Index />} />
        ) : (
          <Route
            path='/'
            element={
              <>
                <Questions
                  questions={currentQuestions(questions)}
                  totalQuestions={totalQuestions}
                />
                <QuestionsPagination
                  postsPerPage={postsPerPage}
                  totalQuestions={totalQuestions}
                  setCurrentPage={setCurrentPageHandler}
                  currentPage={currentPage}
                />
              </>
            }
          />
        )}
        <Route
          path='/users/login'
          element={
            <Login
              setUser={setUser}
              setIsLogin={setIsLogin}
              setAuth={setAuth}
            />
          }
        />
        <Route path='/users/signup' element={<SignUp />} />
        <Route
          path='/questions'
          element={
            <>
              <Questions
                questions={currentQuestions(questions)}
                totalQuestions={totalQuestions}
              />
              <QuestionsPagination
                postsPerPage={postsPerPage}
                setPostsPerPage={setPostsPerPage}
                totalQuestions={totalQuestions}
                setCurrentPage={setCurrentPageHandler}
                currentPage={currentPage}
              />
            </>
          }
        />
        <Route
          path='/questions/:questionId'
          element={<Main user={user} auth={auth} />}
        />
        <Route path='/questions/ask' element={<Ask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;