package com.pre007.server.answer.repository;

import com.pre007.server.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    // findByquestionId: 질문 ID를 기준으로 답변 목록을 조회할 수 있음
    List<Answer> findByQuestionId(Long questionId);
}
