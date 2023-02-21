import './style/variable.css';
import Questions from './page/Questions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionsHeader from './questionsComponent/QuestionsHeader';
import QuestionsDetail from './questionsComponent/QuestionsDetail';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    const questions = await axios.get('http://localhost:3001/questions');
    setQuestions(questions.data);
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <div className='questions-container'>
          <QuestionsHeader questions={questions} />
          <Routes>
            <Route
              exact
              path='/'
              element={<Questions questions={questions} />}
            />
            <Route path='/questions/:id' element={<QuestionsDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
