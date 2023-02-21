import QuestionsList from '../questionsComponent/QuestionsList';
import QuestionsPagination from '../questionsComponent/QuestionsPagination';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:3001/questions?page=${currentPage}`
    );
    setQuestions(response.data);
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const endIdx = currentPage * postsPerPage;
  const startIdx = endIdx - postsPerPage;
  const currentQuestions = questions => {
    let currentQuestions = 0;
    currentQuestions = questions.slice(startIdx, endIdx);
    return currentQuestions;
  };

  return (
    <div className='questions-list-page'>
      {questions && (
        <QuestionsList questions={currentQuestions(questions)} />
      )}
      <QuestionsPagination
        postsPerPage={postsPerPage}
        totalQuestions={questions.length}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default Questions;
