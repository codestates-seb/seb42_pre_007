package com.pre007.server.answer.repository;

import com.pre007.server.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    // findByquestionId: 질문 ID를 기준으로 답변 목록을 조회할 수 있다.
    List<Answer> findByQuestionId(Long questionId);
//    Answer save(Answer answer);
}
