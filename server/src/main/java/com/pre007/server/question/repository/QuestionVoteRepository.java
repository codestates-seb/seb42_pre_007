package com.pre007.server.question.repository;

import com.pre007.server.question.entity.Question;
import com.pre007.server.question.entity.QuestionVote;
import com.pre007.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {

    @Query("select v from QuestionVote v where v.user = :user and v.question = :question")
    Optional<QuestionVote> findByUserAndQuestion(User user, Question question);
}
