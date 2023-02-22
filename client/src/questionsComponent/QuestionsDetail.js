import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

// Content 연결 확인을 위한 임시 페이지
const QuestionsDetail = () => {
  const [questions, setQuestions] = useState(null);

  const { id } = useParams();

  const getQuestions = async () => {
    const questions = await axios.get(`${SERVER_URL}/question/${id}`);
    setQuestions(questions.data);
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className='questions-detail'>
      {questions && (
        <article>
          <h2>{questions.title}</h2>
          <div>{questions.content}</div>
          <p>{questions.userName}</p>
          <span>{questions.createdAt}</span>
        </article>
      )}
    </div>
  );
};

export default QuestionsDetail;
