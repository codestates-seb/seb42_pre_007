import styled from 'styled-components';

// 최상단 Header 전체를 감싸는 Container
export const HeaderContainer = styled.div`
  /* width: 100%; */
  height: auto;
  margin: 30px 20px 0px 20px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

// Title, Ask Questions 버튼을 감싸는 Container
export const TitleContainer = styled.div`
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
export const SubContainer = styled.div`
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

export const QuestionsCount = styled.span`
  font-size: 20px;
`;

// 게시글 필터 버튼 -- 기능 작동X
export const FilterButtons = styled.button`
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
