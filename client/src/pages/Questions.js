import QuestionsHeader from '../components/QuestionsHeader';
import QuestionsList from '../components/QuestionsList';
import styled from 'styled-components';

const QuestionsListPage = styled.div`
  /* margin-top: 80px; */
  width: calc(100% - 165px);
  margin-left: 165px;
  padding: var(--gap-large);
`;

// Questions을 뿌려주는 List Page
const Questions = ({ questions, totalQuestions }) => {
  return (
    <QuestionsListPage>
      {questions && (
        <QuestionsHeader
          questions={questions}
          totalQuestions={totalQuestions}
        />
      )}
      {questions && <QuestionsList questions={questions} />}
    </QuestionsListPage>
  );
};

export default Questions;
