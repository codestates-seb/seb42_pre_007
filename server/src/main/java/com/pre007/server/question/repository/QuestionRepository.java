package com.pre007.server.question.repository;

import com.pre007.server.question.entity.Question;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>, QuestionRepositoryCustom {

    @Override
    @EntityGraph(attributePaths = {"user", "answers"})
//    @Query("select q" +
//            " from Question q" +
//            " join fetch q.user u" +
//            " join fetch q.answers a" +
//            " join fetch q.votes v" +
//            " join fetch a.votes w" +
//            " where q.questionId = :id")
    Optional<Question> findById(Long id);
}
