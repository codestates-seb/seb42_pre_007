import styled from 'styled-components';

// 게시글을 각각 담을 Container
export const QuestionsContainer = styled.div`
  /* max-width: 800px; */
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
export const QuestionsSection = styled.article`
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
export const Counting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  width: 13%;
  max-width: 84px;
  font-size: 13px;

  div {
    padding: 5px;
    height: 25px;
    display: flex;
    align-items: center;
  }
`;

// 게시글 렌더링
export const QuestionsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80%;
  /* min-width: 600px; */

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
    margin: 5px 0px 5px 10px;
    font-size: 13px;
  }

  .content-body {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-height: 1.2em;
    height: 2.4em;
    -webkit-box-orient: vertical;
    font-size: 13px;
    margin-bottom: 5px;
  }

  h3 {
    padding: 5px 0;
    font-weight: 500;
  }
`;
