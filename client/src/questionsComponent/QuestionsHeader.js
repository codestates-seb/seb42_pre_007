import { useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  box-sizing: content-box;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    border: none;
    background-color: var(--blue);
    color: var(--white);
    font-size: 14px;
    border-radius: 3px;
    width: 120px;
    height: 45px;
    cursor: pointer;

    &:hover {
      background-color: var(--blue-hover);
    }
  }
`;

const SubContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionsCount = styled.span`
  font-size: 20px;
`;

const FilterContainer = styled.div`
  /* button {
    border: 1px solid var(--lgray);
    background-color: var(--white);
    color: var(--black);
    font-size: 10px;
    border-radius: 3px;
    width: 50px;
    height: 35px;
    cursor: pointer;
  } */
`;

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
  const [selected, setSelected] = useState('newest');

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
        <FilterContainer>
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
        </FilterContainer>
      </SubContainer>
    </HeaderContainer>
  );
};

export default QuestionsHeader;
