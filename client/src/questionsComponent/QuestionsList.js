import { Link } from 'react-router-dom';

const QuestionsList = ({ questions }) => {
  return (
    <div className='questions-list'>
      {questions &&
        questions.map(question => (
          <div className='questions-preview' key={question.id}>
            <div>{question.votes} votes</div>
            <div>{question.answers} answers</div>
            <div>{question.views} views</div>
            <Link to={`/questions/${question.id}`}>
              <h2>{question.title}</h2>
              <p>{question.userName}</p>
              <span>{question.createdAt}</span>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default QuestionsList;
