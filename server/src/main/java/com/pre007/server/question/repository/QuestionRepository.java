package com.pre007.server.question.repository;

import com.pre007.server.question.entity.Question;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>, QuestionRepositoryCustom {

    @Override
    @EntityGraph(attributePaths = {"user", "answers", "tags"})
    Optional<Question> findById(Long id);
}
