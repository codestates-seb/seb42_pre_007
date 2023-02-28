import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/variable.css';
import './App.css';
import Questions from './pages/Questions';
import QuestionsHeader from './components/QuestionsHeader';
import QuestionsDetail from './components/QuestionsDetail';
import QuestionsPagination from './components/QuestionsPagination';
import useScrollTop from './util/useScrollTop';

export const SERVER_URL = process.env.REACT_APP_SERVER_HOST;
import "./styles/variable.css";
import { GlobalStyle } from "./styles/globalStyle";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Ask from "./pages/Ask";

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

  const [ user, setUser ] = useState(null)
  const [ isLogin, setIsLogin ] = useState(false)
  const [ auth, setAuth ] = useState(null)

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
    <BrowserRouter>
      <GlobalStyle/>
      <Header isLogin={isLogin} user={user} setUser={setUser} setIsLogin={setIsLogin} />
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/users/login' element={<Login setUser={setUser} setIsLogin={setIsLogin} setAuth={setAuth} />} />
        <Route path='/users/signup' element={<SignUp/>} />
        <Route path='/questions/:questionId' element={<Main user={user} />} />
        <Route path='/questions/ask' element={<Ask/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
