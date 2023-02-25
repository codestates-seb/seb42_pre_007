package com.pre007.server.question.repository;

import com.pre007.server.question.dto.QuestionPage;
import com.pre007.server.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>{
//    @Query(value = "select " +
//            "q.questionId" +
//            "q.title" +
//            "q.content" +
//            "q.view" +
//            "u.displayName" +
//            "q.createdAt" +
//            "count(a.answerId) " +
//            "from Question q" +
//            "join User u on u.userId = q.userId" +
//            "left join Answer a on q.questionId = a.questionId" +
//            "group by answerId" +
//            "order by questionId desc"
//            ,nativeQuery = true)
//    Optional<Question> findByQuestionPage(QuestionPage questionPage);
}
