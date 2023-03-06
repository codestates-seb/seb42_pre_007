package com.pre007.server.answer.entity;

import com.pre007.server.question.entity.Question;
import com.pre007.server.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(length = 1000, nullable = false)
    private String content;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "answer", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<AnswerVote> votes = new ArrayList<>();

    private Boolean selection = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modified = LocalDateTime.now();

    public AnswerVote addVote(AnswerVote vote) {
        this.votes.add(vote);
        vote.setAnswer(this);
        return vote;
    }
}
