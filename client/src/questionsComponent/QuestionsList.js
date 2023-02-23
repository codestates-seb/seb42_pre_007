import React from 'react';
import { Link } from 'react-router-dom';
import {
  QuestionsContainer,
  QuestionsSection,
  Counting,
  QuestionsContent,
} from '../style/questionsList';

const QuestionsList = ({ questions }) => {
  return (
    <QuestionsContainer>
      {questions &&
        questions.map(question => (
          <React.Fragment key={question.id}>
            <QuestionsSection hasAnswers={question.answers > 0}>
              <Counting>
                <div className='count-votes'>{question.votes} votes</div>
                <div className='count-answers'>
                  {question.answers} answers
                </div>
                <div className='count-views'>{question.views} views</div>
              </Counting>
              <QuestionsContent>
                <Link to={`/question/${question.id}`}>
                  <h3 className='content-title'>{question.title}</h3>
                </Link>
                <div className='content-body'>{question.content}</div>
                <div className='content-created'>
                  <div className='content-username'>
                    {question.userName}
                  </div>
                  <div className='content-date'>{question.createdAt}</div>
                </div>
              </QuestionsContent>
            </QuestionsSection>
          </React.Fragment>
        ))}
    </QuestionsContainer>
  );
};

export default QuestionsList;
