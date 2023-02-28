import QuestionsList from '../components/QuestionsList';

export const SERVER_URL = process.env.REACT_APP_SERVER_HOST;

// Questions을 뿌려주는 List Page
const Questions = ({ questions }) => {
  return (
    <div className='questions-list-page'>
      {questions && <QuestionsList questions={questions} />}
    </div>
  );
};

export default Questions;
