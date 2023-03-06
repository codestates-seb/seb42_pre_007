import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import {
  QuestionsContainer,
  QuestionsSection,
  Counting,
  QuestionsContent,
} from '../styles/questionsList';

const QuestionsList = ({ questions }) => {
  // 작성일자 출력 설정 함수
  const timeFromNow = date => {
    // 기준일 === 오늘
    const today = dayjs();
    // 오늘 기준 작성일과의 차이가 1년 미만일 경우 n초 전, n분 전, n일 전...등으로 출력
    if (today.diff(date, 'year') === 0)
      // dayjs(date).fromNow()의 type === 객체(object)
      // React에서 객체를 직접 렌더링 할 수 없음(에러 발생)
      // 따라서, Object가 아닌 String 값으로 반환해야 함!
      return String(dayjs(date).fromNow());
    // 오늘 기준 작성일과의 차이가 1년 이상일 경우 정해진 포맷으로 출력
    else if (today.diff(date, 'year') > 0)
      return String(dayjs(date).format('YYYY-MM-DD A hh:mm'));
  };

  return (
    <QuestionsContainer>
      {questions &&
        questions.map(question => (
          <React.Fragment key={question.questionId}>
            <QuestionsSection hasAnswers={question.answers > 0}>
              <Counting>
                <div className='count-votes'>{question.votes} votes</div>
                <div className='count-answers'>
                  {question.answers} answers
                </div>
                <div className='count-views'>{question.view} views</div>
              </Counting>
              <QuestionsContent>
                <Link to={`/questions/${question.questionId}`}>
                  <h3 className='content-title'>{question.title}</h3>
                </Link>
                <div className='content-body'>{question.content}</div>
                <div className='content-created'>
                  <div className='content-username'>{question.user}</div>
                  <div className='content-date'>
                    {timeFromNow(new Date(question.createdAt))}
                  </div>
                </div>
              </QuestionsContent>
            </QuestionsSection>
          </React.Fragment>
        ))}
    </QuestionsContainer>
  );
};

export default QuestionsList;
