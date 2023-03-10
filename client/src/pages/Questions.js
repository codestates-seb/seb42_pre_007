import QuestionsHeader from '../components/QuestionsHeader';
import QuestionsList from '../components/QuestionsList';
import styled from 'styled-components';

const QuestionsListPage = styled.div`
  margin-top: 50px;
`;

// Questions을 뿌려주는 List Page
const Questions = ({ questions, totalQuestions,isSearch }) => {
  return (
    <QuestionsListPage>
      {questions && (
        <QuestionsHeader
        isSearch={isSearch}
          questions={questions}
          totalQuestions={totalQuestions}
        />
      )}
      {questions && <QuestionsList questions={questions} />}
    </QuestionsListPage>
  );
};

export default Questions;
