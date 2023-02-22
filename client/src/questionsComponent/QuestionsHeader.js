import { useState } from 'react';
import styled from 'styled-components';

// 최상단 Header 전체를 감싸는 Container
const HeaderContainer = styled.div`
  /* width: 100%; */
  height: auto;
  margin: 30px 20px 0px 20px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

// Title, Ask Questions 버튼을 감싸는 Container
const TitleContainer = styled.div`
  width: 90%;
  max-width: 800px;
  height: auto;
  margin: 0 auto;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;

  button {
    border: none;
    background-color: var(--blue);
    color: var(--white);
    font-size: 14px;
    border-radius: 3px;
    width: 120px;
    height: 45px;
    cursor: pointer;
    text-align: center;
    display: block;

    &:hover {
      background-color: var(--blue-hover);
    }
  }
`;

// 총 Questions 갯수와 Filter 버튼을 감싸는 Container
const SubContainer = styled.div`
  width: 90%;
  max-width: 800px;
  height: auto;
  margin: 0 auto;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const QuestionsCount = styled.span`
  font-size: 20px;
`;

// 게시글 필터 버튼 -- 기능 작동X
const FilterButtons = styled.button`
  border-top: 1px solid var(--dgray);
  border-left: 1px solid var(--dgray);
  border-bottom: 1px solid var(--dgray);
  border-right: ${props =>
    props.rightBorder ? '1px solid var(--dgray)' : 'none'};
  background-color: ${props =>
    props.selected ? 'var(--lgray)' : 'var(--white)'};
  color: ${props => (props.selected ? 'var(--black)' : 'var(--dgray)')};
  font-size: 12px;
  border-top-left-radius: ${props => (props.leftRadius ? '5px' : '0px')};
  border-bottom-left-radius: ${props =>
    props.leftRadius ? '5px' : '0px'};
  border-top-right-radius: ${props => (props.rightRadius ? '5px' : '0px')};
  border-bottom-right-radius: ${props =>
    props.rightRadius ? '5px' : '0px'};
  width: ${props => props.width};
  height: 35px;
  cursor: pointer;
`;

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
