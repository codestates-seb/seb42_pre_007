import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionsDetail = () => {
  const [questions, setQuestions] = useState(null);

  const { id } = useParams();

  const getQuestions = async () => {
    const questions = await axios.get(
      `http://localhost:3001/questions/${id}`
    );
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
