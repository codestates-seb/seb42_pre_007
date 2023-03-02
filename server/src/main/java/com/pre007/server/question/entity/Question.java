package com.pre007.server.question.entity;

import com.pre007.server.answer.entity.Answer;
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
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<QuestionVote> votes = new ArrayList<>();

    private Integer view = 0;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();

    private String tags;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modified = LocalDateTime.now();

    public QuestionVote addVote(QuestionVote vote) {
        List<QuestionVote> newVotes = new ArrayList<>(votes);
        newVotes.add(vote);
        this.votes = newVotes;
        return vote;
    }
}
