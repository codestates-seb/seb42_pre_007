package com.pre007.server.answer.repository;

import com.pre007.server.answer.entity.Answer;
import com.pre007.server.answer.entity.AnswerVote;
import com.pre007.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Long> {

    @Query("select v from AnswerVote v where v.user = :user and v.answer = :answer")
    Optional<AnswerVote> findByUserAndQuestion(User user, Answer answer);
}
