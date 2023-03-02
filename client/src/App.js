import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/variable.css';
import './App.css';
import { GlobalStyle } from './styles/globalStyle.js';
import Header from './components/Header.js';
import Index from './pages/Index.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Main from './pages/Main.js';
import Ask from './pages/Ask.js';
import Edit from './pages/Edit.js';
import Search from './pages/Search.js';
import Questions from './pages/Questions.js';
import QuestionsPagination from './components/QuestionsPagination.js';
import useScrollTop from './util/useScrollTop.js';
import { QuestionsPage } from './pages/QuestionsPage.js';

export const URI = process.env.REACT_APP_API_URI;

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [auth, setAuth] = useState(null);
  // const [questions, setQuestions] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // // 한 페이지 당 보여줄 게시글의 갯수
  // const [postsPerPage, setPostsPerPage] = useState(15);
  // const [totalQuestions, setTotalQuestions] = useState(0);

  // useEffect(() => {
  //   const getQuestions = async () => {
  //     const questions = await axios.get(`${URI}/questions`);
  //     setQuestions(questions.data);
  //     setTotalQuestions(questions.data.length);
  //   };
  //   getQuestions();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${URI}/questions?page=${currentPage}`
  //     );
  //     setQuestions(response.data);
  //   };
  //   fetchData();
  // }, [currentPage]);

  // const endIdx = currentPage * postsPerPage;
  // const startIdx = endIdx - postsPerPage;
  // const currentQuestions = questions => {
  //   let currentQuestions = 0;
  //   if(questions.length>0) currentQuestions = questions.slice(startIdx, endIdx);
  //   return currentQuestions;
  // };

  // const setCurrentPageHandler = pageNumber => {
  //   setCurrentPage(pageNumber);
  // };

  // useScrollTop(currentPage);

  useEffect(() => {
    const authorization = sessionStorage.getItem('authorization');
    const refresh = localStorage.getItem('refresh');
    if (authorization) {
      // console.log(authorization);
      axios({
        method: 'get',
        url: `${URI}/users/auth`,
        headers: {
          authorization,
        },
      })
        .then(res => {
          // console.log(res.data);
          setAuth(authorization);
          setIsLogin(true);
          setUser(res.data.data);
          // console.log(res.data.data);
        })
        .catch(err => {
          // console.log(err);
          sessionStorage.removeItem('authorization');
          getAuthByRefresh(refresh);
        });
    } else if (refresh) {
      // console.log(refresh);
      getAuthByRefresh(refresh);
    }
  }, []);

  const getAuthByRefresh = refresh => {
    axios({
      method: 'get',
      url: `${URI}/users/auth`,
      headers: {
        refresh,
      },
    })
      .then(res => {
        const authorization = res.headers['authorization'];
        sessionStorage.setItem('authorization', authorization);
        setAuth(authorization);
        setUser(res.data);
        setIsLogin(true);
      })
      .catch(err => {
        localStorage.removeItem('refresh');
        // console.log(err);
      });
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header
        isLogin={isLogin}
        user={user}
        setUser={setUser}
        setIsLogin={setIsLogin}
        setAuth={setAuth}
      />
      <Routes>
        {isLogin === false ? (
          <Route path='/' element={<Index />} />
        ) : (
          <Route
            path='/'
            element={
              <>
                {/* <Questions
                  questions={currentQuestions(questions)}
                  totalQuestions={totalQuestions}
                />
                <QuestionsPagination
                  postsPerPage={postsPerPage}
                  totalQuestions={totalQuestions}
                  setCurrentPage={setCurrentPageHandler}
                  currentPage={currentPage}
                /> */}
                <QuestionsPage />
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
              {/* <Questions
                questions={currentQuestions(questions)}
                totalQuestions={totalQuestions}
              />
              <QuestionsPagination
                postsPerPage={postsPerPage}
                setPostsPerPage={setPostsPerPage}
                totalQuestions={totalQuestions}
                setCurrentPage={setCurrentPageHandler}
                currentPage={currentPage}
              /> */}
              <QuestionsPage />
            </>
          }
        />
        <Route
          path='/questions/:questionId'
          element={<Main user={user} auth={auth} />}
        />
        <Route
          path='/questions/:questionId/edit'
          element={<Edit user={user} auth={auth} />}
        />
        <Route
          path='/questions/ask'
          element={<Ask user={user} auth={auth} />}
        />
        <Route path='/search/:searchString' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
