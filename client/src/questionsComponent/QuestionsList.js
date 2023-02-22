import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 게시글을 각각 담을 Container
const QuestionsContainer = styled.div`
  max-width: 800px;
  height: auto;
  margin: 0 auto;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border-top: 1px solid var(--lgray);
`;

// 각 게시글의 데이터를 뿌릴 Section
const QuestionsSection = styled.article`
  width: 100%;
  height: auto;
  margin: 0 auto;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--lgray);

  // answers가 1 이상일 경우 style 적용을 위한 속성
  .count-answers {
    border: ${props =>
      props.hasAnswers ? '1px solid var(--green)' : 'none'};
    border-radius: ${props => (props.hasAnswers ? '5px' : '0px')};
    color: ${props => (props.hasAnswers ? 'var(--green)' : 'none')};
    font-weight: ${props => (props.hasAnswers ? 'bold' : 'none')};
  }
`;

// votes, answers, views
const Counting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  width: 13%;
  max-width: 84px;
  font-size: 14px;

  div {
    padding: 5px;
  }
`;

// 게시글 렌더링
const QuestionsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 70%;
  min-width: 600px;

  .content-title,
  .content-username {
    color: var(--blue-hover);

    &:hover {
      color: var(--blue);
    }
  }

  .content-created {
    display: flex;
    justify-content: flex-end;
  }

  .content-username,
  .content-date {
    margin-left: 10px;
  }

  .content-body {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-height: 1.2em;
    height: 2.4em;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
  }

  h3 {
    padding: 5px 0;
  }

  div {
    margin: 5px 0;
  }
`;

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
