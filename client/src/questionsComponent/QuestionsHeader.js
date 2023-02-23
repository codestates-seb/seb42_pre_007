import { useState } from 'react';
import {
  HeaderContainer,
  TitleContainer,
  SubContainer,
  QuestionsCount,
  FilterButtons,
} from '../style/questionsHeader';

const QuestionsHeader = ({ questions }) => {
  // 필터 버튼 select 상태 유지를 위한 useState
  const [selected, setSelected] = useState('newest');

  // 필터 버튼 클릭 시 select 상태 유지를 위한 이벤트 핸들러 함수
  const handleFilterClick = filter => {
    setSelected(filter);
  };

  return (
    <HeaderContainer>
      <TitleContainer>
        <h1 className='article-title'>Questions</h1>
        <button className='ask-button'>Ask Questions</button>
      </TitleContainer>
      <SubContainer>
        <QuestionsCount>
          {questions && questions.length} questions
        </QuestionsCount>
        <div className='filter-button-section'>
          <FilterButtons
            selected={selected === 'newest'}
            onClick={() => handleFilterClick('newest')}
            leftRadius
            width='55px'>
            Newest
          </FilterButtons>
          <FilterButtons
            selected={selected === 'active'}
            onClick={() => handleFilterClick('active')}
            width='50px'>
            Active
          </FilterButtons>
          <FilterButtons
            selected={selected === 'unanswered'}
            onClick={() => handleFilterClick('unanswered')}
            width='85px'>
            Unanswered
          </FilterButtons>
          <FilterButtons
            selected={selected === 'hot'}
            onClick={() => handleFilterClick('hot')}
            rightRadius
            rightBorder
            width='40px'>
            Hot
          </FilterButtons>
        </div>
      </SubContainer>
    </HeaderContainer>
  );
};

export default QuestionsHeader;
